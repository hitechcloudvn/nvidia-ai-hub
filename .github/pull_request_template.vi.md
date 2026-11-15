> [English](pull_request_template.md) | **Tiếng Việt**

## Tóm tắt

Mô tả thay đổi một cách rõ ràng và súc tích.

## Issue liên quan

Liên kết issue liên quan, nếu có.

## Loại thay đổi

- [ ] Sửa lỗi
- [ ] Tính năng
- [ ] Tái cấu trúc
- [ ] Cập nhật tài liệu
- [ ] Thêm hoặc cập nhật recipe
- [ ] Thay đổi script cài đặt hoặc runtime
- [ ] Thay đổi phá vỡ tương thích

## Khu vực ảnh hưởng

- [ ] Backend (`daemon/`)
- [ ] Frontend (`frontend/`)
- [ ] Recipe registry (`registry/recipes/`)
- [ ] Script cài đặt hoặc runtime
- [ ] Tài liệu

## Kiểm chứng

Liệt kê các kiểm tra đã thực hiện:

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] khởi động backend với `uvicorn`
- [ ] `./check.sh`
- [ ] kiểm chứng nạp recipe registry
- [ ] xác minh UI thủ công

Cung cấp lệnh, ảnh chụp màn hình hoặc ghi chú khi cần.

## Ghi chú phạm vi kiểm chứng và xác minh

- Mô tả những gì đã được kiểm chứng cho khu vực thay đổi và những gì có chủ đích không kiểm chứng.
- Nếu không có coverage tự động, hãy tóm tắt các kiểm tra hồi quy thủ công đã thực hiện.
- Với thay đổi frontend, nêu trạng thái build, lint và xác minh UI.
- Với thay đổi backend, nêu các kiểm tra khởi động, API, nạp recipe và kiểm tra riêng theo nền tảng khi áp dụng.
- Với thay đổi trình cài đặt, script hoặc registry, nêu hệ điều hành, shell và các smoke test recipe/runtime đã dùng.
- Nếu còn bất kỳ rủi ro sót lại nào cho người rà soát, hãy nêu rõ.

## Bảo mật, giấy phép và nguồn gốc

Xác nhận tất cả các mục áp dụng:

- [ ] Không commit bí mật, thông tin đăng nhập hoặc dữ liệu nội bộ
- [ ] Mã nguồn, tài sản hoặc nguồn recipe bên thứ ba được ghi nguồn phù hợp
- [ ] Đã rà soát hệ quả về giấy phép
- [ ] Các thay đổi nhạy cảm về bảo mật được mô tả bên dưới

## Thay đổi phá vỡ tương thích

Mô tả bất kỳ thay đổi phá vỡ tương thích nào hoặc viết `None`.

## Tác động tài liệu

- [ ] Không cần cập nhật tài liệu
- [ ] Đã cập nhật README
- [ ] Đã cập nhật `CONTRIBUTING.md`
- [ ] Đã cập nhật tài liệu recipe hoặc vận hành

## Ảnh chụp màn hình hoặc log

Thêm ảnh chụp màn hình, output terminal hoặc ví dụ API khi hữu ích.

## Ghi chú cho người rà soát

Nêu rõ bất kỳ điều gì cần người rà soát chú ý thêm.

## Hướng dẫn PR

- Giữ pull request tập trung và giới hạn trong một mối quan tâm khi có thể.
- Tóm tắt rõ ràng tác động tới người dùng, vận hành và tài liệu.
- Liên kết issue, yêu cầu hoặc hạng mục công việc liên quan khi có.
- Nhấn mạnh tường minh các thay đổi phá vỡ tương thích, hệ quả bảo mật, hệ quả giấy phép và phần việc tiếp theo.
