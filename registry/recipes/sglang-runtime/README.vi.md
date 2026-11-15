> [English](README.md) | **Tiếng Việt**

# SGLang Runtime

Baseline runtime SGLang chính thức cho GPU NVIDIA với API tương thích OpenAI, endpoint sinh gốc, tài liệu API Swagger, tham số khởi chạy có thể cấu hình và mount cache Hugging Face bền vững.

## Những gì gói này cung cấp

- Baseline container `lmsysorg/sglang:latest-runtime` chính thức
- Các endpoint tương thích OpenAI dưới `/v1`
- Các endpoint gốc của SGLang như `/generate`, `/health`, `/health_generate`, `/model_info` và `/server_info`
- Tài liệu API tương tác dưới `/docs` và schema OpenAPI dưới `/openapi.json`
- Cache Hugging Face bền vững và mount thư mục mô hình cục bộ tùy chọn
- Kiểm soát kích thước shared-memory cho việc khởi động runtime đa tiến trình ổn định

## Truy cập mặc định

- Tài liệu API: `http://localhost:3097/docs`
- Kiểm tra sức khỏe: `http://localhost:3097/health`
- Kiểm tra sức khỏe với probe sinh: `http://localhost:3097/health_generate`
- API mô hình tương thích OpenAI: `http://localhost:3097/v1/models`
- API sinh gốc: `http://localhost:3097/generate`

## Các dịch vụ đi kèm

- `sglang-runtime`: container runtime SGLang chính thức

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline runtime đơn thận trọng:

- sử dụng image runtime SGLang chính thức được khuyến nghị cho các triển khai container kiểu sản xuất
- khởi động một máy chủ suy luận HTTP duy nhất với một đường dẫn mô hình hoặc repo ID Hugging Face được cấu hình
- hiển thị các endpoint chat, completions, embeddings và khám phá mô hình tương thích OpenAI từ một cổng
- lưu dữ liệu cache Hugging Face tại chỗ để các lần khởi động sau có thể tái sử dụng artifact đã tải
- giữ điều phối phân tán đa node, cấu trúc topology router, Kubernetes operator và tầng gateway tùy chỉnh ngoài phạm vi

Preset này **không** bao gồm:

- tự động benchmark hoặc xác minh kích thước cho mọi họ mô hình SGLang được hỗ trợ
- các sản phẩm chat đi kèm như Open WebUI, Flowise hoặc AnythingLLM
- xác thực doanh nghiệp, kết thúc TLS, chính sách reverse-proxy hoặc cách ly tenant
- bootstrap tensor-parallel đa node, SGLang Model Gateway hoặc kết nối PD-disaggregation

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/sglang-runtime/.env` và thay đổi những mục áp dụng cho môi trường của bạn:

- `SGLANG_MODEL_PATH`
- `SGLANG_SERVED_MODEL_NAME`
- `SGLANG_API_KEY` và `SGLANG_ADMIN_API_KEY` nếu bạn không muốn endpoint cục bộ không yêu cầu xác thực
- `SGLANG_TENSOR_PARALLEL` và `SGLANG_DATA_PARALLEL`
- `SGLANG_CONTEXT_LENGTH`
- `SGLANG_MEM_FRACTION_STATIC`
- `SGLANG_CHUNKED_PREFILL_SIZE`
- `SGLANG_SHM_SIZE`
- `SGLANG_HF_TOKEN` nếu kho mô hình đã chọn bị giới hạn truy cập hoặc riêng tư

Dùng repo ID Hugging Face cho `SGLANG_MODEL_PATH` khi bạn muốn hành vi tải khi khởi động, hoặc gắn các tài nguyên mô hình cục bộ vào `./models` và trỏ `SGLANG_MODEL_PATH` tới đường dẫn được mount đó.

## Ghi chú runtime

- Điểm vào máy chủ được khuyến nghị là `sglang serve`, preset này dùng trực tiếp lệnh đó.
- Cổng nghe HTTP mặc định bên trong container là `30000`, được hiển thị ra ngoài thành `3097` trong recipe này.
- `GET /health` trả về `200` khi máy chủ HTTP truy cập được; `GET /health_generate` thực hiện một probe kiểm tra sức khỏe mạnh hơn và có thể trả về `503` trong khi khởi động hoặc tắt.
- `GET /server_info`, `GET /model_info` và `GET /v1/models` hữu ích cho khám phá runtime và kiểm tra tích hợp phía dưới.
- Tài liệu SGLang khuyến nghị đủ shared memory cho workload Docker; preset này hiển thị `SGLANG_SHM_SIZE` vì lý do đó.
- Nếu các sự cố cụ thể của FlashInfer xuất hiện trên GPU được hỗ trợ, tài liệu upstream gợi ý thử `--attention-backend triton --sampling-backend pytorch`.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/sglang-runtime/cache`
- `registry/recipes/sglang-runtime/models`
- `registry/recipes/sglang-runtime/logs`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata danh mục, mẫu môi trường, định nghĩa compose và tài liệu cho runtime
- căn chỉnh stack compose với hướng dẫn Docker SGLang chính thức, yêu cầu shared-memory và các bề mặt API `/health`, `/health_generate`, `/server_info`, `/model_info`, `/generate` và `/v1/*` được tài liệu hóa
- kết nối các tham số khởi chạy có thể cấu hình cho đường dẫn mô hình, khóa API, song song hóa, phân số bộ nhớ, lập lịch và tùy chọn ghi đè backend
- kiểm tra các tệp recipe bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, tải mô hình hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường Windows này
- hành vi khởi động cho các mô hình Hugging Face bị giới hạn truy cập cần xác thực
- thông lượng, độ trễ, mức sử dụng bộ nhớ hoặc tính ổn định của kernel-backend cho bất kỳ mô hình cụ thể nào trên máy đích
- phục vụ phân tán, router, LoRA, reasoning-parser hoặc quy trình multimodal ngoài baseline này

## Ghi chú giấy phép

- Dự án upstream: `sgl-project/sglang`
- Giấy phép upstream: Apache-2.0
- Hãy xem giấy phép mô hình đã chọn riêng vì giấy phép mô hình có thể khác với giấy phép runtime

## Ghi chú rủi ro

- Tag image `latest-runtime` có thể thay đổi hành vi theo thời gian và có thể yêu cầu điều chỉnh tương thích tiếp theo.
- Các mô hình lớn có thể cần nhiều shared memory, bộ nhớ GPU hoặc đĩa hơn so với baseline recipe này giả định.
- Để `SGLANG_API_KEY` trống sẽ mở ra một endpoint suy luận không yêu cầu xác thực trên mạng cục bộ.
- Một số họ mô hình yêu cầu các cờ bổ sung như `--trust-remote-code`, thiết lập lượng tử hóa (quantization), reasoning parser hoặc ghi đè backend trước khi chúng hoạt động đúng.
