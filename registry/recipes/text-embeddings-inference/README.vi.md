> [English](README.md) | **Tiếng Việt**

# Text Embeddings Inference

Baseline Hugging Face Text Embeddings Inference chính thức cho GPU NVIDIA với API embedding nhanh, hỗ trợ reranking, endpoint phân loại chuỗi, tài liệu Swagger, metrics Prometheus và tùy chọn xác thực kiểu OpenAI.

## Những gì gói này cung cấp

- Baseline container `ghcr.io/huggingface/text-embeddings-inference` chính thức
- Endpoint embedding gốc tại `/embed`
- Endpoint reranking gốc tại `/rerank`
- Endpoint dự đoán gốc tại `/predict` cho các mô hình phân loại chuỗi được hỗ trợ
- Endpoint embedding thưa (sparse) tại `/embed_sparse` khi pooling SPLADE tương thích được bật
- Tài liệu Swagger dưới `/docs`
- Endpoint kiểm tra sức khỏe và metrics Prometheus cho các kiểm tra vận hành

## Truy cập mặc định

- Tài liệu Swagger: `http://localhost:3101/docs`
- Kiểm tra sức khỏe: `http://localhost:3101/health`
- Metrics: `http://localhost:9000/metrics`
- API Embed: `http://localhost:3101/embed`
- API Rerank: `http://localhost:3101/rerank`
- API Predict: `http://localhost:3101/predict`
- API embedding thưa: `http://localhost:3101/embed_sparse`

## Các dịch vụ đi kèm

- `text-embeddings-inference`: container Hugging Face Text Embeddings Inference chính thức

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline runtime đơn thận trọng:

- sử dụng container GPU TEI chính thức cho một mô hình embedding, reranking hoặc phân loại chuỗi tại một thời điểm
- hiển thị các bề mặt `/embed`, `/rerank`, `/predict`, `/embed_sparse`, `/docs` và metrics được tài liệu hóa
- lưu dữ liệu mô hình đã tải trong một bind mount cục bộ để tránh tải xuống lặp lại
- hỗ trợ các kiểm soát runtime thông dụng như dtype, pooling, batching, mặc định prompt, giới hạn yêu cầu, telemetry và tùy chọn xác thực Bearer-token
- giữ các biến thể gRPC, điều phối đa mô hình, triển khai Kubernetes và chính sách gateway tùy chỉnh ngoài phạm vi

Preset này **không** bao gồm:

- sản phẩm chat đi kèm hoặc UI ứng dụng
- kết thúc TLS sản xuất, cách ly tenant hoặc giới hạn tốc độ bên ngoài
- tinh chỉnh benchmark cho mọi họ mô hình embedding hoặc reranker được hỗ trợ
- một runtime đồng hành thứ hai cho định tuyến đa mô hình hoặc fallback

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/text-embeddings-inference/.env` và thay đổi những mục áp dụng cho môi trường của bạn:

- `TEI_MODEL_ID`
- `TEI_SERVED_MODEL_NAME`
- `TEI_DTYPE`
- `TEI_POOLING` khi bạn cần ghi đè mặc định của mô hình
- `TEI_MAX_BATCH_TOKENS`
- `TEI_MAX_CONCURRENT_REQUESTS`
- `TEI_MAX_CLIENT_BATCH_SIZE`
- `TEI_API_KEY` nếu bạn không muốn endpoint cục bộ không yêu cầu xác thực
- `HF_TOKEN` nếu kho mô hình đã chọn bị giới hạn truy cập hoặc riêng tư

Sử dụng một model ID Hugging Face được gắn nhãn cho Text Embeddings Inference và có kích thước phù hợp với ngân sách bộ nhớ GPU mục tiêu.

## Ghi chú runtime

- TEI mặc định dùng cổng `3000` bên trong container; recipe này hiển thị nó ra ngoài trên cổng `3101`.
- TEI hiển thị tài liệu Swagger và OpenAPI dưới `/docs`.
- Runtime hỗ trợ các mô hình embedding, reranking và phân loại chuỗi, nhưng tập endpoint phụ thuộc vào họ mô hình đã chọn.
- `TEI_API_KEY` bật thực thi Bearer-token ở tầng máy chủ TEI.
- Metrics Prometheus được phục vụ trên một cổng riêng, hiển thị ở đây là `9000`.
- Tài liệu upstream cũng cung cấp các biến thể image gRPC, nhưng baseline này chỉ giữ container HTTP tiêu chuẩn.
- Các GPU có khả năng tính toán CUDA dưới `7.5` không được upstream hỗ trợ.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/text-embeddings-inference/data`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata danh mục, mẫu môi trường, định nghĩa compose và tài liệu cho runtime
- căn chỉnh stack compose với cách dùng Docker TEI chính thức, hướng dẫn image GPU được hỗ trợ và các bề mặt `/docs`, `/embed`, `/rerank`, `/predict`, `/embed_sparse`, `/health` cùng metrics Prometheus được tài liệu hóa
- kết nối các cờ runtime có thể cấu hình cho ID mô hình, tên mô hình phục vụ, dtype, pooling, batching, mặc định prompt, kích thước payload, telemetry, CORS và tùy chọn thực thi API-key
- kiểm tra các tệp recipe bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, tải mô hình hoặc suy luận embedding trên GPU, vì Docker không khả dụng trong môi trường Windows này
- hành vi reranking, embedding thưa hoặc phân loại chuỗi thực tế cho bất kỳ mô hình đã chọn nào
- thông lượng, độ trễ, mức sử dụng bộ nhớ hoặc tính ổn định batching cho bất kỳ mô hình đã chọn nào trên máy đích
- chế độ triển khai gRPC hoặc các quy trình tải sẵn cách ly mạng

## Ghi chú giấy phép

- Dự án upstream: `huggingface/text-embeddings-inference`
- Giấy phép upstream: Apache-2.0
- Hãy xem giấy phép mô hình đã chọn riêng vì giấy phép mô hình có thể khác với giấy phép runtime

## Ghi chú rủi ro

- Một số tag image TEI dành riêng cho khả năng tính toán; người vận hành phải chọn image tương thích với thế hệ GPU NVIDIA của họ.
- Các mô hình embedding hoặc reranker lớn có thể yêu cầu nhiều bộ nhớ GPU hơn hoặc kiểm soát batching chặt chẽ hơn mức baseline này hiển thị mặc định.
- Để `TEI_API_KEY` trống sẽ mở ra một endpoint suy luận không yêu cầu xác thực trên mạng cục bộ.
- Một số họ mô hình nhất định có thể yêu cầu mặc định prompt, ghi đè pooling hoặc truy cập mô hình bị giới hạn trước khi chúng hoạt động như mong đợi.
