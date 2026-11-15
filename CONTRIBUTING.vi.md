> [English](CONTRIBUTING.md) | **Tiếng Việt**

# Đóng góp cho NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC

Cảm ơn bạn đã đóng góp cho NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC.

Tài liệu này định nghĩa quy trình làm việc được kỳ vọng cho các đóng góp về mã, tài liệu và recipe.

## Nhận diện pháp lý và Ghi nhận thương hiệu

`NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` là một giải pháp phần mềm được phát triển và phân phối bởi **Pho Tue SoftWare And Technology Solutions Joint Stock Company** (gồm thương hiệu **HiTechCloud**).

Thông tin công ty chính thức:

- Tên pháp nhân tiếng Việt: **CÔNG TY CỔ PHẦN GIẢI PHÁP CÔNG NGHỆ VÀ PHẦN MỀM PHỔ TUỆ**
- Tên pháp nhân tiếng Anh: **Pho Tue SoftWare And Technology Solutions Joint Stock Company**
- Mã số thuế: `0318222903`
- Số D-U-N-S: `557339920`
- Địa chỉ đăng ký: `128 Binh My Street, Binh My Commune, Ho Chi Minh City`

Khi đóng góp vào kho lưu trữ này:

- giữ nguyên mọi thông báo pháp lý, thông báo bản quyền và ghi nhận thương hiệu;
- không thêm lời lẽ, tài nguyên hoặc metadata ngụ ý NVIDIA tài trợ, chứng thực, chứng nhận hoặc liên kết trừ khi được ủy quyền rõ ràng bằng văn bản;
- coi `NVIDIA`, logo `NVIDIA`, `DGX`, `CUDA` và các tên NVIDIA liên quan là thương hiệu và/hoặc thương hiệu đã đăng ký của **NVIDIA Corporation** và các công ty liên kết; và
- giữ nguyên ghi nhận nguồn cho mọi nhãn hiệu, logo và tên sản phẩm bên thứ ba khác được dùng trong tài liệu, recipe hoặc tài nguyên giao diện.

Tên sản phẩm ngắn `NVIDIA AI Hub` và tên sản phẩm đầy đủ `NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC` chỉ cùng một giải pháp phần mềm, trừ khi một văn bản bằng văn bản cụ thể phân biệt rõ chúng.

Không được giới thiệu hoặc hỗ trợ bất kỳ nhãn hiệu, tên thương mại, tên miền, danh tính mạng xã hội hoặc yếu tố thương hiệu gây nhầm lẫn tương tự nào bắt nguồn từ tên dự án, tên công ty hoặc các nhãn hiệu bên thứ ba được tham chiếu trong kho lưu trữ này khi không có cơ sở pháp lý độc lập.

Bất kỳ tài liệu hướng đến khách hàng, trao đổi với đại lý, đề xuất, xuất bản bên ngoài hoặc tài liệu thương mại hóa nào sử dụng tên dự án cùng với nhãn hiệu bên thứ ba đều phải được rà soát về tuân thủ thương hiệu, ghi nhận nguồn và cạnh tranh không lành mạnh trước khi phân phối.

## Phạm vi

Chào đón các đóng góp cho:

- Cải tiến backend API trong `daemon/`
- Cải tiến giao diện frontend trong `frontend/`
- Định nghĩa recipe trong `registry/recipes/`
- Script cài đặt và runtime
- Tài liệu và hướng dẫn xử lý sự cố
- Sửa lỗi, tối ưu hiệu năng và cập nhật khả năng bảo trì

## Trước khi bắt đầu

Vui lòng:

1. Mở một issue cho các thay đổi lớn, tính năng mới hoặc refactor quy mô lớn.
2. Giữ pull request tập trung vào một mối quan tâm duy nhất.
3. Ưu tiên các commit nhỏ, dễ review.
4. Dùng tiếng Anh cho tài liệu, thông điệp commit, tiêu đề PR và chú thích mã.

## Chính sách đóng góp của công ty

Kho lưu trữ nên theo tiêu chuẩn đóng góp kiểu doanh nghiệp.

- Chỉ dùng tiếng Anh trong viết kỹ thuật.
- Ưu tiên tài liệu trực tiếp, tập trung vào triển khai hơn là ngôn ngữ tiếp thị.
- Giữ hướng dẫn vận hành có thể tái hiện trên một máy sạch.
- Không commit bí mật, dữ liệu khách hàng, token, endpoint nội bộ hoặc thông tin xác thực độc quyền.
- Giữ ghi nhận nguồn bên thứ ba, thông báo và nguồn gốc upstream khi cập nhật recipe, tài nguyên hoặc logic cài đặt.
- Đánh dấu rõ các thay đổi về pháp lý, giấy phép, an ninh hoặc tác động thương mại trong pull request.
- Tránh các thay đổi phá vỡ tương thích chưa được review đối với quy trình cài đặt, runtime hoặc tương thích recipe.

