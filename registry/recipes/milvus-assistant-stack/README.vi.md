> [English](README.md) | **Tiếng Việt**

# Milvus Assistant Stack

Preset Milvus standalone cho người dùng GPU NVIDIA muốn một nền tảng cơ sở dữ liệu vector cục bộ thực tế cho các thử nghiệm truy vấn trợ lý, tìm kiếm trên nền embedding, quản lý collection và các ứng dụng kết nối Ollama dùng chung.

## Những gì gói này cung cấp

- Endpoint gRPC Milvus standalone trên cổng `19531`
- Endpoint kiểm tra sức khỏe Milvus trên cổng `9092`
- Web UI Attu trên cổng `3092`
- Các dịch vụ hỗ trợ nhúng cho metadata và lưu trữ đối tượng của Milvus:
  - `etcd`
  - `minio`
- Lưu trữ bền vững cho trạng thái Milvus, etcd, MinIO và Attu trong `./data/*`
- Một đích cục bộ thực tế cho ứng dụng RAG, hệ thống agent và pipeline embedding cần backend Milvus

## Truy cập mặc định

- Giao diện Attu: `http://localhost:3092`
- Endpoint gRPC Milvus: `localhost:19531`
- Endpoint kiểm tra sức khỏe Milvus: `http://localhost:9092/healthz`
- API MinIO: `http://localhost:9002`
- Bảng điều khiển MinIO: `http://localhost:9003`

## Các dịch vụ đi kèm

- `milvus`: container Milvus standalone chính thức
- `etcd`: engine metadata mà Milvus standalone yêu cầu
- `minio`: lưu trữ đối tượng mà bố cục lưu trữ bền vững của Milvus standalone yêu cầu
- `attu`: giao diện quản lý Milvus trên nền web
- phụ thuộc bên ngoài vào `ollama-runtime` cho các ứng dụng muốn tạo embedding hoặc sinh LLM cục bộ trên các vector được lưu trong Milvus

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline stack vector sẵn sàng cho trợ lý, thực tế:

- khởi động Milvus ở chế độ standalone với các dịch vụ hỗ trợ etcd và MinIO mà Milvus kỳ vọng
- thêm Attu để có thể kiểm tra collection, schema, dữ liệu và các thao tác tìm kiếm vector từ trình duyệt
- lưu trữ toàn bộ dữ liệu dịch vụ chính tại chỗ để thử nghiệm an toàn khi khởi động lại
- giữ stack tổng quát để Langflow, Flowise, AnythingLLM, ứng dụng tùy chỉnh hoặc các mục danh mục trong tương lai có thể kết nối Milvus làm backend vector

Preset này **không** bao gồm:

- tạo collection tự động, tác vụ embedding hoặc pipeline nạp tài liệu
- logic bootstrap embedding Ollama được cấu hình sẵn bên trong chính Milvus
- một máy chủ ứng dụng đi kèm ghi vector vào Milvus thay bạn
- TLS, gia cố reverse proxy, cụm Milvus đa node hoặc tự động sao lưu
- tuyên bố rằng các tính năng AI agent tích hợp của Attu đã hoàn toàn sẵn sàng sản xuất trong môi trường này

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên:

1. Xem `registry/recipes/milvus-assistant-stack/.env`.
2. Đổi `MINIO_SECRET_KEY`.
3. Tùy chọn đặt `MILVUS_USERNAME` và `MILVUS_PASSWORD` nếu quy trình triển khai Milvus của bạn yêu cầu Attu cấu hình sẵn truy cập có xác thực.
4. Khởi động recipe.
5. Kết nối ứng dụng hoặc công cụ quy trình làm việc của bạn tới `localhost:19531` hoặc `milvus:19530` bên trong mạng compose.

## Ghi chú về Attu và ứng dụng

- Attu tự động tạo kết nối trong lần khởi động đầu tiên khi `MILVUS_ADDRESS` được cung cấp.
- `MILVUS_ADDRESS` phải truy cập được từ bên trong container Attu, nên recipe này dùng `milvus:19530` thay vì `localhost`.
- Attu lưu trữ kết nối cục bộ và cơ sở dữ liệu tùy chọn tại `registry/recipes/milvus-assistant-stack/data/attu`.
- Nếu bạn dùng Flowise, Langflow hoặc dịch vụ Python tùy chỉnh, hãy trỏ chúng tới endpoint Milvus và quản lý embedding qua tầng ứng dụng.
- `OLLAMA_BASE_URL` được đưa vào mẫu môi trường như một ghi chú tiện lợi cho các ứng dụng xung quanh, nhưng chính Milvus không tiêu thụ biến đó trực tiếp trong stack compose này.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/milvus-assistant-stack/data/milvus`
- `registry/recipes/milvus-assistant-stack/data/etcd`
- `registry/recipes/milvus-assistant-stack/data/minio`
- `registry/recipes/milvus-assistant-stack/data/attu`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose, bố cục lưu trữ bền vững và tài liệu
- căn chỉnh cấu trúc Milvus standalone với kỳ vọng upstream của Milvus cho chế độ standalone sử dụng các cổng dịch vụ `etcd`, `minio` và Milvus
- căn chỉnh endpoint kiểm tra sức khỏe Milvus và các đường dẫn lưu trữ với các mẫu sử dụng Milvus hiện có trong kho này
- căn chỉnh các biến môi trường Attu với hướng dẫn Docker upstream hiện tại cho `MILVUS_ADDRESS`, `MILVUS_NAME`, `MILVUS_DATABASE`, thông tin xác thực và `ATTU_DB_PATH`

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, đăng nhập Attu, tạo collection hoặc tìm kiếm vector, vì Docker không khả dụng trong môi trường Windows này
- các luồng Milvus có xác thực ngoài các placeholder môi trường được tài liệu hóa
- hiệu năng nạp dữ liệu, hành vi lập chỉ mục hoặc tương thích với mọi framework RAG phía dưới
- thao tác cụm, TLS hoặc sao lưu/phục hồi trong sản xuất

## Ghi chú giấy phép

- Dự án Milvus upstream: `milvus-io/milvus`
- Image Attu upstream: `zilliz/attu`
- Phiên bản Attu `2.6.0` trở lên được phân phối theo giấy phép độc quyền; hãy xem xét điều khoản upstream trước khi phân phối lại hoặc đóng gói sản xuất

## Ghi chú rủi ro

- Milvus standalone phụ thuộc vào etcd và MinIO, nên hỏng lưu trữ hoặc cấu hình sai ở một trong hai dịch vụ hỗ trợ có thể ảnh hưởng đến toàn bộ stack.
- Tương thích phiên bản Attu có thể khác nhau giữa các bản phát hành Milvus; người đánh giá nên kiểm tra hành vi UI với image tag Milvus cụ thể mà họ dự định giữ.
- Preset này cố ý dừng ở việc dựng hạ tầng và không tuyên bố chất lượng nạp hoặc truy vấn đầu-cuối của trợ lý đã được kiểm chứng.
- Việc mở cổng cho Milvus, MinIO và Attu hữu ích cho công việc tích hợp cục bộ nhưng nên được xem xét cẩn thận trước khi mở rộng ra mạng rộng hơn.
