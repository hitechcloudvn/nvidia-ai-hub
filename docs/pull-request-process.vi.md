> [English](pull-request-process.md) | **Tiếng Việt**

# Quy trình pull request

Tài liệu này định nghĩa quy trình rà soát và gộp được kỳ vọng.

## 1. Phạm vi pull request

Ưu tiên các pull request tập trung vào một mối quan tâm chính:

- backend
- frontend
- recipe
- script và hành vi trình cài đặt
- tài liệu và quản trị
- bảo trì dependency hoặc workflow

Nếu một pull request vượt nhiều lĩnh vực, hãy giải thích tại sao các thay đổi phải được gộp cùng nhau.

## 2. Kỳ vọng rà soát

### Backend

- kèm ghi chú kiểm tra backend
- xác định các đường dẫn API, luồng khởi động hoặc hành vi runtime bị ảnh hưởng

### Frontend

- kèm `npm run lint`
- kèm `npm run build`
- kèm tóm tắt xác minh thủ công ngắn gọn

### Recipe

- liệt kê chính xác các recipe slug đã thay đổi
- nêu rõ việc kiểm tra là kiểm thử nhanh (smoke test) hay chỉ kiểm tra metadata

### Thay đổi script và trình cài đặt

- nêu rõ hệ điều hành và shell đã dùng để kiểm tra
- ghi rõ khi hành vi được rà soát tĩnh thay vì thực thi

### Tài liệu và quản trị

- xác định các tệp cần đồng bộ đã được cập nhật cùng nhau
- ghi lại mọi rủi ro cho người rà soát khi không thể thực thi trực tiếp hành vi

## 3. Khuyến nghị bảo vệ nhánh

Bảo vệ được khuyến nghị cho `main`:

- yêu cầu pull request trước khi gộp
- yêu cầu ít nhất một phê duyệt
- yêu cầu rà soát từ code owner
- hủy phê duyệt cũ khi có commit mới
- yêu cầu giải quyết xong các cuộc hội thoại trước khi gộp
- chặn force push
- chặn xóa nhánh

## 4. Label và quyền sở hữu

Các label được khuyến nghị:

- `backend`
- `frontend`
- `recipes`
- `scripts`
- `documentation`
- `governance`
- `licensing`
- `dependencies`

`CODEOWNERS` nên luôn khớp với cấu trúc kho lưu trữ để người rà soát được yêu cầu tự động.

## 5. Automation và cập nhật dependency

- giữ các pull request dependency nhỏ và dễ rà soát
- làm mới các nhánh dependency cũ trước khi gộp
- giữ quyền của workflow ở mức tối thiểu
- dùng [`maintenance.md`](./maintenance.vi.md) và [`github-actions.md`](./github-actions.vi.md) khi đụng đến automation của kho lưu trữ

Các workflow của kho lưu trữ chạy tự động khi bộ lọc đường dẫn và event của chúng khớp. Dependabot vẫn đang hoạt động với giới hạn pull request được kiểm soát.

## 6. Rà soát tài liệu liên quan

Khi thay đổi hành vi cài đặt, runtime hoặc triển khai, hãy xem xét và cập nhật khi cần:

- [`installation.md`](./installation.vi.md)
- [`local-development.md`](./local-development.vi.md)
- [`deployment-production.md`](./deployment-production.vi.md)
- [`README.md`](../README.vi.md)

Khi thay đổi hướng lộ trình, thứ tự thực thi, chính sách tiếp nhận registry hoặc cách diễn đạt quản trị hướng tới người rà soát, cũng cần xem xét:

- [`../planning/sparkdeck-project-blueprint.md`](../planning/sparkdeck-project-blueprint.vi.md)
- [`../planning/development-execution-plan.md`](../planning/development-execution-plan.vi.md)
- [`../planning/registry-expansion-roadmap.md`](../planning/registry-expansion-roadmap.vi.md)
- [`community.md`](./community.vi.md)

## 7. Hướng dẫn gộp

Ưu tiên squash merge cho các thay đổi thông thường, trừ khi việc giữ lịch sử commit quan trọng cho mục đích kiểm toán hoặc phát hành.
