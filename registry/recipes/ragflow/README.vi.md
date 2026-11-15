> [English](README.md) | **Tiếng Việt**

# RAGFlow

Stack RAGFlow dựa trên image chính thức cho GPU NVIDIA, sử dụng container CPU upstream cùng với Elasticsearch, MySQL, MinIO và Redis.

## Những gì gói này cung cấp

- Web UI RAGFlow trên cổng `3082`
- HTTP API RAGFlow trên cổng `9386`
- Admin API RAGFlow trên cổng `9387`
- Các dịch vụ Elasticsearch, MySQL, MinIO và Redis cục bộ khớp với triển khai Docker upstream
- Dữ liệu cục bộ bền vững và log trong `./data/*`

## Truy cập mặc định

- Web UI: `http://localhost:3082`
- HTTP API: `http://localhost:9386`
- Admin API: `http://localhost:9387`
- Elasticsearch: `http://localhost:1202`
- MinIO API: `http://localhost:9002`
- Bảng điều khiển MinIO: `http://localhost:9003`
- MySQL: `localhost:5456`
- Redis: `localhost:6381`

## Các dịch vụ đi kèm

- `ragflow-cpu`: container web và API RAGFlow upstream chính thức
- `es01`: backend chỉ mục tài liệu và vector Elasticsearch
- `mysql`: cơ sở dữ liệu metadata ứng dụng
- `minio`: lưu trữ đối tượng cho tệp tải lên và artifact được tạo
- `redis`: backend cache và hàng đợi

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, cập nhật `./.env` và thay đổi ít nhất các giá trị sau:

- `ELASTIC_PASSWORD`
- `MYSQL_PASSWORD`
- `MINIO_PASSWORD`
- `REDIS_PASSWORD`

Sau lần đăng nhập đầu tiên, cấu hình các nhà cung cấp mô hình của bạn trong giao diện RAGFlow, hoặc bỏ chú thích và hoàn tất `user_default_llm` trong `service_conf.yaml.template` nếu bạn muốn một nhà cung cấp mặc định được cấu hình sẵn.

Nếu bạn đổi cổng hoặc hostname, hãy giữ `./.env` và `service_conf.yaml.template` đồng bộ để container RAGFlow vẫn có thể truy cập MySQL, MinIO, Redis và Elasticsearch.

## Phạm vi của recipe này

Recipe này cố ý tập trung vào triển khai CPU upstream thực tế cho kho này:

- image `infiniflow/ragflow` chính thức
- engine tài liệu Elasticsearch mặc định
- các phụ thuộc MySQL, MinIO và Redis đi kèm
- `service_conf.yaml.template` cục bộ được mount để tùy chỉnh nhà cung cấp và lưu trữ đơn giản

Recipe này **không** đi kèm:

- chế độ GPU
- sidecar embedding TEI
- thiết lập sandbox executor / gVisor
- các hồ sơ Kibana, Infinity, OceanBase, OpenSearch hoặc SeekDB
- kết nối chứng chỉ HTTPS

## Yêu cầu host

- CPU >= 4 lõi
- RAM >= 16 GB
- Đĩa >= 50 GB
- Docker >= 24 và Docker Compose >= 2.26
- Chỉ image host x86

Nếu bạn dùng Docker Desktop với WSL 2, hãy đảm bảo yêu cầu của Elasticsearch `vm.max_map_count >= 262144` được đáp ứng trước khi khởi động.

## Dữ liệu bền vững

Recipe này lưu trữ dữ liệu tại:

- `registry/recipes/ragflow/data/elasticsearch`
- `registry/recipes/ragflow/data/mysql`
- `registry/recipes/ragflow/data/minio`
- `registry/recipes/ragflow/data/redis`
- `registry/recipes/ragflow/data/ragflow-logs`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, cấu hình dịch vụ, định nghĩa compose và tài liệu
- căn chỉnh các dịch vụ đi kèm và tham chiếu image với triển khai Docker RAGFlow chính thức
- kết nối thứ tự khởi động có kiểm tra sức khỏe cho Elasticsearch, MySQL, MinIO, Redis và dịch vụ RAGFlow CPU
- hiển thị các cổng cục bộ không xung đột cho UI, API, admin API và các dịch vụ dữ liệu đi kèm

Chưa được kiểm chứng tại đây:

- khởi động runtime đầy đủ trên môi trường Windows này
- luồng đăng nhập lần đầu trong trình duyệt
- thiết lập thông tin xác thực nhà cung cấp, nạp tài liệu, chất lượng tìm kiếm hoặc thực thi agent
- các đường dẫn tùy chọn upstream GPU, sandbox, TEI, HTTPS hoặc engine tài liệu thay thế

## Ghi chú giấy phép

- Dự án upstream: `infiniflow/ragflow`
- Giấy phép upstream: Apache License 2.0

## Ghi chú rủi ro

- RAGFlow tốn nhiều tài nguyên; Elasticsearch đặc biệt cần đủ RAM và thiết lập ánh xạ bộ nhớ kernel theo yêu cầu.
- Mật khẩu mặc định chỉ là placeholder. Hãy thay thế chúng trước khi hiển thị stack ra bất kỳ mạng nào không phải cục bộ.
- Các image Docker chính thức được build cho nền tảng x86; ARM64 yêu cầu các bước build image upstream thay vì recipe này.
