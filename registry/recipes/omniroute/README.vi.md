> [English](README.md) | **Tiếng Việt**

# OmniRoute

Baseline gateway AI OmniRoute chính thức cho người vận hành cần một control plane cục bộ duy nhất cho truy cập LLM đa nhà cung cấp, lưu lượng `/v1` tương thích OpenAI, chuỗi fallback thông minh, khả năng hiển thị giới hạn tốc độ, kiểm soát cache và quan sát dựa trên dashboard.

## Những gì gói này cung cấp

- Baseline container `diegosouzapw/omniroute` chính thức
- Endpoint API tương thích OpenAI hiển thị qua `/v1`
- Dashboard cho onboarding nhà cung cấp, chính sách, combo, khóa API, phân tích, giới hạn, sức khỏe, log và mặt phẳng kiểm toán
- Các tính năng định tuyến thông minh bao gồm chuỗi fallback, thử lại, chọn nhà cung cấp và combo nhận biết chi phí
- Endpoint cache và độ bền cho cache ngữ nghĩa, trạng thái circuit-breaker và khả năng hiển thị giới hạn tốc độ
- Dữ liệu cục bộ bền vững cho trạng thái cơ sở dữ liệu, log, cache và cấu hình nhà cung cấp đã lưu

## Truy cập mặc định

- Dashboard: `http://localhost:20128/dashboard`
- Kiểm tra sức khỏe dashboard: `http://localhost:20128/api/monitoring/health`
- API mô hình tương thích OpenAI: `http://localhost:20129/v1/models`
- Chat completions tương thích OpenAI: `http://localhost:20129/v1/chat/completions`
- Danh mục mô hình dashboard: `http://localhost:20128/api/models`
- Thống kê cache: `http://localhost:20128/api/cache/stats`
- Trạng thái resilience: `http://localhost:20128/api/resilience`
- Tóm tắt telemetry: `http://localhost:20128/api/telemetry/summary`
- Chuỗi fallback: `http://localhost:20128/api/fallback/chains`
- Kiểm soát ngân sách: `http://localhost:20128/api/usage/budget`

## Các dịch vụ đi kèm

- `omniroute`: runtime OmniRoute all-in-one chính thức với dashboard và các mặt phẳng API tương thích OpenAI

## Phạm vi của preset này

Recipe này cố ý tập trung vào hình thái triển khai container đơn chính thức của OmniRoute:

- chạy container OmniRoute upstream từ Docker Hub
- hiển thị các cổng tách biệt để dashboard vẫn ở `20128` và API `/v1` tương thích OpenAI được hiển thị trên `20129`
- lưu trạng thái cục bộ trong `registry/recipes/omniroute/data`
- cho phép người vận hành cấu hình nhà cung cấp upstream, combo, quy tắc fallback, kiểm soát tốc độ, khóa API và chính sách dashboard sau khi khởi động
- giữ hợp đồng tích hợp trung thực: OmniRoute là gateway và control plane, không phải runtime mô hình khép kín

Preset này **không** bao gồm:

- thông tin xác thực nhà cung cấp đi kèm hoặc tài khoản mô hình upstream được kết nối sẵn
- tự động kết thúc TLS sản xuất, gia cố reverse proxy hoặc SSO
- Redis, Postgres riêng hoặc backend quan sát bên ngoài
- mở rộng HA đã kiểm thử, manifest Kubernetes hoặc tích hợp secret-store doanh nghiệp
- giá theo nhà cung cấp, tính đúng đắn của hạn mức hoặc tỷ lệ cache-hit đã kiểm chứng trong môi trường này

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/omniroute/.env` và thay đổi ít nhất:

- `OMNIROUTE_JWT_SECRET`
- `OMNIROUTE_API_KEY_SECRET`
- `OMNIROUTE_INITIAL_PASSWORD`
- `OMNIROUTE_STORAGE_ENCRYPTION_KEY` cho baseline sản xuất mạnh hơn
- `OMNIROUTE_BASE_URL` nếu dịch vụ sẽ không được truy cập tại `http://localhost:20128`
- `OMNIROUTE_CORS_ORIGIN` khi hiển thị API cho các client trình duyệt bên ngoài
- `OMNIROUTE_REQUIRE_API_KEY` và chính sách API-key phía dưới theo tư thế bảo mật của bạn

