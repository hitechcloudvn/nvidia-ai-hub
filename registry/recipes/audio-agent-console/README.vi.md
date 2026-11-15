> [English](README.md) | **Tiếng Việt**

# Audio Agent Console

Chạy console agent giọng nói trên trình duyệt với NVIDIA GPU, dùng transport Pipecat SmallWebRTC, dịch vụ giọng nói OpenAI và web client dựng sẵn.

## Những gì công thức này cung cấp

- Console giọng nói trên trình duyệt tại cổng `7890`
- Client Pipecat SmallWebRTC dựng sẵn tại `/client/`
- Endpoint kiểm tra sẵn sàng `GET /health`
- Endpoint tín hiệu `POST /api/offer` và `PATCH /api/offer` cho thương lượng WebRTC
- Speech-to-text, sinh phản hồi LLM và text-to-speech dựa trên OpenAI trong một dịch vụ cục bộ
- Có thể cấu hình system prompt, lời chào, model ID, giọng nói và base URL tương thích OpenAI tùy chọn

## Truy cập mặc định

- Web client: `http://localhost:7890/client/`
- Chuyển hướng gốc: `http://localhost:7890/`
- Health: `http://localhost:7890/health`

## Ghi chú cấu hình

Đặt `OPENAI_API_KEY` trong `.env` trước khi khởi chạy.

Các giá trị ghi đè tùy chọn:

- `OPENAI_BASE_URL` cho các gateway tương thích OpenAI
- `OPENAI_LLM_MODEL` cho model chat
- `OPENAI_STT_MODEL` cho bản ghi âm
- `OPENAI_TTS_MODEL` và `OPENAI_TTS_VOICE` cho tổng hợp giọng nói
- `SYSTEM_PROMPT` để thay đổi hành vi trợ lý
- `GREETING_ENABLED` và `GREETING_TEXT` để điều khiển lời chào nói ban đầu

Bản khởi tạo này dùng một prompt agent giọng nói súc tích và web client dựng sẵn để người rà soát có thể tập trung vào tích hợp registry và luồng giọng nói cơ bản trước.

## Ghi chú

Dịch vụ phụ thuộc vào API giọng nói và ngôn ngữ từ xa trừ khi `OPENAI_BASE_URL` trỏ tới một endpoint cục bộ hoặc tự host tương thích.

WebRTC yêu cầu quyền microphone trong trình duyệt.

Nếu trình duyệt kết nối nhưng âm thanh không bắt đầu, hãy kiểm tra API key, tính khả dụng của model và quyền truy cập mạng ra ngoài từ Docker.

## Phạm vi kiểm chứng

Công thức này được thêm làm khung registry cho NVIDIA GPU. Việc kiểm chứng nên tập trung vào nạp công thức, cấu trúc YAML, sự hiện diện của tài sản Docker và kiểm tra nhanh phiên trình duyệt cùng các endpoint tín hiệu trong môi trường Docker Linux.

## Ghi chú giấy phép

- Dự án upstream Pipecat được phát hành theo giấy phép `BSD-2-Clause`
- Gói web client đi kèm `pipecat-ai-small-webrtc-prebuilt` nên được rà soát cùng điều khoản dịch vụ triển khai trước khi đưa vào sản xuất
- Điều khoản backend OpenAI hoặc tương thích OpenAI vẫn áp dụng cho các model và endpoint được cấu hình

## Ghi chú rủi ro

Công thức này thu âm microphone trực tiếp và có thể gửi bản ghi âm hoặc prompt tới endpoint model bên ngoài. Hãy rà soát các yêu cầu về sự đồng ý, lưu giữ, công bố và định tuyến mạng trước khi sử dụng trong sản xuất.
