> [English](README.md) | **Tiếng Việt**

# Live Transcription Hub

Chạy dịch vụ phiên âm thời gian thực cục bộ trên NVIDIA GPU với giao diện WebSocket kiểu Whisper và endpoint tải audio tương thích OpenAI.

## Những gì công thức này cung cấp

- Tài liệu OpenAPI trên cổng `7888`
- Endpoint kiểm tra sẵn sàng `GET /health`
- `POST /transcribe` cho tải lên multipart đơn giản
- `POST /v1/audio/transcriptions` cho yêu cầu tải lên tương thích OpenAI
- Endpoint WebSocket tại `ws://localhost:7888/` cho phiên âm trực tiếp với các thông điệp `SERVER_READY`, `WAIT`, `DISCONNECT`, `language` và `segments`
- Cache model Faster-Whisper bền vững và lưu trữ xử lý tạm thời qua các lần khởi động lại

## Truy cập mặc định

- Tài liệu API: `http://localhost:7888/docs`
- Health: `http://localhost:7888/health`
- Phiên âm tương thích OpenAI: `http://localhost:7888/v1/audio/transcriptions`
- WebSocket: `ws://localhost:7888/`

## Ghi chú giao thức WebSocket

Luồng WebSocket cố ý được định hình để giống các client WhisperLive:

1. Kết nối tới `ws://localhost:7888/`
2. Gửi một đối tượng JSON config với các trường như `uid`, `language`, `task`, `model`, `use_vad` và `send_last_n_segments`
3. Đợi thông điệp `SERVER_READY`
4. Truyền dữ liệu audio nhị phân rồi gửi `END_OF_AUDIO`
5. Nhận metadata ngôn ngữ được phát hiện và các đoạn bản ghi hoàn thành cuối cùng

Công thức này hiện xử lý mỗi phiên trực tiếp sau khi luồng thu kết thúc. Nó giữ hợp đồng thông điệp kiểu WhisperLive để tích hợp và kiểm thử cục bộ, nhưng chưa cung cấp cập nhật một phần tăng dần theo từng token.

## Ghi chú

Yêu cầu phiên âm đầu tải model Faster-Whisper được chọn vào `./data/hf-cache`.

Cài đặt mặc định ưu tiên model `small` nhẹ để khởi động nhanh hơn. Tăng `MODEL_SIZE` trong `.env` nếu cần độ chính xác cao hơn và bộ nhớ GPU cho phép.

Audio được tải lên và bản ghi được tạo có thể chứa dữ liệu nhạy cảm. Hãy rà soát các đường dẫn lưu trữ được mount trước khi chia sẻ hoặc lưu trữ chúng.

## Phạm vi kiểm chứng

Công thức này được thêm làm khung registry cho NVIDIA GPU. Việc kiểm chứng nên tập trung vào nạp công thức, cấu trúc YAML, sự hiện diện của tài sản Docker và kiểm tra nhanh các endpoint HTTP/WebSocket trong môi trường Docker Linux.

## Ghi chú giấy phép

- Dự án upstream WhisperLive được phát hành theo giấy phép `MIT`
- Khung scaffold cục bộ này dùng `faster-whisper`, nên cần được rà soát cùng điều khoản model triển khai trước khi sử dụng trong sản xuất

## Ghi chú rủi ro

Công thức này cho phép thu âm giọng nói trực tiếp và phiên âm. Hãy rà soát các yêu cầu về sự đồng ý, lưu giữ và công bố trước khi sử dụng với audio của người dùng hoặc khách hàng.

Hiện thực WebSocket hiện tại đệm một phiên trước khi phiên âm, nên người rà soát nên coi đây là một công thức khởi tạo tập trung vào tương thích thay vì một server streaming độ trễ thấp đã tối ưu hoàn toàn.
