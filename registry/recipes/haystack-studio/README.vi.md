> [English](README.md) | **Tiếng Việt**

# Haystack Studio

Bộ Haystack khởi tạo theo phong cách chính thức cho NVIDIA GPU, dùng `Hayhooks` làm lớp phục vụ, `Open WebUI` làm frontend chat, lưu trữ `Qdrant` cục bộ và công thức `ollama-runtime` dùng chung cho cả model chat lẫn embedding.

## Những gì công thức này cung cấp

- Không gian làm việc chat Open WebUI trên cổng `3085`
- Endpoint tương thích OpenAI của Hayhooks trên cổng `1416`
- Endpoint MCP của Hayhooks trên cổng `1417`
- Dịch vụ Qdrant cục bộ trên cổng `6339` và `6340`
- Pipeline Haystack khởi tạo được tự động nạp tại `pipelines/haystack_rag`
- Dữ liệu bền vững tại `./data/open-webui`, `./data/hayhooks` và `./data/qdrant`

## Truy cập mặc định

- Open WebUI: `http://localhost:3085`
- Tài liệu Hayhooks: `http://localhost:1416/docs`
- API tương thích OpenAI của Hayhooks: `http://localhost:1416/v1`
- Qdrant HTTP: `http://localhost:6339`

## Các dịch vụ đi kèm

- image `Hayhooks` tùy chỉnh với tích hợp Haystack, Ollama và Qdrant được cài sẵn
- `ghcr.io/open-webui/open-webui:main` chính thức
- vector database `qdrant/qdrant` chính thức
- phụ thuộc bên ngoài vào `ollama-runtime` qua `http://host.docker.internal:11435`

## Phạm vi pipeline khởi tạo

Wrapper `haystack_rag` đi kèm cố ý hẹp và thực tế:

- đọc file `.txt` cục bộ từ `registry/recipes/haystack-studio/data/documents`
- chia đoạn và nhúng chúng với model embedding của Ollama
- lưu vector vào Qdrant cục bộ
- truy xuất ngữ cảnh cho câu hỏi của người dùng
- trả lời qua pipeline sinh của Haystack dựa trên Ollama
- mở ra cả `/haystack_rag/run` và cách dùng chat tương thích OpenAI qua Hayhooks

Công thức này **không** bao gồm:

- control plane Haystack doanh nghiệp đầy đủ
- xác thực người dùng tích hợp hoặc quản lý bí mật bên ngoài
- lập chỉ mục lại trực tiếp tự động khi file thay đổi
- runtime Ollama đi kèm hoặc tải model

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu:

1. Khởi động `ollama-runtime`.
2. Đảm bảo runtime Ollama dùng chung đã tải cả hai model:
   - model chat: `qwen3.5:4b`
   - model embedding: `nomic-embed-text`
3. Rà soát `registry/recipes/haystack-studio/.env` nếu bạn muốn cổng, model hoặc cài đặt chỉ mục khác.
4. Đặt file tri thức `.txt` của bạn vào `registry/recipes/haystack-studio/data/documents`.

## Ghi chú kết nối Open WebUI

Công thức này cấu hình Open WebUI trao đổi với Hayhooks qua:

- base URL: `http://hayhooks:1416/v1`
- API key: `haystack-studio`

Tên model dự kiến cho yêu cầu chat là `haystack_rag`.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/haystack-studio/data/documents`
- `registry/recipes/haystack-studio/data/open-webui`
- `registry/recipes/haystack-studio/data/hayhooks`
- `registry/recipes/haystack-studio/data/qdrant`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, tài sản build Docker, định nghĩa compose, file pipeline khởi tạo, tài liệu mẫu và tài liệu công thức
- kiểm tra chẩn đoán trình soạn thảo cho `recipe.yaml`, `docker-compose.yml`, `Dockerfile` và `pipelines/haystack_rag/pipeline_wrapper.py`
- xác nhận cú pháp Python cho wrapper pipeline khởi tạo

Chưa được kiểm chứng tại đây:

- `docker compose config` hoặc khởi động container trực tiếp, vì Docker không khả dụng trong môi trường làm việc Windows này
- luồng chat từ Open WebUI tới Hayhooks trực tiếp
- hành vi embedding/generation của Ollama trực tiếp với runtime dùng chung
- hiệu năng lập chỉ mục tài liệu lớn hoặc chất lượng truy xuất

## Ghi chú giấy phép

- Các dự án upstream: `deepset-ai/haystack`, `deepset-ai/hayhooks`, `open-webui/open-webui`, `qdrant/qdrant`
- Rà soát giấy phép từng image và gói upstream trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Khởi động thành công phụ thuộc vào server Ollama dùng chung có thể truy cập và các model cần thiết đã có sẵn.
- Pipeline khởi tạo chỉ lập chỉ mục file `.txt`; các định dạng phong phú hơn sẽ cần bộ chuyển đổi và phụ thuộc bổ sung.
- Open WebUI và Hayhooks phát triển nhanh, nên các thay đổi upstream tương lai có thể yêu cầu cập nhật môi trường hoặc wrapper.
- Công thức này được định hướng cho thử nghiệm cục bộ và mở rộng danh mục công thức, không phải triển khai sản xuất đã tăng cường.
