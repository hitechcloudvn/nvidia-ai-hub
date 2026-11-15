> [English](local-development.md) | **Tiếng Việt**

# Hướng dẫn phát triển local

Hướng dẫn này là nguồn chuẩn cho thiết lập của người đóng góp, phát triển từ mã nguồn và kiểm tra cục bộ.

Dùng tài liệu này cho:

- phát triển backend trong `daemon/`
- phát triển frontend trong `frontend/`
- thiết lập từ mã nguồn cục bộ trên Linux, Windows và macOS
- kiểm tra build theo phong cách production trước khi gửi thay đổi

Để được hướng dẫn cài đặt và vận hành, dùng [`installation.md`](./installation.vi.md). Để được hướng dẫn service và reverse proxy trên Linux, dùng [`deployment-production.md`](./deployment-production.vi.md).

## 1. Ma trận hỗ trợ phát triển

| Kịch bản | Linux | Windows | macOS |
|---|---|---|---|
| Phát triển frontend | Được hỗ trợ | Được hỗ trợ | Được hỗ trợ |
| Phát triển backend API | Được hỗ trợ | Được hỗ trợ | Được hỗ trợ |
| Chạy local từ mã nguồn theo phong cách production | Được hỗ trợ | Được hỗ trợ với lệnh thủ công | Được hỗ trợ |
| Trình cài đặt nhanh `install.sh` | Được hỗ trợ | Không hỗ trợ | Không hỗ trợ |
| Kiểm tra recipe GPU local đầy đủ | Được hỗ trợ trên các máy chủ NVIDIA GPU tương thích | Hạn chế | Không hỗ trợ |

## 2. Công cụ bắt buộc

Cài đặt và xác minh:

- `git`
- Python `3.11+`
- Node.js `22+`
- `npm`
- Docker Engine hoặc Docker Desktop

Tùy chọn cho việc kiểm tra GPU trên Linux:

- NVIDIA GPU driver
- NVIDIA Container Toolkit hoặc tích hợp runtime tương đương
- `nvidia-smi`

## 3. Chuẩn bị kho lưu trữ

### Linux / macOS

```bash
cp .env.example .env
python3 -m venv .venv
. .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
cd frontend
npm install
cd ..
```

### Windows PowerShell

```powershell
Copy-Item .env.example .env
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
Set-Location frontend
npm install
Set-Location ..
```

## 4. Chạy backend để phát triển

### Linux / macOS

```bash
. .venv/bin/activate
python -m uvicorn daemon.main:app --reload --host 127.0.0.1 --port 9000
```

### Windows PowerShell

```powershell
.\.venv\Scripts\python.exe -m uvicorn daemon.main:app --reload --host 127.0.0.1 --port 9000
```

URL backend:

- `http://127.0.0.1:9000`

## 5. Chạy frontend development server

Trong terminal thứ hai:

```bash
cd frontend
npm run dev
```

URL frontend:

- `http://localhost:5173`

Vite development server proxy các lệnh gọi API của ứng dụng sang backend.

## 6. Kiểm tra build production

Ứng dụng production được phục vụ từ `frontend/dist`. Trước khi gửi các thay đổi frontend hoặc thay đổi tích hợp backend/frontend, hãy chạy:

```bash
cd frontend
npm run lint
npm run build
```

Sau đó xác minh build được backend phục vụ:

1. khởi động backend
2. mở `http://127.0.0.1:9000`
3. xác nhận UI tải từ các asset đã build
4. xác nhận `GET /api/recipes` phản hồi thành công

## 7. Kiểm tra được khuyến nghị theo loại thay đổi

### Thay đổi frontend

- `npm run lint`
- `npm run build`
- ghi chú xác minh thủ công ngắn gọn cho luồng đã thay đổi

### Thay đổi backend

- `python -m compileall daemon`
- khởi động backend nếu có thể
- kiểm tra các đường dẫn API bị ảnh hưởng hoặc hành vi khi khởi động

### Thay đổi script

- ghi lại hệ điều hành và shell đã sử dụng
- nêu rõ khi hành vi chỉ dành cho Linux được rà soát tĩnh thay vì thực thi

### Thay đổi recipe

