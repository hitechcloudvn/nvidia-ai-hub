> [English](README.md) | **Tiếng Việt**

# SearXNG AI Stack

Stack SearXNG tự host thực tế cho NVIDIA AI Hub, sử dụng image container chính thức, cache Redis cục bộ và lưu trữ cấu hình bền vững.

## Những gì gói này cung cấp

- Web UI SearXNG trên cổng `8080`
- Baseline cache trên nền Redis cho hiệu năng tìm kiếm
- Thư mục cấu hình và cache bền vững cho tùy chỉnh cục bộ
- Phù hợp cho các quy trình duyệt web, truy vấn và tìm kiếm hỗ trợ AI theo hướng bảo mật riêng tư

## Truy cập mặc định

- Giao diện SearXNG: `http://localhost:8080`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/searxng-ai-stack/.env` trước lần khởi động đầu tiên.
- Recipe này chỉ thiết lập các biến môi trường cấp cao. Bạn có thể sẽ muốn xem xét các thiết lập được tạo trong `data/searxng` sau lần khởi động đầu tiên.
- Giữ `SEARXNG_BASE_URL` khớp với URL bạn hiển thị nếu bạn đổi cổng hoặc đặt dịch vụ sau reverse proxy.
- Các triển khai upstream thường thêm một reverse proxy như Caddy. Baseline tối giản này giữ stack nhỏ hơn cho việc đánh giá cục bộ.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/searxng-ai-stack/data/searxng`
- `registry/recipes/searxng-ai-stack/data/cache`
- `registry/recipes/searxng-ai-stack/data/redis`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh recipe với hướng dẫn triển khai Docker SearXNG bao gồm image chính thức, cache trên nền Redis và các mount bền vững `/etc/searxng` cùng `/var/cache/searxng`

Chưa được kiểm chứng tại đây:

- khởi động trực tiếp, khả năng truy cập công cụ tìm kiếm hoặc hành vi chống bot, vì Docker không khả dụng trong môi trường Windows này
- các mẫu triển khai reverse-proxy, TLS hoặc gia cố hướng Internet trong sản xuất

## Ghi chú giấy phép

- Dự án upstream: `searxng/searxng`
- Hãy xem giấy phép dự án upstream và điều khoản nhà cung cấp tìm kiếm trước khi phân phối lại trong sản xuất

## Ghi chú rủi ro

- Các nguồn công cụ tìm kiếm upstream có thể hạn chế hoặc chặn lưu lượng tự động.
- Hành vi SearXNG trong thực tế thường cần tinh chỉnh thiết lập ngoài baseline khởi động này.
- Các triển khai hướng Internet thường cần thêm kiểm soát proxy, giới hạn tốc độ và ranh giới tin cậy.
