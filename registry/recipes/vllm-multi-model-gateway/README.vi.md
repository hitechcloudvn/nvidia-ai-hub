> [English](README.md) | **Tiếng Việt**

# vLLM Multi-Model Gateway

## Những gì gói này cung cấp

Preset này hiển thị một gateway tương thích OpenAI duy nhất trên cổng `9010` và đặt hai backend `vllm serve` chuyên dụng phía sau nó.

Bố cục mặc định hiển thị các model ID sau qua một điểm vào API dùng chung:

- `qwen3-4b-instruct` → backend A
- `llama32-3b-instruct` → backend B

## Tại sao recipe này tồn tại

vLLM upstream tài liệu hóa rằng một máy chủ vLLM tương thích OpenAI host **một mô hình cơ sở tại một thời điểm**. Một máy chủ duy nhất có thể hiển thị alias cho mô hình đó, và cũng có thể liệt kê các adapter LoRA, nhưng nó không host nhiều mô hình cơ sở không liên quan trên một cổng một cách nguyên bản.

Recipe này giữ hành vi upstream đó trung thực bằng cách chạy:

1. một máy chủ vLLM cho mỗi mô hình cơ sở
2. một gateway FastAPI nhẹ kiểm tra trường `model` được yêu cầu
3. một endpoint bên ngoài dùng chung cho các ứng dụng client

## Truy cập mặc định

- URL cơ sở gateway: `http://<NVIDIA_AI_HUB_IP>:9010/v1`
- Danh mục mô hình: `http://<NVIDIA_AI_HUB_IP>:9010/v1/models`
- Kiểm tra sức khỏe gateway: `http://<NVIDIA_AI_HUB_IP>:9010/healthz`
- URL trực tiếp backend A: `http://<NVIDIA_AI_HUB_IP>:9011/v1`
- URL trực tiếp backend B: `http://<NVIDIA_AI_HUB_IP>:9012/v1`

Tất cả yêu cầu gateway yêu cầu `Authorization: Bearer <GATEWAY_API_KEY>` khi `GATEWAY_API_KEY` được đặt.

## Các dịch vụ đi kèm

- `gateway` — bộ định tuyến FastAPI nhẹ cho các yêu cầu kiểu OpenAI
- `vllm-model-a` — máy chủ vLLM chuyên dụng cho `VLLM_MODEL_A`
- `vllm-model-b` — máy chủ vLLM chuyên dụng cho `VLLM_MODEL_B`

## Phạm vi của preset này

### Bao gồm

- một URL tương thích OpenAI dùng chung cho nhiều mô hình backend
- danh sách `/v1/models` tổng hợp qua cả hai backend
- định tuyến yêu cầu theo trường `model` trong payload JSON
- cổng backend trực tiếp để gỡ lỗi và quan sát

### Ngoài phạm vi

- tự động cân bằng tải qua các replica của cùng một mô hình
- định tuyến chính sách, thử lại, kiểm soát chi phí, cache hoặc failover nhà cung cấp
- khám phá dịch vụ động ngoài hai route được khai báo
- kết thúc TLS hoặc tích hợp danh tính bên ngoài

Nếu bạn cần kiểm soát chính sách rộng hơn, tầng trừu tượng nhà cung cấp hoặc định tuyến nhận biết chi phí, mục lộ trình tiếp theo nên được xử lý bởi recipe `LiteLLM proxy` chuyên dụng thay thế.

## Cấu hình bắt buộc

Chỉnh sửa `registry/recipes/vllm-multi-model-gateway/.env` trước khi khởi chạy.

Các biến quan trọng:

- `GATEWAY_PORT` — cổng gateway bên ngoài dùng chung
- `GATEWAY_API_KEY` — bearer token được gateway thực thi và chuyển tới cả hai backend vLLM
- `HF_TOKEN` — bắt buộc cho các mô hình Hugging Face bị giới hạn truy cập
- `VLLM_MODEL_A`, `VLLM_MODEL_B` — model ID Hugging Face được phục vụ bởi từng backend
- `VLLM_MODEL_A_ALIAS`, `VLLM_MODEL_B_ALIAS` — model ID bên ngoài ổn định được trình bày cho client
- `VLLM_MODEL_A_HOST_PORT`, `VLLM_MODEL_B_HOST_PORT` — cổng truy cập backend trực tiếp
- `VLLM_MODEL_A_MAX_MODEL_LEN`, `VLLM_MODEL_B_MAX_MODEL_LEN` — giới hạn context theo từng mô hình
- `VLLM_MODEL_A_GPU_MEMORY_UTILIZATION`, `VLLM_MODEL_B_GPU_MEMORY_UTILIZATION` — tinh chỉnh bộ nhớ backend

