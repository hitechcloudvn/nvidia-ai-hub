> [English](deployment-production.md) | **Tiếng Việt**

# Hướng dẫn triển khai production

Hướng dẫn này mô tả một mô hình triển khai theo phong cách production thực tế cho NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC.

Tài liệu dành cho người vận hành trên Linux khi chạy ứng dụng trên các máy chủ NVIDIA GPU được hỗ trợ.

Hướng dẫn này bao gồm:

- mục tiêu triển khai và ranh giới hỗ trợ
- chuẩn bị máy chủ (host)
- kiểm tra foreground với `uvicorn`
- quản lý service với `systemd`
- persistence tùy chọn dựa trên PM2
- các mẫu reverse proxy với Nginx và Caddy
- các ghi chú về TLS, expose trong LAN và expose ra công khai

Các asset ví dụ triển khai được theo dõi trong kho nằm tại [`../deploy/`](../deploy/):

- [`../deploy/systemd/nvidia-ai-hub@.service`](../deploy/systemd/nvidia-ai-hub@.service)
- [`../deploy/nginx/nvidia-ai-hub.conf`](../deploy/nginx/nvidia-ai-hub.conf)
- [`../deploy/caddy/Caddyfile`](../deploy/caddy/Caddyfile)
- [`../deploy/pm2/ecosystem.config.cjs`](../deploy/pm2/ecosystem.config.cjs)

Để biết cách cài đặt cơ bản và yêu cầu nền tảng, xem [`docs/installation.md`](./installation.vi.md).

Để biết các ưu tiên triển khai hiện hành và thứ tự thực thi có thể ảnh hưởng đến hướng dẫn triển khai, hãy xem [`../planning/development-execution-plan.md`](../planning/development-execution-plan.vi.md).

## 1. Mô hình production được khuyến nghị

Với vận hành theo phong cách production trên Linux, thứ tự được ưu tiên là:

1. chuẩn bị một máy chủ Linux được hỗ trợ có Docker và hỗ trợ NVIDIA runtime
2. kiểm tra ứng dụng ở chế độ foreground với `uvicorn`
3. đặt ứng dụng phía sau reverse proxy
4. quản lý tiến trình API với `systemd`
5. chỉ expose service sau khi đã xác minh bảo mật máy chủ, TLS và ranh giới mạng

Stack được khuyến nghị:

- máy chủ Linux
- NVIDIA driver và `nvidia-smi`
- Docker Engine
- NVIDIA Container Toolkit
- Python `3.11+`
- Node.js `22+` khi cần build lại frontend
- `systemd` để giám sát service
- Nginx hoặc Caddy cho reverse proxy và TLS

## 2. Ranh giới hỗ trợ

- Linux là nền tảng triển khai chính.
- Windows và macOS được tài liệu hóa cho quy trình phát triển, không phải nền tảng production ưu tiên cho các triển khai local có GPU.
- PM2 là tùy chọn và chấp nhận được cho persistence nhẹ, nhưng `systemd` là trình quản lý service ưu tiên trên Linux.

## 3. Danh sách kiểm tra mức sẵn sàng của máy chủ

Trước khi expose ứng dụng cho người dùng khác, hãy xác minh:

```bash
python3 --version
node --version
npm --version
docker --version
docker info
nvidia-smi
./check.sh
```

Với các container dùng GPU, cũng cần xác minh:

```bash
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

Kết quả mong đợi:

- Docker daemon có thể kết nối được
- GPU hiển thị trên máy chủ
- GPU hiển thị bên trong Docker container
- các bài kiểm tra của kho lưu trữ đạt

## 4. Kiểm tra foreground trước khi thiết lập service

Luôn kiểm tra ứng dụng trong một shell foreground thông thường trước.

Từ thư mục gốc của kho lưu trữ:

```bash
cp .env.example .env
python3 -m venv .venv
. .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
cd frontend
npm install
npm run build
cd ..
./run.sh --host 0.0.0.0 --port 9000
```

Sau đó xác nhận:

- `http://localhost:9000` tải được
- `GET /api/recipes` phản hồi thành công
- các chỉ số hệ thống hiển thị đúng như mong đợi cho máy chủ

