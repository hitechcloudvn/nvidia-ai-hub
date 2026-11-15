> [English](README.md) | **Tiếng Việt**

# VLM-R1 32B

Baseline OpenBMB `VLM-R1-32B` chính thức cho người vận hành muốn một mô hình suy luận đa modal dung lượng cao hơn phía sau một endpoint vLLM cục bộ tương thích OpenAI.

## Những gì gói này cung cấp

- API `/v1` tương thích OpenAI qua container `vllm/vllm-openai` chính thức
- `openbmb/VLM-R1-32B` được phục vụ như một runtime đa modal một mô hình
- Các quy trình chat dựa trên hình ảnh thông qua Chat Completions API
- Phù hợp hơn cho suy luận hình ảnh cao cấp, tài liệu nhiều OCR, đọc biểu đồ và phân tích ảnh chụp màn hình
- Cache Hugging Face bền vững được lưu trong Docker volume có tên

## Truy cập mặc định

- API mô hình: `http://localhost:9001/v1/models`
- Chat Completions API: `http://localhost:9001/v1/chat/completions`

## Các dịch vụ đi kèm

- `vllm`: máy chủ API vLLM tương thích OpenAI host `openbmb/VLM-R1-32B`

## Phạm vi của preset này

Recipe này tập trung vào hình thái triển khai vLLM một node trực tiếp:

- chạy một máy chủ vLLM tương thích OpenAI
- phục vụ một mô hình đa modal tại một thời điểm
- bật một hình ảnh mỗi prompt theo mặc định
- bảo toàn cache Hugging Face giữa các lần khởi động lại
- giữ cấu hình đủ đơn giản cho thử nghiệm kiểu DGX Spark cục bộ

Preset này **không** bao gồm:

- phục vụ đa node, autoscaling hoặc định tuyến gateway
- kết thúc TLS sản xuất hoặc thực thi API-key phía trước vLLM
- tinh chỉnh batching hoặc đồng thời đã kiểm chứng cho mọi kích thước GPU
- ghi đè chat-template tùy chỉnh, vì recipe này giả định tokenizer upstream cung cấp một template khả dụng

## Cấu hình bắt buộc

Xem `registry/recipes/vllm-vlm-r1-32b/.env` trước khi khởi chạy và điều chỉnh nếu cần:

- `VLLM_PORT` để đổi cổng API hiển thị
- `VLLM_MAX_MODEL_LEN` để thu nhỏ hoặc mở rộng cửa sổ context runtime
- `VLLM_LIMIT_IMAGES` để đổi số hình ảnh mỗi yêu cầu
- `VLLM_GPU_MEMORY_UTILIZATION` để phù hợp với ngân sách bộ nhớ GPU khả dụng của bạn
- `HF_HUB_OFFLINE` và `TRANSFORMERS_OFFLINE` nếu bạn đang vận hành từ một cache cục bộ được điền sẵn

## Ghi chú runtime

- Runtime dùng `--trust-remote-code` vì các checkpoint đa modal OpenBMB thường yêu cầu đường dẫn mã mô hình tùy chỉnh.
- Máy chủ hiển thị các endpoint chuẩn tương thích OpenAI `/v1/models` và `/v1/chat/completions`.
- Với yêu cầu đa modal, gửi `messages[].content` dưới dạng danh sách hỗn hợp các mục văn bản và `image_url`.
- Phục vụ vision của vLLM phụ thuộc vào chat template do mô hình cung cấp; nếu upstream thay đổi tài nguyên tokenizer, bạn có thể cần cung cấp ghi đè template thủ công sau này.
- Recipe này mặc định một hình ảnh mỗi prompt để giữ mức sử dụng bộ nhớ có thể dự đoán trên các hệ thống một GPU nhỏ hơn.
- Checkpoint 32B có áp lực VRAM cao hơn đáng kể so với biến thể 7B, nên thiết lập mức sử dụng bộ nhớ mặc định cố ý ở mức mạnh tay và vẫn có thể cần điều chỉnh trên một số hệ thống.

## Ví dụ yêu cầu

```text
curl http://localhost:9001/v1/chat/completions -H "Content-Type: application/json" -d '{"model":"openbmb/VLM-R1-32B","messages":[{"role":"user","content":[{"type":"text","text":"Summarize the anomalies in this dashboard."},{"type":"image_url","image_url":{"url":"https://example.com/chart.png"}}]}]}'
```

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- rà soát lộ trình và tiếp tục theo thứ tự nghiêm ngặt sau `VLM-R1 7B`
- căn chỉnh recipe này với mẫu danh mục vLLM đa modal hiện có được dùng ở nơi khác trong registry
- sử dụng tài liệu vLLM upstream cho phục vụ chat tương thích OpenAI và đầu vào hình ảnh đa modal
- kiểm tra các tệp recipe mới bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, tải mô hình hoặc suy luận, vì Docker không khả dụng trong môi trường Windows này
- hành vi tokenizer VLM-R1 thực tế, tương thích chat-template hoặc chất lượng sinh trên hình ảnh thật
- mức sử dụng bộ nhớ GPU chính xác trên mọi SKU NVIDIA ngoài các mặc định thận trọng được tài liệu hóa tại đây

## Ghi chú giấy phép

- Mô hình upstream: `openbmb/VLM-R1-32B`
- Runtime phục vụ: `vllm/vllm-openai`
- Hãy xem model card Hugging Face và metadata kho upstream để biết giấy phép mô hình hiện tại và điều khoản sử dụng trước khi triển khai sản xuất

## Ghi chú rủi ro

- Nếu upstream thay đổi model card, tài nguyên tokenizer hoặc cài đặt mã từ xa, các cờ runtime tại đây có thể cần điều chỉnh.
- Các mô hình suy luận đa modal có thể tiêu tốn nhiều bộ nhớ hơn đáng kể so với mô hình chỉ văn bản ở cùng kích thước tham số.
- Recipe này giả định mô hình upstream vẫn tương thích với hành vi phục vụ đa modal vLLM hiện tại; các bản cập nhật vLLM hoặc mô hình trong tương lai có thể yêu cầu cờ khởi chạy bổ sung.
