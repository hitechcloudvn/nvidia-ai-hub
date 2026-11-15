> [English](README.md) | **Tiếng Việt**

# Segment Anything Studio

Wrapper Gradio cục bộ quanh mô hình `Segment Anything` chính thức của Meta cho phân vùng có prompt và tạo mask tự động trên GPU NVIDIA.

## Những gì gói này cung cấp

- Web UI Gradio trên cổng `7869`
- Gói Python `segment-anything` chính thức
- Phân vùng có prompt sử dụng một tọa độ điểm dương
- Tạo mask tự động trên toàn bộ hình ảnh
- Ảnh overlay và metadata JSON được xuất
- Lưu trữ checkpoint và đầu ra bền vững

## Truy cập mặc định

- Web UI: `http://localhost:7869/`

## Quy trình đi kèm

- Tải lên một hình ảnh
- Nhập tọa độ điểm cho phân vùng dựa trên prompt, hoặc chạy tạo mask tự động
- Xem xét overlay và metadata mask đã xuất
- Tải xuống các đầu ra PNG và JSON đã lưu

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline SAM đơn giản:

- sử dụng gói và checkpoint `segment-anything` chính thức của Meta
- hiển thị phân vùng có prompt và tạo mask tự động thông qua giao diện Gradio cục bộ
- lưu checkpoint và đầu ra đã xuất qua các lần khởi động lại
- giữ trải nghiệm tập trung vào đánh giá phân vùng hình ảnh và nguyên mẫu quy trình

Preset này **không** bao gồm:

- demo React ONNX chỉ front-end từ upstream
- prompt hộp (box prompt), prompt đa điểm hoặc quy trình phân vùng video
- hỗ trợ SAM 2
- gia cố API sản xuất, xác thực hoặc kiểm soát đa người dùng

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/segment-anything-studio/.env` và thay đổi những mục áp dụng cho môi trường của bạn:

- `APP_PORT`
- `PORT`
- `SAM_MODEL_TYPE`
- `SAM_CHECKPOINT_URL`
- `SAM_CHECKPOINT_FILE`
- các biến thư mục checkpoint và đầu ra nếu bạn cần đích lưu trữ khác

## Ghi chú runtime

- Segment Anything upstream yêu cầu một checkpoint mô hình như `sam_vit_h_4b8939.pth`, `sam_vit_l_0b3195.pth` hoặc `sam_vit_b_01ec64.pth`.
- Recipe này tải checkpoint đã cấu hình trong lần khởi động đầu tiên nếu nó chưa có trong volume checkpoint bền vững.
- Kho upstream cũng cung cấp một demo trình duyệt React + ONNX riêng, nhưng recipe này đóng gói một studio Gradio Python cục bộ thay thế.
- Tạo mask tự động có thể tốn nhiều tài nguyên tính toán trên hình ảnh lớn.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái trong Docker volume cho:

- `/data/checkpoints`
- `/data/output`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata danh mục, mẫu môi trường, định nghĩa compose, recipe build Docker, wrapper khởi động, ứng dụng Gradio cục bộ và tài liệu vận hành cho một studio dựa trên SAM
- căn chỉnh quy trình ứng dụng với cách dùng Segment Anything upstream cho dự đoán dựa trên prompt và tạo mask tự động
- kết nối lưu trữ checkpoint bền vững và đầu ra đã xuất
- kiểm tra các tệp recipe mới bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, tải checkpoint, suy luận trên GPU hoặc chất lượng mask thực tế, vì Docker không khả dụng trong môi trường Windows này
- prompt hộp, xuất ONNX hoặc quy trình demo ONNX phía trình duyệt
- chức năng SAM 2

## Ghi chú giấy phép

- Dự án upstream: `facebookresearch/segment-anything`
- Giấy phép upstream: Apache-2.0
- Hãy xem xét riêng các tài nguyên mô hình đã tải và việc sử dụng tập dữ liệu phía dưới khi liên quan

## Ghi chú rủi ro

- Hình ảnh lớn và tạo mask tự động có thể làm tăng mức sử dụng bộ nhớ và độ trễ.
- Studio này là một công cụ nghiên cứu và quy trình, không phải dịch vụ phân vùng sản xuất đã được gia cố.
- Người vận hành chuyển đổi checkpoint phải giữ `SAM_MODEL_TYPE` khớp với tệp checkpoint đã chọn.
