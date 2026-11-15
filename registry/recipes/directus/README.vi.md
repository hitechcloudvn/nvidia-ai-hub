> [English](README.md) | **Tiếng Việt**

# Directus

Không gian làm việc Directus tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức, lưu trữ SQLite cục bộ bền vững và uploads cho nền tảng một phiên bản bảo thủ.

## Những gì công thức này cung cấp

- Giao diện web và API của Directus trên cổng `8055`
- Lưu trữ metadata dựa trên SQLite cục bộ
- Thư mục uploads, extensions và database bền vững

## Truy cập mặc định

- Giao diện Directus: `http://localhost:8055`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/directus/.env` trước khi khởi chạy lần đầu.
- Đặt giá trị mạnh cho `KEY` và `SECRET` trước khi sử dụng nghiêm túc.
- `PUBLIC_URL` nên khớp với URL được phát hành, đặc biệt khi chạy sau reverse proxy.
- Công thức này cố ý dùng SQLite cho nền tảng nhẹ hơn thay vì PostgreSQL hoặc MySQL bên ngoài.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/directus/data/database`
- `registry/recipes/directus/data/uploads`
- `registry/recipes/directus/data/extensions`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh bộ dịch vụ với giá trị mặc định container Directus chính thức, cổng phát hành `8055` và đường dẫn triển khai SQLite
- kiểm tra rằng tham chiếu môi trường, mount bền vững và kết nối health-check nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, thiết lập admin lần đầu hoặc hành vi reverse proxy, vì Docker không khả dụng trong môi trường làm việc Windows này
- triển khai mở rộng, cơ sở dữ liệu bên ngoài, cache dựa trên Redis hoặc tích hợp lưu trữ đối tượng
- khả năng tương thích với mọi image tag hoặc tổ hợp extension của Directus

## Ghi chú giấy phép

- Dự án upstream: `directus/directus`
- Rà soát giấy phép upstream và khả năng tương thích extension trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- SQLite thực tế cho nền tảng một phiên bản nhỏ nhưng không phù hợp với mọi triển khai đồng thời hoặc nặng về sản xuất.
- Giá trị `KEY` hoặc `SECRET` yếu có thể làm hỏng phiên hoặc tạo ra triển khai không an toàn.
