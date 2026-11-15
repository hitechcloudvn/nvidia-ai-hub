> [English](README.md) | **Tiếng Việt**

# Kestra

Không gian làm việc Kestra tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức, backend PostgreSQL cục bộ và lưu trữ cục bộ bền vững cho flow và tạo phẩm thực thi.

## Những gì công thức này cung cấp

- Giao diện điều phối Kestra trên cổng `3012`
- Backend PostgreSQL cục bộ cho trạng thái workflow, lịch và hàng đợi
- Lưu trữ bền vững cho tạo phẩm cục bộ và thư mục làm việc tạm thời

## Truy cập mặc định

- Giao diện Kestra: `http://localhost:3012`
- Thông tin xác thực basic auth mặc định lấy từ `registry/recipes/kestra/.env`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/kestra/.env` trước khi khởi chạy lần đầu.
- Nền tảng này theo mẫu Docker Kestra standalone được ghi nhận với PostgreSQL và file cấu hình được mount.
- PostgreSQL được ghim ở phiên bản `16` để giảm rủi ro lệch phiên bản nâng cấp được ghi trong tài liệu upstream.
- Container chạy với tư cách `root` trong nền cục bộ này vì hướng dẫn Compose cục bộ của upstream dùng thiết lập hướng root cho thực thi tác vụ và thư mục làm việc được mount.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/kestra/data/postgres`
- `registry/recipes/kestra/data/storage`
- `registry/recipes/kestra/data/tmp`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose, file cấu hình và tài liệu
- căn chỉnh bộ dịch vụ với mẫu Docker Compose Kestra được ghi nhận sử dụng trạng thái dựa trên PostgreSQL
- kiểm tra rằng cổng, tham chiếu cấu hình và bind mount bền vững nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, thực thi flow, thực thi tác vụ qua Docker socket hoặc hành vi worker, vì Docker không khả dụng trong môi trường làm việc Windows này
- tăng cường sản xuất, mẫu triển khai sản xuất không root hoặc topology đa thành phần/cao khả dụng

## Ghi chú giấy phép

- Dự án upstream: `kestra-io/kestra`
- Image và tính năng doanh nghiệp dùng đường dẫn phân phối riêng và cố ý nằm ngoài phạm vi nền cộng đồng này.

## Ghi chú rủi ro

- Nền tảng này mount Docker socket và dùng thiết lập cục bộ hướng root, làm tăng rủi ro vận hành.
- Rà soát quyền tác vụ, bí mật và độ tin cậy nguồn workflow trước khi chạy các flow không đáng tin cậy.
