> [English](README.md) | **Tiếng Việt**

# ToolJet

Không gian làm việc ToolJet tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức và các cơ sở dữ liệu PostgreSQL cục bộ cho một baseline công cụ nội bộ một instance.

## Những gì gói này cung cấp

- Web UI ToolJet trên cổng `3013`
- Cơ sở dữ liệu hậu thuẫn PostgreSQL cục bộ cho trạng thái ứng dụng và các tính năng ToolJet DB
- Baseline một instance đơn giản, không có worker quy trình làm việc riêng

## Truy cập mặc định

- Giao diện ToolJet: `http://localhost:3013`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/tooljet/.env` trước lần khởi động đầu tiên.
- ToolJet yêu cầu `TOOLJET_HOST` khớp với URL đã hiển thị, bao gồm cả giao thức.
- Recipe này cố ý ở chế độ một instance và không thêm worker riêng hoặc cấu trúc topology Redis bên ngoài được mô tả cho việc lên lịch quy trình làm việc nâng cao hơn.
- Container PostgreSQL khởi tạo cả `PG_DB` và `TOOLJET_DB` thông qua `registry/recipes/tooljet/initdb/01-create-tooljet-dbs.sql`.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/tooljet/data/postgres`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose, SQL khởi tạo và tài liệu
- căn chỉnh stack với quy trình triển khai Docker ToolJet được tài liệu hóa và baseline trên nền PostgreSQL bắt buộc
- kiểm tra rằng cổng, kết nối cơ sở dữ liệu và tham chiếu môi trường nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, onboarding admin, thiết lập datasource hoặc lên lịch quy trình làm việc, vì Docker không khả dụng trong môi trường Windows này
- các mẫu thực thi quy trình làm việc đa worker hoặc trên nền Redis
- tương thích với mọi tổ hợp image/tag LTS hoặc doanh nghiệp

## Ghi chú giấy phép

- Dự án upstream: `ToolJet/ToolJet`
- Hãy xem xét lựa chọn image OSS so với doanh nghiệp/LTS upstream trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- ToolJet yêu cầu nhiều secret và hai cơ sở dữ liệu PostgreSQL, nên khởi tạo sai có thể làm hỏng quá trình khởi động.
- Recipe này cố ý thận trọng và không tuyên bố hỗ trợ cho worker quy trình làm việc được mở rộng.
