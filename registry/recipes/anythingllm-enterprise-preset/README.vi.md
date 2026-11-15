> [English](README.md) | **Tiếng Việt**

# AnythingLLM Enterprise Preset

Preset AnythingLLM dùng image chính thức cho các đội NVIDIA GPU muốn một điểm khởi đầu mặc định mạnh hơn về kiểm soát truy cập theo vai trò, trạng thái cục bộ bền vững, quy trình tài liệu, tính năng agent và kết nối Ollama dùng chung.

## Những gì công thức này cung cấp

- Ứng dụng web AnythingLLM trên cổng `3088`
- Container `mintplexlabs/anythingllm` chính thức với bộ lưu trữ được mount bền vững
- Ghép nối mặc định với công thức `ollama-runtime` dùng chung qua `host.docker.internal:11435`
- Lưu trữ cục bộ tích hợp dựa trên LanceDB và SQLite bên trong thư mục lưu trữ AnythingLLM được mount
- Truy cập các khả năng của AnythingLLM như workspace RAG, agent, flow, widget chat nhúng, công cụ tương thích MCP và nạp tài liệu
- Một nền tảng thực tế để chuyển từ thiết lập một người dùng sang kiểm soát truy cập theo vai trò nhiều người dùng trong triển khai Docker

## Truy cập mặc định

- Giao diện web: `http://localhost:3088`
- Kiểm tra sức khỏe API: `http://localhost:3088/api/ping`
- Thiết lập lần chạy đầu: `http://localhost:3088`

## Các dịch vụ đi kèm

- `anythingllm`: image chính thức `mintplexlabs/anythingllm:v1.12.0`
- phụ thuộc bên ngoài vào `ollama-runtime` qua `http://host.docker.internal:11435`

## Phạm vi của preset này

Công thức này cố ý tập trung vào một nền tảng thực tế hướng doanh nghiệp:

- dùng image Docker tự host chính thức thay vì một bản fork tùy chỉnh
- giữ toàn bộ trạng thái bền vững tại `registry/recipes/anythingllm-enterprise-preset/data/storage`
- mặc định dùng Ollama cho cả chat và embeddings, đồng thời vẫn cho phép cấu hình lại sang các nhà cung cấp khác được hỗ trợ trong ứng dụng
- bảo toàn lưu trữ cho tài liệu, vector cache, file database cục bộ, plugin, cấu hình MCP, agent flow và các tài nguyên runtime khác do AnythingLLM quản lý
- hỗ trợ các tính năng bảo mật chỉ có trên Docker như bảo vệ bằng mật khẩu và chế độ nhiều người dùng thông qua giao diện ứng dụng

Preset này **không** bao gồm:

- triển khai PostgreSQL hoặc PGVector bên ngoài
- SSO, reverse proxy, TLS termination hoặc kho bí mật bên ngoài
- tự động sao lưu đi kèm hoặc phân cụm HA
- người dùng admin được tạo sẵn qua bootstrap khi compose
- cấp phát model Ollama trực tiếp

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu:

1. Khởi động `ollama-runtime`.
2. Đảm bảo runtime Ollama dùng chung có ít nhất một model chat và một model embedding khả dụng. Các giá trị mặc định trong công thức này giả định:
   - model chat: `qwen3.5:4b`
   - model embedding: `nomic-embed-text`
3. Rà soát `registry/recipes/anythingllm-enterprise-preset/.env` và thay đổi tối thiểu:
   - `JWT_SECRET`
   - bất kỳ cổng hoặc tùy chọn model nào khác với môi trường của bạn
4. Khởi chạy công thức và hoàn tất hướng dẫn thiết lập ban đầu trong giao diện web.
5. Nếu bạn cần kiểm soát truy cập theo vai trò, hãy bật chế độ nhiều người dùng từ cài đặt bảo mật và tạo tài khoản admin đầu tiên.

## Ghi chú bảo mật và vận hành

- AnythingLLM mở ra cả bảo vệ bằng mật khẩu cho một người dùng và chế độ nhiều người dùng chỉ có trên Docker trong giao diện.
- Upstream ghi rõ rằng chế độ nhiều người dùng không thể hoàn nguyên về chế độ một người dùng.
- Công thức này tắt telemetry theo mặc định qua `DISABLE_TELEMETRY=true`; hãy rà soát lựa chọn này theo yêu cầu hỗ trợ và quan sát của bạn.
- Nếu chạy trên Linux, hãy kiểm tra quyền của đường dẫn lưu trữ được mount khớp với kỳ vọng của người dùng container để tránh vấn đề về quyền sở hữu.
- Nếu Docker host của bạn không phân giải được `host.docker.internal`, hãy điều chỉnh các URL Ollama trong `.env` sang địa chỉ host có thể truy cập.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/anythingllm-enterprise-preset/data/storage/anythingllm.db`
- `registry/recipes/anythingllm-enterprise-preset/data/storage/documents`
- `registry/recipes/anythingllm-enterprise-preset/data/storage/vector-cache`
- `registry/recipes/anythingllm-enterprise-preset/data/storage/lancedb`
- `registry/recipes/anythingllm-enterprise-preset/data/storage/plugins`
- các file khác do runtime quản lý, được AnythingLLM tạo trong cùng gốc lưu trữ

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose, bố cục lưu trữ bền vững và tài liệu
- căn chỉnh triển khai với hướng dẫn khởi động nhanh Docker của upstream AnythingLLM cho lưu trữ được mount và `/app/server/.env`
- xác nhận preset dùng các tính năng bảo mật chỉ có trên Docker được ghi nhận và image tag chính thức
- kiểm tra chẩn đoán trình soạn thảo cho `recipe.yaml`, `.env`, `.env.example`, `docker-compose.yml` và `README.md`

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, hướng dẫn thiết lập lần đầu hoặc bật chế độ nhiều người dùng, vì Docker không khả dụng trong môi trường làm việc Windows này
- kết nối trực tiếp tới `ollama-runtime`
- nạp tài liệu, tạo embedding, thực thi agent, tích hợp MCP hoặc luồng widget nhúng
- cấu hình lại nhà cung cấp bên ngoài như OpenAI, pgvector, Qdrant cloud, Weaviate hoặc phần mở rộng SSO

## Ghi chú giấy phép

- Dự án upstream: `Mintplex-Labs/anything-llm`
- Tài liệu upstream chỉ ra giấy phép MIT cho dự án tự host, nhưng người rà soát vẫn nên xác nhận giấy phép upstream hiện tại và điều khoản image trước khi phân phối lại hoặc đóng gói thương mại.

## Ghi chú rủi ro

- Preset phụ thuộc vào một nhà cung cấp model có thể truy cập; giá trị mặc định giả định công thức `ollama-runtime` riêng biệt đã chạy sẵn và truy cập được từ Docker.
- Chế độ nhiều người dùng là thay đổi vận hành một chiều theo tài liệu upstream.
- Kho tài liệu lớn có thể làm thư mục lưu trữ được mount tăng nhanh vì tài liệu, vector, cache, flow và tài nguyên plugin được lưu cùng nhau.
- Ngay cả với image tag được ghim, hành vi ứng dụng upstream và các biến môi trường được hỗ trợ vẫn có thể thay đổi qua các bản phát hành.
