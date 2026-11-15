> [English](README.md) | **Tiếng Việt**

# n8n AI Starter

Bộ khởi động n8n tự host thực tế cho NVIDIA AI Hub, sử dụng image n8n chính thức, PostgreSQL cục bộ và dữ liệu người dùng bền vững.

## Những gì gói này cung cấp

- Trình soạn thảo và giao diện runtime n8n trên cổng `5678`
- Cơ sở dữ liệu PostgreSQL cục bộ cho workflow, thông tin xác thực và metadata thực thi
- Thư mục người dùng `.n8n` bền vững cho khóa mã hóa, log và trạng thái liên quan
- Baseline phù hợp cho workflow AI, agent, tự động hóa, webhook và tác vụ theo lịch

## Truy cập mặc định

- Giao diện n8n: `http://localhost:5678`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/n8n-ai-starter/.env` trước lần khởi động đầu tiên.
- Thay `N8N_ENCRYPTION_KEY` và mật khẩu PostgreSQL bằng các giá trị mạnh.
- Giữ `WEBHOOK_URL`, `N8N_EDITOR_BASE_URL`, host, giao thức và cổng hiển thị đồng bộ nếu bạn đổi cổng mặc định hoặc đặt dịch vụ sau reverse proxy.
- n8n vẫn hưởng lợi từ thư mục `.n8n` bền vững ngay cả khi dùng PostgreSQL, vì nó lưu trữ trạng thái runtime bổ sung ngoài cơ sở dữ liệu.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/n8n-ai-starter/data/postgres`
- `registry/recipes/n8n-ai-starter/data/n8n`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh recipe với hướng dẫn tự host Docker n8n cho image chính thức, cổng `5678`, cấu hình múi giờ và lưu trữ `.n8n` bền vững
- kết nối PostgreSQL làm backend cơ sở dữ liệu bền vững mặc định cho bộ khởi động này

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, onboarding người dùng đầu tiên hoặc thực thi workflow, vì Docker không khả dụng trong môi trường Windows này
- chế độ queue, SSO, tunnel hoặc các tính năng doanh nghiệp

## Ghi chú giấy phép

- Dự án upstream: `n8n-io/n8n`
- Hãy xem xét giấy phép dự án upstream và điều khoản phiên bản trước khi phân phối lại trong sản xuất

## Ghi chú rủi ro

- n8n mạnh mẽ và có thể thực thi logic workflow nhạy cảm, nên các instance hiển thị công khai phải được gia cố cẩn thận.
- `WEBHOOK_URL` hoặc thiết lập reverse-proxy không đúng có thể làm hỏng trigger đến và OAuth callback.
- Secret giữ chỗ không an toàn và phải được thay thế trước khi sử dụng rộng rãi hơn.
