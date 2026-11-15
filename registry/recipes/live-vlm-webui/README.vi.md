> [English](README.md) | **Tiếng Việt**

# Live VLM WebUI trên NVIDIA GPU

Live VLM WebUI cung cấp giao diện webcam và WebRTC thời gian thực cho các model vision-language trên NVIDIA GPU. Công thức NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC này chạy container NVIDIA chính thức, mở giao diện HTTPS trên cổng `8090` và mặc định dùng backend cục bộ tương thích Ollama.

## Truy cập

Sau khi khởi chạy, mở:

- `https://<NVIDIA_AI_HUB_IP>:8090`

Trình duyệt của bạn sẽ cảnh báo về chứng chỉ tự ký khi truy cập lần đầu. Chấp nhận chứng chỉ để bật quyền webcam.

## Backend mặc định

Công thức bắt đầu với các giá trị mặc định sau:

- `LIVE_VLM_API_BASE=http://localhost:11434/v1`
- `LIVE_VLM_DEFAULT_MODEL=llama3.2-vision:11b`
- `LIVE_VLM_PROCESS_EVERY=30`

Vì container dùng host networking, `localhost` phân giải tới các dịch vụ NVIDIA GPU như Ollama.

## Cấu hình

Sửa `registry/recipes/live-vlm-webui/.env` từ chế độ xem cấu hình công thức nếu bạn cần:

- trỏ tới vLLM, SGLang, NIM hoặc endpoint đám mây
- đổi model mặc định
- giảm tốc độ xử lý khung hình để giảm mức dùng GPU/API
- chuyển giao diện sang cổng khác

## Ghi chú

- HTTPS là bắt buộc để truy cập webcam.
- WebRTC hoạt động tốt nhất khi người dùng kết nối trực tiếp tới IP NVIDIA GPU thay vì chuyển tiếp cổng SSH.
- Nếu không có backend cục bộ nào truy cập được, ứng dụng upstream vẫn có thể được cấu hình trong trình duyệt cho các API từ xa.
