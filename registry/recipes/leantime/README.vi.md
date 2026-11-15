> [English](README.md) | **Tiếng Việt**

# Leantime

Không gian làm việc Leantime tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức, cơ sở dữ liệu MySQL cục bộ và file dự án bền vững cho nền tảng một phiên bản bảo thủ.

## Những gì công thức này cung cấp

- Giao diện web Leantime trên cổng `8080`
- Cơ sở dữ liệu MySQL cục bộ cho trạng thái ứng dụng
- Thư mục file người dùng và plugin bền vững

## Truy cập mặc định

- Giao diện Leantime: `http://localhost:8080`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/leantime/.env` trước khi khởi chạy lần đầu.
- `LEAN_APP_URL` nên khớp với URL được phát hành, đặc biệt sau reverse proxy.
- Leantime yêu cầu một cơ sở dữ liệu tương thích MySQL cho các luồng cài đặt thông thường.
- Việc cài đặt lần chạy đầu được hoàn tất qua trình cài đặt web sau khi các container khởi động.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/leantime/data/mysql`
- `registry/recipes/leantime/data/userfiles`
- `registry/recipes/leantime/data/plugins`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh bộ dịch vụ với hướng dẫn Docker Leantime chính thức, phụ thuộc MySQL được kỳ vọng và cổng phát hành `8080`
- kiểm tra rằng kết nối database, mount bền vững và cổng phát hành nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, hoàn tất trình cài đặt web, gửi email hoặc quản lý plugin, vì Docker không khả dụng trong môi trường làm việc Windows này
- triển khai PostgreSQL thay thế, tích hợp dựa trên Redis hoặc thiết lập TLS reverse proxy
- khả năng tương thích với mọi image tag hoặc tổ hợp plugin của Leantime

## Ghi chú giấy phép

- Dự án upstream: `Leantime/leantime`
- Rà soát điều khoản giấy phép upstream và giấy phép plugin trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Thông tin xác thực MySQL không đúng hoặc các bước cài đặt lần chạy đầu thất bại có thể để ứng dụng ở trạng thái khởi tạo một phần.
- Lưu trữ plugin được mount một cách bảo thủ, nhưng khả năng tương thích plugin và hành vi nâng cấp chưa được kiểm chứng tại đây.