Không chuyển sang thiết lập `systemd`, PM2 hay reverse proxy cho đến khi tiến trình foreground hoạt động chính xác.

## 5. Ví dụ service `systemd`

`systemd` là trình quản lý tiến trình production ưu tiên trên Linux.

Tạo `/etc/systemd/system/nvidia-ai-hub@.service`:

```ini
[Unit]
Description=NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC
After=network.target docker.service
Requires=docker.service

[Service]
Type=simple
User=%i
WorkingDirectory=/home/%i/nvidia-ai-hub
Environment=PYTHONUNBUFFERED=1
ExecStart=/home/%i/nvidia-ai-hub/.venv/bin/python -m uvicorn daemon.main:app --host 0.0.0.0 --port 9000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Ví dụ kích hoạt cho người dùng `ubuntu`:

```bash
sudo systemctl daemon-reload
sudo systemctl enable nvidia-ai-hub@ubuntu.service
sudo systemctl start nvidia-ai-hub@ubuntu.service
sudo systemctl status nvidia-ai-hub@ubuntu.service
```

Các lệnh hữu ích:

```bash
sudo journalctl -u nvidia-ai-hub@ubuntu.service -f
sudo systemctl restart nvidia-ai-hub@ubuntu.service
sudo systemctl stop nvidia-ai-hub@ubuntu.service
```

Điều chỉnh thư mục làm việc và đường dẫn người dùng cho khớp với đường dẫn cài đặt của bạn.

Tệp unit được theo dõi trong kho đã đọc `HOST` và `PORT` từ môi trường của service. Đối với các giá trị mặc định tại kho lưu trữ, hãy giữ `NVIDIA_AI_HUB_HOST` và `NVIDIA_AI_HUB_PORT` trong `.env` khớp với các giá trị mà bạn expose qua trình quản lý tiến trình hoặc reverse proxy.

Nếu bạn muốn một tệp khởi tạo được theo dõi trong kho thay vì sao chép từ tài liệu này, hãy bắt đầu với [`../deploy/systemd/nvidia-ai-hub@.service`](../deploy/systemd/nvidia-ai-hub@.service) và cập nhật người dùng, nhóm, thư mục làm việc và thiết lập bind cho máy chủ của bạn.

## 6. Triển khai PM2 tùy chọn

PM2 là tùy chọn. PM2 hữu ích cho persistence nhanh trên các hệ thống một người dùng hoặc môi trường phòng thí nghiệm.

Cài đặt PM2:

```bash
npm install -g pm2
```

Khởi động ứng dụng:

```bash
cd ~/nvidia-ai-hub
pm2 start ./run.sh --name nvidia-ai-hub -- --host 0.0.0.0 --port 9000
pm2 save
```

Các lệnh hữu ích:

```bash
pm2 status
pm2 logs nvidia-ai-hub
pm2 restart nvidia-ai-hub
pm2 stop nvidia-ai-hub
pm2 delete nvidia-ai-hub
```

PM2 chấp nhận được cho persistence nhẹ, nhưng `systemd` vẫn là lựa chọn production ưu tiên trên Linux.

Nếu bạn muốn một tệp khởi tạo PM2 được theo dõi trong kho, hãy dùng [`../deploy/pm2/ecosystem.config.cjs`](../deploy/pm2/ecosystem.config.cjs) và cập nhật đường dẫn kho lưu trữ, đường dẫn Python và thiết lập bind trước khi sử dụng.

## 7. Reverse proxy với Nginx

Sử dụng reverse proxy khi:

- expose ứng dụng ra ngoài localhost
- kết thúc TLS (TLS termination)
- áp dụng các chính sách header
- chuẩn hóa truy cập qua cổng `80` hoặc `443`

Ví dụ site Nginx:

```nginx
server {
    listen 80;
    server_name ai-hub.example.internal;

    location / {
        proxy_pass http://127.0.0.1:9000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Sau khi lưu site:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Bạn cũng có thể bắt đầu từ tệp ví dụ được theo dõi tại [`../deploy/nginx/nvidia-ai-hub.conf`](../deploy/nginx/nvidia-ai-hub.conf).

## 8. Reverse proxy với Caddy

Caddy là một lựa chọn tốt khi bạn muốn cấu hình đơn giản hơn và TLS tự động trong các môi trường có DNS hợp lệ và truy cập vào được.

Ví dụ `Caddyfile`:

```caddy
ai-hub.example.internal {
    reverse_proxy 127.0.0.1:9000
}
```

Tải lại Caddy sau khi cập nhật tệp.

Bạn cũng có thể bắt đầu từ tệp ví dụ được theo dõi tại [`../deploy/caddy/Caddyfile`](../deploy/caddy/Caddyfile).

Nếu triển khai chỉ dùng nội bộ và không phù hợp để cấp certificate công khai, hãy dùng PKI nội bộ của bạn hoặc kết thúc TLS bằng hạ tầng hiện có.

## 9. Hướng dẫn về TLS

Nếu service có thể truy cập được bởi người dùng khác, hãy ưu tiên HTTPS.

Cách tiếp cận được khuyến nghị:

- giữ `uvicorn` bind vào localhost hoặc một interface nội bộ khi có thể
- kết thúc TLS tại Nginx, Caddy hoặc một load balancer hiện có
- dùng certificate đáng tin cậy từ public CA hoặc internal CA của bạn

Tránh expose tiến trình `uvicorn` thô trực tiếp ra internet công khai trừ khi bạn đã xử lý riêng TLS, kiểm soát truy cập, logging và chính sách mạng.

## 10. Hướng dẫn expose trong LAN và ra công khai

### Triển khai chỉ trong LAN

Phù hợp với:

- máy trạm (workstation)
- hệ thống phòng thí nghiệm
- môi trường nhóm riêng tư

Các kiểm soát tối thiểu được khuyến nghị:

- chỉ dùng mạng cục bộ đáng tin cậy
- quy tắc firewall trên máy chủ hạn chế các cổng vào
- reverse proxy phía trước ứng dụng
- rà soát rõ ràng các service do recipe expose và các cổng được map

### Triển khai công khai hoặc truy cập được từ internet

Hãy thận trọng tối đa.

Các kỳ vọng tối thiểu:

- reverse proxy với HTTPS
- hạn chế firewall
- quản lý DNS và certificate có kiểm soát
- kỷ luật vá lỗi cho máy chủ
- bảo trì Docker và NVIDIA runtime
- rà soát kỹ hành vi của recipe trước khi expose bất kỳ service nào do recipe quản lý ra bên ngoài

Nhiều recipe expose các cổng ứng dụng riêng và có thể có cơ chế xác thực, tải model hoặc hành vi mạng riêng. Hãy rà soát từng recipe trước khi expose công khai.

## 11. Ghi chú về bảo mật và vận hành

- Giữ Python, Node.js, Docker và các gói của hệ điều hành được cập nhật.
- Rà soát các tệp môi trường của recipe trước khi khởi động service.
- Không lưu secret trong các tệp `.env.example` đã commit.
- Giữ log của ứng dụng chính và reverse proxy sẵn sàng để xử lý sự cố.
- Xác nhận `frontend/dist` là bản mới nhất sau các thay đổi frontend.
- Chạy lại `./check.sh` sau các thay đổi lớn về máy chủ hoặc dependency.

## 12. Danh sách kiểm tra xác nhận production đề xuất

Trước khi tuyên bố một triển khai đã sẵn sàng, hãy ghi lại bằng chứng cho:

- `npm run lint`
- `npm run build`
- `python -m compileall daemon`
- khởi động foreground với `uvicorn`
- `./check.sh`
- `docker info`
- `nvidia-smi`
- kiểm tra nhanh Docker có bật GPU
- kiểm tra cấu hình reverse proxy, chẳng hạn `nginx -t`, khi áp dụng được
- kiểm tra có mục tiêu cho các recipe đã thay đổi hoặc có rủi ro cao

Nếu một bước xác nhận không được thực hiện, hãy ghi rõ điều đó cùng với rủi ro vận hành còn lại.

Khi hướng dẫn production thay đổi, hãy cùng xem lại `README.md`, `docs/installation.md`, `docs/local-development.md` và `SUPPORT.md` để ranh giới hỗ trợ, lệnh và kỳ vọng của người rà soát luôn nhất quán.
