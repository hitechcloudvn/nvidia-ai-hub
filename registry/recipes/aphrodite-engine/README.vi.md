> [English](README.md) | **Tiếng Việt**

# Aphrodite Engine

Nền tảng phục vụ tương thích OpenAI chính thức của Aphrodite cho NVIDIA GPU với API chat và completions, điều khiển bộ nhớ GPU có thể cấu hình, và mount cache Hugging Face bền vững.

## Những gì công thức này cung cấp

- Nền container `alpindale/aphrodite-openai:latest` chính thức
- API tương thích OpenAI `/v1/chat/completions` và `/v1/completions`
- Khám phá model qua `/v1/models`
- Có thể cấu hình tensor parallelism, API key, chat template và cài đặt CORS
- Điều khiển bộ nhớ GPU qua `--gpu-memory-utilization` và `--single-user-mode`
- Mount cache, model và adapter Hugging Face bền vững

## Truy cập mặc định

- Models API: `http://localhost:3100/v1/models`
- Chat completions: `http://localhost:3100/v1/chat/completions`
- Completions: `http://localhost:3100/v1/completions`

## Các dịch vụ đi kèm

- `aphrodite-engine`: container tương thích OpenAI chính thức của Aphrodite

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền runtime đơn bảo thủ:

- dùng image Docker chính thức của Aphrodite và entrypoint `aphrodite run`
- mở ra bề mặt API tương thích OpenAI được ghi nhận trên cổng mặc định của Aphrodite
- hỗ trợ tăng cường vận hành cơ bản qua API key tùy chọn và cấu hình admin key
- mở ra các điều khiển bộ nhớ và quy mô phổ biến như tensor parallelism, mức sử dụng bộ nhớ GPU và chế độ một người dùng
- loại trừ phân cụm phân tán, tinh chỉnh speculative decoding, chuyên biệt đa phương thức và quy trình parser tool-calling nâng cao

Preset này **không** bao gồm:

- giao diện chat hoặc framework agent đi kèm
- TLS termination sản xuất, reverse proxy, cách ly tenant hoặc giới hạn tốc độ bên ngoài
- kiểm chứng cho mọi kiểu lượng tử hóa, phần cứng backend hoặc họ model được upstream hỗ trợ
- template tool-calling được cấu hình sẵn, danh mục LoRA hoặc bộ model đa phương thức

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, hãy rà soát `registry/recipes/aphrodite-engine/.env` và thay đổi các mục phù hợp với môi trường của bạn:

- `APHRODITE_MODEL`
- `APHRODITE_API_KEY` và `APHRODITE_ADMIN_KEY`
- `APHRODITE_TENSOR_PARALLEL`
- `APHRODITE_GPU_MEMORY_UTILIZATION`
- `APHRODITE_SINGLE_USER_MODE`
- `APHRODITE_MAX_MODEL_LEN`
- `APHRODITE_CHAT_TEMPLATE`
- `APHRODITE_ALLOWED_ORIGINS`, `APHRODITE_ALLOWED_METHODS` và `APHRODITE_ALLOWED_HEADERS`
- `HF_TOKEN` nếu kho model được chọn bị hạn chế hoặc riêng tư

Nếu model không có chat template tích hợp, tài liệu Aphrodite nêu rằng chat completions yêu cầu `--chat-template`; nếu không, server có thể chỉ dùng text completions.

## Ghi chú runtime

- Aphrodite chạy server API tương thích OpenAI trên cổng `2242` theo mặc định; công thức này phát hành ra ngoài ở cổng `3100`.
- Các ví dụ upstream khuyến nghị `--ipc=host`, điều mà công thức này giữ nguyên.
- Tài liệu Aphrodite ghi rằng engine có xu hướng cấp phát khoảng 90% VRAM của GPU theo mặc định, nên nền tảng này đặt `APHRODITE_GPU_MEMORY_UTILIZATION=0.6` và bật `APHRODITE_SINGLE_USER_MODE=true` một cách bảo thủ.
- Server OpenAI upstream hỗ trợ API key và admin key tùy chọn qua cờ CLI.
- Tool calling, vision, LoRA, speculative decoding và plugin parser nâng cao có sẵn upstream nhưng cố ý để chưa cấu hình trong nền tảng này.
- Không có endpoint docs hay health chuyên dụng nào được xác nhận trong quá trình nghiên cứu môi trường làm việc này, nên công thức này neo giao diện vào `/v1/models` thay vì giả định một dashboard riêng.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/aphrodite-engine/cache`
- `registry/recipes/aphrodite-engine/models`
- `registry/recipes/aphrodite-engine/adapters`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu danh mục, mẫu môi trường, định nghĩa compose và tài liệu cho runtime
- căn chỉnh bộ compose với các ví dụ Docker và `aphrodite run` chính thức của Aphrodite, bao gồm endpoint tương thích OpenAI và cờ điều khiển bộ nhớ
- kết nối các cờ server có thể cấu hình cho lựa chọn model, API key, CORS, tensor parallelism, chat template và mức dùng bộ nhớ GPU bảo thủ
- kiểm tra các file công thức theo chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, tải model hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường làm việc Windows này
- hành vi endpoint cho thao tác admin, tool calling hoặc yêu cầu đa phương thức
- tinh chỉnh theo model cho lượng tử hóa, nạp LoRA hoặc suy luận phân tán
- sự tồn tại chính xác của route `/health`, vì tài liệu upstream được xem xét tại đây chưa xác nhận

## Ghi chú giấy phép

- Dự án upstream: `aphrodite-engine/aphrodite-engine`
- Giấy phép upstream: AGPL-3.0
- Rà soát giấy phép của model được chọn riêng vì giấy phép model có thể khác giấy phép runtime

## Ghi chú rủi ro

- Aphrodite được cấp phép theo AGPL-3.0, có thể áp đặt nghĩa vụ phân phối lại và sử dụng mạng chặt chẽ hơn các runtime kiểu Apache trong danh mục này.
- Image tag `latest` có thể thay đổi hành vi theo thời gian và có thể cần điều chỉnh tương thích sau này.
- Các model lớn vẫn có thể vượt quá bộ nhớ GPU khả dụng trừ khi tensor parallelism, mức dùng bộ nhớ và kích thước model được tinh chỉnh cẩn thận.
- Để `APHRODITE_API_KEY` trống sẽ mở ra một endpoint suy luận không xác thực trên mạng cục bộ.
