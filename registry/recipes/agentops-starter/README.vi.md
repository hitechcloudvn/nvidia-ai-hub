> [English](README.md) | **Tiếng Việt**

# AgentOps Starter

Bộ AgentOps tự host khởi tạo cho NVIDIA GPU, sử dụng API, dashboard và OpenTelemetry collector chính thức từ upstream kèm dịch vụ ClickHouse cục bộ đi kèm.

## Những gì công thức này cung cấp

- Dashboard AgentOps trên cổng `3000`
- Backend FastAPI của AgentOps trên cổng `8000`
- Các endpoint OpenTelemetry collector trên cổng `4317` và `4318`
- Dịch vụ ClickHouse cục bộ trên cổng `8123` và `9000`
- Tự động khởi tạo database và schema ClickHouse từ migration chính thức của upstream
- Dữ liệu ClickHouse cục bộ bền vững tại `./data/clickhouse`

## Truy cập mặc định

- Dashboard: `http://localhost:3000`
- Kiểm tra sức khỏe API: `http://localhost:8000/health`
- Tài liệu API: `http://localhost:8000/redoc`
- OTLP gRPC: `localhost:4317`
- OTLP HTTP: `http://localhost:4318/v1/traces`
- ClickHouse HTTP: `http://localhost:8123`

## Phạm vi của bản khởi tạo này

Công thức này cố ý chỉ đóng gói các phần thực tế trong kho lưu trữ này:

- build image AgentOps API chính thức từ kho upstream
- build image dashboard AgentOps chính thức từ kho upstream
- build image OpenTelemetry collector AgentOps chính thức từ kho upstream
- ClickHouse cục bộ để lưu trữ trace và metrics

Công thức này **không** đóng gói một bộ Supabase đầy đủ. Bạn phải cung cấp một trong hai:

- một dự án Supabase bên ngoài, hoặc
- một phiên bản Supabase cục bộ do host quản lý cùng thông tin xác thực phù hợp

## Ghi chú cấu hình

- Cập nhật `.env` trước khi khởi chạy lần đầu. Các khóa Supabase giữ chỗ trong mẫu không thể sử dụng được.
- Nếu bạn dùng phiên bản Supabase cục bộ trên Docker host, giữ `NEXT_PUBLIC_SUPABASE_URL` có thể truy cập từ trình duyệt, nhưng đặt `SUPABASE_HOST=host.docker.internal` để container API có thể kết nối tới Postgres trên host.
- Nếu bạn thay đổi `DASHBOARD_HOST_PORT` hoặc `API_HOST_PORT`, cũng cần cập nhật `APP_URL`, `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_URL`, `APP_DOMAIN` và `API_DOMAIN` để URL trình duyệt và cài đặt CORS của API luôn khớp nhau.
- `NEXT_PUBLIC_PLAYGROUND=false` là giá trị mặc định an toàn hơn cho các thiết lập kiểu Supabase cục bộ mà tài liệu upstream tham chiếu.
- Quá trình build dashboard nhúng các giá trị `NEXT_PUBLIC_*` được chọn vào image tại thời điểm build. Hãy build lại công thức sau khi thay đổi các giá trị đó.

## Dữ liệu bền vững

Công thức này lưu trữ dữ liệu phân tích cục bộ tại:

- `registry/recipes/agentops-starter/data/clickhouse`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh các dịch vụ được đóng gói với hướng dẫn chính thức của AgentOps API, dashboard, OpenTelemetry collector và ClickHouse
- kết nối thứ tự khởi động compose để ClickHouse được khởi tạo trước khi API và collector phụ thuộc vào nó
- mở ra các cổng cục bộ dự kiến `3000`, `8000`, `4317`, `4318`, `8123` và `9000`

Chưa được kiểm chứng tại đây:

- việc build image upstream đầy đủ trên môi trường làm việc Windows này
- đăng nhập dashboard thành công với một dự án Supabase thật
- nhận trace trực tiếp từ SDK bên ngoài vào collector và dashboard cục bộ
- thanh toán, Stripe, Redis hoặc các tích hợp tùy chọn khác của upstream

## Ghi chú giấy phép

- Dự án upstream: `AgentOps-AI/agentops`
- Chỉ báo giấy phép ứng dụng upstream trong tài liệu upstream: Elastic License 2.0 (`ELv2`)
- Rà soát giấy phép upstream trước khi phân phối lại trong sản xuất hoặc thương mại.

## Ghi chú rủi ro

- Các lần build ban đầu có thể lớn và chậm vì công thức build nhiều dịch vụ upstream từ mã nguồn.
- AgentOps phụ thuộc vào thông tin xác thực Supabase đúng và endpoint Postgres có thể truy cập; cài đặt xác thực hoặc host không hợp lệ sẽ ngăn đăng nhập và các thao tác API.
- Schema ClickHouse được lấy từ migration của upstream khi container khởi động, nên thành công của lần chạy đầu phụ thuộc vào khả năng truy cập mạng ra ngoài tới GitHub.
- Việc mở cổng nhận OTLP và cổng dashboard làm tăng bề mặt tấn công cục bộ; hãy giữ bộ này trong các mạng đáng tin cậy.
