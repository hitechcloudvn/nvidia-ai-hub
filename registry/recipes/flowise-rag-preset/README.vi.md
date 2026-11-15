> [English](README.md) | **Tiếng Việt**

# Flowise RAG Preset

Preset Flowise dùng image chính thức cho người dùng NVIDIA GPU muốn một điểm khởi đầu thực tế cho nạp tài liệu, thử nghiệm RAG dựa trên chatflow, quy trình agent và kết nối Ollama dùng chung mà không cần build image tùy chỉnh.

## Những gì công thức này cung cấp

- Giao diện web Flowise trên cổng `3089`
- Container `flowiseai/flowise:latest` chính thức
- Trạng thái Flowise cục bộ bền vững tại `./data/flowise`
- Lưu trữ metadata dựa trên SQLite, lưu trữ upload cục bộ, bí mật dạng file và log cục bộ trong thư mục home Flowise được mount
- Ghép nối mặc định với công thức `ollama-runtime` dùng chung qua `http://host.docker.internal:11435`
- Một nền tảng thực tế để xây dựng chatflow RAG, document store, agent flow, API key và tự động hóa quy trình trong giao diện Flowise

## Truy cập mặc định

- Web UI: `http://localhost:3089`
- Gốc app/API chính: `http://localhost:3089/api/v1`
- Thiết lập và đăng nhập lần chạy đầu: `http://localhost:3089`

## Các dịch vụ đi kèm

- `flowise`: container ứng dụng Flowise chính thức
- phụ thuộc bên ngoài vào `ollama-runtime` qua `http://host.docker.internal:11435`

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền tảng thực tế tập trung vào RAG:

- dùng image Flowise chính thức thay vì build tùy chỉnh
- lưu bền toàn bộ thư mục home Flowise để các file database cục bộ, log, bí mật, upload và tài nguyên runtime do ứng dụng quản lý sống qua các lần khởi động lại
- mặc định dùng lưu trữ SQLite cục bộ để khởi động nhanh hơn trong danh mục này
- giả định suy luận chat và embedding đến từ công thức `ollama-runtime` riêng biệt hoặc endpoint tương thích Ollama khác có thể truy cập
- để việc thiết kế chatflow, tạo document store, chọn embedding và tạo API key cho giao diện Flowise sau lần khởi chạy đầu

Preset này **không** bao gồm:

- vector database đi kèm như Qdrant, Milvus hoặc OpenSearch
- flow JSON khởi tạo dựng sẵn hoặc logic bootstrap tự động nhập
- reverse proxy, TLS termination, SSO hoặc hệ thống quản lý bí mật bên ngoài
- triển khai hàng đợi chế độ worker, mở rộng dựa trên Redis hoặc phân cụm HA
- model Ollama được nạp sẵn

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu:

1. Khởi động `ollama-runtime`.
2. Đảm bảo runtime Ollama dùng chung có các model bạn muốn dùng cho chat và embeddings.
3. Rà soát `registry/recipes/flowise-rag-preset/.env` và thay đổi tối thiểu:
   - `FLOWISE_SECRETKEY_OVERWRITE`
   - `TOKEN_HASH_SECRET`
   - `EXPRESS_SESSION_SECRET`
   - `JWT_AUTH_TOKEN_SECRET`
   - `JWT_REFRESH_TOKEN_SECRET`
4. Khởi chạy công thức và hoàn tất thiết lập Flowise lần đầu trong giao diện web.
5. Trong Flowise, tạo thông tin xác thực và chatflow trỏ tới endpoint Ollama của bạn nếu `OLLAMA_BASE_URL` mặc định khác bố cục mạng Docker của bạn.

## Ghi chú kết nối Ollama

- Preset này mặc định `OLLAMA_BASE_URL=http://host.docker.internal:11435` để khớp với mẫu công thức runtime dùng chung đã được dùng trong kho lưu trữ này.
- Nếu `host.docker.internal` không phân giải được trên host của bạn, hãy đổi `OLLAMA_BASE_URL` sang địa chỉ có thể truy cập trước khi khởi chạy.
- Lựa chọn model, embeddings, retriever và vector store trong Flowise được cấu hình theo từng thông tin xác thực và từng flow trong giao diện.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/flowise-rag-preset/data/flowise/database.sqlite`
- `registry/recipes/flowise-rag-preset/data/flowise/storage`
- `registry/recipes/flowise-rag-preset/data/flowise/logs`
- `registry/recipes/flowise-rag-preset/data/flowise/encryption.key`
- các file bí mật xác thực bổ sung và tài nguyên runtime do ứng dụng quản lý, được Flowise tạo trong cùng thư mục được mount

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose, bố cục lưu trữ bền vững và tài liệu
- căn chỉnh preset với hướng dẫn Docker Flowise upstream cho database, log, khóa bí mật và đường dẫn lưu trữ cục bộ được lưu bền
- khớp các họ biến môi trường Flowise được ghi nhận cho cổng, lưu trữ SQLite, blob storage, ghi log, lưu bền bí mật và kết nối Ollama
- kiểm tra chẩn đoán trình soạn thảo cho `recipe.yaml`, `.env`, `.env.example`, `docker-compose.yml` và `README.md`

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, đăng nhập lần đầu hoặc thực thi chatflow, vì Docker không khả dụng trong môi trường làm việc Windows này
- tải tài liệu trực tiếp, lập chỉ mục vector hoặc chất lượng câu trả lời RAG
- tạo API key và gọi `/api/v1` bên ngoài với phiên bản đang chạy
- chế độ hàng đợi, chế độ worker, tính năng doanh nghiệp hoặc backend cơ sở dữ liệu bên ngoài

## Ghi chú giấy phép

- Dự án upstream: `FlowiseAI/Flowise`
- Rà soát giấy phép kho upstream và điều khoản container đã công bố trước khi phân phối lại hoặc đóng gói sản xuất.

## Ghi chú rủi ro

- Image tag `latest` có thể thay đổi hành vi theo thời gian và có thể cần điều chỉnh env hoặc quy trình giao diện.
- Flowise có thể thực thi công cụ, loader và tích hợp do người dùng cấu hình, nên người rà soát nên coi cài đặt Custom Tool và phụ thuộc bên ngoài là bề mặt nhạy cảm về bảo mật.
- Tải tài liệu lớn và các thử nghiệm lặp lại có thể làm thư mục Flowise được mount tăng nhanh vì file database, upload, log và file bí mật đều được lưu bền cùng nhau.
- Preset này là một điểm khởi đầu danh mục thực tế, không phải kiến trúc sản xuất đã tăng cường.
