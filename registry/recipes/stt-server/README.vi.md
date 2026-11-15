> [English](README.md) | **Tiếng Việt**

# STT Server

Máy chủ API Faster-Whisper cục bộ cho GPU NVIDIA.

## Những gì gói này cung cấp

- Endpoint speech-to-text FastAPI trên cổng `7880`
- Tài liệu OpenAPI tại `http://localhost:7880/docs`
- Dấu thời gian theo từ, lọc VAD và chế độ dịch thuật
- Cache Hugging Face / mô hình bền vững và thư mục xuất bản ghi JSON

## Endpoint mặc định

- `GET /health`
- `POST /transcribe`
- `GET /docs`

## Trường yêu cầu

`POST /transcribe` chấp nhận dữ liệu form multipart:

- `audio`: tệp âm thanh hoặc video được tải lên
- `task`: `transcribe` hoặc `translate`
- `language`: mã ngôn ngữ tùy chọn
- `beam_size`: kích thước beam giải mã
- `word_timestamps`: bao gồm thời gian theo từng từ
- `vad_filter`: bật tiền xử lý VAD
- `initial_prompt`: gợi ý miền tùy chọn

## Ví dụ phản hồi

Trả về JSON với:

- ngôn ngữ được phát hiện
- độ tin cậy
- văn bản bản ghi đầy đủ
- thời gian theo từng đoạn
- thời gian theo từng từ tùy chọn
- đường dẫn JSON đã lưu trong `/data/output`

## Ghi chú

Yêu cầu đầu tiên tải mô hình Faster-Whisper đã cấu hình vào thư mục cache bền vững. Mô hình lớn hơn cải thiện độ chính xác nhưng tăng thời gian khởi động, mức sử dụng bộ nhớ GPU và dung lượng đĩa.
