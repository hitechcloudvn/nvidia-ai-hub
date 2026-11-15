> [English](README.md) | **Tiếng Việt**

# Open WebUI Pipelines

Recipe dựa trên Docker chính thức cho dịch vụ Open WebUI Pipelines.

## Những gì gói này cung cấp

- Máy chủ pipeline cục bộ trên cổng `9099`
- Thư mục pipeline bền vững tại `./data/pipelines`
- Khóa API theo `.env` và tùy chọn danh sách URL pipeline từ xa
- Sẵn sàng ghép cặp với `Open WebUI` hoặc các client tương thích OpenAI khác hỗ trợ Open WebUI Pipelines

## Truy cập mặc định

- API / tài liệu: `http://localhost:9099/docs`

## Ghi chú bảo mật quan trọng

Open WebUI Pipelines có thể thực thi mã Python tùy ý từ các pipeline đã cài đặt hoặc từ xa. Chỉ tải các pipeline bạn tin tưởng, xem xét kỹ các nguồn `PIPELINES_URLS` và tránh hiển thị dịch vụ ra công khai mà không có kiểm soát truy cập bổ sung.

## Các biến môi trường chính

- `PIPELINES_PORT`: cổng host cho dịch vụ
- `PIPELINES_API_KEY`: khóa API mà các client như Open WebUI yêu cầu
- `PIPELINES_URLS`: tùy chọn danh sách phân tách bằng dấu phẩy các nguồn pipeline từ xa để đồng bộ
- `PIPELINES_DIR`: đường dẫn lưu trữ pipeline trong container
