> [English](README.md) | **Tiếng Việt**

# Windmill

Không gian làm việc Windmill tự host thực tế cho NVIDIA AI Hub sử dụng image chính thức, PostgreSQL cục bộ và một baseline đơn giản gồm server-plus-worker.

## Những gì gói này cung cấp

- Windmill UI và API trên cổng `3014`
- Backend PostgreSQL cục bộ cho trạng thái và hàng đợi tác vụ
- Một worker chuyên dụng để thực thi tự động hóa cục bộ

## Truy cập mặc định

- Windmill UI: `http://localhost:3014`
- Các giá trị admin ban đầu lấy từ `registry/recipes/windmill/.env`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/windmill/.env` trước lần khởi chạy đầu tiên.
- Recipe này cố ý dùng một baseline đơn giản gồm server-plus-worker thay cho stack cục bộ chính thức đầy đủ với Caddy, LSP và multiplayer.
- `BASE_URL` nên khớp với URL được hiển thị ra bên ngoài.
- Worker mount Docker socket và vô hiệu hóa một số mặc định cách ly đặc thù Linux để giữ gần hơn với baseline cục bộ tổng quát.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/windmill/data/postgres`
- `registry/recipes/windmill/data/worker`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh stack với các khái niệm tự host Windmill được tài liệu hóa xung quanh trạng thái dựa trên PostgreSQL, vai trò server và worker
- kiểm tra rằng các cổng, kết nối môi trường và bind mount bền vững nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, luồng đăng nhập lần đầu, thực thi script hoặc worker xử lý tác vụ, vì Docker không khả dụng trong workspace Windows này
- topology đầy đủ chính thức Caddy/LSP/multiplayer
- hardening sản xuất, thiết lập reverse-proxy hoặc các khả năng chỉ dành cho doanh nghiệp

## Ghi chú giấy phép

- Dự án upstream: `windmill-labs/windmill`
- Một số khả năng hợp tác và tự host doanh nghiệp nằm ngoài baseline này và nên được xem xét riêng.

## Ghi chú rủi ro

- Windmill phức tạp hơn về vận hành so với ứng dụng một container vì các vai trò server và worker phải luôn khớp nhau.
- Worker có thể thực thi các tác vụ mạnh mẽ; hãy xem xét ranh giới tin cậy, secret và mức độ lộ Docker socket trước khi dùng trong sản xuất.
