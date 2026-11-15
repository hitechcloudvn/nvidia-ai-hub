> [English](README.md) | **Tiếng Việt**

# LibreChat

Bộ LibreChat dựa trên image chính thức cho NVIDIA GPU.

## Những gì công thức này cung cấp

- Giao diện web LibreChat trên cổng `3080`
- Các dịch vụ MongoDB, Meilisearch, pgvector và RAG API tích hợp
- Bind mount bền vững cho upload, log, ảnh, trạng thái MongoDB, Meilisearch và pgvector
- Khóa nhà cung cấp và cài đặt triển khai được điều khiển qua `.env`

## Truy cập mặc định

- Web UI: `http://localhost:3080`
- Endpoint health: `http://localhost:3080/api/health`

## Các dịch vụ đi kèm

- `api`: ứng dụng LibreChat chính
- `mongodb`: cơ sở dữ liệu ứng dụng chính
- `meilisearch`: chỉ mục tìm kiếm cho hội thoại và nội dung
- `vectordb`: cơ sở dữ liệu pgvector cho dữ liệu truy xuất
- `rag_api`: sidecar truy xuất / embeddings được LibreChat sử dụng

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, cập nhật `./.env` với các giá trị mạnh cho:

- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `CREDS_KEY`
- `CREDS_IV`
- `MEILI_MASTER_KEY`

Sau đó đặt ít nhất một thông tin xác thực nhà cung cấp như:

- `OPENAI_API_KEY`
- `ANTHROPIC_API_KEY`
- `GOOGLE_KEY`
- `ASSISTANTS_API_KEY`

## Ghi chú bảo mật

LibreChat có thể kết nối tới các nhà cung cấp từ xa, công cụ, server MCP, action và dịch vụ nội bộ tùy chọn. Hãy rà soát cấu hình cẩn thận trước khi expose ra ngoài localhost. Cấu hình MCP, action hoặc liên quan SSRF sai có thể mở rộng khả năng tiếp cận mạng và lộ dữ liệu.

Công thức này cố ý bắt đầu với tập con compose chính thức nhỏ hơn và để `librechat.yaml` nâng cao, Redis, OAuth, SAML, LDAP và chính sách endpoint tùy chỉnh cho việc tăng cường tiếp theo.
