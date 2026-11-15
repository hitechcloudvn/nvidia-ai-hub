> [English](README.md) | **Tiếng Việt**

# Browser-Use Workstation

Trạm làm việc tự động hóa trên trình duyệt cho NVIDIA GPU, sử dụng dự án `browser-use/web-ui` chính thức.

## Những gì công thức này cung cấp

- Gradio WebUI trên cổng `7788`
- Trình xem trình duyệt noVNC tùy chọn trên cổng `6080`
- Endpoint VNC trực tiếp tùy chọn trên cổng `5901`
- Cổng gỡ lỗi từ xa Chrome DevTools tùy chọn trên `9222`
- Trình chạy tác vụ agent browser-use với hỗ trợ nhiều nhà cung cấp LLM
- Kết quả tác vụ, tải xuống, trace, bản ghi và cài đặt WebUI đã lưu bền vững tại `./data/tmp`

## Truy cập mặc định

- Web UI: `http://localhost:7788`
- noVNC: `http://localhost:6080/vnc.html`
- VNC: `localhost:5901`
- CDP / gỡ lỗi từ xa: `localhost:9222`

## Ghi chú cấu hình

- Thêm ít nhất một thông tin xác thực nhà cung cấp trong `.env` trước khi sử dụng lần đầu, chẳng hạn `OPENAI_API_KEY`, `GOOGLE_API_KEY`, `ANTHROPIC_API_KEY` hoặc `DEEPSEEK_API_KEY`.
- Giao diện upstream mặc định là `DEFAULT_LLM=openai`, nhưng nhà cung cấp và model cũng có thể thay đổi trong WebUI.
- Khi tạo env runtime, NVIDIA AI Hub hiện tự phát hiện đường dẫn trình duyệt dựa trên Chromium cục bộ khi có thể và tự điền `BROWSER_PATH` cùng `USE_OWN_BROWSER=true`. Bạn vẫn có thể ghi đè cả hai giá trị thủ công trong `.env`.
- `USE_OWN_BROWSER=true` bật chế độ tái sử dụng trình duyệt. Khi dùng chế độ đó, hãy đặt `BROWSER_PATH` và tùy chọn `BROWSER_USER_DATA` nếu tự động phát hiện không khớp trình duyệt bạn muốn.
- `KEEP_BROWSER_OPEN=true` giữ phiên trình duyệt sống giữa các tác vụ.
- `BROWSER_CDP` có thể trỏ tới endpoint DevTools tương thích Chromium bên ngoài nếu bạn muốn agent gắn vào một trình duyệt đang chạy.
- `OLLAMA_BASE_URL` được đưa vào cho các mẫu định tuyến model cục bộ, nhưng bạn vẫn có thể cần đặt nhà cung cấp và endpoint trong giao diện tùy theo backend đã chọn.

## Dữ liệu bền vững

Công thức này lưu trữ dữ liệu tại:

- `registry/recipes/browser-use-workstation/data/tmp`
- `registry/recipes/browser-use-workstation/data/browser-profile`

Mount `tmp` bảo toàn tải xuống, trace, bản ghi, cài đặt đã lưu và kết quả nghiên cứu sâu do WebUI tạo ra.

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh build compose với nguồn image Docker upstream chính thức của `browser-use/web-ui`
- mở ra các cổng runtime upstream `7788`, `6080`, `5901` và `9222`
- giữ các mount host bền vững cho tạo phẩm tác vụ và tái sử dụng hồ sơ trình duyệt tùy chọn

Chưa được kiểm chứng tại đây:

- build image upstream đầy đủ và kiểm tra nhanh runtime trên môi trường làm việc Windows này
- thực thi tác vụ agent trực tiếp với các nhà cung cấp LLM bên ngoài
- kiểm tra phiên noVNC hoặc VNC tương tác

## Ghi chú giấy phép

- Dự án upstream: `browser-use/web-ui`
- Giấy phép upstream: MIT

## Ghi chú rủi ro

- Image upstream lớn và bao gồm Playwright Chromium, VNC, noVNC, Node.js và dịch vụ supervisor, nên lần build đầu có thể mất nhiều thời gian và dung lượng đĩa.
- Hành vi tự động hóa trình duyệt phụ thuộc vào nhà cung cấp LLM đã chọn, thông tin xác thực và trang web mục tiêu.
- Việc mở cổng VNC và CDP làm tăng bề mặt tấn công cục bộ; hãy giữ công thức này trong các mạng đáng tin cậy.
