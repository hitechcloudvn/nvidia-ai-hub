> [English](README.md) | **Tiếng Việt**

# Ollama Runtime

Baseline runtime Ollama chính thức cho GPU NVIDIA với giao diện quản lý nhẹ, lưu trữ mô hình cục bộ bền vững, bootstrap mô hình khởi động có thể cấu hình và endpoint API cục bộ dùng chung cho các recipe phía dưới.

## Những gì gói này cung cấp

- Runtime `ollama/ollama` chính thức với hỗ trợ dành riêng GPU
- Endpoint API host dùng chung trên cổng `11435`
- Giao diện quản lý nhẹ trên cổng `3014`
- Cache mô hình bền vững trong `./data`
- Bootstrap mô hình khởi động tùy chọn khi runtime lần đầu truy cập thành công
- Danh mục các mô hình chat, suy luận, code, vision và embedding được khuyến nghị hiển thị trong giao diện cục bộ

## Truy cập mặc định

- API Ollama dùng chung: `http://localhost:11435`
- Giao diện quản lý: `http://localhost:3014`
- Endpoint kiểm tra sức khỏe: `http://localhost:3014/api/health`
- Metadata runtime: `http://localhost:3014/api/runtime`

## Các dịch vụ đi kèm

- `ollama`: container runtime Ollama chính thức
- `ollama-runtime-ui`: mặt phẳng quản lý FastAPI cục bộ cho kiểm tra sức khỏe, danh mục mô hình, tải xuống và thao tác xóa

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline runtime cục bộ thận trọng:

- sử dụng container Ollama chính thức để phục vụ mô hình
- xây dựng một giao diện quản lý cục bộ nhỏ đã có sẵn trong kho này
- lưu các mô hình đã tải trong một thư mục cục bộ được bind mount để sao lưu và dọn dẹp có thể dự đoán được
- mặc định dùng một mô hình khởi động duy nhất để tiện lợi cho lần chạy đầu tiên, nhưng cho phép thay thế qua `.env`
- giữ proxy xác thực, kết thúc TLS, định tuyến đa node, nhân bản mô hình và các tính năng quản trị doanh nghiệp ngoài phạm vi

Preset này **không** bao gồm:

- tự động xác minh GPU, driver hoặc runtime Docker của bạn được cấu hình đúng
- các sản phẩm chat UI đi kèm như Open WebUI, Flowise hoặc AnythingLLM
- đảm bảo tải sẵn mọi mô hình được khuyến nghị hiển thị trong danh mục giao diện
- cách ly mạng gia cố, SSO, chính sách API gateway hoặc tách tenant

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `registry/recipes/ollama-runtime/.env` và điều chỉnh nếu cần:

- `OLLAMA_HOST_PORT`
- `OLLAMA_UI_PORT`
- `STARTER_MODEL`
- `STARTER_DISPLAY_NAME`
- `SHARED_ENDPOINT`
- `OLLAMA_KEEP_ALIVE`

Nếu `host.docker.internal` không phân giải đúng trong môi trường Docker của bạn, hãy đặt `SHARED_ENDPOINT` thành một địa chỉ truy cập được mà các container và client khác có thể sử dụng.

## Ghi chú runtime

- Giao diện quản lý poll API Ollama cục bộ và chỉ báo trạng thái healthy khi runtime truy cập được và mô hình khởi động đã cấu hình hiện diện.
- Khi khởi động, giao diện quản lý cố gắng kéo `STARTER_MODEL` sau khi runtime truy cập được.
- Danh mục mô hình khuyến nghị hiển thị trong giao diện chỉ mang tính tham khảo; nó không đảm bảo mọi mô hình liệt kê đều phù hợp với ngân sách bộ nhớ khả dụng của bạn.
- Thời gian kéo mô hình phụ thuộc vào thông lượng mạng, tốc độ đĩa và kích thước mô hình đã chọn.

## Dữ liệu bền vững

Recipe này lưu các mô hình đã tải tại:

- `registry/recipes/ollama-runtime/data`

Mã giao diện quản lý vẫn là một phần của cây nguồn recipe và không lưu trạng thái runtime bên ngoài thư mục mô hình Ollama được mount.

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- cập nhật metadata recipe để khớp với schema registry hiện tại
- thêm các mẫu `.env` và `.env.example` cho recipe runtime
- căn chỉnh stack compose với image Ollama chính thức cùng build image giao diện quản lý cục bộ hiện có
- kiểm tra rằng bind mount bền vững, cổng hiển thị và kết nối biến môi trường nhất quán nội bộ

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, suy luận GPU hoặc tải mô hình khởi động, vì Docker không khả dụng trong môi trường Windows này
- các yêu cầu đầu-cuối từ các recipe phụ thuộc tới endpoint Ollama đang chạy
- mức sử dụng bộ nhớ GPU cho bất kỳ mô hình cụ thể nào được liệt kê trong danh mục giao diện
- gia cố sản xuất, xác thực hoặc hành vi reverse-proxy

## Ghi chú giấy phép

- Runtime upstream: `ollama/ollama`
- Hãy xem xét giấy phép Ollama upstream và điều khoản container trước khi phân phối lại hoặc đóng gói thương mại
- Giao diện quản lý nhẹ trong recipe này là mã keo cục bộ trong kho và không thay thế các ranh giới hỗ trợ upstream

## Ghi chú rủi ro

- Tag image Ollama `latest` có thể thay đổi hành vi theo thời gian và có thể yêu cầu cập nhật môi trường hoặc tương thích tiếp theo.
- Các mô hình lớn có thể tiêu tốn nhiều đĩa và bộ nhớ GPU; người đánh giá nên xác minh rằng mô hình khởi động và mô hình đã tải phù hợp với phần cứng mục tiêu.
- Endpoint API dùng chung cố ý không yêu cầu xác thực trong preset baseline này, vì vậy nó nên nằm trên mạng cục bộ đáng tin cậy trừ khi bạn thêm tầng gateway hoặc proxy.
