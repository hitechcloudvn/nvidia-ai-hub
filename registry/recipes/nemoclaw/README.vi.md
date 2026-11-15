> [English](README.md) | **Tiếng Việt**

# NemoClaw trên GPU NVIDIA

Recipe này được tinh chỉnh cho luồng suy luận cục bộ theo kiểu GPU NVIDIA:

- Ollama cục bộ trên host
- `nemotron-3-super:120b` làm tag mô hình mặc định
- Kết nối kênh Telegram được bật tại thời điểm build image
- Trạng thái NemoClaw/OpenClaw được lưu bền vững trong `registry/recipes/nemoclaw/data/`

## Trước lần build đầu tiên

1. Đảm bảo Ollama đang chạy trên host.
2. Đảm bảo các container có thể truy cập nó tại `http://host.openshell.internal:11434`.
3. Trên Linux, gắn Ollama vào `0.0.0.0:11434`, không chỉ `127.0.0.1`.
4. Tải mô hình bạn dự định sử dụng, hoặc cập nhật `NEMOCLAW_MODEL` trong `.env` trước khi build.

## Ghi chú Telegram

- `TELEGRAM_BOT_TOKEN` được phân giải tại runtime.
- `NEMOCLAW_MESSAGING_CHANNELS_B64` được nướng vào image. Giá trị mặc định bật `telegram`.
- `NEMOCLAW_MESSAGING_ALLOWED_IDS_B64` là tùy chọn và mong đợi JSON được mã hóa base64 như `{"telegram":["123456789"]}`.

Nếu bạn thay đổi các trường messaging được nướng vào image hoặc route mô hình, hãy build lại recipe.

## Xuất token

Sau lần khởi động đầu tiên, token dashboard được ghi vào:

- `registry/recipes/nemoclaw/data/metadata/openclaw-token.txt`
