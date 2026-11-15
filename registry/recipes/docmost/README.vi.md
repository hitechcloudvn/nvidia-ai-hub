> [English](README.md) | **Tiếng Việt**

# Docmost

Không gian làm việc Docmost tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức, PostgreSQL cục bộ, Redis và lưu trữ tài liệu bền vững.

## Những gì công thức này cung cấp

- Giao diện web Docmost trên cổng `3003`
- Cơ sở dữ liệu PostgreSQL cục bộ cho người dùng, không gian và metadata nội dung có cấu trúc
- Dịch vụ Redis cục bộ cho cache và hỗ trợ tác vụ nền
- Lưu trữ bền vững cho tài sản được tải lên và nội dung knowledge base

## Truy cập mặc định

- Giao diện Docmost: `http://localhost:3003`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/docmost/.env` trước khi khởi chạy lần đầu.
- Thay `APP_SECRET` và mật khẩu PostgreSQL bằng các giá trị mạnh.
- Giữ `APP_URL` khớp với địa chỉ công khai cuối cùng nếu bạn thay đổi cổng hoặc thêm reverse proxy.
- Nền tảng này cố ý tối giản và không bao gồm lưu trữ đối tượng bên ngoài, email hoặc tích hợp doanh nghiệp.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/docmost/data/postgres`
- `registry/recipes/docmost/data/redis`
- `registry/recipes/docmost/data/storage`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh công thức với mẫu container Docmost upstream sử dụng PostgreSQL, Redis và `/app/data/storage` bền vững
- kiểm tra rằng cổng, kết nối dịch vụ và bind mount nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, thiết lập ban đầu, đăng nhập hoặc chỉnh sửa tài liệu, vì Docker không khả dụng trong môi trường làm việc Windows này
- gửi email, SSO hoặc các tính năng chỉ dành cho doanh nghiệp
- hành vi reverse proxy, sao lưu hoặc HA trong sản xuất

## Ghi chú giấy phép

- Dự án upstream: `docmost/docmost`
- Rà soát giấy phép upstream và ranh giới tầng tính năng trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Các bí mật giữ chỗ không an toàn và phải được thay thế.
- Triển khai sản xuất thường cần SMTP, sao lưu và kế hoạch lưu trữ bên ngoài vượt quá mức nền khởi tạo này.
