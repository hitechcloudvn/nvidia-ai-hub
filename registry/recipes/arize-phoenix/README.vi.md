> [English](README.md) | **Tiếng Việt**

# Arize Phoenix

Không gian làm việc Arize Phoenix tự host thực tế cho NVIDIA AI Hub, sử dụng image container chính thức và mount dữ liệu cục bộ bền vững.

## Những gì công thức này cung cấp

- Giao diện web Phoenix trên cổng `6006`
- Dữ liệu không gian làm việc cục bộ bền vững cho trace, span, đánh giá và dataset
- Nền tảng một container đơn giản cho thử nghiệm và quy trình rà soát

## Truy cập mặc định

- Giao diện Phoenix: `http://localhost:6006`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/arize-phoenix/.env` trước khi khởi chạy lần đầu.
- Ghim image tag vào một bản phát hành cụ thể `version-X.Y.Z` để triển khai có thể tái lập.
- Biến thể image nonroot có thể cần quyền hệ thống file được điều chỉnh trước; nền tảng này dùng image mặc định để khởi động cục bộ đơn giản hơn.
- Bật xác thực và thay `PHOENIX_SECRET` trước khi mở dịch vụ này ra ngoài mạng cục bộ đáng tin cậy.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/arize-phoenix/data`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh công thức với hướng dẫn tự host của Arize Phoenix cho image Docker chính thức và lưu trữ cục bộ bền vững

Chưa được kiểm chứng tại đây:

- khởi động container trực tiếp, luồng đăng nhập hoặc nhận dữ liệu từ ứng dụng được instrument, vì Docker không khả dụng trong môi trường làm việc Windows này
- hành vi xác thực chính xác cho mọi tag phát hành upstream

## Ghi chú giấy phép

- Dự án upstream: `Arize-ai/phoenix`
- Rà soát giấy phép dự án upstream trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Để xác thực tắt sẽ mở không gian làm việc cục bộ cho bất kỳ ai có thể truy cập cổng đó.
- Các thay đổi image upstream trong tương lai có thể thêm hoặc đổi tên biến môi trường.
