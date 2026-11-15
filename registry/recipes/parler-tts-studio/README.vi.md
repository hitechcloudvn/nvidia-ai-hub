> [English](README.md) | **Tiếng Việt**

# Parler TTS Studio

Studio tạo giọng nói Parler-TTS cục bộ cho GPU NVIDIA.

## Những gì gói này cung cấp

- Giao diện Gradio trên cổng `7882`
- Tạo giọng nói từ văn bản có thể điều khiển bằng prompt
- Các preset kiểu giọng nói (speaker-style) tích hợp sẵn
- Mô tả giọng nói tự do tùy chỉnh
- Cache Hugging Face bền vững và thư mục xuất WAV

## Truy cập mặc định

- Giao diện: `http://localhost:7882`

## Cách hoạt động

Parler-TTS sử dụng hai đầu vào văn bản:

- nội dung lời nói cần nói
- một mô tả bằng ngôn ngữ tự nhiên về kiểu giọng nói, chất lượng bản ghi và cách thể hiện

Recipe này cho phép bạn bắt đầu với các preset được tuyển chọn hoặc ghi đè chúng bằng mô tả giọng nói tùy chỉnh của riêng bạn.

## Ghi chú

Lần khởi động đầu tiên tải checkpoint Parler-TTS đã cấu hình vào thư mục cache bền vững. Checkpoint lớn hơn cải thiện chất lượng nhưng tăng mức sử dụng bộ nhớ và thời gian khởi động.
