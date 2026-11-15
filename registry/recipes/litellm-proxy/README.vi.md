> [English](README.md) | **Tiếng Việt**

# LiteLLM Proxy

Nền proxy LiteLLM chính thức cho NVIDIA GPU với một endpoint tương thích OpenAI dùng chung, định tuyến model theo cấu hình, áp dụng API key tập trung và health API phía trước nhiều backend vLLM chuyên dụng.

## Những gì công thức này cung cấp

- Container proxy `ghcr.io/berriai/litellm:main-stable` chính thức
- Một endpoint tương thích OpenAI dùng chung trên cổng `4000`
- Định tuyến `model_list` theo cấu hình qua `config.yaml`
- Áp dụng `master_key` tập trung cho các client gọi proxy
- Các endpoint health LiteLLM tích hợp gồm `/health`, `/health/readiness`, `/health/liveness` và `POST /health/test_connection`
- Hai backend vLLM tương thích OpenAI chuyên dụng được phát hành phía sau proxy cho một bộ khởi tạo đa model thực tế

## Tại sao có công thức này

Công thức `vllm-multi-model-gateway` trước đó chứng minh mẫu tối thiểu trung thực nhất để phục vụ nhiều model nền sau một điểm vào. Công thức LiteLLM này tiến thêm một bước trong stack:

- giữ chính proxy LiteLLM upstream làm lớp định tuyến thay vì một gateway tùy chỉnh
- dùng định nghĩa `model_list` trong `config.yaml` chính thức thay vì logic điều phối yêu cầu viết cứng
- giữ các tiến trình backend vLLM riêng biệt vì một server vLLM tương thích OpenAI vẫn chỉ phục vụ một model nền tại một thời điểm
- giới thiệu bề mặt health và chính sách phong phú hơn của LiteLLM mà người vận hành thường cần trước khi client bên ngoài kết nối

## Truy cập mặc định

- Proxy models API: `http://localhost:4000/v1/models`
- Proxy chat completions: `http://localhost:4000/v1/chat/completions`
- Proxy liveness: `http://localhost:4000/health/liveness`
- Proxy readiness: `http://localhost:4000/health/readiness`
- Proxy model health: `http://localhost:4000/health`
- Proxy connection test: `http://localhost:4000/health/test_connection`
- Backend A models API trực tiếp: `http://localhost:9013/v1/models`
- Backend B models API trực tiếp: `http://localhost:9014/v1/models`

## Các dịch vụ đi kèm

- `litellm`: container proxy LiteLLM chính thức
- `vllm-model-a`: backend vLLM chuyên dụng cho một model alias được cấu hình
- `vllm-model-b`: backend vLLM chuyên dụng thứ hai cho một model alias khác được cấu hình

## Phạm vi của preset này

Công thức này cố ý cung cấp một bộ khởi tạo LiteLLM thực tế thay vì một control plane sản xuất đầy đủ.

Bao gồm tại đây:

- khởi động proxy LiteLLM chính thức qua `litellm --config /app/config.yaml`
- hai model alias được định tuyến, expose từ một cổng tương thích OpenAI dùng chung
- xác thực client tập trung qua `general_settings.master_key`
- định nghĩa backend tương thích OpenAI upstream dùng giá trị `api_base` bao gồm hậu tố `/v1` bắt buộc
- expose backend trực tiếp trên các cổng host riêng để xử lý sự cố và so sánh
- các endpoint health LiteLLM nền tảng cho liveness, readiness, model health và kiểm tra kết nối có mục tiêu

Không bao gồm tại đây:

- quản lý virtual key dựa trên database của LiteLLM, ngân sách, nhóm hoặc quản trị UI
- Redis, Postgres hoặc tích hợp quan sát bên ngoài
- thiết kế chính sách giới hạn tốc độ, triển khai theo dõi chi tiêu hoặc tích hợp kho bí mật doanh nghiệp
- benchmark model tự động với giới hạn bộ nhớ NVIDIA GPU
- TLS termination, tăng cường ingress hoặc nhà cung cấp danh tính bên ngoài

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, hãy rà soát `registry/recipes/litellm-proxy/.env` và thay đổi ít nhất các mục phù hợp với môi trường của bạn:

