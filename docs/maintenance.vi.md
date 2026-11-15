> [English](maintenance.md) | **Tiếng Việt**

# Bảo trì kho lưu trữ

Hướng dẫn này dành cho người bảo trì khi cập nhật các cơ chế kiểm soát của kho lưu trữ, định tuyến rà soát và automation đang hoạt động.

## 1. Các lĩnh vực bảo trì

### `CODEOWNERS`

Giữ `/.github/CODEOWNERS` khớp với bố cục thực tế của kho lưu trữ.

Cập nhật khi quyền sở hữu thay đổi đối với:

- các tệp backend
- các tệp frontend
- recipe và script
- các tệp quản trị và workflow
- các tệp quản lý dependency

### Label

Giữ `/.github/labeler.yml` khớp với các đường dẫn và danh mục rà soát hiện tại.

Các nhóm label được khuyến nghị gồm:

- `backend`
- `frontend`
- `recipes`
- `scripts`
- `documentation`
- `governance`
- `licensing`
- `dependencies`

### Dependabot

`/.github/dependabot.yml` được bật theo mặc định với giới hạn pull request được kiểm soát.

Chỉ điều chỉnh giới hạn theo từng hệ sinh thái khi năng lực rà soát thay đổi.

### Workflow của kho lưu trữ

Các workflow trong `/.github/workflows/` được bật theo mặc định.

Hãy xem [`github-actions.md`](./github-actions.vi.md) trước khi thay đổi phạm vi, quyền hoặc hành vi phát hành của workflow.

## 2. Thuật ngữ chuẩn

- **active** (đang hoạt động) — được bật theo mặc định khi event và bộ lọc đường dẫn của workflow khớp
- **bounded** (có giới hạn) — automation được bật với giới hạn được đặt theo năng lực rà soát
- **paused** (tạm dừng) — cấu hình đã có nhưng việc tự động tạo pull request bị cố ý ngăn lại

## 3. Bảo vệ nhánh

Bảo vệ được khuyến nghị cho `main`:

- yêu cầu pull request trước khi gộp
- yêu cầu phê duyệt
- yêu cầu rà soát từ code owner
- hủy phê duyệt cũ khi có commit mới
- yêu cầu giải quyết xong các cuộc hội thoại
- chặn force push
- chặn xóa nhánh

## 4. Danh sách kiểm tra cho người bảo trì

Khi thay đổi các cơ chế bảo trì kho lưu trữ, hãy xác nhận:

- `CODEOWNERS` vẫn khớp với bố cục
- label vẫn định tuyến như mong muốn
- quyền của workflow vẫn ở mức tối thiểu
- trigger của workflow vẫn được giới hạn có chủ đích
- giới hạn Dependabot vẫn phù hợp với năng lực rà soát
- các tài liệu liên quan được cập nhật trong cùng một pull request
- cách diễn đạt pháp lý và nhãn hiệu vẫn được đồng bộ khi áp dụng
- các tham chiếu kế hoạch và lộ trình vẫn được đồng bộ khi áp dụng

## 5. Ghi chú pull request cho các thay đổi bảo trì

Các pull request bảo trì nên nêu rõ:

- lĩnh vực kiểm soát bị ảnh hưởng
- phạm vi hoặc giới hạn automation có thay đổi hay không
- mọi thay đổi về quyền
- bằng chứng kiểm tra cho các thay đổi workflow hoặc tài liệu
- mọi công việc tiếp theo còn dở dang

Nếu thay đổi bảo trì ảnh hưởng đến ngôn ngữ chính sách kho lưu trữ, định tuyến tài liệu hoặc kỳ vọng về quy trình rà soát, hãy ghi rõ liệu `docs/community.md` và các tài liệu chỉ mục trong `planning/` đã được xem xét để bảo đảm tính nhất quán hay chưa.
