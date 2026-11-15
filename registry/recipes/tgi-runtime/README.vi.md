> [English](README.md) | **Tiếng Việt**

# TGI Runtime

Baseline Hugging Face Text Generation Inference chính thức cho GPU NVIDIA với endpoint sinh, chat completions tương thích OpenAI, tài liệu Swagger, metrics Prometheus và lưu trữ cache mô hình bền vững.

## Những gì gói này cung cấp

- Baseline container `ghcr.io/huggingface/text-generation-inference` chính thức
- Các endpoint sinh gốc như `/generate` và `/generate_stream`
- Chat completions tương thích OpenAI dưới `/v1/chat/completions`
- Tài liệu Swagger dưới `/docs`
- Endpoint sức khỏe và metrics cho các kiểm tra vận hành
- Thiết lập sharding, lượng tử hóa, giới hạn token, tracing và CORS có thể cấu hình

## Truy cập mặc định

- Tài liệu Swagger: `http://localhost:3099/docs`
- Kiểm tra sức khỏe: `http://localhost:3099/health`
- Metrics: `http://localhost:3099/metrics`
- API sinh gốc: `http://localhost:3099/generate`
- API stream gốc: `http://localhost:3099/generate_stream`
- API chat tương thích OpenAI: `http://localhost:3099/v1/chat/completions`

## Các dịch vụ đi kèm

- `tgi-runtime`: container Hugging Face Text Generation Inference chính thức

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline runtime đơn thận trọng:

- sử dụng container GPU TGI chính thức và trình khởi chạy cho runtime một node
- hiển thị các bề mặt `/generate`, `/generate_stream`, `/health`, `/metrics`, `/docs` và `/v1/chat/completions` được tài liệu hóa
- lưu dữ liệu mô hình đã tải trong một bind mount cục bộ để tránh tải xuống lặp lại
- hỗ trợ các kiểm soát runtime thông dụng như số shard, lượng tử hóa, giới hạn token, tracing và cấu hình CORS
- giữ định tuyến nâng cao, điều phối đa mô hình, triển khai Kubernetes và chính sách gateway tùy chỉnh ngoài phạm vi

Preset này **không** bao gồm:

- sản phẩm chat đi kèm hoặc UI ứng dụng
- xác thực sản xuất, kết thúc TLS, cách ly tenant hoặc giới hạn tốc độ bên ngoài
- tinh chỉnh benchmark cho mọi họ mô hình được hỗ trợ
- các biến thể compose riêng cho AMD, Gaudi, Intel hoặc CPU

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/tgi-runtime/.env` và thay đổi những mục áp dụng cho môi trường của bạn:

- `TGI_MODEL_ID`
- `TGI_NUM_SHARD`
- `TGI_QUANTIZE`
- `TGI_MAX_INPUT_LENGTH`
- `TGI_MAX_TOTAL_TOKENS`
- `TGI_MAX_BATCH_PREFILL_TOKENS`
- `TGI_CUDA_MEMORY_FRACTION`
- `TGI_TRUST_REMOTE_CODE`
- `TGI_CORS_ALLOW_ORIGIN`
- `HF_TOKEN` nếu kho mô hình đã chọn bị giới hạn truy cập hoặc riêng tư

Sử dụng một model ID Hugging Face được TGI hỗ trợ và có kích thước phù hợp với ngân sách bộ nhớ GPU mục tiêu.

## Ghi chú runtime

- TGI tài liệu hóa `/docs` là bề mặt OpenAPI và Swagger cho máy chủ REST.
- TGI hỗ trợ cả API sinh gốc và bề mặt Messages API tương thích OpenAI.
- Tài liệu chính thức khuyến nghị `--shm-size 1g` cho workload Docker vì NCCL có thể cần shared memory trong khi suy luận đa GPU.
- Distributed tracing có thể được bật với `--otlp-endpoint`; recipe này hiển thị nó dưới dạng biến môi trường tùy chọn.
- Nếu bạn chạy không có GPU, tài liệu upstream khuyến nghị `--disable-custom-kernels`, nhưng chế độ chỉ-CPU không phải đích triển khai mục tiêu của dự án này.
- Tài liệu upstream nêu rõ TGI đang ở chế độ bảo trì và khuyến nghị đánh giá các engine mới hơn như vLLM hoặc SGLang cho các khoản đầu tư lớn trong tương lai.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/tgi-runtime/data`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata danh mục, mẫu môi trường, định nghĩa compose và tài liệu cho runtime
- căn chỉnh stack compose với các mẫu khởi chạy Docker TGI được tài liệu hóa, các bề mặt API `/docs`, `/generate`, `/generate_stream`, `/health` và `/v1/chat/completions`
- kết nối các cờ runtime có thể cấu hình cho ID mô hình, shard, lượng tử hóa, giới hạn token, tracing, CORS và truy cập mô hình bị giới hạn
- kiểm tra các tệp recipe bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, tải mô hình hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường Windows này
- hành vi tải mô hình bị giới hạn với `HF_TOKEN`
- thông lượng, độ trễ, mức sử dụng bộ nhớ hoặc tính ổn định lượng tử hóa cho bất kỳ mô hình cụ thể nào trên máy đích
- rủi ro bảo trì dài hạn từ trạng thái chế độ bảo trì upstream của TGI

## Ghi chú giấy phép

- Dự án upstream: `huggingface/text-generation-inference`
- Giấy phép upstream: Apache-2.0
- Hãy xem giấy phép mô hình đã chọn riêng vì giấy phép mô hình có thể khác với giấy phép runtime

## Ghi chú rủi ro

- TGI đang ở chế độ bảo trì upstream, nên tốc độ phát triển tính năng dài hạn thấp hơn so với các lựa chọn thay thế đang mở rộng tích cực.
- Các mô hình lớn có thể yêu cầu nhiều bộ nhớ GPU, shared memory hoặc tinh chỉnh shard hơn mức baseline này hiển thị mặc định.
- Để endpoint mà không có lớp bảo mật bên ngoài sẽ mở ra một dịch vụ suy luận cục bộ không yêu cầu xác thực.
- Một số mô hình yêu cầu `--trust-remote-code`, cờ lượng tử hóa hoặc tinh chỉnh giới hạn token mạnh mẽ hơn trước khi chúng hoạt động đúng.
