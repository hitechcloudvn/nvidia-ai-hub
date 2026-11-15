> [English](README.md) | **Tiếng Việt**

# Activepieces

Không gian làm việc tự động hóa Activepieces tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức, PostgreSQL cục bộ, Redis và trạng thái ứng dụng được lưu bền.

## Những gì công thức này cung cấp

- Giao diện web Activepieces trên cổng `3005`
- Cơ sở dữ liệu PostgreSQL cục bộ cho trạng thái quy trình làm việc và tài khoản
- Dịch vụ Redis cục bộ cho hàng đợi và hỗ trợ tác vụ nền
- Thư mục ứng dụng cục bộ bền vững cho trạng thái runtime và cấu hình

## Truy cập mặc định

- Giao diện Activepieces: `http://localhost:3005`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/activepieces/.env` trước khi khởi chạy lần đầu.
- Thay mật khẩu PostgreSQL, `AP_ENCRYPTION_KEY` và `AP_JWT_SECRET` bằng các giá trị mạnh.
- Upstream cung cấp các lộ trình đơn giản hơn cho mục đích cá nhân, nhưng công thức này cố ý sử dụng PostgreSQL và Redis để phù hợp hơn với khối lượng công việc tự động hóa cần bền vững.
- Rà soát mọi cài đặt email, hàng đợi hoặc lưu trữ bên ngoài mà bạn cần trước khi triển khai rộng hơn.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/activepieces/data/postgres`
- `registry/recipes/activepieces/data/redis`
- `registry/recipes/activepieces/data/app`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh triển khai với cấu trúc tự host của upstream Activepieces, sử dụng image chính thức với PostgreSQL, Redis và dữ liệu ứng dụng bền vững
- kiểm tra rằng ánh xạ cổng, kết nối dịch vụ và bind mount nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, thực thi quy trình làm việc hoặc xác thực connector, vì Docker không khả dụng trong môi trường làm việc Windows này
- các tính năng chỉ dành cho doanh nghiệp, mở rộng ngang hoặc thiết lập email sản xuất
- khả năng tương thích với mọi biến môi trường của upstream qua các bản phát hành trong tương lai

## Ghi chú giấy phép

- Dự án upstream: `activepieces/activepieces`
- Rà soát giấy phép upstream và ranh giới phiên bản trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Các bí mật giữ chỗ không an toàn và phải được thay thế.
- Các triển khai sản xuất thực tế thường cần email, sao lưu, quản lý bí mật và kế hoạch nâng cấp vượt quá mức nền khởi tạo này.
