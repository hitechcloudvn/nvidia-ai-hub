> [English](README.md) | **Tiếng Việt**

# F5 TTS App

Chạy giao diện Gradio chính thức của F5-TTS trên NVIDIA GPU cục bộ.

## Những gì công thức này cung cấp

- Ứng dụng web Gradio chính thức của upstream trên cổng `7883`
- Sinh giọng nói có điều kiện từ audio prompt
- Các chế độ tổng hợp đa kiểu và đa người nói từ upstream
- Lưu trữ cache Hugging Face bền vững qua các lần khởi động lại

## Truy cập mặc định

- Giao diện: `http://localhost:7883`

## Ghi chú

Lần khởi chạy đầu tải các checkpoint F5-TTS mặc định vào thư mục cache Hugging Face bền vững.

Upstream ghi nhận cả quy trình giao diện web và CLI. Công thức này chỉ nhắm tới giao diện Gradio.

## Ghi chú rủi ro

Kho upstream nêu rằng các checkpoint model pretrained được phát hành theo `CC-BY-NC`. Người rà soát nên xác nhận giấy phép phù hợp với triển khai dự kiến trước khi sử dụng trong sản xuất.
