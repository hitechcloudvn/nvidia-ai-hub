> [English](installation.md) | **Tiếng Việt**

# Hướng dẫn cài đặt và triển khai

Hướng dẫn này giải thích cách cài đặt và vận hành NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC trên các môi trường Linux, Windows và macOS.

Tài liệu phân biệt:

- **triển khai production được hỗ trợ** trên các máy chủ Linux NVIDIA GPU
- **thiết lập máy trạm (workstation) cho nhà phát triển** trên Windows và macOS
- **triển khai từ mã nguồn dựa trên PM2 tùy chọn** cho persistence nhẹ

Với quy trình lập code hằng ngày, xem [`docs/local-development.md`](./local-development.vi.md).

Với bố cục service theo phong cách production trên Linux, các mẫu reverse proxy, ghi chú TLS và hướng dẫn expose trong LAN/ra công khai, xem [`docs/deployment-production.md`](./deployment-production.vi.md).

Với các tệp ví dụ triển khai được theo dõi trong kho có thể điều chỉnh cục bộ, xem thư mục `deploy/` ở thư mục gốc của kho lưu trữ.

Với định hướng sản phẩm, các ưu tiên thực thi theo giai đoạn và kế hoạch mở rộng registry, hãy xem các tài liệu kế hoạch được theo dõi trong `planning/`, đặc biệt là [`../planning/development-execution-plan.md`](../planning/development-execution-plan.vi.md) và [`../planning/registry-expansion-roadmap.md`](../planning/registry-expansion-roadmap.vi.md).

Với các điều khoản pháp lý, nhãn hiệu và sử dụng thương mại mang tính kiểm soát, hãy xem [`../LICENSE`](../LICENSE), [`../COMMERCIAL-LICENSE.md`](../COMMERCIAL-LICENSE.vi.md), [`../NOTICE`](../NOTICE), [`./licensing.md`](./licensing.vi.md) và [`./legal-notice.md`](./legal-notice.vi.md).

## 1. Tóm tắt hỗ trợ nền tảng

| Nền tảng | Phát triển từ mã nguồn | Trình cài đặt nhanh | Chạy recipe GPU local đầy đủ | Khuyến nghị sử dụng |
|----------|--------------------|-----------------|-------------------------------|-----------------|
| Linux | Được hỗ trợ | Được hỗ trợ | Được hỗ trợ trên các máy chủ NVIDIA GPU tương thích | Nền tảng triển khai và kiểm tra chính |
| Windows | Được hỗ trợ | Không hỗ trợ | Hạn chế cho triển khai NVIDIA GPU local | Máy trạm phát triển, công việc UI/API |
| macOS | Được hỗ trợ | Không hỗ trợ | Không hỗ trợ | Máy trạm phát triển, công việc UI/API |

## 2. Yêu cầu phần mềm cốt lõi

### Bắt buộc cho phát triển

- Git
- Python `3.11+`
- Node.js `22+`
- `npm`
- Docker Engine hoặc Docker Desktop

### Bắt buộc cho triển khai GPU đầy đủ trên Linux

- Máy chủ Linux được hỗ trợ
- NVIDIA GPU được hỗ trợ
- NVIDIA GPU driver đã cài đặt
- Docker Engine
- NVIDIA Container Toolkit hoặc tích hợp NVIDIA runtime tương đương
- `nvidia-smi` khả dụng trên máy chủ

### Tùy chọn

- `pm2` để quản lý tiến trình từ mã nguồn có persistence
- reverse proxy như Nginx, Caddy hoặc Traefik cho các triển khai được expose

## Ranh giới pháp lý và thương mại

`NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` là một giải pháp phần mềm được phát triển và phân phối bởi **Pho Tue SoftWare And Technology Solutions Joint Stock Company**.

Hãy ghi nhớ các ranh giới pháp lý sau khi cài đặt, đánh giá, tài liệu hóa hoặc triển khai kho lưu trữ:

