> [English](README.md) | **Tiếng Việt**

# Hoppscotch

Không gian làm việc Hoppscotch tự host bảo thủ cho NVIDIA AI Hub, sử dụng image all-in-one chính thức, cơ sở dữ liệu PostgreSQL cục bộ và dữ liệu server bền vững cho cộng tác API.

## Những gì công thức này cung cấp

- Giao diện web Hoppscotch chính trên cổng `3000`
- Bề mặt admin trên cổng `3100`
- Backend API trên cổng `3170`
- Bề mặt webapp server trên cổng `3200`
- Cơ sở dữ liệu PostgreSQL cục bộ cho trạng thái và dữ liệu không gian làm việc

## Truy cập mặc định

- Giao diện Hoppscotch: `http://localhost:3000`
- Giao diện Admin: `http://localhost:3100`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/hoppscotch/.env` trước khi khởi chạy lần đầu.
- Công thức này dùng image all-in-one của upstream để giữ file compose nhỏ hơn, nhưng bản thân nền tảng vẫn mở ra nhiều bề mặt nội bộ.
- Thay `JWT_SECRET`, `SESSION_SECRET` và `TOKEN_SALT_COMPLEXITY` trước khi sử dụng thật.
- `WHITELISTED_ORIGINS` và các URL `VITE_*` nên khớp với URL được phát hành nếu bạn chạy sau proxy hoặc tên miền tùy chỉnh.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/hoppscotch/data/postgres`
- `registry/recipes/hoppscotch/data/webapp-server`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh nền tảng với biến môi trường tự host của Hoppscotch, phụ thuộc PostgreSQL và topology all-in-one đa cổng
- kiểm tra rằng cổng được phát hành, biến URL và mount dữ liệu server bền vững nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, luồng đăng nhập, gửi email hoặc luồng cộng tác nhóm, vì Docker không khả dụng trong môi trường làm việc Windows này
- cấu hình mailer, lưu trữ đối tượng bên ngoài hoặc mọi biến thể reverse proxy
- mọi tag image AIO upstream hoặc topology tách dịch vụ

## Ghi chú giấy phép

- Dự án upstream: `hoppscotch/hoppscotch`
- Rà soát giấy phép upstream và hướng dẫn triển khai trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Hoppscotch phức tạp hơn ứng dụng một cổng, nên biến URL hoặc origin không khớp có thể làm hỏng xác thực hoặc hành vi giao diện.
- Công thức này cố ý được đánh dấu `experimental` vì dùng nền tảng AIO bảo thủ thay vì kiểm chứng mọi topology tự host upstream.
