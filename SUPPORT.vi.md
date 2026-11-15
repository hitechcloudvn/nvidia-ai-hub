> [English](SUPPORT.md) | **Tiếng Việt**

# Hỗ trợ

Tài liệu này giải thích nơi đặt câu hỏi, nơi báo cáo lỗi và cách định tuyến các yêu cầu bảo mật hoặc thương mại.

## 1. Dùng đúng kênh

### GitHub Discussions

Dùng Discussions, khi được bật, cho:

- câu hỏi về sử dụng
- trợ giúp cài đặt
- hướng dẫn môi trường
- ý tưởng về lộ trình
- thảo luận kiến trúc
- gợi ý recipe trước khi triển khai

### GitHub Issues

Dùng Issues cho:

- lỗi có thể tái hiện được
- lỗi cài đặt hoặc runtime
- hồi quy của frontend hoặc backend
- sai sót trong tài liệu
- vấn đề về metadata hoặc nạp recipe

### Báo cáo bảo mật

**Không** mở issue công khai cho lỗ hổng.

Hãy làm theo [`SECURITY.md`](./SECURITY.vi.md).

### Yêu cầu thương mại

Việc sử dụng, bàn giao, dịch vụ có quản lý, tư vấn hoặc sử dụng tạo doanh thu mang tính thương mại cần sự cho phép bằng văn bản riêng.

Dùng:

- [`COMMERCIAL-LICENSE.md`](./COMMERCIAL-LICENSE.vi.md)
- [`LICENSE`](./LICENSE)
- [`docs/licensing.md`](./docs/licensing.vi.md)
- [`docs/legal-notice.md`](./docs/legal-notice.vi.md)

## 2. Trước khi mở issue

Hãy xem các tài liệu liên quan trước:

- [`docs/installation.md`](./docs/installation.vi.md)
- [`docs/local-development.md`](./docs/local-development.vi.md)
- [`docs/deployment-production.md`](./docs/deployment-production.vi.md)
- [`docs/community.md`](./docs/community.vi.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.vi.md)
- [`SECURITY.md`](./SECURITY.vi.md) khi vấn đề có thể liên quan đến bảo mật

Nếu yêu cầu về định hướng lộ trình, thứ tự tính năng hoặc ưu tiên mở rộng registry, cũng xem thêm:

- [`planning/sparkdeck-project-blueprint.md`](./planning/sparkdeck-project-blueprint.vi.md)
- [`planning/development-execution-plan.md`](./planning/development-execution-plan.vi.md)
- [`planning/registry-expansion-roadmap.md`](./planning/registry-expansion-roadmap.vi.md)

## 3. Cung cấp các thông tin sau

Cung cấp:

- hệ điều hành
- phương pháp cài đặt hoặc quy trình nguồn đã sử dụng
- phiên bản Python, Node.js và Docker khi liên quan
- các lệnh chính xác đã dùng
- kết quả mong đợi
- kết quả thực tế
- log, stack trace, ảnh chụp màn hình hoặc đầu ra console trình duyệt khi liên quan
- vấn đề có tái hiện được không

## 4. Các bước tự kiểm tra

Môi trường Linux hoặc dựa trên shell:

```bash
./check.sh
```

Ví dụ kiểm chứng từ mã nguồn:

```bash
.venv/bin/python -m uvicorn daemon.main:app --host 127.0.0.1 --port 9000
cd frontend
npm run lint
npm run build
```

Ví dụ Windows PowerShell:

```powershell
.\.venv\Scripts\python.exe -m uvicorn daemon.main:app --host 127.0.0.1 --port 9000
```

Nếu bạn dùng Windows hoặc macOS, hãy dùng quy trình từ mã nguồn theo [`docs/local-development.md`](./docs/local-development.vi.md) thay vì dựa trên giả định script shell Linux.

## 5. Ranh giới hỗ trợ

Hỗ trợ được thực hiện theo phương án tốt nhất có thể (best-effort), trừ khi có thỏa thuận thương mại bằng văn bản riêng quy định khác.

Khi báo cáo vấn đề, hãy nêu rõ:

- vấn đề đến từ quy trình cài đặt Linux hay quy trình phát triển từ mã nguồn
- việc kiểm chứng Docker hoặc runtime GPU đã thực sự được thực hiện hay chưa
- vấn đề xảy ra trên Linux, Windows hay macOS
- báo cáo về hành vi runtime, cách diễn đạt trong tài liệu, diễn giải pháp lý/giấy phép hay kỳ vọng về lộ trình/kế hoạch

## 6. Ghi chú pháp lý

Các tham chiếu đến công nghệ NVIDIA trong kho lưu trữ này chỉ nhằm mục đích mô tả và không ngụ ý chứng thực. Đối với điều khoản pháp lý và giấy phép, hãy dùng các tệp được liệt kê trong phần giấy phép của [`README.md`](./README.vi.md).

Tên sản phẩm ngắn `NVIDIA AI Hub` và tên sản phẩm đầy đủ `NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` chỉ cùng một giải pháp phần mềm, trừ khi một văn bản điều khiển bằng văn bản phân biệt rõ chúng.

Các câu hỏi về ghi nhận thương hiệu, cách diễn đạt không chứng thực, diễn giải ranh giới thương mại hoặc xuất bản bên ngoài nên được xử lý thông qua các tài liệu pháp lý và giấy phép trước khi sử dụng công khai hoặc hướng đến khách hàng.