- các tham chiếu đến `NVIDIA`, `DGX`, `CUDA` và các công nghệ NVIDIA liên quan chỉ mang tính mô tả và không ngụ ý tài trợ, chứng thực, chứng nhận hay chấp thuận;
- tên viết tắt `NVIDIA AI Hub` và tên đầy đủ `NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` chỉ cùng một giải pháp phần mềm, trừ khi một văn bản kiểm soát có quy định khác; và
- việc sử dụng kho lưu trữ vẫn tuân theo mô hình cấp phép phi thương mại, trừ khi đã được cấp quyền thương mại bằng văn bản riêng.

Nếu việc cài đặt hoặc triển khai của bạn gắn với việc bàn giao có trả phí, dịch vụ quản lý (managed service), triển khai cho khách hàng, bán lại, thương mại hóa qua hosting hoặc hoạt động tạo doanh thu khác, hãy xem [`../COMMERCIAL-LICENSE.md`](../COMMERCIAL-LICENSE.vi.md) trước khi tiến hành.

## 3. Triển khai trên Linux

Linux là nền tảng duy nhất được tài liệu hóa cho triển khai local đầy đủ, thực thi recipe trên GPU và trình cài đặt một lệnh.

### 3.1 Hồ sơ máy chủ khuyến nghị

- Môi trường Linux Ubuntu hoặc dựa trên Debian có `apt-get`
- Docker Engine đã cài đặt hoặc có thể cài đặt
- NVIDIA driver đã hoạt động với `nvidia-smi`
- NVIDIA Container Toolkit được cấu hình cho truy cập GPU qua Docker
- truy cập internet trong quá trình cài đặt ban đầu
- quyền sudo

### 3.2 Kiểm tra máy chủ trước khi cài đặt

```bash
python3 --version
node --version
npm --version
docker --version
docker info
nvidia-smi
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

Kết quả mong đợi:

- các lệnh Python, Node.js, npm và Docker phản hồi thành công
- `nvidia-smi` báo cáo GPU đã cài đặt
- bài kiểm tra Docker có bật GPU có thể truy cập được GPU

### 3.3 Cài đặt nhanh trên Linux

Kho lưu trữ đi kèm một trình cài đặt có định kiến (opinionated) cho các hệ thống Linux dựa trên `apt`:

```bash
curl -fsSL https://raw.githubusercontent.com/hitechcloudvn/nvidia-ai-hub/main/install.sh | bash
```

Các flag tùy chọn:

```bash
curl -fsSL https://raw.githubusercontent.com/hitechcloudvn/nvidia-ai-hub/main/install.sh | bash -s -- --no-start
curl -fsSL https://raw.githubusercontent.com/hitechcloudvn/nvidia-ai-hub/main/install.sh | bash -s -- --host 127.0.0.1 --port 9010
```

Trình cài đặt hiện đang làm gì:

- cài đặt `git` nếu thiếu
- cài đặt `python3`, `python3-venv` và `pip` nếu thiếu
- cài đặt Docker Engine nếu thiếu
- cài đặt Node.js `22.x` nếu phiên bản `node` hiện tại bị thiếu hoặc quá cũ cho build frontend
- clone hoặc cập nhật kho lưu trữ vào `$HOME/nvidia-ai-hub`
- tạo `.venv`
- cài đặt dependency backend
- cài đặt dependency frontend
- build `frontend/dist`
- tạo `.env` từ `.env.example` khi cần
- ghi `NVIDIA_AI_HUB_HOST` và `NVIDIA_AI_HUB_PORT` vào `.env` ở thư mục gốc
- khởi động ứng dụng qua `./run.sh` trừ khi dùng `--no-start`

Các giới hạn quan trọng:

- trình cài đặt hiện tại được viết cho môi trường shell Linux
- trình cài đặt được thiết kế xoay quanh `apt-get`
- trình cài đặt hiện không cài đặt NVIDIA driver hoặc NVIDIA Container Toolkit cho bạn
- các điều kiện tiên quyết về GPU runtime phải được cấu hình sẵn trên máy chủ
- trình cài đặt chưa được chạy end-to-end trong workspace Windows này; việc kiểm tra shell Linux vẫn là nhiệm vụ của người rà soát
- các thay đổi về hành vi trình cài đặt cần được đồng bộ với `README.md`, `docs/local-development.md`, `docs/deployment-production.md`, `SUPPORT.md` và các tài liệu kế hoạch liên quan khi kỳ vọng triển khai thay đổi

### 3.4 Cài đặt Linux thủ công từ một bản clone

```bash
git clone https://github.com/hitechcloudvn/nvidia-ai-hub.git
cd nvidia-ai-hub
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