- `LITELLM_MASTER_KEY`
- `LITELLM_SALT_KEY`
- `HF_TOKEN` nếu một trong hai model upstream bị hạn chế
- `VLLM_MODEL_A` và `VLLM_MODEL_B`
- `VLLM_MODEL_A_ALIAS` và `VLLM_MODEL_B_ALIAS`
- `VLLM_MODEL_A_API_KEY` và `VLLM_MODEL_B_API_KEY`
- `VLLM_MODEL_A_MAX_MODEL_LEN` và `VLLM_MODEL_B_MAX_MODEL_LEN`
- `VLLM_MODEL_A_GPU_MEMORY_UTILIZATION` và `VLLM_MODEL_B_GPU_MEMORY_UTILIZATION`

Cũng rà soát `registry/recipes/litellm-proxy/config.yaml` nếu bạn muốn tên định tuyến khác hoặc thêm định nghĩa upstream.

## Khởi chạy

Từ gốc kho lưu trữ:

1. Sửa `registry/recipes/litellm-proxy/.env`.
2. Khởi động bộ dịch vụ bằng lệnh khởi chạy trong `recipe.yaml`.
3. Đợi cả hai backend vLLM tải xong.
4. Truy vấn `GET /v1/models` trên cổng `4000` với `Authorization: Bearer <LITELLM_MASTER_KEY>`.
5. Gửi yêu cầu kiểu OpenAI thông thường tới proxy bằng một trong các model alias đã cấu hình.

Yêu cầu ví dụ:

`curl http://localhost:4000/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer change-me" -d '{"model":"qwen3-4b-instruct","messages":[{"role":"user","content":"Explain the route selection."}],"max_tokens":128}'`

## Ghi chú runtime

- LiteLLM nạp các mục `model_list` từ `config.yaml` và expose chúng qua `/v1/models`.
- Với các upstream tương thích OpenAI như vLLM, `api_base` được cấu hình phải bao gồm `/v1`.
- `GET /health/liveness` là probe rẻ nhất cho kiểm tra container còn sống.
- `GET /health/readiness` là probe tốt hơn để quyết định proxy đã sẵn sàng nhận traffic chưa.
- `GET /health` nặng hơn vì LiteLLM có thể gọi model thật để đánh giá sức khỏe backend.
- `POST /health/test_connection` hữu ích khi xử lý sự cố cho một model được cấu hình mà không gửi traffic client thông thường qua proxy.
- Preset này dùng hai tiến trình backend vLLM riêng biệt vì một server vLLM tương thích OpenAI không thể trung thực hosting nhiều model nền không liên quan trên một cổng.
- Cổng backend trực tiếp `9013` và `9014` cố ý để phát hành để gỡ lỗi; chỉ giữ chúng trong các mạng đáng tin cậy.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tái sử dụng trong:

- Docker volume `huggingface-cache`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu danh mục, mẫu môi trường, cấu hình LiteLLM, định nghĩa compose và tài liệu vận hành cho bộ proxy
- căn chỉnh công thức với các mẫu LiteLLM upstream cho `litellm --config`, `model_list`, `general_settings.master_key`, `/v1/models`, `/health`, `/health/readiness`, `/health/liveness` và `POST /health/test_connection`
- giữ nguyên hậu tố `/v1` bắt buộc trên các giá trị `api_base` upstream tương thích OpenAI
- kiểm tra các file công thức mới theo chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, khởi động proxy LiteLLM hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường làm việc Windows này
- phản hồi `/health` hoặc `/health/test_connection` thực tế với các backend đang chạy
- thành công tải model, truy cập kho bị hạn chế hoặc sự phù hợp bộ nhớ cho các model vLLM đã chọn trên host mục tiêu
- các tính năng control plane doanh nghiệp của LiteLLM yêu cầu dịch vụ trạng thái bên ngoài

## Ghi chú giấy phép

- Dự án upstream: `BerriAI/litellm`
- Giấy phép dự án upstream: MIT
- Giấy phép dự án backend vLLM upstream: Apache-2.0
- Rà soát giấy phép của các model được chọn riêng vì giấy phép model có thể khác giấy phép proxy và runtime

## Ghi chú rủi ro

- Tính năng LiteLLM phát triển nhanh, đặc biệt xoay quanh health, quản lý khóa và bề mặt admin, nên các bản phát hành upstream tương lai có thể yêu cầu cập nhật cấu hình.
- Cả hai model backend vẫn tiêu tốn bộ nhớ GPU thật độc lập dù client chỉ thấy một cổng proxy.
- Để cổng backend có thể truy cập có thể bỏ qua kiểm soát `master_key` của LiteLLM nếu chính sách mạng không hạn chế chúng.
- `/health` có thể kích hoạt yêu cầu backend thật và không nên được coi là probe liveness rẻ.
