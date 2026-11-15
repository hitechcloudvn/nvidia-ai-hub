> [English](README.md) | **Tiếng Việt**

# Langfuse

Bộ Langfuse tự host thực tế cho NVIDIA AI Hub, sử dụng image ứng dụng chính thức với các phụ thuộc PostgreSQL, ClickHouse, Redis và MinIO cục bộ.

## Những gì công thức này cung cấp

- Giao diện web Langfuse trên cổng `3001`
- Worker nền cho nhận trace, chấm điểm, xuất và tác vụ bất đồng bộ
- Kho metadata PostgreSQL cục bộ
- Kho phân tích ClickHouse cục bộ
- Cache Redis cục bộ và backend hàng đợi
- Lưu trữ đối tượng MinIO cục bộ cho upload và export

## Truy cập mặc định

- Giao diện Langfuse: `http://localhost:3001`
- MinIO API: `http://localhost:9000`
- MinIO console: `http://localhost:9001`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/langfuse/.env` trước khi khởi chạy lần đầu.
- Thay `NEXTAUTH_SECRET`, `SALT`, mật khẩu database, mật khẩu Redis và thông tin xác thực MinIO bằng các giá trị mạnh.
- Các biến khởi tạo là tùy chọn. Để trống nếu bạn muốn tạo tổ chức và dự án tương tác.
- Công thức này dùng một bucket MinIO dùng chung cho sự kiện, media và export để giữ triển khai cục bộ đơn giản.
- Nếu môi trường của bạn yêu cầu lưu trữ bên ngoài, PostgreSQL bên ngoài hoặc Redis được quản lý, hãy điều chỉnh file compose trước khi sử dụng trong sản xuất.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/langfuse/data/postgres`
- `registry/recipes/langfuse/data/clickhouse`
- `registry/recipes/langfuse/data/redis`
- `registry/recipes/langfuse/data/minio`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh cấu trúc triển khai với hướng dẫn tự host của Langfuse, vốn kỳ vọng ứng dụng cùng phụ thuộc PostgreSQL, ClickHouse và Redis
- kết nối nền lưu trữ đối tượng cục bộ thực tế cho upload và export

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, migration database hoặc luồng đăng nhập đầu, vì Docker không khả dụng trong môi trường làm việc Windows này
- khả năng tương thích của lệnh khởi động worker với mọi thay đổi image upstream tương lai
- định cỡ sản xuất, tăng cường lưu trữ bên ngoài hoặc cấu hình SSO

## Ghi chú giấy phép

- Dự án upstream: `langfuse/langfuse`
- Rà soát giấy phép dự án upstream và bất kỳ giấy phép phụ thuộc nào trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Langfuse phụ thuộc vào nhiều dịch vụ có trạng thái, nên hành vi khởi động và nâng cấp phức tạp hơn các công thức một container.
- Các bí mật giữ chỗ mặc định không an toàn và phải được thay thế.
- Nền cục bộ này được định hướng cho đánh giá và phát triển, không phải sử dụng sản xuất đa tenant đã tăng cường.