Mở:

- `http://localhost:9000`
- hoặc `http://<your-host-ip>:9000`

### 3.5 Kiểm tra môi trường Linux

Kho lưu trữ bao gồm:

```bash
./check.sh
```

Lệnh này kiểm tra:

- Python khả dụng
- hỗ trợ venv
- pip
- trạng thái frontend bundle
- Node.js và npm khi cần build lại
- Docker CLI và khả năng kết nối daemon
- các tệp quan trọng của kho lưu trữ
- tính khả dụng của cổng service đã cấu hình

`run.sh` hỗ trợ:

- `--host <bind-address>`
- `--port <bind-port>`

Nếu không có giá trị override nào được cung cấp, lệnh sẽ đọc `NVIDIA_AI_HUB_HOST` và `NVIDIA_AI_HUB_PORT` từ tệp `.env` ở thư mục gốc.

### 3.6 Triển khai PM2 tùy chọn trên Linux

PM2 là tùy chọn và có thể dùng khi bạn muốn một tiến trình persistent nhẹ mà không cần thiết lập systemd.

Cài đặt PM2:

```bash
npm install -g pm2
```

Khởi động API:

```bash
cd ~/nvidia-ai-hub
pm2 start ./run.sh --name nvidia-ai-hub -- --host 0.0.0.0 --port 9000
pm2 save
```

Các lệnh thông dụng:

```bash
pm2 status
pm2 logs nvidia-ai-hub
pm2 restart nvidia-ai-hub
pm2 stop nvidia-ai-hub
```

Chỉ dùng PM2 sau khi đã xác nhận ứng dụng khởi động đúng với lệnh foreground thông thường.

## 4. Thiết lập Windows

Windows được tài liệu hóa như một môi trường phát triển, không phải đích triển khai GPU local đầy đủ chính.

### 4.1 Cài đặt điều kiện tiên quyết

Cài đặt thủ công:

- Git for Windows
- Python `3.11+`
- Node.js `22+`
- Docker Desktop

Tùy chọn:

- WSL2 để có công cụ giống Linux
- PM2 để giám sát tiến trình cục bộ

### 4.2 Chuẩn bị một bản checkout để phát triển

Trong PowerShell:

```powershell
git clone https://github.com/hitechcloudvn/nvidia-ai-hub.git
Set-Location nvidia-ai-hub
Copy-Item .env.example .env
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Set-Location frontend
npm install
npm run build
Set-Location ..
.\.venv\Scripts\python.exe -m uvicorn daemon.main:app --host 127.0.0.1 --port 9000
```

### 4.3 Các giới hạn trên Windows

- Không có `install.ps1` gốc Windows trong kho lưu trữ này.
- Không có `run.ps1` hoặc `check.ps1` gốc Windows trong kho lưu trữ này.
- Các script hỗ trợ như `install.sh`, `run.sh` và `check.sh` được thiết kế cho Linux.
- Việc kiểm tra recipe GPU NVIDIA đầy đủ nên được thực hiện trên Linux.

### 4.4 PM2 tùy chọn trên Windows

Nếu bạn muốn một tiến trình cục bộ có giám sát:

```powershell
npm install -g pm2
pm2 start ".\.venv\Scripts\python.exe -m uvicorn daemon.main:app --host 127.0.0.1 --port 9000" --name nvidia-ai-hub
pm2 status
```

Chỉ dùng cách này vì sự tiện lợi cục bộ. Nó không thay đổi ranh giới hỗ trợ nền tảng cho các workload dùng GPU.

