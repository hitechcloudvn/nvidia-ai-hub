> [English](README.md) | **Tiếng Việt**

# LobeHub

Không gian làm việc AI LobeHub tự host thực tế cho NVIDIA AI Hub, sử dụng image chính thức, PostgreSQL cục bộ với PGVector, Redis và lưu trữ đối tượng S3 tương thích RustFS.

## Những gì gói này cung cấp

- Web UI LobeHub trên cổng `3210`
- PostgreSQL cục bộ với PGVector cho trạng thái ứng dụng và liên quan đến embedding bền vững
- Redis cục bộ cho cache và điều phối bất đồng bộ
- Lưu trữ đối tượng tương thích S3 cục bộ cho tệp tải lên và tài nguyên trợ lý

## Truy cập mặc định

- Giao diện LobeHub: `http://localhost:3210`
- Endpoint S3 RustFS: `http://localhost:9000`
- Bảng điều khiển RustFS: `http://localhost:9001`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/lobehub/.env` trước lần khởi động đầu tiên.
- Thay thế tất cả secret giữ chỗ trước khi hiển thị stack này ra ngoài môi trường cục bộ đáng tin cậy.
- Hướng dẫn upstream đã chuyển hướng khỏi MinIO cho một số triển khai; recipe này dùng baseline S3 tương thích RustFS để phù hợp với hướng dẫn công khai gần đây.
- Giữ `APP_URL`, `S3_PUBLIC_DOMAIN` và các hostname liên quan đồng bộ nếu bạn đổi cổng hoặc thêm reverse proxy.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/lobehub/data/postgres`
- `registry/recipes/lobehub/data/redis`
- `registry/recipes/lobehub/data/rustfs`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh cấu trúc stack với kỳ vọng tự host LobeHub hiện tại xung quanh PostgreSQL/PGVector, Redis và lưu trữ đối tượng tương thích S3
- kiểm tra rằng kết nối môi trường, cổng và bind mount bền vững nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, luồng đăng nhập, thiết lập nhà cung cấp mô hình hoặc tải tệp lên, vì Docker không khả dụng trong môi trường Windows này
- tương thích với mọi tích hợp tùy chọn của upstream, mẫu reverse-proxy hoặc backend lưu trữ
- khả năng tương thích môi trường RustFS chính xác cho mọi thay đổi khuyến nghị lưu trữ upstream trong tương lai

## Ghi chú giấy phép

- Dự án upstream: `lobehub/lobe-chat`
- Hãy xem xét giấy phép upstream và ranh giới tính năng trước khi phân phối lại trong môi trường sản xuất.

## Ghi chú rủi ro

- Stack này phức tạp hơn một giao diện chat đơn container và có nhiều secret quan trọng.
- Cấu hình endpoint lưu trữ hoặc public-domain không đúng có thể làm hỏng tải tệp lên và các quy trình nền.
- Triển khai sản xuất cần các kiểm soát mạng, sao lưu và quản lý secret mạnh hơn baseline khởi động này.
