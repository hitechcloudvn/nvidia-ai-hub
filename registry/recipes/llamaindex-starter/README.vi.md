> [English](README.md) | **Tiếng Việt**

# LlamaIndex Starter

Bộ khởi động LlamaIndex tự host thực tế cho GPU NVIDIA, sử dụng ứng dụng FastAPI cục bộ, lưu trữ vector Qdrant và recipe dùng chung `ollama-runtime` cho các mô hình chat và embedding.

## Những gì gói này cung cấp

- Web UI LlamaIndex starter trên cổng `3084`
- Endpoint kiểm tra sức khỏe FastAPI tại `/health`
- API truy vấn tại `/api/query`
- API xây dựng lại chỉ mục tại `/api/reindex`
- Dịch vụ Qdrant cục bộ trên các cổng `6337` và `6338`
- Dữ liệu tài liệu, lưu trữ và Qdrant bền vững trong `./data/*`

## Truy cập mặc định

- Web UI: `http://localhost:3084`
- Sức khỏe: `http://localhost:3084/health`
- API truy vấn: `http://localhost:3084/api/query`
- API xây dựng lại chỉ mục: `http://localhost:3084/api/reindex`
- Qdrant HTTP: `http://localhost:6337`

## Các dịch vụ đi kèm

- ứng dụng LlamaIndex FastAPI starter cục bộ được xây dựng trong kho này
- container cơ sở dữ liệu vector `qdrant/qdrant` chính thức
- phụ thuộc bên ngoài vào `ollama-runtime` thông qua `http://host.docker.internal:11435`

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên:

1. Khởi động `ollama-runtime`.
2. Đảm bảo runtime Ollama dùng chung đã tải cả hai mô hình:
   - mô hình chat: `qwen3.5:4b`
   - mô hình embedding: `nomic-embed-text`
3. Xem `registry/recipes/llamaindex-starter/.env` nếu bạn muốn đổi cổng, mô hình hoặc thiết lập chia nhỏ (chunking).
4. Đặt các tệp nguồn của bạn vào `registry/recipes/llamaindex-starter/data/documents`.

## Phạm vi của bộ khởi động này

Recipe này cố ý đóng gói một bộ khởi động hẹp, thực tế, phù hợp với các mẫu sử dụng LlamaIndex chính thức:

- nạp tài liệu cục bộ từ một thư mục dữ liệu được mount
- tạo vector index của LlamaIndex với LLM và embeddings trên nền Ollama
- truy vấn (retrieval) trên nền Qdrant cho các thử nghiệm RAG cục bộ có thể lặp lại
- giao diện web cục bộ đơn giản và HTTP API để kiểm tra nhanh

Recipe này **không** bao gồm:

- LlamaCloud hoặc LlamaParse
- một sản phẩm UI full-stack lớn từ upstream
- xác thực doanh nghiệp, quản lý người dùng hoặc kiểm soát đa tenant
- PostgreSQL, Redis, MinIO hoặc các dịch vụ phụ trợ nặng khác

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/llamaindex-starter/data/documents`
- `registry/recipes/llamaindex-starter/data/storage`
- `registry/recipes/llamaindex-starter/data/qdrant`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, tài nguyên build Docker, định nghĩa compose và tài liệu recipe
- kết nối ứng dụng starter với endpoint `ollama-runtime` dùng chung và dịch vụ Qdrant cục bộ
- hiển thị các cổng cục bộ mong đợi `3084`, `6337` và `6338`
- xác minh `docker compose config` phân giải được môi trường, mount và định nghĩa dịch vụ cho recipe này
- kiểm tra chẩn đoán trình soạn thảo cho các tệp recipe mới tạo

Chưa được kiểm chứng tại đây:

- hoàn tất build image Docker cho ứng dụng LlamaIndex trên môi trường Windows này
- truy vấn trực tiếp với máy chủ Ollama đang chạy và các mô hình `qwen3.5:4b` cùng `nomic-embed-text` đã được tải
- độ chính xác hoặc chất lượng truy vấn trên tài liệu do người dùng cung cấp

## Ghi chú giấy phép

- Dự án upstream: `run-llama/llama_index`
- Giấy phép nền tảng starter upstream và framework: MIT
- Hãy xem xét giấy phép image Qdrant riêng trước khi phân phối lại trong môi trường sản xuất

## Ghi chú rủi ro

- Lần khởi động đầu tiên và truy vấn đầu tiên phụ thuộc vào máy chủ Ollama dùng chung có thể truy cập được và các mô hình cần thiết đã sẵn có.
- Các API gói LlamaIndex phát triển nhanh, nên các thay đổi upstream trong tương lai có thể yêu cầu cập nhật ghim phiên bản phụ thuộc.
- Chất lượng truy vấn phụ thuộc vào mô hình embedding đã chọn, chất lượng tài liệu và thiết lập chia nhỏ.
- Đây là quy trình khởi động để thử nghiệm cục bộ, không phải một triển khai doanh nghiệp đã được gia cố.