## 5. Thiết lập macOS

macOS được tài liệu hóa như một môi trường phát triển cho frontend, backend và công việc tài liệu.

### 5.1 Cài đặt điều kiện tiên quyết

Cài đặt thủ công:

- Git
- Python `3.11+`
- Node.js `22+`
- Docker Desktop

Tùy chọn:

- Homebrew
- PM2

### 5.2 Chuẩn bị một bản checkout để phát triển

```bash
git clone https://github.com/hitechcloudvn/nvidia-ai-hub.git
cd nvidia-ai-hub
cp .env.example .env
python3 -m venv .venv
. .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
cd frontend
npm install
npm run build
cd ..
python -m uvicorn daemon.main:app --host 127.0.0.1 --port 9000
```

### 5.3 Các giới hạn trên macOS

- Việc chạy container NVIDIA GPU local không được hỗ trợ trên macOS.
- Việc kiểm tra recipe phụ thuộc NVIDIA runtime hoặc `nvidia-smi` nên được hoàn tất trên Linux.
- Trình cài đặt nhanh không được thiết kế cho macOS.

## 6. Hướng dẫn về Docker, driver và NVIDIA runtime

### Docker

Dùng Docker Engine trên Linux hoặc Docker Desktop trên Windows/macOS.

Các kiểm tra tối thiểu:

```bash
docker --version
docker info
```

### NVIDIA driver

Để thực thi recipe trên GPU tại Linux, driver của máy chủ phải được cài đặt và hoạt động sẵn.

Kiểm tra:

```bash
nvidia-smi
```

### NVIDIA Container Toolkit

Để dùng container có GPU trên Linux, hãy đảm bảo Docker có thể truy cập GPU.

Ví dụ kiểm tra:

```bash
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

Nếu lệnh này thất bại, hãy xử lý cấu hình driver hoặc toolkit trước khi kiểm tra recipe.

## 7. Hướng dẫn về Python và Node.js

### Python

- Dùng Python `3.11+`
- Ưu tiên môi trường ảo cách ly với `.venv`
- Cài đặt dependency backend từ `requirements.txt`

### Node.js

- Dùng Node.js `22+`
- Cài đặt dependency frontend từ `frontend/package.json`
- Chạy `npm run lint` và `npm run build` trước khi gộp các thay đổi frontend

## 8. Ghi chú vận hành

### URL mặc định

- UI: `http://localhost:9000`
- API root: `http://localhost:9000`

### Cấu hình dùng chung

Kho lưu trữ dùng một tệp `.env` dùng chung ở thư mục gốc với các giá trị như:

- `NVIDIA_AI_HUB_HOST`
- `NVIDIA_AI_HUB_PORT`
- `NVIDIA_AI_HUB_NODE_MAJOR`
- `NVIDIA_AI_HUB_REGISTRY_PATH`
- `NVIDIA_AI_HUB_DATA_DIR`
- `NVIDIA_AI_HUB_DB_PATH`

### Gỡ cài đặt

Gỡ cài đặt từ mã nguồn trên Linux:

```bash
./uninstall.sh
```

Gỡ cài đặt nhưng giữ lại dữ liệu:

```bash
./uninstall.sh --keep-data
```

Lưu ý:

- Kho lưu trữ hiện có `uninstall.sh`.
- `uninstall.ps1` gốc Windows không có trong workspace này và không nên được nhắc đến như một lệnh khả dụng.

## 9. Danh sách kiểm tra xác nhận triển khai

Với các thay đổi về tài liệu triển khai Linux hoặc thay đổi vận hành, hãy ghi lại các bước xác nhận như:

- `npm run lint`
- `npm run build`
- `python -m compileall daemon`
- khởi động backend với `uvicorn`
- `./check.sh`
- `docker info`
- `nvidia-smi` trên các máy chủ có GPU
- `docker compose config -q` có mục tiêu cho các recipe đã thay đổi

Nếu một bước không được chạy trên máy hiện tại, hãy ghi rõ điều đó và giải thích rủi ro đối với người rà soát.