Sau khi khởi động, hãy đăng nhập dashboard và hoàn tất onboarding nhà cung cấp trước khi kỳ vọng các phản hồi mô hình `/v1` hữu ích.

## Ghi chú runtime

- OmniRoute hiển thị hai bề mặt khám phá mô hình: `GET /api/models` cho danh mục dashboard và `GET /v1/models` cho endpoint tương thích OpenAI đang hoạt động.
- Chế độ cổng tách theo hướng dẫn upstream: `DASHBOARD_PORT` phục vụ dashboard trong khi `API_PORT` phục vụ lưu lượng `/v1/*` riêng biệt.
- Kiểm tra sức khỏe dashboard nhắm tới `/api/monitoring/health` trên cổng dashboard.
- Quản lý cache được hiển thị qua `GET /api/cache/stats` và `DELETE /api/cache/stats`.
- Các bề mặt chính sách resilience và vận hành bao gồm `/api/resilience`, `/api/resilience/reset`, `/api/rate-limits`, `/api/telemetry/summary`, `/api/usage/budget` và `/api/fallback/chains`.
- Nhà cung cấp upstream và alias mô hình được cấu hình sau khi triển khai; một alias đại diện là `cc/claude-sonnet-4-20250514`, nhưng danh sách mô hình thực tế phụ thuộc vào các nhà cung cấp bạn kết nối.
- OmniRoute hỗ trợ chế độ cổng đơn upstream, nhưng recipe này dùng cổng tách vì nó rõ ràng hơn cho người vận hành gateway và dễ tài liệu hóa trong danh mục hơn.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/omniroute/data`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- nghiên cứu dự án upstream OmniRoute chính thức và bản phân phối Docker
- tạo metadata danh mục, mẫu môi trường, định nghĩa compose và tài liệu vận hành cho gateway
- căn chỉnh recipe với hành vi cổng upstream, tương thích `/v1`, đường dẫn dashboard, kiểm tra sức khỏe, thống kê cache, API resilience, API telemetry và các bề mặt quản lý chuỗi fallback
- kiểm tra các tệp recipe mới bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, đăng nhập dashboard, onboarding nhà cung cấp hoặc lưu lượng API, vì Docker không khả dụng trong môi trường Windows này
- hành vi fallback thực tế, cân bằng tải, thử lại, tỷ lệ cache-hit hoặc kiểm soát chi phí với bất kỳ nhà cung cấp upstream nào
- gia cố sản xuất cho TLS, quản lý secret, SSO hoặc backend lưu trữ bên ngoài
- tương thích với mọi nhà cung cấp được hỗ trợ, tích hợp CLI hoặc quy trình dashboard được tài liệu hóa bởi OmniRoute upstream

## Ghi chú giấy phép

- Dự án upstream: `diegosouzapw/OmniRoute`
- Gói và container upstream: `omniroute`, `diegosouzapw/omniroute`
- Hãy xem kho upstream để biết giấy phép hiện tại và bất kỳ phụ thuộc bên thứ ba đi kèm nào trước khi triển khai sản xuất
- Hãy xem xét điều khoản và giấy phép mô hình của từng nhà cung cấp đã kết nối riêng vì OmniRoute chỉ làm trung gian truy cập tới các dịch vụ bên ngoài

## Ghi chú rủi ro

- OmniRoute rộng hơn về vận hành so với một proxy đơn giản, nên nâng cấp có thể ảnh hưởng đến trạng thái dashboard, luồng xác thực, hành vi cache và các endpoint chính sách.
- Nếu không cấu hình nhà cung cấp upstream, bề mặt `/v1` có thể khởi động thành công nhưng vẫn không có mô hình hữu ích để phục vụ.
- Secret bootstrap yếu hoặc mật khẩu khởi đầu không đổi làm giảm đáng kể tư thế bảo mật của triển khai.
- Cổng tách đơn giản hóa vận hành, nhưng cũng đòi hỏi quy tắc firewall và reverse-proxy bao phủ cả listener dashboard và API.
