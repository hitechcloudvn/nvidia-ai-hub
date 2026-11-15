> [English](README.md) | **Tiếng Việt**

# Budibase

Không gian làm việc Budibase tự host thực tế cho NVIDIA AI Hub, sử dụng image dịch vụ chính thức, CouchDB cục bộ, Redis, lưu trữ đối tượng tương thích MinIO và giao diện web được expose qua proxy mặc định.

## Những gì công thức này cung cấp

- Giao diện Budibase trên cổng `3015`
- CouchDB cục bộ cho trạng thái nền tảng
- Redis cục bộ cho hàng đợi và điều phối
- Lưu trữ đối tượng cục bộ tương thích MinIO cho tài sản được tải lên
- Các dịch vụ app, worker và proxy riêng biệt

## Truy cập mặc định

- Giao diện Budibase: `http://localhost:3015`
- MinIO API: `http://localhost:9002`
- MinIO console: `http://localhost:9003`

## Ghi chú cấu hình

- Cập nhật `registry/recipes/budibase/.env` trước khi khởi chạy lần đầu.
- Budibase yêu cầu nhiều bí mật; thay tất cả giá trị giữ chỗ trước khi sử dụng ngoài môi trường cục bộ.
- Công thức này cố ý mô hình hóa một nền cục bộ nhỏ hơn của kiến trúc đa dịch vụ chính thức thay vì một cụm sản xuất đầy đủ.
- Dự án upstream phát triển nhanh, nên khả năng tương thích image và môi trường cần được kiểm tra lại trước khi triển khai sản xuất.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/budibase/data/couchdb`
- `registry/recipes/budibase/data/redis`
- `registry/recipes/budibase/data/minio`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh bộ dịch vụ với các khái niệm Docker Compose được ghi nhận của Budibase xoay quanh CouchDB, MinIO, proxy, app và worker
- kiểm tra rằng cổng, bí mật và tham chiếu giữa các dịch vụ nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, tạo không gian làm việc đầu tiên, phát hành app nội bộ hoặc thực thi tự động hóa nền, vì Docker không khả dụng trong môi trường làm việc Windows này
- khả năng tương thích với mọi bản sửa đổi compose upstream mới hơn, phụ thuộc tính năng AI hoặc khả năng bị giới hạn theo gói doanh nghiệp
- tăng cường reverse proxy, TLS, sao lưu hoặc hành vi mở rộng quy mô sản xuất

## Ghi chú giấy phép

- Dự án upstream: `Budibase/budibase`
- Rà soát giấy phép tự host và ranh giới tính năng theo gói trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Đây là công thức rủi ro cao nhất trong đợt hiện tại vì bộ dịch vụ đa thành phần và nhiều bí mật.
- Bí mật hoặc kết nối lưu trữ không đúng có thể ngăn khởi động hoặc làm hỏng tải lên và tác vụ nền.
