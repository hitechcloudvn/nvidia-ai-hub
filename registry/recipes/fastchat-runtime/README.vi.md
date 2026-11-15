> [English](README.md) | **Tiếng Việt**

# FastChat Runtime

Nền runtime kiểu FastChat chính thức cho NVIDIA GPU với một controller, một model worker và một server API tương thích OpenAI mở ra các endpoint `/v1` cho chat, completions, embeddings và khám phá model cục bộ.

## Những gì công thức này cung cấp

- FastChat controller trên cổng `21001`
- FastChat model worker trên cổng `21002`
- Server API tương thích OpenAI trên cổng `8000`
- Một topology khởi tạo thực tế theo kiến trúc upstream controller -> worker -> API server
- Mount cache Hugging Face và thư mục model cục bộ bền vững
- Cờ worker có thể cấu hình cho lựa chọn thiết bị, số GPU, nạp 8-bit, CPU offloading và hành vi trust-remote-code

## Truy cập mặc định

- Models API tương thích OpenAI: `http://localhost:8000/v1/models`
- Chat completions tương thích OpenAI: `http://localhost:8000/v1/chat/completions`
- Completions tương thích OpenAI: `http://localhost:8000/v1/completions`
- Embeddings tương thích OpenAI: `http://localhost:8000/v1/embeddings`
- Controller: `http://localhost:21001`
- Worker: `http://localhost:21002`

## Các dịch vụ đi kèm

- `fastchat-controller`: tiến trình FastChat controller
- `fastchat-model-worker`: tiến trình FastChat model worker cho một đường dẫn model được cấu hình
- `fastchat-api-server`: server REST API tương thích OpenAI của FastChat

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền FastChat bảo thủ:

- theo mẫu khởi động controller, model worker và `openai_api_server` của upstream
- mở server API tương thích OpenAI làm endpoint tích hợp chính
- khởi động một model worker cho một đường dẫn model được cấu hình theo mặc định
- lưu bền dữ liệu cache Hugging Face và mount `/models` cục bộ cho các lần khởi chạy lặp lại
- loại trừ Gradio web UI, Chatbot Arena, phân tán đa worker và lớp ingress bên thứ ba

Preset này **không** bao gồm:

- Gradio web server của FastChat hoặc giao diện Chatbot Arena
- benchmark tự động hoặc kiểm chứng kích thước cho mọi họ model được hỗ trợ
- điều phối đa worker cho nhiều model trên các GPU khác nhau
- xác thực doanh nghiệp, TLS termination, chính sách reverse proxy hoặc cách ly tenant

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, hãy rà soát `registry/recipes/fastchat-runtime/.env` và thay đổi các mục phù hợp với môi trường của bạn:

- `FASTCHAT_MODEL_PATH`
- `FASTCHAT_WORKER_MODEL_NAMES`
- `FASTCHAT_NUM_GPUS`
- `FASTCHAT_MAX_GPU_MEMORY` nếu bạn cần giới hạn rõ ràng cho từng GPU
- `FASTCHAT_LOAD_8BIT` và `FASTCHAT_CPU_OFFLOADING` khi bộ nhớ GPU hạn chế
- `FASTCHAT_HF_TOKEN` nếu kho model được chọn bị hạn chế
- `FASTCHAT_TRUST_REMOTE_CODE` nếu model đã chọn yêu cầu

Dùng repo ID Hugging Face cho `FASTCHAT_MODEL_PATH` khi bạn muốn tải lúc khởi động, hoặc bind tài sản model cục bộ vào `./models` và trỏ `FASTCHAT_MODEL_PATH` tới vị trí được mount đó.

## Ghi chú runtime

- Tài liệu FastChat upstream khởi động bộ dịch vụ theo thứ tự: controller, model worker, rồi `openai_api_server`.
- `GET /v1/models` là bước kiểm tra khám phá nhẹ nhất thực tế cho các client hạ nguồn.
- Các ví dụ FastChat thường dùng `api_key = "EMPTY"` với client OpenAI vì server API cục bộ thường không xác thực trừ khi bạn đặt sau một gateway khác.
- Nếu model được chọn tải chậm, hãy tăng `FASTCHAT_WORKER_API_TIMEOUT`.
- Tài liệu upstream cũng hỗ trợ nhiều worker và `multi_model_worker`, nhưng công thức này giữ nền tảng ở một worker cho một đường dẫn model được cấu hình.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/fastchat-runtime/cache`
- `registry/recipes/fastchat-runtime/models`
- `registry/recipes/fastchat-runtime/logs`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu danh mục, mẫu môi trường, định nghĩa compose, công thức build Docker và tài liệu vận hành cho bộ FastChat
- căn chỉnh cấu trúc bộ dịch vụ với hướng dẫn triển khai controller, model worker và `openai_api_server` của FastChat upstream cùng các endpoint được ghi nhận `/v1/models`, `/v1/chat/completions`, `/v1/completions` và `/v1/embeddings`
- kết nối các cờ worker có thể cấu hình cho đường dẫn model, chế độ thiết bị, số GPU, nạp 8-bit, CPU offloading, timeout và xác thực Hugging Face tùy chọn
- kiểm tra các file công thức theo chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, build container, tải model hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường làm việc Windows này
- khả năng tương thích SDK OpenAI thực tế, chất lượng phản hồi hoặc thời điểm đăng ký model với worker đang chạy
- sự phù hợp bộ nhớ, thời gian khởi động hoặc thông lượng cho bất kỳ model nào được chọn trên host NVIDIA GPU mục tiêu
- các quy trình Gradio, đa worker hoặc Chatbot Arena ngoài nền tảng này

## Ghi chú giấy phép

- Dự án upstream: `lm-sys/FastChat`
- Giấy phép dự án upstream: Apache-2.0
- Rà soát giấy phép của model được chọn riêng vì giấy phép model có thể khác giấy phép runtime

## Ghi chú rủi ro

- Model lớn có thể vượt quá bộ nhớ GPU khả dụng trừ khi người vận hành tinh chỉnh `FASTCHAT_NUM_GPUS`, `FASTCHAT_MAX_GPU_MEMORY`, `FASTCHAT_LOAD_8BIT` hoặc chọn model nhỏ hơn.
- Một số model được hỗ trợ yêu cầu `--trust-remote-code` hoặc các điều chỉnh riêng theo model khác không được bật mặc định tại đây.
- Nền tảng này để server API không xác thực trừ khi người vận hành đặt sau gateway hoặc các kiểm soát mạng bổ sung.
