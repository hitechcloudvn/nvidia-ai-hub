> [English](README.md) | **Tiếng Việt**

# Chatbot Đa Agent trên GPU NVIDIA

Recipe này chuyển thể playbook GPU NVIDIA `multi-agent-chatbot` cho NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC. Nó khởi động một stack cục bộ đầy đủ với:

- Frontend Next.js trên cổng `3000`
- Backend FastAPI trên cổng `8000`
- Lưu trữ hội thoại PostgreSQL
- Truy vấn vector Milvus với etcd và MinIO
- Các dịch vụ mô hình supervisor, coding, embedding và vision phục vụ trên GPU

## Những gì NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC thay đổi

Thay vì yêu cầu clone thủ công `NVIDIA/dgx-spark-playbooks`, recipe này build các image upstream trực tiếp từ Git và lưu dữ liệu runtime bền vững trong `registry/recipes/multi-agent-chatbot/data/`.

Lần khởi động đầu tiên khá nặng:

- build image có thể mất 10 đến 20 phút
- tải mô hình có thể mất 30 đến 120 phút tùy tốc độ mạng
- mức sử dụng bộ nhớ mặc định khoảng `114` đến `120 GB`

## Truy cập

Sau khi stack trở nên healthy, hãy mở:

- `http://<NVIDIA_AI_HUB_IP>:3000` cho giao diện chatbot
- `http://<NVIDIA_AI_HUB_IP>:8000` cho API backend

Nếu bạn kết nối qua SSH, hãy chuyển tiếp cả hai cổng:

- `3000`
- `8000`

## Cấu hình

Sử dụng tab `Configuration` của recipe để chỉnh sửa:

- `docker-compose.yml` cho cấu trúc dịch vụ hoặc thay đổi mô hình
- `.env` cho cổng, thông tin xác thực và URL tải xuống

### Hồ sơ Supervisor

Biến runtime env hiển thị `COMPOSE_PROFILES` để bạn có thể chọn giữa hai stack supervisor mà không cần viết lại tệp compose:

- `full` → `gpt-oss-120b` mặc định
- `lightweight` → `gpt-oss-20b` tùy chọn

Khi chuyển hồ sơ, cũng cần giữ `CHATBOT_MODELS` khớp với tên container đã chọn:

- `COMPOSE_PROFILES=full` với `CHATBOT_MODELS=gpt-oss-120b`
- `COMPOSE_PROFILES=lightweight` với `CHATBOT_MODELS=gpt-oss-20b`

## Stack mô hình mặc định

Tệp compose theo bố cục playbook mặc định của NVIDIA:

- `gpt-oss-120b` làm mô hình supervisor
- `deepseek-coder-6.7b-instruct` cho các tác vụ coding
- `Qwen3-Embedding-4B` cho embedding
- `Qwen2-VL-7B-Instruct` cho hiểu hình ảnh

## Ghi chú vận hành

- Backend không còn chờ mọi container mô hình trở nên healthy trước khi khởi động, giúp tránh các lần khởi động bị treo trong khi các dịch vụ mô hình lớn đang khởi động.
- Các dịch vụ mô hình `qwen2.5-vl` và llama.cpp dùng thời gian ân hạn kiểm tra sức khỏe dài hơn vì lần khởi động đầu tiên có thể mất vài phút.
- Các tệp GGUF đã tải được cache trong `registry/recipes/multi-agent-chatbot/data/models/`.
- Nếu supervisor mặc định quá lớn, hãy chuyển sang hồ sơ `lightweight` và cập nhật `CHATBOT_MODELS` thành `gpt-oss-20b`.
- Dừng recipe sẽ giữ nguyên các mô hình đã tải và lịch sử chat. Chỉ xóa dữ liệu nếu bạn muốn reset hoàn toàn.
