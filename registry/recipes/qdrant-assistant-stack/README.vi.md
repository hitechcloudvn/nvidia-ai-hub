> [English](README.md) | **Tiếng Việt**

# Qdrant Assistant Stack

Preset cơ sở dữ liệu vector Qdrant cho người dùng GPU NVIDIA muốn một nền tảng truy vấn trợ lý cục bộ thực tế với dịch vụ Qdrant chính thức, lưu trữ bền vững, hỗ trợ snapshot và web UI tích hợp được hiển thị qua cùng endpoint HTTP.

## Những gì gói này cung cấp

- Qdrant HTTP API trên cổng `6333`
- Qdrant gRPC API trên cổng `6334`
- Web UI tích hợp của Qdrant trên `http://localhost:3093`
- Endpoint kiểm tra sức khỏe Qdrant trên `http://localhost:6333/healthz`
- Lưu trữ cục bộ bền vững và thư mục snapshot trong `./data/*`
- Một đích cơ sở dữ liệu vector thực tế cho ứng dụng RAG, hệ thống agent, pipeline embedding và nguyên mẫu tìm kiếm

## Truy cập mặc định

- Web UI: `http://localhost:3093`
- HTTP API: `http://localhost:6333`
- gRPC API: `localhost:6334`
- Sức khỏe: `http://localhost:6333/healthz`
- Sẵn sàng: `http://localhost:6333/readyz`

## Các dịch vụ đi kèm

- `qdrant`: container cơ sở dữ liệu vector Qdrant chính thức với web UI tích hợp
- phụ thuộc bên ngoài vào `ollama-runtime` cho các ứng dụng xung quanh muốn tạo embedding hoặc sinh LLM cục bộ trên các vector được lưu trong Qdrant

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline stack vector hẹp, thực tế, sẵn sàng cho trợ lý:

- khởi động dịch vụ Qdrant một node với lưu trữ cục bộ bền vững
- hiển thị cả API HTTP và gRPC cho các ứng dụng và SDK xung quanh
- bảo toàn snapshot riêng biệt với đường dẫn lưu trữ chính
- hiển thị web UI tích hợp của Qdrant để kiểm tra collection, quản lý điểm (point) và khám phá API
- giữ stack tổng quát để Flowise, Langflow, LlamaIndex, Haystack, ứng dụng Python tùy chỉnh hoặc các mục danh mục trong tương lai có thể dùng Qdrant làm backend vector

Preset này **không** bao gồm:

- tự động tạo collection, tác vụ embedding hoặc pipeline nạp tài liệu
- các máy chủ ứng dụng đi kèm ghi vector vào Qdrant thay bạn
- quy trình tạo JWT, gia cố reverse proxy hoặc tự động sao lưu sản xuất
- cụm Qdrant phân tán hoặc triển khai đồng thuận đa node
- tuyên bố chất lượng trợ lý đầu-cuối đã kiểm chứng trong môi trường này

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên:

1. Xem `registry/recipes/qdrant-assistant-stack/.env`.
2. Tùy chọn đặt `QDRANT_API_KEY` nếu bạn muốn truy cập API có xác thực.
3. Khởi động recipe.
4. Kết nối ứng dụng hoặc công cụ quy trình làm việc của bạn tới `http://localhost:6333` hoặc `qdrant:6333` bên trong mạng compose.

## Ghi chú về Qdrant và ứng dụng

- Qdrant lưu dữ liệu trong `/qdrant/storage`, nên recipe này mount `registry/recipes/qdrant-assistant-stack/data/storage` vào đó.
- Qdrant lưu snapshot trong `/qdrant/snapshots`, nên recipe này mount một thư mục snapshot chuyên dụng để xử lý sao lưu gọn gàng hơn.
- Web UI tích hợp được phục vụ từ cùng dịch vụ HTTP Qdrant. Recipe này hiển thị endpoint đó hai lần để UI có thể mở trên `3093` trong khi API vẫn khả dụng trên `6333`.
- `OLLAMA_BASE_URL` được đưa vào mẫu môi trường như một ghi chú tiện lợi cho các ứng dụng xung quanh, nhưng chính Qdrant không tiêu thụ biến đó trực tiếp trong stack compose này.
- Đối với bảo mật cấp sản xuất, người đánh giá nên cân nhắc bật và kiểm tra kiểm soát truy cập dựa trên khóa API trước khi hiển thị rộng hơn.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/qdrant-assistant-stack/data/storage`
- `registry/recipes/qdrant-assistant-stack/data/snapshots`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose, bố cục lưu trữ bền vững, tệp cấu hình và tài liệu
- căn chỉnh các mount lưu trữ và snapshot với hướng dẫn Docker Qdrant upstream cho `/qdrant/storage` và `/qdrant/snapshots`
- căn chỉnh kỳ vọng HTTP, gRPC và endpoint kiểm tra sức khỏe với mặc định và đường dẫn sức khỏe upstream của Qdrant
- kiểm tra chẩn đoán trình soạn thảo cho các tệp recipe mới tạo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, truy cập web UI, tạo collection hoặc truy vấn vector, vì Docker không khả dụng trong môi trường Windows này
- các quy trình được bảo vệ bằng khóa API ngoài placeholder môi trường được tài liệu hóa
- phục hồi snapshot, cụm hoặc hành vi đồng thuận phân tán
- tương thích với mọi framework RAG phía dưới

## Ghi chú giấy phép

- Dự án upstream: `qdrant/qdrant`
- Hãy xem xét giấy phép image Qdrant và hướng dẫn bảo mật riêng trước khi phân phối lại trong sản xuất hoặc hiển thị rộng hơn

## Ghi chú rủi ro

- Theo mặc định, Qdrant có thể được hiển thị mà không cần xác thực nếu `QDRANT_API_KEY` để trống.
- Preset này cố ý dừng ở việc dựng hạ tầng và không tuyên bố chất lượng nạp, xếp hạng hoặc truy vấn đã kiểm chứng.
- Hiển thị cùng dịch vụ HTTP trên cả `6333` và `3093` tiện lợi cho truy cập cục bộ, nhưng người đánh giá nên quyết định có muốn mở cả hai cổng dài hạn hay không.
- Các collection vector lớn và snapshot có thể tiêu tốn dung lượng lưu trữ nhanh chóng nếu không quản lý thời hạn lưu trữ.
