> [English](README.md) | **Tiếng Việt**

# CosyVoice Studio

Chạy web demo CosyVoice chính thức trên NVIDIA GPU cục bộ.

## Những gì công thức này cung cấp

- Web demo Gradio chính thức trên cổng `7884`
- TTS đa ngôn ngữ
- Nhân bản giọng nói zero-shot từ audio prompt ngắn
- Tổng hợp liên ngôn ngữ
- Kiều khiển giọng nói kiểu instruct
- Cache Hugging Face và ModelScope bền vững

## Truy cập mặc định

- Giao diện: `http://localhost:7884`

## Ghi chú

Công thức này khởi chạy quy trình `webui.py` của upstream và mặc định dùng model `Fun-CosyVoice3-0.5B-2512`.

Lần khởi chạy đầu có thể mất một lúc vì checkpoint được chọn và các tài sản hỗ trợ được tải vào thư mục cache được mount.

Dự án upstream ghi nhận các tài nguyên `ttsfrd` tùy chọn để cải thiện chuẩn hóa văn bản. Công thức này không cài sẵn các tài sản tùy chọn đó, nên các đường dẫn chuẩn hóa dự phòng có thể được sử dụng.

## Ghi chú rủi ro

CosyVoice có bề mặt suy luận rộng, bao gồm nhân bản zero-shot và tổng hợp liên ngôn ngữ. Người rà soát nên coi audio prompt được tải lên là dữ liệu nhạy cảm và xác nhận sự phù hợp của model/giấy phép cho mục đích sản xuất.
