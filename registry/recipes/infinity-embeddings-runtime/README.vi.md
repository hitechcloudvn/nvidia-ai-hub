> [English](README.md) | **Tiếng Việt**

# Infinity Embeddings Runtime

Nền Infinity v2 chính thức cho NVIDIA GPU với API embeddings tương thích OpenAI, khám phá model, hỗ trợ reranking và classification tùy chọn, tài liệu Swagger, kiểm tra sức khỏe FastAPI và cache Hugging Face bền vững.

## Những gì công thức này cung cấp

- Nền container `michaelf34/infinity` chính thức dùng `infinity_emb v2`
- Endpoint embeddings tương thích OpenAI tại `/v1/embeddings`
- Endpoint khám phá model tại `/v1/models`
- Tài liệu Swagger FastAPI tại `/v1/docs`
- Endpoint kiểm tra sức khỏe tại `/health`
- Endpoint reranking tùy chọn tại `/v1/rerank` cho các model reranker tương thích
- Endpoint classification tùy chọn tại `/v1/classify` cho các model classifier tương thích
- Khởi động đa model tùy chọn bằng cách cung cấp `--model-id` thứ hai
- Áp dụng Bearer-token tùy chọn qua `INFINITY_API_KEY`

## Truy cập mặc định

- Tài liệu Swagger: `http://localhost:7997/v1/docs`
- Kiểm tra sức khỏe: `http://localhost:7997/health`
- Models API: `http://localhost:7997/v1/models`
- Embeddings API: `http://localhost:7997/v1/embeddings`
- Rerank API: `http://localhost:7997/v1/rerank`
- Classify API: `http://localhost:7997/v1/classify`

## Các dịch vụ đi kèm

- `infinity-embeddings-runtime`: container Infinity chính thức

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền compose đơn bảo thủ:

- dùng container Infinity chính thức và trình khởi chạy `infinity_emb v2`
- mở ra các bề mặt được ghi nhận `/health`, `/v1/docs`, `/v1/models`, `/v1/embeddings`, `/v1/rerank` và `/v1/classify`
- lưu bền dữ liệu cache Hugging Face được tải xuống trong bind mount cục bộ để tránh tải lại
- hỗ trợ các điều khiển runtime phổ biến như model ID, engine, dtype, kích thước batch, warmup, lựa chọn thiết bị, từ chối telemetry, log JSON và áp dụng API key tùy chọn
- cho phép model ID thứ hai cho việc phục vụ đa model đơn giản khi người vận hành cần nhiều hơn một model embedding hoặc rerank được triển khai

Preset này **không** bao gồm:

- giao diện chat hoặc vector database đi kèm
- TLS termination sản xuất, cách ly tenant hoặc giới hạn tốc độ bên ngoài
- tinh chỉnh benchmark cho mọi backend Infinity được hỗ trợ, đường dẫn ONNX, TensorRT, ROCm hoặc CPU-only
- tài liệu endpoint scrape Prometheus tường minh vì tài liệu upstream thu thập cho phiên này chưa xác nhận một bề mặt metrics chuyên dụng ổn định
- tinh chỉnh riêng theo khối lượng công việc cho triển khai CLIP, audio, ColBERT hoặc ColPali

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, hãy rà soát `registry/recipes/infinity-embeddings-runtime/.env` và thay đổi các mục phù hợp với môi trường của bạn:

- `INFINITY_MODEL_ID`
- `INFINITY_MODEL_ID_2` nếu bạn muốn model thứ hai được phục vụ
- `INFINITY_API_KEY` nếu bạn không muốn endpoint cục bộ không xác thực
- `INFINITY_ENGINE`
- `INFINITY_DTYPE`
- `INFINITY_EMBEDDING_DTYPE`
- `INFINITY_BATCH_SIZE`
- `INFINITY_DEVICE`
- `INFINITY_MAX_CLIENT_BATCH_SIZE`
- `INFINITY_MAX_INPUT_LENGTH`
- `HF_TOKEN` nếu kho model được chọn bị hạn chế hoặc riêng tư

Dùng model ID Hugging Face khớp với tác vụ dự kiến. Cả model embedding lẫn model reranker đều có thể được phục vụ, nhưng hành vi endpoint phụ thuộc vào năng lực của model được chọn.

## Ghi chú runtime

- Infinity mở tài liệu FastAPI tại URL prefix được cấu hình cộng `/docs`; công thức này dùng `/v1/docs`.
- Prefix tương thích OpenAI gốc trong công thức này là `/v1`, khớp với kỳ vọng client phổ biến và ví dụ LangChain upstream.
- `GET /v1/models` trả về thông tin model được phục vụ và thống kê runtime.
- `POST /v1/embeddings` là API embeddings tương thích OpenAI chính.
- `POST /v1/rerank` theo route rerank của Infinity cho các model reranker tương thích.
- `POST /v1/classify` chỉ khả dụng cho các model classification tương thích.
- `GET /health` trả về phản hồi sẵn sàng đơn giản dựa trên timestamp.
- Infinity hỗ trợ bảo vệ API key qua tùy chọn khởi chạy `--api-key`; công thức này nối vào `INFINITY_API_KEY`.
- Infinity hỗ trợ các backend và họ model bổ sung ngoài embeddings văn bản, nhưng preset này giữ khung danh mục tập trung vào embeddings và các khối lượng công việc truy xuất liên quan.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/infinity-embeddings-runtime/data`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu danh mục, mẫu môi trường, định nghĩa compose và tài liệu cho nền embeddings Infinity
- căn chỉnh bộ compose với hướng dẫn Docker chính thức của Infinity, cách dùng khởi chạy `infinity_emb v2`, các route `/health`, `/v1/docs`, `/v1/models`, `/v1/embeddings`, `/v1/rerank` và `/v1/classify` được ghi trong nguồn upstream
- kết nối các cờ runtime có thể cấu hình cho model ID, URL prefix, engine, dtype, embedding dtype, batching, warmup, lựa chọn thiết bị, ghi log, telemetry và áp dụng API key tùy chọn
- kiểm tra các file công thức theo chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, tải model hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường làm việc Windows này
- hành vi đa model thực tế, reranking hoặc thực thi classification cho bất kỳ model nào được chọn
- thông lượng, độ trễ, sự phù hợp bộ nhớ hoặc hành vi chọn backend cho bất kỳ model nào được chọn trên host mục tiêu
- các biến thể triển khai ONNX, TensorRT, ROCm, CPU-only hoặc Trainium

## Ghi chú giấy phép

- Dự án upstream: `michaelfeil/infinity`
- Giấy phép upstream: MIT
- Rà soát giấy phép của model được chọn riêng vì giấy phép model có thể khác giấy phép runtime

## Ghi chú rủi ro

- Để `INFINITY_API_KEY` trống sẽ mở ra một endpoint suy luận không xác thực trên mạng cục bộ.
- Model embedding hoặc reranking lớn hơn có thể cần nhiều bộ nhớ GPU hơn, cài đặt engine khác hoặc batch size nhỏ hơn mức nền tảng này dùng theo mặc định.
- Một số tính năng nâng cao của Infinity phụ thuộc vào phụ thuộc riêng theo backend hoặc đường dẫn phần cứng chưa được kiểm chứng trong môi trường làm việc này.
- Model không hỗ trợ reranking hoặc classification sẽ trả về lỗi năng lực trên các endpoint tùy chọn đó.
