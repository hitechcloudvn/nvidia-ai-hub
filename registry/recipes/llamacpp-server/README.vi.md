> [English](README.md) | **Tiếng Việt**

# llama.cpp Server

Baseline máy chủ HTTP chính thức của `llama.cpp` cho GPU NVIDIA với API tương thích OpenAI, Web UI tích hợp, phục vụ mô hình GGUF, tùy chọn tải mô hình từ Hugging Face khi khởi động, và các thư mục cache cục bộ bền vững.

## Những gì gói này cung cấp

- Image `ghcr.io/ggml-org/llama.cpp:server-cuda` chính thức có hỗ trợ CUDA
- Web UI và mặt phẳng API trên cổng `3096`
- Các endpoint tương thích OpenAI dưới `/v1`
- Các endpoint gốc của `llama.cpp` như `/health`, `/metrics`, `/slots` và `/props`
- Tùy chọn tải mô hình khi khởi động từ Hugging Face thông qua `LLAMA_ARG_HF_REPO`
- Các thư mục cục bộ bền vững cho `/models`, dữ liệu cache Hugging Face và các tệp lưu slot

## Truy cập mặc định

- Web UI: `http://localhost:3096`
- Kiểm tra sức khỏe: `http://localhost:3096/health`
- API mô hình tương thích OpenAI: `http://localhost:3096/v1/models`
- Endpoint metrics: `http://localhost:3096/metrics`

## Các dịch vụ đi kèm

- `llamacpp-server`: container máy chủ `llama.cpp` chính thức

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline máy chủ đơn giản, thận trọng:

- sử dụng image container `llama.cpp` chính thức có hỗ trợ CUDA
- phục vụ một mô hình GGUF được cấu hình tại một thời điểm thông qua tiến trình `llama-server` tiêu chuẩn
- hỗ trợ đường dẫn GGUF cục bộ qua `LLAMA_ARG_MODEL` hoặc nguồn Hugging Face qua `LLAMA_ARG_HF_REPO`
- lưu trữ artifact mô hình và dữ liệu cache tại chỗ để các lần khởi động lại không cần tải xuống lại toàn bộ
- giữ chế độ router, điều phối đa mô hình, tinh chỉnh mô hình nháp suy đoán (speculative draft), kết thúc TLS và gia cố reverse-proxy ngoài phạm vi

Preset này **không** bao gồm:

- benchmark tự động mô hình đã chọn so với giới hạn bộ nhớ GPU NVIDIA
- một sản phẩm chat đi kèm như Open WebUI, Flowise hoặc AnythingLLM
- đảm bảo tương thích cho mọi họ mô hình GGUF mà không cần tinh chỉnh prompt-template hoặc runtime
- xác thực doanh nghiệp, chứng chỉ TLS hoặc thực thi chính sách mạng

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/llamacpp-server/.env` và thay đổi ít nhất những mục áp dụng cho môi trường của bạn:

- `LLAMA_ARG_HF_REPO` hoặc `LLAMA_ARG_MODEL`
- `LLAMA_MODEL_ALIAS`
- `LLAMA_ARG_CTX_SIZE`
- `LLAMA_ARG_N_PARALLEL`
- `LLAMA_ARG_N_GPU_LAYERS`
- `LLAMA_API_KEY` nếu bạn không muốn endpoint cục bộ không yêu cầu xác thực
- `HF_TOKEN` nếu kho mô hình bạn chọn bị giới hạn truy cập

Chỉ sử dụng **một** mô hình nguồn tại một thời điểm:

1. Đặt `LLAMA_ARG_HF_REPO` cho đường dẫn khởi động trực tiếp từ Hugging Face.
2. Hoặc xóa `LLAMA_ARG_HF_REPO` và đặt `LLAMA_ARG_MODEL` thành tệp GGUF cục bộ trong `/models`.

## Ghi chú runtime

- Máy chủ chính thức hiển thị cả Web UI tích hợp và nhiều nhóm API từ cùng một cổng.
- `GET /health` trả về `503` khi mô hình vẫn đang tải và `200` chỉ sau khi mô hình đã chọn sẵn sàng.
- `--metrics`, `--slots`, `--cache-prompt` và `--cont-batching` được bật mặc định trong preset này.
- Nếu `LLAMA_API_KEY` để trống, endpoint vẫn không yêu cầu xác thực và chỉ nên ở trên mạng cục bộ đáng tin cậy.
- Một số mô hình GGUF có thể cần thêm cờ template, multimodal projector hoặc pooling ngoài baseline này.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/llamacpp-server/models`
- `registry/recipes/llamacpp-server/cache`
- `registry/recipes/llamacpp-server/slots`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata danh mục, mẫu môi trường, định nghĩa compose và tài liệu cho runtime
- căn chỉnh stack compose với cách dùng Docker chính thức của máy chủ `llama.cpp` và các bề mặt API `/health` cùng `/v1/*` được tài liệu hóa
- kết nối các mount bền vững cho mô hình cục bộ, tái sử dụng cache Hugging Face và các tệp lưu slot
- kiểm tra các tệp recipe bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, tải mô hình hoặc suy luận trên GPU, vì Docker không khả dụng trong môi trường Windows này
- hành vi tải xuống thực tế từ Hugging Face với các kho bị giới hạn truy cập hoặc giới hạn tốc độ
- thông lượng, độ trễ hoặc mức sử dụng bộ nhớ của bất kỳ mô hình GGUF cụ thể nào trên máy đích
- các quy trình multimodal, reranking hoặc chế độ router tùy chọn

## Ghi chú giấy phép

- Dự án upstream: `ggml-org/llama.cpp`
- Giấy phép upstream: MIT
- Hãy xem xét giấy phép mô hình GGUF đã chọn riêng vì giấy phép mô hình có thể khác với giấy phép runtime máy chủ

## Ghi chú rủi ro

- Nguồn mô hình đã chọn có thể chiếm phần lớn thời gian khởi động và dung lượng đĩa, đặc biệt khi `LLAMA_ARG_HF_REPO` kéo các artifact nhiều gigabyte trong lần khởi động đầu tiên.
- Để `LLAMA_API_KEY` trống sẽ mở ra một endpoint suy luận không yêu cầu xác thực.
- Một số họ mô hình có thể cần ghi đè prompt-template, tệp multimodal projector hoặc các cờ bổ sung trước khi hoạt động đúng trong các luồng chat tương thích OpenAI.
