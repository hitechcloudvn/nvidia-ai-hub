> [English](README.md) | **Tiếng Việt**

# Langflow RAG Preset

Preset Langflow dùng image chính thức cho người dùng NVIDIA GPU muốn một điểm khởi đầu thực tế cho pipeline RAG cục bộ, điều phối agent, phát triển flow trực quan và kết nối Ollama dùng chung mà không cần duy trì image tùy chỉnh.

## Những gì công thức này cung cấp

- Giao diện web Langflow trên cổng `3090`
- Container `langflowai/langflow:latest` chính thức
- Cấu hình và trạng thái runtime Langflow bền vững tại `./data/langflow`
- Lưu bền database cục bộ tích hợp qua `LANGFLOW_SAVE_DB_IN_CONFIG_DIR=true`
- Truy cập sẵn sàng API key mặc định cho tự động hóa `/api/v1`
- Ghép nối mặc định với công thức `ollama-runtime` dùng chung qua `http://host.docker.internal:11435`
- Một nền tảng thực tế cho flow RAG, quy trình agent, chuỗi prompt, nạp tài liệu và kiểm thử tương thích OpenAI với model cục bộ

## Truy cập mặc định

- Web UI: `http://localhost:3090`
- API base: `http://localhost:3090/api/v1`
- Thiết lập và đăng nhập lần chạy đầu: `http://localhost:3090`

## Các dịch vụ đi kèm

- `langflow`: container ứng dụng Langflow chính thức
- phụ thuộc bên ngoài vào `ollama-runtime` qua `http://host.docker.internal:11435`

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền tảng thực tế tập trung vào RAG:

- dùng image Langflow chính thức thay vì build tùy chỉnh
- lưu bền thư mục cấu hình ứng dụng để flow, file database cục bộ, upload, log, biến, dữ liệu monitor và vật liệu bí mật sống qua các lần khởi động lại
- mặc định lưu bền trong thư mục cấu hình tích hợp thay vì yêu cầu PostgreSQL ngay lần khởi chạy đầu
- mở hỗ trợ API key dựa trên môi trường cho kiểm thử tích hợp tự động hóa và client
- giả định suy luận chat và embedding cục bộ đến từ công thức `ollama-runtime` riêng biệt hoặc endpoint tương thích OpenAI / Ollama khác có thể truy cập
- để việc thiết kế flow, kết nối biến, chọn vector store và thông tin xác thực nhà cung cấp nằm trong giao diện Langflow sau khi khởi chạy

Preset này **không** bao gồm:

- triển khai PostgreSQL đi kèm
- vector database đi kèm như Qdrant, Milvus hoặc OpenSearch
- reverse proxy, TLS termination, SSO hoặc kho bí mật bên ngoài
- component tùy chỉnh, flow khởi tạo được nạp sẵn hoặc nhập flow tự động
- phân cụm HA, worker hàng đợi hoặc mở rộng ngang cấp sản xuất
- model Ollama được nạp sẵn

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu:

1. Khởi động `ollama-runtime`.
2. Đảm bảo runtime Ollama dùng chung có các model bạn muốn dùng cho chat và embeddings.
3. Rà soát `registry/recipes/langflow-rag-preset/.env` và thay đổi tối thiểu:
   - `LANGFLOW_SECRET_KEY`
   - `LANGFLOW_SUPERUSER_PASSWORD`
   - `LANGFLOW_API_KEY`
4. Khởi chạy công thức và đăng nhập với thông tin xác thực superuser đã cấu hình.
5. Trong Langflow, tạo hoặc cập nhật flow để dùng endpoint model cục bộ, embeddings và retriever ưa thích của bạn.

## Ghi chú Ollama và API

- Preset này mở cả `OLLAMA_BASE_URL` lẫn `OPENAI_API_BASE` để flow có thể kết nối với tích hợp gốc của Ollama hoặc endpoint tương thích OpenAI dựa trên runtime dùng chung.
- `OPENAI_API_KEY=ollama` mặc định là placeholder tương thích thường dùng với runtime cục bộ tương thích OpenAI.
- Nếu `host.docker.internal` không phân giải được trên host của bạn, hãy đổi các biến endpoint trước khi khởi chạy.
- Client API Langflow có thể dùng `x-api-key: <LANGFLOW_API_KEY>` với `http://localhost:3090/api/v1`.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/langflow-rag-preset/data/langflow`
- các file database cục bộ do Langflow tạo trong thư mục cấu hình đó
- file được tải lên, log, biến, dữ liệu monitor và tài sản do runtime quản lý do Langflow tạo trong cùng thư mục

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose, bố cục lưu trữ bền vững và tài liệu
- căn chỉnh preset với hướng dẫn Docker và biến môi trường Langflow upstream cho lưu bền thư mục cấu hình, cấu hình API key, cấu hình secret key và triển khai image chính thức
- khớp các họ biến môi trường Langflow được ghi nhận cho host/port, thư mục cấu hình, lưu bền database, xác thực, nguồn API key, giới hạn tải lên, ghi log và truy cập runtime tương thích OpenAI
- kiểm tra chẩn đoán trình soạn thảo cho `recipe.yaml`, `.env`, `.env.example`, `docker-compose.yml` và `README.md`

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, đăng nhập lần đầu hoặc thực thi flow, vì Docker không khả dụng trong môi trường làm việc Windows này
- tải tài liệu trực tiếp, lập chỉ mục vector hoặc chất lượng đầu ra RAG
- gọi API với phiên bản `/api/v1` đang chạy
- triển khai dựa trên PostgreSQL, mở rộng đa phiên bản hoặc mẫu triển khai chỉ dành cho doanh nghiệp

## Ghi chú giấy phép

- Dự án upstream: `langflow-ai/langflow`
- Rà soát giấy phép kho upstream và điều khoản container đã công bố trước khi phân phối lại hoặc đóng gói sản xuất

## Ghi chú rủi ro

- Image tag `latest` có thể thay đổi hành vi theo thời gian và có thể cần điều chỉnh env hoặc quy trình giao diện.
- Langflow có thể thực thi flow, công cụ và tích hợp do người dùng định nghĩa, nên component tùy chỉnh, bí mật và connector bên ngoài nên được coi là bề mặt nhạy cảm về bảo mật.
- Thử nghiệm lớn và tài sản được tải lên có thể làm thư mục cấu hình được mount tăng nhanh vì flow, log, file database cục bộ và tạo phẩm runtime được lưu bền cùng nhau.
- Preset này là một điểm khởi đầu danh mục thực tế, không phải kiến trúc sản xuất đã tăng cường.
