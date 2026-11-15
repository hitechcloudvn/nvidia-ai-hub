> [English](README.md) | **Tiếng Việt**

# NocoDB

Không gian làm việc NocoDB tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức và cơ sở dữ liệu metadata PostgreSQL cục bộ.

## Những gì gói này cung cấp

- Web UI NocoDB trên cổng `3011`
- Cơ sở dữ liệu metadata PostgreSQL cục bộ cho trạng thái không gian làm việc
- Bind mount bền vững cho dữ liệu PostgreSQL và NocoDB

## Truy cập mặc định

- Giao diện NocoDB: `http://localhost:3011`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/nocodb/.env` trước lần khởi động đầu tiên.
- Recipe này ưu tiên baseline trên nền PostgreSQL thay vì quickstart đơn container đơn giản nhất để lưu trữ metadata bền vững hơn.
- Nếu bạn đổi cổng host, hãy giữ `NC_PUBLIC_URL` khớp với URL đã hiển thị.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/nocodb/data/postgres`
- `registry/recipes/nocodb/data/nocodb`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh stack với mẫu triển khai Docker NocoDB được tài liệu hóa và baseline metadata trên nền PostgreSQL
- kiểm tra rằng cổng, kết nối môi trường và bind mount bền vững nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, onboarding ban đầu, kết nối datasource bên ngoài hoặc luồng tự động hóa, vì Docker không khả dụng trong môi trường Windows này
- tương thích với mọi adapter cơ sở dữ liệu upstream được hỗ trợ hoặc mẫu triển khai doanh nghiệp

## Ghi chú giấy phép

- Dự án upstream: `nocodb/nocodb`
- Hãy xem xét giấy phép upstream và ranh giới phiên bản trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Bản thân NocoDB khá đơn giản, nhưng quyền datasource phía dưới vẫn cần xem xét cẩn thận.
- Recipe này là baseline cục bộ thận trọng, không phải triển khai độ khả dụng cao đầy đủ.
