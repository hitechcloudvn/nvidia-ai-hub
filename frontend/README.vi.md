> [English](README.md) | **Tiếng Việt**

# Không gian làm việc Frontend

Thư mục này chứa frontend React + Vite cho `NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC`.

`NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` là một giải pháp phần mềm do **Pho Tue SoftWare And Technology Solutions Joint Stock Company** phát triển và phân phối.

## Thông báo nhãn hiệu và pháp lý

`NVIDIA`, logo `NVIDIA`, `DGX`, `CUDA` và các tên liên quan đến NVIDIA là nhãn hiệu và/hoặc nhãn hiệu đã đăng ký của **NVIDIA Corporation** và các công ty liên kết của NVIDIA tại Hoa Kỳ và các quốc gia khác.

Các tham chiếu đến nền tảng NVIDIA, driver, runtime GPU hoặc công nghệ hệ sinh thái trong frontend này chỉ nhằm mục đích mô tả và không hàm ý tài trợ, chứng nhận, phê duyệt hay liên kết trừ khi được nêu rõ bằng văn bản.

Mọi nhãn hiệu, logo, tên sản phẩm và tên công ty khác hiển thị trong giao diện hoặc tài liệu vẫn thuộc sở hữu của các chủ sở hữu tương ứng.

## Phát triển

Cài đặt dependency:

```bash
npm install
```

Khởi động máy chủ phát triển:

```bash
npm run dev
```

Tạo bản build sản xuất:

```bash
npm run build
```

Tạo bản build phát triển desktop và khởi chạy Electron:

```bash
npm run desktop:dev
```

Tạo các artifact desktop được đóng gói:

```bash
npm run desktop:dist
```

Chạy kiểm tra lint:

```bash
npm run lint
```

## Ghi chú đóng gói desktop

- Mã nguồn Electron nằm trong `electron/`
- ứng dụng desktop được đóng gói sẽ khởi động một runtime backend FastAPI cục bộ
- việc đóng gói desktop yêu cầu Python khả dụng trên máy build
- đóng gói CI được host chạy qua `.github/workflows/desktop-build.yml`
- đóng gói CI trên Windows dùng `npm run desktop:dist:win` để các artifact `.exe` setup và portable giữ tên riêng biệt
- icon ứng dụng được sinh từ `public/brand/spark-ai-hub-mark.svg` qua `npm run build:icons`
- các bản build web sản xuất hiện tách các vendor bundle lớn trong `vite.config.js` để giảm chunk entry chính trong quá trình đóng gói desktop và web
- `npm run desktop:pack` và `npm run desktop:dist` hiện xóa `frontend/release/` trước để tránh các output đóng gói Windows cũ bị khóa
- `npm install` hiện tự sửa một bản cài đặt binary Electron bị hỏng qua `npm run electron:ensure`
- việc ký trên Windows có thể dùng `CSC_LINK` và `CSC_KEY_PASSWORD`
- việc ký trên macOS cần thêm `CSC_NAME`
- notarization trên macOS cần `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD` và `APPLE_TEAM_ID`
- nếu `electron-builder` thất bại khi tải Electron với HTTP `504`, hãy thử build lại vì lỗi đó thường do khả dụng mạng upstream chứ không phải cấu hình dự án

Để biết hướng dẫn thiết lập, kiểm chứng và cấp phép ở cấp kho lưu trữ đầy đủ, xem:

- [`../README.vi.md`](../README.vi.md)
- [`../docs/local-development.vi.md`](../docs/local-development.vi.md)
- [`../docs/licensing.vi.md`](../docs/licensing.vi.md)
