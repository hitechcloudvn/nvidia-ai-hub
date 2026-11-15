> [English](AGENTS.md) | **Tiếng Việt**

# Hướng dẫn cho Agent

## Thay đổi Hub hiển thị cho người dùng

Khi thay đổi bất kỳ thứ gì ảnh hưởng đến giao diện Spark AI Hub, danh mục (catalog), recipe, metadata recipe, trạng thái ứng dụng đã cài/đang chạy, hành vi Docker Compose hoặc dữ liệu hiển thị qua API, không được xem công việc là hoàn tất cho đến khi Hub đang chạy phản ánh thay đổi đó.

Danh sách kiểm tra bắt buộc khi hoàn tất:

- Khởi động lại backend Hub khi trạng thái recipe/danh mục/giao diện có thể bị cache hoặc lỗi thời.
- Xác minh backend phản hồi sau khi khởi động lại, thường bằng `GET http://127.0.0.1:9000/api/recipes`.
- Xác minh các recipe/ứng dụng mong đợi có mặt hoặc đã bị gỡ bỏ qua API.
- Xác minh không có container model/ứng dụng ngoài ý muốn nào đang chiếm các cổng ứng dụng dùng chung như `9001`.
- Nêu rõ trong câu trả lời cuối cùng rằng máy chủ đã được khởi động lại hay chưa và những gì đã được xác minh.

Đây là yêu cầu bắt buộc đối với các công việc hướng đến Hub. Người dùng mong đợi mở giao diện ngay sau khi hoàn tất một tác vụ và thấy các thay đổi đã hoàn thành.
