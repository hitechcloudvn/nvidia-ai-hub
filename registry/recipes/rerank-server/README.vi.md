> [English](README.md) | **Tiếng Việt**

# Rerank Server

Baseline Hugging Face Text Embeddings Inference chuyên dụng cho GPU NVIDIA, tập trung vào workload reranking cross-encoder với `/rerank`, tài liệu Swagger, kiểm tra sức khỏe, metrics Prometheus và tùy chọn xác thực Bearer-token.

## Những gì gói này cung cấp

- Baseline container `ghcr.io/huggingface/text-embeddings-inference` chính thức
- Endpoint reranking gốc tại `/rerank`
- Tài liệu Swagger dưới `/docs`
- Endpoint kiểm tra sức khỏe tại `/health`
- Endpoint thông tin mô hình tại `/info`
- Metrics Prometheus trên một cổng riêng
- Tùy chọn thực thi Bearer-token thông qua `TEI_API_KEY`

## Truy cập mặc định

- Tài liệu Swagger: `http://localhost:3102/docs`
- Kiểm tra sức khỏe: `http://localhost:3102/health`
- Thông tin mô hình: `http://localhost:3102/info`
- API Rerank: `http://localhost:3102/rerank`
- Metrics: `http://localhost:9001/metrics`

## Các dịch vụ đi kèm

- `rerank-server`: container TEI Hugging Face chính thức được cấu hình cho các mô hình reranker

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline reranker hẹp, chuyên dụng một mục đích:

- sử dụng container GPU TEI chính thức cho một mô hình reranker tại một thời điểm
- hiển thị các bề mặt `/rerank`, `/docs`, `/health`, `/info` và metrics Prometheus được tài liệu hóa
- lưu dữ liệu mô hình đã tải trong một bind mount cục bộ để tránh tải xuống lặp lại
- hỗ trợ các kiểm soát runtime thông dụng như dtype, batching, giới hạn yêu cầu, kích thước payload, telemetry, CORS và tùy chọn thực thi API-key
- định vị TEI như một reranker cục bộ chuyên dụng thay vì một runtime embedding rộng hơn

Preset này **không** bao gồm:

- các endpoint embedding làm bề mặt tích hợp chính được quảng bá, dù TEI hiển thị khả năng rộng hơn tùy loại mô hình
- chat UI đi kèm, cơ sở dữ liệu vector hoặc tầng điều phối truy vấn
- kết thúc TLS sản xuất, cách ly tenant hoặc giới hạn tốc độ bên ngoài
- tinh chỉnh benchmark cho mọi họ reranker được hỗ trợ hoặc mọi thế hệ GPU
- chế độ triển khai gRPC hoặc điều phối đa mô hình

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/rerank-server/.env` và thay đổi những mục áp dụng cho môi trường của bạn:

- `TEI_MODEL_ID`
- `TEI_SERVED_MODEL_NAME`
- `TEI_DTYPE`
- `TEI_MAX_CONCURRENT_REQUESTS`
- `TEI_MAX_BATCH_TOKENS`
- `TEI_MAX_CLIENT_BATCH_SIZE`
- `TEI_API_KEY` nếu bạn không muốn endpoint cục bộ không yêu cầu xác thực
- `HF_TOKEN` nếu kho mô hình đã chọn bị giới hạn truy cập hoặc riêng tư

Sử dụng một mô hình reranker Hugging Face được TEI hỗ trợ. Các ví dụ upstream bao gồm `BAAI/bge-reranker-large`, `BAAI/bge-reranker-base`, `Alibaba-NLP/gte-multilingual-reranker-base` và `Alibaba-NLP/gte-reranker-modernbert-base`.

## Ghi chú runtime

- Hỗ trợ rerank của TEI dành cho các mô hình phân loại chuỗi re-ranker với một lớp duy nhất.
- `POST /rerank` yêu cầu một chuỗi `query` cộng với một mảng `texts` và trả về kết quả đã xếp hạng.
- TEI trả về lỗi loại mô hình khi mô hình đã chọn không phải là mô hình re-ranker.
- Tài liệu Swagger và OpenAPI được hiển thị dưới `/docs`.
- `GET /info` trả về thông tin mô hình đang phục vụ.
- Metrics Prometheus được phục vụ trên một cổng riêng, hiển thị ở đây là `9001`.
- `TEI_API_KEY` bật thực thi Bearer-token ở tầng máy chủ TEI.
- Các GPU có khả năng tính toán CUDA dưới `7.5` không được upstream hỗ trợ.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/rerank-server/data`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata danh mục, mẫu môi trường, định nghĩa compose và tài liệu cho runtime reranker chuyên dụng
- căn chỉnh stack compose với hướng dẫn Docker TEI chính thức cho các mô hình reranker, cách dùng `/rerank` được tài liệu hóa, tài liệu Swagger, kiểm tra sức khỏe, route thông tin mô hình và hỗ trợ metrics Prometheus
- kết nối các cờ runtime có thể cấu hình cho ID mô hình reranker, tên mô hình phục vụ, dtype, batching, kích thước payload, telemetry, CORS và tùy chọn thực thi API-key
- kiểm tra các tệp recipe bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, tải mô hình hoặc reranking trên GPU, vì Docker không khả dụng trong môi trường Windows này
- chất lượng điểm số thực tế, tính đúng đắn của xếp hạng hoặc đặc điểm độ trễ cho bất kỳ mô hình reranker đã chọn nào
- tương thích của mọi họ reranker được TEI hỗ trợ trên GPU đích
- chế độ triển khai gRPC hoặc các quy trình tải sẵn mô hình riêng tư

## Ghi chú giấy phép

- Dự án upstream: `huggingface/text-embeddings-inference`
- Giấy phép upstream: Apache-2.0
- Hãy xem giấy phép mô hình đã chọn riêng vì giấy phép mô hình có thể khác với giấy phép runtime

## Ghi chú rủi ro

- Để `TEI_API_KEY` trống sẽ mở ra một endpoint reranking không yêu cầu xác thực trên mạng cục bộ.
- Các reranker cross-encoder lớn có thể cần nhiều bộ nhớ GPU hơn hoặc giới hạn batch nhỏ hơn so với baseline này dùng mặc định.
- Một ID mô hình không phải reranker sẽ gây ra lỗi yêu cầu trên `/rerank`.
- Người vận hành phải chọn tag image TEI tương thích với thế hệ GPU NVIDIA của họ.
