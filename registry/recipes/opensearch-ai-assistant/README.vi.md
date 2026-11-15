> [English](README.md) | **Tiếng Việt**

# OpenSearch AI Assistant

Preset OpenSearch và OpenSearch Dashboards cho người dùng GPU NVIDIA muốn một nền tảng cục bộ thực tế cho tìm kiếm hỗ trợ AI, hỗ trợ truy vấn PPL, thử nghiệm ML Commons và kết nối Ollama dùng chung mà không tuyên bố một triển khai agent được nối dây hoàn toàn trước.

## Những gì gói này cung cấp

- Cụm OpenSearch một node trên cổng API `9201`
- Web UI OpenSearch Dashboards trên cổng `3091`
- Dữ liệu OpenSearch bền vững trong `./data/opensearch`
- Thiết lập OpenSearch ML Commons được bật cho suy luận từ xa, connector và thử nghiệm agent-framework
- Cấu hình query-enhancements của Dashboards cho khám phá agent hỗ trợ truy vấn PPL
- Truy cập host dùng chung tới `ollama-runtime` thông qua `http://host.docker.internal:11435`
- Một baseline thực tế để tạo connector, đăng ký mô hình từ xa, triển khai agent và khám phá các quy trình tìm kiếm hỗ trợ AI theo cách thủ công

## Truy cập mặc định

- Giao diện Dashboards: `http://localhost:3091`
- API OpenSearch: `http://localhost:9201`
- Tên người dùng mặc định: `admin`
- Nguồn mật khẩu mặc định: `OPENSEARCH_INITIAL_ADMIN_PASSWORD` trong `registry/recipes/opensearch-ai-assistant/.env`

## Các dịch vụ đi kèm

- `opensearch`: container OpenSearch một node chính thức
- `dashboards`: container OpenSearch Dashboards chính thức với cấu hình hỗ trợ truy vấn
- phụ thuộc bên ngoài vào `ollama-runtime` thông qua `http://host.docker.internal:11435` khi bạn tạo connector ML Commons cho các mô hình cục bộ

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline sẵn sàng cho trợ lý thay vì một bootstrap tự động hóa quá mức:

- khởi động cụm OpenSearch cục bộ và giao diện Dashboards với dữ liệu bền vững
- bật các thiết lập ML Commons thường cần cho suy luận từ xa và thử nghiệm agent
- cấu hình sẵn ánh xạ ngôn ngữ hỗ trợ truy vấn của Dashboards cho các tên cấu hình agent PPL mặc định được dùng upstream
- để việc tạo connector, đăng ký mô hình, triển khai mô hình và tạo agent cho các quy trình API hoặc Dashboards thủ công sau lần khởi động đầu tiên
- giữ kỳ vọng bảo mật rõ ràng bằng cách yêu cầu mật khẩu admin thực trong tệp môi trường

Preset này **không** bao gồm:

- tự động tạo connector ML Commons, mô hình hoặc agent ID trong khi khởi động container
- một chat sidecar hoạt động đảm bảo hoặc đường dẫn plugin chat Dashboards được nối dây hoàn toàn
- kết thúc TLS, SSO, gia cố reverse proxy hoặc cấu trúc sản xuất đa node
- tự động tạo index template, trình nạp tài liệu hoặc pipeline RAG dựng sẵn
- mô hình Ollama được tải sẵn

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên:

1. Xem `registry/recipes/opensearch-ai-assistant/.env`.
2. Đổi `OPENSEARCH_INITIAL_ADMIN_PASSWORD` và giữ `DASHBOARDS_PASSWORD` khớp với nó.
3. Khởi động `ollama-runtime` nếu bạn dự định tạo connector từ xa tới endpoint Ollama cục bộ.
4. Khởi động recipe.
5. Đăng nhập Dashboards và hoàn tất công việc bootstrap ML Commons theo cách thủ công.

## Ghi chú về ML Commons và Ollama

Preset này được thiết kế theo mẫu upstream thực tế trong đó tính năng hỗ trợ truy vấn và chat của Dashboards phụ thuộc vào cấu hình ML Commons đặc thù cho từng cụm đang chạy.

Luồng sau khởi động thông dụng:

1. Tạo một connector từ xa nhắm tới `http://host.docker.internal:11435` hoặc endpoint tương thích OpenAI/Ollama khác truy cập được.
2. Đăng ký một mô hình với connector đó qua ML Commons API.
3. Triển khai mô hình.
4. Tạo các cấu hình agent cần thiết cho hỗ trợ truy vấn, thường dùng các tên cấu hình như:
   - `os_query_assist_ppl`
   - `os_query_time_range_parser`
5. Tùy chọn tạo thêm agent cho chat hoặc tóm tắt nếu bộ tính năng và plugin Dashboards của bạn hỗ trợ.

Các nhóm API hữu ích nên xem sau khi khởi động:

- `POST /_plugins/_ml/connectors/_create`
- `POST /_plugins/_ml/models/_register`
- `POST /_plugins/_ml/models/<MODEL_ID>/_deploy`
- `POST /_plugins/_ml/agents/_register`
- `GET /_plugins/_ml/config/<CONFIG_NAME>`

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/opensearch-ai-assistant/data/opensearch`
- `registry/recipes/opensearch-ai-assistant/config/opensearch_dashboards.yml`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose, bố cục lưu trữ bền vững, cấu hình Dashboards và tài liệu
- căn chỉnh thiết lập OpenSearch một node với recipe `onyx` cục bộ và các mẫu container OpenSearch upstream
- căn chỉnh cấu hình Dashboards với cách đặt tên môi trường/cấu hình upstream cho `opensearch.hosts`, thông tin xác thực, chế độ xác minh SSL, bật nguồn dữ liệu và cấu hình hỗ trợ truy vấn
- tài liệu hóa bootstrap ML Commons như một bước thủ công thay vì tuyên bố cung cấp agent tự động chưa được xác minh

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, đăng nhập cụm, tạo connector hoặc hành vi hỗ trợ truy vấn của Dashboards, vì Docker không khả dụng trong môi trường Windows này
- đăng ký connector ML Commons thực tế với Ollama hoặc endpoint suy luận khác
- bật plugin chat với `mlCommonsAgentId` thực
- gia cố sản xuất, TLS hoặc hành vi đa node

## Ghi chú giấy phép

- Các dự án upstream: `opensearch-project/OpenSearch` và `opensearch-project/OpenSearch-Dashboards`
- Hãy xem xét giấy phép upstream và điều khoản container trước khi phân phối lại hoặc đóng gói sản xuất

## Ghi chú rủi ro

- Các tính năng hỗ trợ AI của OpenSearch và Dashboards nhạy cảm với phiên bản và có thể phụ thuộc vào khả năng plugin hoặc tài nguyên ML Commons thay đổi giữa các bản phát hành.
- Recipe này cố ý không giả vờ rằng chat trợ lý sẵn sàng ngay sau khi khởi động; người đánh giá nên kỳ vọng thiết lập thủ công sau khởi động.
- Hiển thị API OpenSearch trên `9201` hữu ích cho bootstrap và gỡ lỗi, nhưng làm tăng tầm quan trọng của việc thay thông tin xác thực mặc định.
- Thiết lập cục bộ một node phù hợp cho thử nghiệm trên workstation, không phải triển khai sản xuất đã được gia cố.
