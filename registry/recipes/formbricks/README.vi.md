> [English](README.md) | **Tiếng Việt**

# Formbricks

Không gian làm việc Formbricks tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức, dịch vụ PostgreSQL và Redis cục bộ, cùng uploads bền vững cho nền tảng một phiên bản bảo thủ.

## Những gì công thức này cung cấp

- Giao diện web Formbricks trên cổng `3000`
- Cơ sở dữ liệu PostgreSQL cục bộ cho trạng thái ứng dụng
- Dịch vụ Redis cục bộ mà các triển khai tự host hiện tại yêu cầu
- Thư mục uploads bền vững

## Truy cập mặc định

- Giao diện Formbricks: `http://localhost:3000`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/formbricks/.env` trước khi khởi chạy lần đầu.
- `WEBAPP_URL` và `NEXTAUTH_URL` thường nên khớp với URL được phát hành.
- Thay tất cả bí mật giữ chỗ được tạo trước khi triển khai nghiêm túc.
- Các tích hợp SMTP và lưu trữ đối tượng cố ý để ngoài nền tảng này và chỉ nên thêm khi cần.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/formbricks/data/postgres`
- `registry/recipes/formbricks/data/redis`
- `registry/recipes/formbricks/data/uploads`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh bộ dịch vụ với các yêu cầu tự host được ghi nhận của Formbricks cho PostgreSQL, Redis và bí mật ứng dụng cốt lõi
- kiểm tra rằng URL, kết nối database, kết nối Redis và mount nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, luồng thiết lập ban đầu, gửi email hoặc thu thập khảo sát, vì Docker không khả dụng trong môi trường làm việc Windows này
- lưu trữ đối tượng tương thích S3, các tính năng chỉ dành cho doanh nghiệp hoặc mọi tổ hợp image tag
- hành vi nâng cấp qua các bản phát hành chính của Formbricks

## Ghi chú giấy phép

- Dự án upstream: `formbricks/formbricks`
- Rà soát giấy phép upstream và điều khoản tầng tính năng trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Formbricks phụ thuộc vào nhiều bí mật cùng PostgreSQL và Redis, nên giá trị sai có thể chặn khởi động hoặc xác thực.
- Công thức này cố ý bảo thủ và không tuyên bố kiểm chứng cho các đường dẫn SMTP, S3 hoặc tăng cường sản xuất.