Nếu một đóng góp đưa vào mã, tài nguyên, mô hình hoặc cấu hình sao chép từ bên ngoài, hãy ghi lại nguồn và giấy phép trong pull request.

Tự động hóa kho lưu trữ chạy theo mặc định khi các tệp phù hợp thay đổi. Khi một pull request chạm vào `.github/workflows/` hoặc `.github/dependabot.yml`, hãy cập nhật các tài liệu quản trị liên quan trong cùng bộ thay đổi.

Khi một thay đổi chạm vào nhận diện pháp lý, lời lẽ thương hiệu, ranh giới sử dụng thương mại, thương hiệu công khai hoặc chính sách kho lưu trữ hướng đến reviewer, hãy giữ nội dung đồng bộ giữa:

- `README.md`
- `NOTICE`
- `LICENSE`
- `COMMERCIAL-LICENSE.md`
- `docs/licensing.md`
- `docs/legal-notice.md`
- `docs/legal-notice.vi.md`
- `docs/community.md`

## Cấu trúc dự án

```text
daemon/            Backend FastAPI (FastAPI backend)
frontend/          Frontend React + Vite (React + Vite frontend)
registry/recipes/  Kho recipe ứng dụng (App recipe registry)
scripts/           Helper shell và PowerShell dùng chung (Shared shell and PowerShell helpers)
install.*          Điểm vào cài đặt (Installation entrypoints)
run.*              Điểm vào chạy cục bộ (Local run entrypoints)
check.*            Điểm vào kiểm tra môi trường (Environment validation entrypoints)
```

## Phát triển cục bộ

Để có quy trình thiết lập và kiểm chứng cục bộ hoàn chỉnh, xem [`docs/local-development.md`](./docs/local-development.vi.md).

Để biết cài đặt, giới hạn triển khai, điều kiện tiên quyết về Docker và runtime NVIDIA, và việc dùng PM2 tùy chọn, xem [`docs/installation.md`](./docs/installation.vi.md).

## Quy trình shell kiểu Linux / macOS

Tạo cấu hình cục bộ:

```bash
cp .env.example .env
```

Chạy kiểm tra môi trường:

```bash
./check.sh
```

Khởi động ứng dụng:

```bash
./run.sh
```

## Quy trình Windows PowerShell

Dùng các lệnh trong [`docs/local-development.md`](./docs/local-development.vi.md).

Lưu ý rằng kho lưu trữ hiện chưa có các điểm vào `install.ps1`, `run.ps1` hoặc `check.ps1`.

## Phát triển Frontend

Cài đặt phụ thuộc và khởi động Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

Build production:

```bash
npm run build
```

Lint mã frontend:

```bash
npm run lint
```

## Phát triển Backend

Tạo hoặc tái sử dụng môi trường ảo, sau đó cài đặt phụ thuộc:

