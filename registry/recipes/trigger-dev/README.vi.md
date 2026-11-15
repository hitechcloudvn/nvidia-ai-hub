> [English](README.md) | **Tiếng Việt**

# Trigger.dev

Baseline Trigger.dev tự host thận trọng cho NVIDIA AI Hub, sử dụng image webapp chính thức, PostgreSQL cục bộ, các dịch vụ Redis và Electric, cùng giao diện web được hiển thị trên cổng `8030`.

## Những gì gói này cung cấp

- Web UI Trigger.dev trên cổng `8030`
- Cơ sở dữ liệu PostgreSQL cục bộ
- Dịch vụ Redis cục bộ
- Dịch vụ Electric cục bộ cho baseline webapp

## Truy cập mặc định

- Giao diện Trigger.dev: `http://localhost:8030`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/trigger-dev/.env` trước lần khởi động đầu tiên.
- Thay thế mọi secret giữ chỗ trước khi sử dụng ở mức không tầm thường.
- Recipe này cố ý tập trung vào baseline webapp thận trọng và không bao gồm cấu trúc worker hoặc supervisor rộng hơn thường được thảo luận trong hướng dẫn tự host sản xuất.
- `APP_ORIGIN` và `LOGIN_ORIGIN` nên khớp với URL đã hiển thị.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/trigger-dev/data/postgres`
- `registry/recipes/trigger-dev/data/redis`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh stack với các biến môi trường webapp Trigger.dev được tài liệu hóa, cổng web hiển thị `8030` và các phụ thuộc PostgreSQL, Redis, Electric bắt buộc
- kiểm tra rằng URL nội bộ, kết nối kiểm tra sức khỏe và phụ thuộc dịch vụ nhất quán nội bộ cho một baseline thận trọng

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, luồng đăng nhập, thực thi tác vụ hoặc worker do supervisor quản lý, vì Docker không khả dụng trong môi trường Windows này
- ClickHouse, MinIO, supervisor, registry hoặc các cấu trúc topology tự host quy mô sản xuất rộng hơn
- tương thích với mọi tag image hoặc nhánh phát hành Trigger.dev

## Ghi chú giấy phép

- Dự án upstream: `triggerdotdev/trigger.dev`
- Hãy xem xét giấy phép upstream và hướng dẫn tự host trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Trigger.dev có kiến trúc sản xuất phức tạp hơn baseline này, nên recipe này nên được coi là thử nghiệm.
- Ngay cả khi webapp khởi động, hành vi thực thi nền vẫn có thể yêu cầu các dịch vụ upstream bổ sung vốn cố ý nằm ngoài phạm vi tại đây.
