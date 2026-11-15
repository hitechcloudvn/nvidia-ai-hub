> [English](README.md) | **Tiếng Việt**

# WhisperX Workstation

Trạm làm việc chuyển lời nói thành văn bản WhisperX cục bộ cho GPU NVIDIA.

## Những gì gói này cung cấp

- Giao diện Gradio trên cổng `7881`
- Chuyển lời nói thành văn bản Whisper theo lô
- Căn chỉnh tùy chọn để có timestamp tốt hơn
- Phân biệt người nói tùy chọn
- Xuất ra `JSON`, `TXT` và `SRT`
- Cache Hugging Face bền vững và các bản ghi đầu ra được lưu

## Ghi chú quan trọng

- Phân biệt người nói yêu cầu Hugging Face token và quyền truy cập mô hình bị giới hạn cho mô hình phân biệt người nói `pyannote`.
- Các mô hình WhisperX lớn hơn cải thiện độ chính xác nhưng dùng nhiều bộ nhớ GPU và dung lượng đĩa hơn.
- Tính khả dụng của mô hình căn chỉnh thay đổi tùy theo ngôn ngữ.

## Truy cập mặc định

- Giao diện: `http://localhost:7881`

## Đầu ra

Mỗi lần chạy lưu trữ:

- bản ghi JSON có cấu trúc
- bản ghi văn bản thuần
- tệp SRT sẵn sàng làm phụ đề

dưới thư mục đầu ra bền vững được mount tại `./data/output`.
