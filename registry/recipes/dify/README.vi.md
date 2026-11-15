> [English](README.md) | **Tiếng Việt**

# Dify

Bộ Dify tự host thực tế cho NVIDIA GPU, sử dụng các image upstream chính thức cho web UI, API, worker, sandbox, plugin daemon, PostgreSQL, Redis và Weaviate.

## Những gì công thức này cung cấp

- Giao diện web Dify trên cổng `3081`
- Dify API trên cổng `5001`
- Worker nền cho thực thi quy trình và tác vụ theo lịch
- Dịch vụ PostgreSQL, Redis và Weaviate cục bộ cho metadata, hàng đợi và lưu trữ vector
- Dịch vụ sandbox và plugin daemon đi kèm cho thực thi mã và hỗ trợ plugin
- Dữ liệu cục bộ bền vững tại `./data/*`

## Truy cập mặc định

- Web UI: `http://localhost:3081`
- Thiết lập ban đầu: `http://localhost:3081/install`
- Kiểm tra sức khỏe API: `http://localhost:5001/health`
- Tài liệu API: `http://localhost:5001/console/api/docs`

## Các dịch vụ đi kèm

- `web`: frontend Dify chính thức
- `api`: backend Dify chính thức
- `worker`: Celery worker cho dataset, quy trình và tác vụ bất đồng bộ
- `worker_beat`: Celery beat cho tác vụ theo lịch
- `db_postgres`: kho metadata PostgreSQL cục bộ
- `redis`: cache cục bộ và message broker cho hàng đợi
- `weaviate`: vector database cục bộ mặc định
- `sandbox`: sidecar thực thi mã
- `plugin_daemon`: dịch vụ runtime plugin

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, hãy rà soát `./.env` và thay đổi ít nhất các giá trị sau:

- `SECRET_KEY`
- `DB_PASSWORD`
- `REDIS_PASSWORD`
- `SANDBOX_API_KEY`
- `PLUGIN_DAEMON_KEY`
- `PLUGIN_DIFY_INNER_API_KEY`
- `WEAVIATE_API_KEY`

Nếu bạn thay đổi `WEB_HOST_PORT` hoặc `API_HOST_PORT`, cũng cần cập nhật các URL tương ứng sau trong `./.env`:

- `CONSOLE_API_URL`
- `CONSOLE_WEB_URL`
- `SERVICE_API_URL`
- `TRIGGER_URL`
- `APP_API_URL`
- `APP_WEB_URL`
- `FILES_URL`

Nếu bạn thay đổi `REDIS_PASSWORD`, cũng cần cập nhật `CELERY_BROKER_URL` để các dịch vụ worker vẫn xác thực đúng.

## Phạm vi của bản khởi tạo này

Công thức này cố ý giữ một tập con thực tế của triển khai Docker chính thức cho kho lưu trữ này:

- dùng trực tiếp các image upstream chính thức
- dùng PostgreSQL làm cơ sở dữ liệu metadata
- dùng Weaviate làm vector store cục bộ mặc định
- mở web UI trực tiếp trên cổng `3081` thay vì định tuyến qua profile nginx upstream
- mạng ra ngoài của sandbox bị tắt theo mặc định, nên lớp SSRF proxy và reverse proxy upstream không được đóng gói tại đây

## Dữ liệu bền vững

Công thức này lưu trữ dữ liệu tại:

- `registry/recipes/dify/data/postgres`
- `registry/recipes/dify/data/redis`
- `registry/recipes/dify/data/storage`
- `registry/recipes/dify/data/plugin_daemon`
- `registry/recipes/dify/data/weaviate`
- `registry/recipes/dify/data/sandbox`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh các dịch vụ được đóng gói và image tag với bản phân phối Docker chính thức của Dify
- kết nối phụ thuộc dịch vụ cho PostgreSQL, Redis, Weaviate, sandbox, plugin daemon, API, worker và khởi động web
- mở ra các cổng cục bộ dự kiến `3081` và `5001`

Chưa được kiểm chứng tại đây:

- khởi động runtime đầy đủ của mọi dịch vụ Dify trên môi trường làm việc Windows này
- thiết lập ban đầu qua `http://localhost:3081/install`
- cấu hình nhà cung cấp model trực tiếp, lập chỉ mục dataset, cài plugin hoặc mạng ra ngoài của sandbox
- các tùy chọn upstream nginx, certbot, SSRF proxy, cơ sở dữ liệu thay thế hoặc profile vector store thay thế

## Ghi chú giấy phép

- Dự án upstream: `langgenius/dify`
- Giấy phép upstream: Apache License 2.0 được sửa đổi với các điều kiện thương mại và branding frontend bổ sung
- Rà soát điều khoản giấy phép upstream trước khi phân phối lại thương mại hoặc hosting đa tenant.

## Ghi chú rủi ro

- Dify là một bộ đa dịch vụ lớn; việc tải image lần đầu có thể lớn và chậm.
- Công thức này cố ý cắt giảm bề mặt triển khai chính thức, nên các tính năng gắn với nginx, certbot, SSRF proxy hoặc backend lưu trữ thay thế vẫn là công việc theo dõi tiếp của người rà soát.
- Mở cả web UI lẫn API trên cục bộ làm tăng bề mặt tấn công; hãy giữ bộ này trong các mạng đáng tin cậy.
