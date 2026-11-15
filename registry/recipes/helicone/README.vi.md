> [English](README.md) | **Tiếng Việt**

# Helicone

Bộ Helicone tự host thực tế cho NVIDIA AI Hub, sử dụng image all-in-one chính thức cho ghi log LLM, proxy, phân tích và kiểm tra yêu cầu.

## Những gì công thức này cung cấp

- Dashboard Helicone trên cổng `3004`
- Endpoint proxy/API trên cổng `8585`
- Đường dẫn triển khai all-in-one nhúng, đóng gói các phụ thuộc có trạng thái chính phía sau một image chính thức
- Lưu trữ cục bộ bền vững cho PostgreSQL nội bộ, ClickHouse và dữ liệu đối tượng tương thích S3

## Truy cập mặc định

- Dashboard Helicone: `http://localhost:3004`
- Endpoint proxy/API của Helicone: `http://localhost:8585`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/helicone/.env` trước khi khởi chạy lần đầu.
- Giữ `NEXT_PUBLIC_APP_URL` khớp với URL dashboard được expose của bạn.
- Công thức này dùng image all-in-one của upstream vì đó là nền tảng tự host thực tế nhất cho kho lưu trữ hiện tại.
- Coi cổng `8585` là hạ tầng nhạy cảm và tránh expose rộng rãi mà không có kiểm soát truy cập.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/helicone/data/postgres`
- `registry/recipes/helicone/data/clickhouse`
- `registry/recipes/helicone/data/minio`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh triển khai với đường dẫn tự host all-in-one chính thức của Helicone và các cổng dashboard, proxy, lưu trữ đối tượng được ghi nhận
- kiểm tra rằng ánh xạ cổng và bind mount bền vững nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, thiết lập dashboard hoặc ghi log yêu cầu, vì Docker không khả dụng trong môi trường làm việc Windows này
- khả năng tương thích với các mẫu compose Helicone cũ hơn hoặc thay đổi bố cục image trong tương lai
- tăng cường sản xuất, TLS, xoay bí mật hoặc hành vi HA

## Ghi chú giấy phép

- Dự án upstream: `Helicone/helicone`
- Rà soát điều khoản giấy phép upstream và bất kỳ ranh giới tính năng hosted/thương mại nào trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Image all-in-one đơn giản hóa thiết lập nhưng che giấu trạng thái nội bộ đáng kể và độ phức tạp dịch vụ.
- Hạ tầng proxy được expose có thể thu thập prompt, metadata và khóa nhạy cảm nếu triển khai cẩu thả.
- Việc sử dụng sản xuất dài hạn nên bao gồm kiểm soát mạng mạnh hơn, chiến lược sao lưu và ghim phiên bản.