## Khởi chạy

Sử dụng lệnh danh mục trong `recipe.yaml` để build image gateway và khởi động toàn bộ stack.

Container gateway được build cục bộ từ:

- `Dockerfile`
- `gateway-requirements.txt`
- `gateway_app.py`

Hai backend vLLM dùng image upstream `vllm/vllm-openai`.

## Ghi chú runtime

- vLLM mặc định dùng một máy chủ tương thích OpenAI trên cổng `8000`; recipe này ánh xạ lại cổng nội bộ đó sang các cổng host `9011` và `9012`.
- Gateway hiển thị điểm vào của riêng nó trên cổng `9010`.
- `/metrics` và `/version` vẫn đáng tin cậy nhất trên các cổng backend trực tiếp vì recipe này giữ logic gateway tối giản.
- Trường `model` phải có trong các yêu cầu suy luận được định tuyến như `/v1/chat/completions`, `/v1/completions` hoặc `/v1/embeddings`.
- `--served-model-name` được dùng để hiển thị một alias ổn định cho mỗi mô hình backend. Alias đó không phải bằng chứng về hỗ trợ đa mô hình cơ sở bên trong một máy chủ vLLM duy nhất.

## Dữ liệu bền vững

- Docker volume `huggingface-cache` lưu trữ các bản tải mô hình dùng chung
- `models/` được dành riêng cho artifact cục bộ tùy chọn
- `logs/` được mount vào container gateway để người vận hành gỡ lỗi
- `gateway/` được dành riêng cho trạng thái gateway cục bộ trong tương lai hoặc tệp được tạo

## Phạm vi kiểm chứng

Kiểm chứng trong môi trường này chỉ giới hạn ở việc rà soát tĩnh.

Các kiểm tra đã hoàn thành:

- rà soát mã nguồn và tài liệu vLLM upstream cho hành vi máy chủ OpenAI, `/v1/models`, `/metrics`, `/version`, hỗ trợ khóa API và các giới hạn đa mô hình
- so sánh thiết kế với các recipe cục bộ hiện có như `tensorrt-llm-gateway` và các mục `vllm-*` một mô hình
- kiểm tra chẩn đoán trình soạn thảo cho các tệp recipe mới

Chưa hoàn thành:

- `docker compose up` không được chạy vì quyền truy cập runtime Docker không khả dụng trong môi trường này
- định tuyến gateway trực tiếp, khởi động backend, phân bổ GPU và hành vi tải mô hình Hugging Face chưa được thử nghiệm

Rủi ro còn lại cho người đánh giá:

- hành vi runtime vẫn cần kiểm tra smoke test trên một host Docker có quyền truy cập GPU NVIDIA
- các model ID mặc định đã chọn có thể cần điều chỉnh tùy theo bộ nhớ GPU cục bộ, tương thích image upstream và truy cập bị giới hạn theo token

## Ghi chú giấy phép

- vLLM được phân phối theo Apache-2.0
- trọng số mô hình, tài nguyên tokenizer và các bản tải bị giới hạn tuân theo giấy phép upstream tương ứng và kiểm soát truy cập
- recipe này thêm một gateway FastAPI cục bộ nhỏ và không thay đổi giấy phép mô hình upstream

## Ghi chú rủi ro

- việc hiển thị các cổng backend trực tiếp có nghĩa là người vận hành nên giữ host trên mạng đáng tin cậy hoặc thêm kiểm soát firewall bên ngoài
- cùng một khóa API được cấu hình trên gateway và các dịch vụ backend để đơn giản hóa vận hành; các môi trường nhạy cảm về bảo mật có thể muốn một thiết kế edge proxy chặt chẽ hơn
- các tổ hợp mô hình lớn có thể đăng ký vượt mức bộ nhớ GPU nếu cả hai backend được cấu hình mạnh tay
