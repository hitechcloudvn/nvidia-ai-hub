> [English](README.md) | **Tiếng Việt**

# RVC Voice Conversion

Chạy WebUI huấn luyện và suy luận RVC chính thức cục bộ trên GPU NVIDIA.

## Những gì gói này cung cấp

- WebUI RVC chính thức trên cổng `7887`
- Các quy trình chuyển đổi giọng nói một tệp và hàng loạt
- Tiền xử lý tập dữ liệu, trích xuất đặc trưng, huấn luyện mô hình và xây dựng chỉ mục
- Tiện ích tách giọng hát UVR5, khử vang và khử echo
- Lưu trữ bền vững cho tài nguyên pretrained, checkpoint đã huấn luyện, log, chỉ mục và âm thanh đã xuất

## Truy cập mặc định

- Giao diện: `http://localhost:7887`

## Ghi chú

Lần khởi động đầu tiên tải các tài nguyên tiên quyết upstream vào đường dẫn dữ liệu được mount, bao gồm `hubert_base.pt`, các gói `assets/pretrained`, các gói `assets/pretrained_v2`, `uvr5_weights`, `vocals.onnx` và `rmvpe.pt`.

Danh sách thả suy luận vẫn trống cho đến khi bạn đặt các checkpoint `.pth` tương thích vào `./data/assets/weights` hoặc huấn luyện một mô hình bên trong WebUI.

Log huấn luyện, chỉ mục được tạo và thư mục thử nghiệm được lưu trong `./data/logs`. Âm thanh đã chuyển đổi mặc định vào `./data/opt` trừ khi bạn chọn thư mục đầu ra khác trong giao diện.

Container này khởi động ứng dụng `infer-web.py` chính thức với `--noautoopen` và gắn nó vào `0.0.0.0` bên trong container.

## Ghi chú giấy phép

- Mã nguồn upstream được phát hành theo giấy phép `MIT`
- Tài nguyên pretrained đã tải và bất kỳ checkpoint bên thứ ba nào có thể có điều khoản riêng; người đánh giá nên xác nhận quyền phân phối lại trước khi công bố các mô hình hoặc giọng nói đi kèm

## Ghi chú rủi ro

WebUI upstream nêu rõ phần mềm được cấp phép MIT, các tác giả không kiểm soát cách nó được sử dụng, và người dùng hoặc nhà phân phối các giọng nói đã xuất chịu hoàn toàn trách nhiệm về các đầu ra đó.

Chỉ sử dụng âm thanh tham chiếu, dữ liệu huấn luyện và giọng nói đã xuất khi bạn có sự cho phép và đồng ý rõ ràng. Các quy trình chuyển đổi và nhân bản giọng nói có thể tạo ra rủi ro sinh trắc học và bản quyền nhạy cảm.

Các thư mục được mount có thể chứa âm thanh nguồn tải lên, checkpoint đã huấn luyện, chỉ mục và đầu ra được tạo. Hãy xem xét dữ liệu được giữ lại trước khi chia sẻ hoặc lưu trữ nó.
