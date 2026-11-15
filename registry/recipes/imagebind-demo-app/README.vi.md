> [English](README.md) | **Tiếng Việt**

# ImageBind Demo App

Wrapper Gradio cục bộ quanh model `ImageBind` chính thức của Meta cho các thử nghiệm độ tương đồng liên mô thức giữa văn bản, ảnh và âm thanh trên NVIDIA GPU.

## Những gì công thức này cung cấp

- Giao diện web Gradio trên cổng `7868`
- Nạp model `imagebind_huge` pretrained chính thức qua gói `ImageBind` upstream
- Ma trận cosine-similarity liên mô thức cho so sánh image-to-text, audio-to-text và image-to-audio
- Volume cache bền vững cho tài sản model được tải xuống
- Báo cáo JSON được xuất cho mỗi lần chạy so sánh

## Truy cập mặc định

- Web UI: `http://localhost:7868/`

## Quy trình đi kèm

- Nhập một prompt văn bản mỗi dòng
- Tải lên một hoặc nhiều file ảnh
- Tải lên một hoặc nhiều đoạn âm thanh
- Chạy so sánh để tạo bảng độ tương đồng và báo cáo JSON được lưu

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền demo ImageBind hẹp:

- dùng gói `facebookresearch/ImageBind` chính thức và trọng số `imagebind_huge` pretrained
- tập trung vào so sánh embedding liên mô thức thực tế giữa văn bản, ảnh và âm thanh
- lưu bền cache model và báo cáo đã xuất qua các lần khởi động lại
- giữ giao diện đủ đơn giản cho kiểm tra sanity về truy xuất và embedding

Preset này **không** bao gồm:

- API suy luận sản xuất
- quy trình tải lên video, depth, thermal hoặc IMU
- dashboard benchmark, tích hợp vector database hoặc lập chỉ mục quy mô lớn
- giấy phép sử dụng thương mại cho giấy phép model phi thương mại upstream

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, hãy rà soát `registry/recipes/imagebind-demo-app/.env` và thay đổi các mục phù hợp với môi trường của bạn:

- `APP_PORT`
- `PORT`
- `IMAGEBIND_MODEL`
- `MAX_TEXT_ITEMS`
- các biến môi trường thư mục cache và output nếu bạn cần đích mount khác

## Ghi chú runtime

- Các ví dụ ImageBind upstream minh họa trích xuất embedding liên mô thức qua đầu vào văn bản, ảnh và âm thanh.
- Lần khởi chạy đầu tải trọng số pretrained và phụ thuộc Python, nên thời gian khởi động có thể lâu hơn đáng kể so với các lần khởi động lại sau.
- Giải mã âm thanh phụ thuộc vào `ffmpeg` và `libsndfile1`, được bao gồm trong image.
- Công thức này chỉ mở ra một web demo; nó không thêm hợp đồng REST suy luận chính thức.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái trong Docker volume cho:

- `/data/hf-home`
- `/data/torch-home`
- `/data/output`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu danh mục, mẫu môi trường, định nghĩa compose, công thức build Docker, ứng dụng Gradio cục bộ và tài liệu vận hành cho demo ImageBind
- căn chỉnh quy trình ứng dụng với cách dùng ImageBind upstream cho so sánh embedding văn bản, ảnh và âm thanh
- kết nối lưu trữ cache bền vững và báo cáo đã xuất
- kiểm tra các file công thức mới theo chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, tải model, thực thi trên GPU hoặc kết quả độ tương đồng thực tế, vì Docker không khả dụng trong môi trường làm việc Windows này
- hiệu năng hoặc sự phù hợp bộ nhớ trên host NVIDIA GPU mục tiêu
- các mô thức bổ sung ngoài văn bản, ảnh và âm thanh

## Ghi chú giấy phép

- Dự án upstream và trọng số model: `facebookresearch/ImageBind`
- Giấy phép upstream: CC-BY-NC 4.0
- Giấy phép upstream này là phi thương mại; hãy xem xét giấy phép có chấp nhận được trước khi sử dụng vận hành không.

## Ghi chú rủi ro

- Giấy phép phi thương mại upstream có thể chặn nhiều kịch bản triển khai doanh nghiệp hoặc sản xuất.
- Đầu vào lô lớn có thể tăng mức dùng bộ nhớ GPU và độ trễ khởi động.
- Demo nên được coi là bề mặt nghiên cứu hoặc đánh giá hơn là dịch vụ nhiều người dùng đã tăng cường.
