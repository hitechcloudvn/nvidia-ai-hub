> [English](README.md) | **Tiếng Việt**

# MeloTTS Studio

Studio tạo giọng nói MeloTTS cục bộ cho GPU NVIDIA.

## Những gì gói này cung cấp

- Giao diện Gradio trên cổng `7885`
- Giọng tiếng Anh nhiều chất giọng (accent)
- Giọng tiếng Trung, tiếng Nhật, tiếng Hàn, tiếng Tây Ban Nha và tiếng Pháp
- Tốc độ nói có thể điều chỉnh
- Cache và tệp WAV xuất ra bền vững

## Truy cập mặc định

- Giao diện: `http://localhost:7885`

## Ghi chú

MeloTTS đủ nhẹ để suy luận thời gian thực trên CPU trong một số trường hợp, nhưng recipe này vẫn bật hỗ trợ GPU khi có sẵn.

Lần chạy đầu tiên cho một ngôn ngữ sẽ tải các tài nguyên MeloTTS tương ứng vào đường dẫn cache được mount.