- xác định chính xác các recipe slug đã chạm vào
- ghi lại việc kiểm tra là kiểm thử nhanh (smoke test) hay chỉ kiểm tra metadata

## 8. Docker và kiểm tra GPU

Docker là bắt buộc cho việc kiểm thử vòng đời recipe. Việc kiểm tra GPU nên được thực hiện trên một máy chủ NVIDIA Linux được hỗ trợ.

Các kiểm tra cơ bản:

```bash
docker --version
docker info
```

Các kiểm tra NVIDIA trên Linux:

```bash
nvidia-smi
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

Nếu việc kiểm tra GPU runtime không khả dụng trong môi trường hiện tại, hãy nêu rõ điều đó trong ghi chú kiểm tra.

## 9. Các script hỗ trợ

Các script ở thư mục gốc kho lưu trữ:

- `./check.sh` — kiểm tra môi trường và dependency cho các môi trường shell
- `./run.sh` — chạy từ mã nguồn cục bộ có hỗ trợ `.env` được ghi lại
- `./install.sh` — trình cài đặt Linux cho các môi trường dựa trên `apt`
- `./uninstall.sh` — script hỗ trợ gỡ cài đặt trên Linux

Ranh giới quan trọng:

- không có `install.ps1`, `run.ps1` hoặc `check.ps1` trong kho lưu trữ này
- người đóng góp trên Windows nên dùng các lệnh PowerShell trực tiếp thay thế
- `check.sh` có thể cho kết quả gây hiểu nhầm trong các ngữ cảnh Windows

## 10. Cấu hình dùng chung

Cấu hình cục bộ nằm trong tệp `.env` ở thư mục gốc kho lưu trữ.

Các khóa thông dụng:

- `NVIDIA_AI_HUB_HOST`
- `NVIDIA_AI_HUB_PORT`
- `NVIDIA_AI_HUB_DB_PATH`
- `NVIDIA_AI_HUB_DATA_DIR`
- `NVIDIA_AI_HUB_REGISTRY_PATH`

Không commit secret, thông tin xác thực hoặc endpoint riêng của từng máy.

## 11. Các vấn đề thường gặp

### Trang trắng hoặc thiếu style từ URL backend

Nguyên nhân: `frontend/dist` bị thiếu hoặc lỗi thời.

Cách sửa:

```bash
cd frontend
npm run build
```

Sau đó khởi động lại backend.

### `python -m venv .venv` thất bại

Cài đặt hỗ trợ venv của Python.

Ví dụ trên Debian hoặc Ubuntu:

```bash
sudo apt-get install python3-venv
```

### Docker daemon không khả dụng

Khởi động Docker Desktop hoặc Docker service, sau đó thử lại `docker info`.

### Thiếu chỉ số GPU

Một số tính năng giám sát phụ thuộc vào `nvidia-smi` hoặc các công cụ GPU riêng của máy chủ. Nếu các công cụ đó vắng mặt, telemetry GPU có thể không đầy đủ.

## 12. Kỳ vọng khi gửi thay đổi

Trước khi mở một pull request:

- giữ thay đổi trong phạm vi hẹp
- cập nhật tài liệu khi hành vi thay đổi
- ghi lại bằng chứng kiểm tra cụ thể
- nêu rõ mọi hành vi runtime chưa được kiểm thử hoặc giới hạn nền tảng

Dùng [`../CONTRIBUTING.md`](../CONTRIBUTING.vi.md) để biết chính sách kho lưu trữ và kỳ vọng về pull request.

Bằng chứng kiểm tra điển hình cho các thay đổi hướng tới phát triển có thể gồm:

- `npm run build`
- `python -m compileall daemon`
- kiểm tra nhanh nạp recipe:
   - `python -c "from daemon.services.registry_service import load_recipes; print(len(load_recipes()))"`
- `docker compose config -q` có mục tiêu cho các recipe đã thay đổi

Nếu bạn đã thay đổi các tài liệu về cài đặt, runtime, người đóng góp hoặc lộ trình, hãy xác nhận các lệnh và ranh giới hỗ trợ vẫn khớp với bố cục kho lưu trữ hiện tại, các nền tảng được hỗ trợ và các tài liệu kế hoạch đang hoạt động.
