> [English](README.md) | **Tiếng Việt**

# TensorRT-LLM API Gateway

Baseline phục vụ TensorRT-LLM tương thích OpenAI chính thức cho GPU NVIDIA với API suy luận `/v1`, `/health`, `/metrics`, `/version`, song song hóa có thể cấu hình và mount cache cục bộ bền vững.

## Những gì gói này cung cấp

- Baseline container TensorRT-LLM chính thức của NVIDIA
- Các endpoint tương thích OpenAI dưới `/v1`
- Các endpoint vận hành bao gồm `/health`, `/metrics` và `/version`
- Cờ song song Tensor, pipeline và expert có thể cấu hình
- Tùy chọn tinh chỉnh runtime dựa trên YAML cho metrics backend PyTorch
- Các thư mục cache, mô hình và log cục bộ bền vững

## Truy cập mặc định

- API mô hình: `http://localhost:3098/v1/models`
- Chat completions: `http://localhost:3098/v1/chat/completions`
- Completions: `http://localhost:3098/v1/completions`
- Kiểm tra sức khỏe: `http://localhost:3098/health`
- Metrics: `http://localhost:3098/metrics`
- Phiên bản: `http://localhost:3098/version`

## Các dịch vụ đi kèm

- `tensorrt-llm-gateway`: container TensorRT-LLM chính thức chạy `trtllm-serve`

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline gateway một node thận trọng:

- dùng `trtllm-serve` để hiển thị bề mặt HTTP tương thích OpenAI được tài liệu hóa
- mặc định dùng backend PyTorch để tránh yêu cầu engine TensorRT dựng sẵn trong baseline này
- hỗ trợ model ID Hugging Face, tùy chọn ghi đè tokenizer và các kiểm soát phục vụ thông dụng như TP, PP, EP, kích thước batch, độ dài chuỗi và kích thước KV-cache
- bật thống kê hiệu năng lặp thông qua một cấu hình YAML được mount khi được yêu cầu để `/metrics` có dữ liệu backend PyTorch hữu ích
- giữ pipeline build engine, quy trình chuyển đổi mô hình, triển khai Slurm đa node và cấu trúc phục vụ tách rời ngoài phạm vi

Preset này **không** bao gồm:

- tự động chuyển đổi checkpoint hoặc tạo engine `trtllm-build`
- xác thực sản xuất, kết thúc TLS, chính sách API gateway hoặc cách ly đa tenant
- chat UI đi kèm hoặc framework ứng dụng
- cấu hình multimodal đã kiểm chứng ngoài bề mặt máy chủ baseline được tài liệu hóa

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/tensorrt-llm-gateway/.env` và thay đổi những mục áp dụng cho môi trường của bạn:

- `TRTLLM_MODEL`
- `TRTLLM_BACKEND`
- `TRTLLM_TP_SIZE`, `TRTLLM_PP_SIZE` và `TRTLLM_EP_SIZE`
- `TRTLLM_MAX_BATCH_SIZE`
- `TRTLLM_MAX_NUM_TOKENS`
- `TRTLLM_MAX_SEQ_LEN`
- `TRTLLM_KV_CACHE_FREE_GPU_MEMORY_FRACTION`
- `TRTLLM_TRUST_REMOTE_CODE`
- `HF_TOKEN` nếu kho mô hình đã chọn bị giới hạn truy cập hoặc riêng tư

Nếu bạn chuyển từ backend PyTorch mặc định sang đường dẫn engine TensorRT, bạn có thể cũng cần đặt `TRTLLM_TOKENIZER` tường minh.

## Ghi chú runtime

- `trtllm-serve` hiển thị `/v1/models`, `/v1/completions` và `/v1/chat/completions` như các endpoint tương thích OpenAI.
- Cùng máy chủ hiển thị `/health`, `/metrics` và `/version` cho các kiểm tra vận hành.
- Tài liệu TensorRT-LLM ghi nhận `/metrics` phong phú hơn trên backend TensorRT; với backend PyTorch, thống kê lặp yêu cầu `enable_iter_perf_stats`, recipe này có thể bật qua `extra-llm-api-config.yml`.
- Phục vụ multimodal có thể yêu cầu các tùy chọn YAML bổ sung như tắt tái sử dụng block và có thể chỉ hỗ trợ API kiểu chat tùy theo họ mô hình đã chọn.
- Image này được host trên `nvcr.io`; người đánh giá nên xác nhận quyền truy cập registry và quyền pull image trong môi trường của họ trước khi triển khai.
- Telemetry bị tắt trong baseline này với `TRTLLM_NO_USAGE_STATS=1` để giữ recipe cục bộ thận trọng.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/tensorrt-llm-gateway/cache`
- `registry/recipes/tensorrt-llm-gateway/models`
- `registry/recipes/tensorrt-llm-gateway/logs`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata danh mục, mẫu môi trường, định nghĩa compose, YAML runtime và tài liệu cho gateway
- căn chỉnh stack compose với các endpoint `trtllm-serve` được tài liệu hóa và các cờ serve thường dùng
- kết nối cấu hình metrics tùy chọn cho backend PyTorch và hiển thị endpoint kiểm tra sức khỏe cùng metrics nhất quán
- kiểm tra các tệp recipe bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, pull mô hình hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường Windows này
- xác thực registry NGC và hành vi pull image cho `nvcr.io/nvidia/tensorrt-llm/release:spark-single-gpu-dev`
- chuyển đổi checkpoint theo mô hình cụ thể, quy trình build engine hoặc tinh chỉnh hiệu năng riêng theo backend
- hành vi phục vụ multimodal, tách rời hoặc đa node

## Ghi chú giấy phép

- Dự án upstream: `NVIDIA/TensorRT-LLM`
- Giấy phép dự án upstream nên được xem xét trực tiếp trong kho TensorRT-LLM trước khi phân phối lại hoặc đóng gói thương mại
- Điều khoản truy cập và phân phối lại container cho các image NVIDIA NGC nên được xem xét riêng với giấy phép kho nguồn

## Ghi chú rủi ro

- Tag image NGC đã chọn có thể thay đổi hành vi theo thời gian và có thể yêu cầu điều chỉnh tương thích tiếp theo.
- Các mô hình lớn hoặc nâng cao có thể yêu cầu nhiều bộ nhớ GPU, shared memory hoặc cờ serve tùy chỉnh hơn mức baseline này hiển thị mặc định.
- Một số họ mô hình cần `--trust_remote_code`, reasoning parser, tùy chọn YAML multimodal hoặc quy trình engine TensorRT thay vì đường dẫn PyTorch mặc định.
- Baseline này hiển thị một endpoint cục bộ không yêu cầu xác thực; chỉ sử dụng trên mạng đáng tin cậy trừ khi bạn thêm tầng gateway hoặc proxy.