```bash
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

Trên Windows:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Chạy API trực tiếp:

```bash
.venv/bin/python -m uvicorn daemon.main:app --host 127.0.0.1 --port 8000
```

Trên Windows:

```powershell
.\.venv\Scripts\python.exe -m uvicorn daemon.main:app --host 127.0.0.1 --port 8000
```

## Cấu hình

Cấu hình cục bộ dùng chung được lưu trong tệp `.env` ở gốc kho lưu trữ.

Các thiết lập phổ biến bao gồm:

- `NVIDIA_AI_HUB_HOST`
- `NVIDIA_AI_HUB_PORT`
- `NVIDIA_AI_HUB_NODE_MAJOR`
- `NVIDIA_AI_HUB_FRONTEND_DIR`
- `NVIDIA_AI_HUB_REGISTRY_PATH`
- `NVIDIA_AI_HUB_DATA_DIR`
- `NVIDIA_AI_HUB_DB_PATH`

Không commit bí mật hoặc thông tin xác thực riêng của máy.

## Tiêu chuẩn viết mã

### Python

- Theo phong cách Python kiểu FastAPI: rõ ràng, có kiểu (typed) và dễ bảo trì.
- Giữ hàm tập trung và tránh các refactor không liên quan.
- Ưu tiên xử lý đường dẫn tường minh với `pathlib`.
- Dùng UTF-8 khi đọc hoặc ghi tệp văn bản có thể chứa Unicode.

### React / JavaScript

- Giữ component nhỏ và có khả năng tổ hợp.
- Ưu tiên tên prop mô tả và luồng state dễ dự đoán.
- Giữ nguyên thiết lập Vite + ESLint hiện có.
- Chạy `npm run build` và `npm run lint` trước khi gửi thay đổi frontend.

### PowerShell và Shell Script

- Giữ quy trình Windows và shell thống nhất khi khả thi.
- Giữ nguyên tên tham số và hành vi hướng đến người dùng hiện có.
- Tránh phá vỡ các quy trình cài đặt không cần người giám sát (unattended).

## Đóng góp Recipe

Các đóng góp recipe nằm trong `registry/recipes/<slug>/`.

Mỗi recipe nên có tối thiểu:

- `recipe.yaml`
- `docker-compose.yml` khi runtime của recipe yêu cầu
- Mọi tệp hỗ trợ cần thiết chỉ cho recipe đó

Hướng dẫn recipe:

- Giữ `slug` ổn định và an toàn với hệ thống tệp.
- Dùng metadata chính xác cho `name`, `author`, `website`, `upstream`, `status` và `release_date`.
- Đặt `release_date` là tháng phát hành công khai ban đầu của mô hình hoặc công cụ nền tảng theo định dạng `YYYY-MM`.
- Khớp cổng và đường dẫn giao diện với hành vi thực của container.
- Đặt yêu cầu bộ nhớ và ổ đĩa thực tế.
- Dùng mã hóa UTF-8 cho tệp YAML.
- Kiểm chứng rằng recipe có thể được backend nạp mà không có lỗi schema.

Cách kiểm chứng ví dụ:

```bash
.venv/bin/python -c "from daemon.services.registry_service import load_recipes; print(len(load_recipes()))"
```

Trên Windows:

```powershell
.\.venv\Scripts\python.exe -c "from daemon.services.registry_service import load_recipes; print(len(load_recipes()))"
```

## Đóng góp tài liệu

Tài liệu nên:

- Chỉ bằng tiếng Anh
- Trực tiếp và mang tính kỹ thuật
- Nhất quán với hành vi thực của kho lưu trữ
- Được cập nhật cùng thay đổi mã khi hành vi thay đổi

Tài liệu không nên chứa các khẳng định không thể kiểm chứng, ngữ cảnh khách hàng chỉ dành cho nội bộ hoặc các bước vận hành mơ hồ.

Nếu bạn thêm hoặc thay đổi lệnh, cổng, biến môi trường hoặc điều kiện tiên quyết, hãy cập nhật tài liệu liên quan trong cùng pull request.

Nếu bạn thêm hoặc thay đổi lời lẽ về pháp lý, giấy phép, thương hiệu, thương mại hóa hoặc ghi nhận nguồn, hãy cập nhật các tài liệu pháp lý và quản trị liên quan trong cùng pull request và nêu rõ các tệp bị ảnh hưởng trong ghi chú kiểm chứng.

Các maintainer cập nhật chính sách kho lưu trữ, định tuyến review, nhãn, Dependabot hoặc hướng dẫn bảo vệ nhánh cũng nên xem [`docs/maintenance.md`](./docs/maintenance.vi.md).

## Danh sách kiểm tra Pull Request

Trước khi mở một pull request, hãy xác nhận:

- [ ] Thay đổi có phạm vi rõ ràng và dễ review
- [ ] Tài liệu đã được cập nhật nếu hành vi thay đổi
- [ ] Đã thêm ghi chú kiểm chứng cần thiết cho các thay đổi backend, frontend, recipe, script hoặc quản trị
- [ ] Đã xem xét các thay đổi tự động hóa kho lưu trữ nếu thay đổi phụ thuộc vào workflow hoặc Dependabot

## Tự động hóa kho lưu trữ

Các tệp workflow trong `.github/workflows/` chạy tự động khi bộ lọc sự kiện và đường dẫn của chúng khớp.

Kho lưu trữ cũng có `.github/dependabot.yml`, và các pull request cập nhật phụ thuộc vẫn hoạt động với giá trị `open-pull-requests-limit` có giới hạn.

Dùng [`docs/github-actions.md`](./docs/github-actions.vi.md) để biết danh mục workflow hiện tại và hướng dẫn tự động hóa.

Nếu thay đổi của bạn phụ thuộc vào tự động hóa kho lưu trữ, hãy đề cập sự phụ thuộc đó trong pull request và xác nhận phạm vi workflow hoặc hành vi tự động hóa đã thay đổi gì.
