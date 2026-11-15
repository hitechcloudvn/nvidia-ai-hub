> [English](github-actions.md) | **Tiếng Việt**

# Hướng dẫn GitHub Actions

Tài liệu này mô tả mô hình automation hiện hành cho kho lưu trữ này.

## 1. Trạng thái automation hiện tại

Kho lưu trữ chứa các workflow đang hoạt động cho kiểm tra, đóng gói và automation dependency.

### Các workflow đang hoạt động

- `.github/workflows/pr-validation.yml`
- `.github/workflows/labeler.yml`
- `.github/workflows/optional-workflows-status.yml`
- `.github/workflows/ci-validation.yml`
- `.github/workflows/recipe-validation.yml`
- `.github/workflows/docs-governance.yml`
- `.github/workflows/dependency-updates.yml`
- `.github/workflows/dependabot-auto-triage.yml`
- `.github/workflows/release-package.yml`
- `.github/workflows/desktop-build.yml`
- `.github/workflows/release-publish.yml`

### Automation dependency

- `.github/dependabot.yml`

Dependabot được cấu hình và đang hoạt động với giới hạn pull request được kiểm soát (bounded).

## 2. Các workflow dùng để làm gì

### CI validation

Nhằm chạy các bước kiểm tra cốt lõi cho backend và frontend:

- cài đặt dependency backend
- `python -m compileall daemon`
- cài đặt dependency frontend
- `npm run lint`
- `npm run build`

### Recipe validation

Nhằm kiểm tra cấu trúc của recipe và shell script.

### Docs and governance validation

Nhằm kiểm tra các tài liệu bắt buộc và các liên kết Markdown nội bộ.

Điều này nên bao gồm các tài liệu quản trị cốt lõi, kế hoạch và tài liệu pháp lý tham chiếu như `README.md`, `docs/community.md`, `docs/licensing.md`, `docs/legal-notice.md` và các tài liệu `planning/` được theo dõi trong kho.

### Release packaging

Nhằm build một gói mã nguồn kèm artifact frontend production.

Workflow này upload gói mã nguồn dưới dạng GitHub Actions artifact cho các build theo tag và build được kích hoạt thủ công.

### Desktop packaging

Nhằm build các artifact desktop Electron cho Windows, macOS và Linux.

Workflow desktop hiện đang:

- cài đặt Node.js và Python trên từng runner được hosting
- cài đặt dependency frontend với `npm ci`
- build frontend bundle
- tạo icon desktop cho Windows, macOS và Linux từ brand SVG được theo dõi trong kho
- lắp ráp một backend runtime cục bộ cho việc đóng gói Electron
- tạo các artifact desktop riêng cho từng nền tảng thông qua `electron-builder`
- upload các artifact trình cài đặt hoặc bundle được tạo ra để rà soát

Trên Windows, workflow dùng `npm run desktop:dist:win` để các đầu ra NSIS setup, portable, ZIP và MSI không ghi đè lên nhau.

### Release publishing

Nhằm publish release notes và các asset đã đóng gói lên GitHub Release.

Workflow này chạy trên `release: published` và cũng có thể được bắt đầu thủ công.

Workflow build lại gói mã nguồn và các artifact desktop từ release tag, sau đó upload chúng lên GitHub Release tương ứng.

Chữ ký được hosting, notarization và kiểm tra gói Linux gốc chưa được cấu hình và nên được xem là công việc tiếp theo.

Nếu bổ sung chữ ký sau này, hãy thiết lập explicitly các secret và certificate cho từng nền tảng:

- chữ ký Windows: `CSC_LINK`, `CSC_KEY_PASSWORD`, và tùy chọn `WIN_CSC_LINK` / `WIN_CSC_KEY_PASSWORD`
- chữ ký macOS: `CSC_LINK`, `CSC_KEY_PASSWORD`, `CSC_NAME`
- notarization macOS: `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD`, `APPLE_TEAM_ID`

Việc đóng gói cục bộ hoặc trên runner được hosting cũng có thể thất bại khi cache binary tải xuống của Electron không đầy đủ hoặc các mirror upstream trả về phản hồi `504` tạm thời. Chạy lại `npm install` trong `frontend/` sẽ sửa tệp `node_modules/electron/path.txt` bị thiếu vì hook `postinstall` giờ đã kiểm tra lại Electron runtime trước khi đóng gói.

### Dependency update validation

Nhằm kiểm tra các thay đổi về dependency và automation workflow.

### Dependabot auto-triage

Nhằm gán label và hướng dẫn các pull request Dependabot sau khi người bảo trì chủ động bật các pull request dependency.

## 3. Hướng dẫn về quyền

Trước khi bật hoặc thay đổi workflow, hãy xác minh:

- quyền vẫn ở mức tối thiểu
- phạm vi workflow khớp với các tệp được theo dõi
- phiên bản công cụ vẫn nhất quán với tài liệu dự án
- các trigger của workflow vẫn được giới hạn một cách có chủ đích

## 4. Kỳ vọng về pull request đối với thay đổi workflow

Khi một pull request thay đổi các tệp workflow, cần nêu rõ:

- những gì đã thay đổi
- phạm vi trigger hoặc hành vi automation có thay đổi hay không
- mọi thay đổi về quyền
- mọi bước kiểm tra tương đương đã thực hiện cục bộ
- mọi hành vi trên GitHub-hosted chưa được kiểm thử

Nếu các thay đổi workflow làm thay đổi kỳ vọng kiểm tra đối với backend, frontend, recipe, tài liệu hoặc quản trị, hãy xem hướng dẫn người đóng góp được liên kết trong [`../CONTRIBUTING.md`](../CONTRIBUTING.vi.md), [`pull-request-process.md`](./pull-request-process.vi.md) và các ưu tiên thực thi hiện hành trong [`../planning/development-execution-plan.md`](../planning/development-execution-plan.vi.md).
