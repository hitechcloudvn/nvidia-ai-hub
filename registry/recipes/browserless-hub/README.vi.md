> [English](README.md) | **Tiếng Việt**

# Browserless Hub

Endpoint Browserless Chromium tự host thực tế cho NVIDIA AI Hub, sử dụng image container chính thức.

## Những gì công thức này cung cấp

- Endpoint Browserless Chromium trên cổng `3000`
- Truy cập tự động hóa HTTP và WebSocket cho Playwright, Puppeteer và các quy trình browser-agent liên quan
- Endpoint tài liệu tích hợp tại `/docs`
- Thư mục user-data của trình duyệt bền vững cho trạng thái phiên cục bộ

## Truy cập mặc định

- Tài liệu Browserless: `http://localhost:3000/docs`
- Endpoint WebSocket của trình duyệt: `ws://localhost:3000`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/browserless-hub/.env` trước khi khởi chạy lần đầu.
- Thay `TOKEN` trước khi mở endpoint ra bất kỳ mạng dùng chung nào.
- Tinh chỉnh `CONCURRENT`, `QUEUE_LENGTH` và `TIMEOUT` để khớp với năng lực host và mẫu khối lượng công việc.
- Công thức này dùng biến thể image Chromium. Hãy chuyển sang image upstream khác nếu trường hợp sử dụng của bạn yêu cầu.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/browserless-hub/data/browserless`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh công thức với hướng dẫn khởi động nhanh của Browserless cho image Chromium, endpoint `/docs` và cổng `3000`

Chưa được kiểm chứng tại đây:

- chạy phiên trình duyệt trực tiếp, kết nối Playwright/Puppeteer hoặc tác vụ PDF/chụp ảnh, vì Docker không khả dụng trong môi trường làm việc Windows này
- khả năng tương thích với các tính năng Browserless chỉ dành cho doanh nghiệp

## Ghi chú giấy phép

- Dự án upstream: `browserless/browserless`
- Browserless phát hành nhiều phiên bản và điều khoản giấy phép. Hãy rà soát kho upstream và điều khoản thương mại cẩn thận trước khi phân phối lại hoặc sử dụng trong sản xuất.

## Ghi chú rủi ro

- Các phiên bản Browserless được mở có thể bị lạm dụng cho tự động hóa trình duyệt tốn tài nguyên cao nếu không được bảo vệ.
- Các kỳ vọng về phiên bản, edition và giấy phép nên được rà soát cẩn thận trước khi triển khai doanh nghiệp.
- Các giá trị token giữ chỗ không an toàn và phải được thay thế.
