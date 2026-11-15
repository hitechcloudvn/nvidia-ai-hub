> [English](README.md) | **Tiếng Việt**

# VoiceCraft Lab

Chạy quy trình Gradio VoiceCraft chính thức cục bộ trên GPU NVIDIA.

## Những gì gói này cung cấp

- Giao diện Gradio VoiceCraft chính thức trên cổng `7886`
- TTS zero-shot từ đoạn âm thanh prompt ngắn
- Chỉnh sửa lời nói với các điều khiển bản ghi (transcript) và căn chỉnh
- Quy trình chạy lại TTS dài để tái tạo từng câu
- Lưu trữ mô hình, cache và làm việc tạm thời bền vững qua các lần khởi động lại

## Truy cập mặc định

- Giao diện: `http://localhost:7886`

## Ghi chú

Lần khởi động đầu tiên tải các checkpoint VoiceCraft, trọng số Encodec, tài nguyên Whisper hoặc WhisperX và tài nguyên căn chỉnh vào các đường dẫn cache được mount.

Upstream khuyến nghị giữ đoạn âm thanh prompt tham chiếu ngắn. Trong thực tế, thời gian kết thúc prompt khoảng 3 đến 6 giây thường là đủ, và tổng thời gian prompt cộng với âm thanh được tạo nên dưới khoảng 16 đến 17 giây.

Quy trình Gradio upstream ghi nhận rằng việc thay đổi các tham số nâng cao ngoài `sample_batch_size`, `stop_repetition` và `seed` có thể kích hoạt cảnh báo JSON trong một số lần chạy.

Recipe này nướng Montreal Forced Aligner và các tài nguyên MFA tiếng Anh mặc định vào container để quy trình căn chỉnh tích hợp sẵn có thể dùng mà không cần thiết lập thêm.

## Ghi chú giấy phép

- Mã nguồn upstream được phát hành theo `CC BY-NC-SA 4.0`
- Trọng số mô hình upstream được phát hành theo `Coqui Public Model License 1.0.0`
- Người đánh giá nên xác nhận rằng cả hai giấy phép phù hợp với triển khai dự kiến

## Ghi chú rủi ro

VoiceCraft hỗ trợ bắt chước giọng nói thuyết phục và chỉnh sửa lời nói. Chỉ sử dụng âm thanh prompt và đầu ra được tạo khi có sự cho phép và đồng ý rõ ràng.

Âm thanh tải lên, bản ghi và artifact căn chỉnh tạm thời có thể chứa dữ liệu nhạy cảm. Hãy xem xét các đường dẫn lưu trữ được mount trước khi chia sẻ hoặc giữ lại chúng.
