> [English](README.md) | **Tiếng Việt**

# Metabase

Không gian phân tích Metabase tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức và cơ sở dữ liệu ứng dụng PostgreSQL cục bộ.

## Những gì gói này cung cấp

- Web UI Metabase trên cổng `3002`
- Cơ sở dữ liệu ứng dụng PostgreSQL cục bộ cho dashboard, collection, cài đặt và câu hỏi đã lưu
- Mặt phẳng phân tích đơn giản cho vận hành AI, báo cáo sử dụng và các quy trình quan sát nội bộ

## Truy cập mặc định

- Giao diện Metabase: `http://localhost:3002`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/metabase/.env` trước lần khởi động đầu tiên.
- Thay mật khẩu PostgreSQL bằng một giá trị mạnh.
- Metabase hỗ trợ cơ sở dữ liệu ứng dụng nhúng cục bộ, nhưng recipe này cố ý dùng PostgreSQL vì upstream khuyến nghị một cơ sở dữ liệu sẵn sàng sản xuất cho các triển khai bền vững.
- Nếu bạn đặt Metabase sau reverse proxy hoặc đổi URL công khai, hãy xem xét cài đặt ứng dụng upstream sau lần đăng nhập đầu tiên.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/metabase/data/postgres`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh triển khai với hướng dẫn Docker Metabase chính thức cho image OSS, cổng `3000`, endpoint kiểm tra sức khỏe và cơ sở dữ liệu ứng dụng trên nền PostgreSQL
- kiểm tra rằng cổng, kết nối biến môi trường và lưu trữ cơ sở dữ liệu bền vững nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, onboarding người dùng đầu tiên hoặc tạo dashboard, vì Docker không khả dụng trong môi trường Windows này
- cài plugin, SSO hoặc tính năng Pro/Enterprise
- hành vi reverse-proxy, TLS, sao lưu hoặc HA trong sản xuất

## Ghi chú giấy phép

- Dự án upstream: `metabase/metabase`
- Recipe này nhắm đến image Metabase mã nguồn mở. Phiên bản Pro và Enterprise dùng điều khoản giấy phép khác.

## Ghi chú rủi ro

- Metabase không nên dựa vào cơ sở dữ liệu H2 nhúng cho mục đích sản xuất.
- Secret giữ chỗ không an toàn và phải được thay thế.
- Triển khai sản xuất dài hạn cần kế hoạch sao lưu và nâng cấp mạnh hơn cho cơ sở dữ liệu ứng dụng.
