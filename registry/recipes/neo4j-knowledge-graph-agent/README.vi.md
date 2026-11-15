> [English](README.md) | **Tiếng Việt**

# Neo4j Knowledge Graph Agent

Preset Neo4j Community cho người dùng GPU NVIDIA muốn một nền tảng cơ sở dữ liệu đồ thị cục bộ thực tế cho các thử nghiệm knowledge graph, khám phá Cypher, nguyên mẫu graph-RAG và quy trình agent cần một backend property graph bền vững.

## Những gì gói này cung cấp

- Neo4j Browser trên cổng `3094`
- Endpoint HTTP Neo4j trên cổng `7475`
- Endpoint Bolt Neo4j trên cổng `7688`
- Bootstrap plugin APOC cho các procedure tiện ích đồ thị thông dụng
- Dữ liệu đồ thị, log, tài nguyên import và plugin bền vững trong `./data`, `./logs`, `./import` và `./plugins`
- Một đích cục bộ thực tế cho trích xuất đồ thị, liên kết thực thể, phân tích đồ thị và quy trình trợ lý trên nền đồ thị

## Truy cập mặc định

- Neo4j Browser: `http://localhost:3094/browser/`
- Endpoint HTTP Neo4j: `http://localhost:7475`
- Endpoint Bolt Neo4j: `bolt://localhost:7688`
- Tên người dùng mặc định: `neo4j`
- Mật khẩu mặc định: được định nghĩa trong `registry/recipes/neo4j-knowledge-graph-agent/.env`

## Các dịch vụ đi kèm

- `neo4j`: container Neo4j Community chính thức với Browser và bootstrap plugin
- phụ thuộc bên ngoài vào `ollama-runtime` cho các ứng dụng graph-RAG hoặc agent xung quanh muốn tích hợp LLM hoặc embedding cục bộ trên đồ thị đã lưu

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline đồ thị cục bộ thực tế:

- khởi động cơ sở dữ liệu Neo4j một node với Browser được bật
- hiển thị Bolt cho các ứng dụng đồ thị và client Cypher
- bật các procedure APOC thường dùng cho tác vụ import, export, biến đổi và tiện ích đồ thị
- bảo toàn trạng thái đồ thị, log và các tệp có thể import qua các lần khởi động lại
- giữ stack tổng quát để LangChain, LlamaIndex, pipeline GraphRAG, dịch vụ Python tùy chỉnh hoặc các mục danh mục trong tương lai có thể dùng Neo4j làm backend đồ thị

Preset này **không** bao gồm:

- pipeline trích xuất tự động từ tài liệu sang đồ thị
- điều phối LLM đi kèm, embedding hoặc máy chủ ứng dụng graph-RAG
- cụm Neo4j Enterprise, sao lưu, Bloom hoặc đóng gói Graph Data Science doanh nghiệp
- gia cố TLS, thiết lập reverse proxy hoặc tích hợp SSO
- tuyên bố chất lượng agent knowledge graph đầu-cuối đã kiểm chứng trong môi trường này

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên:

1. Xem `registry/recipes/neo4j-knowledge-graph-agent/.env`.
2. Đổi `NEO4J_AUTH` thành mật khẩu mạnh.
3. Khởi động recipe.
4. Kết nối ứng dụng của bạn tới `bolt://localhost:7688` hoặc `neo4j://neo4j:7687` bên trong mạng compose.
5. Đặt các tệp nguồn đồ thị có thể import như CSV, JSON vào `registry/recipes/neo4j-knowledge-graph-agent/import` nếu bạn dự định dùng các procedure import của Neo4j.

## Ghi chú về Neo4j và ứng dụng

- Neo4j Browser được phục vụ bởi cùng dịch vụ HTTP trên cổng container `7474`; recipe này hiển thị nó trên cổng host `3094` thông qua cùng listener HTTP được hiển thị trên `7475`.
- URL Browser hướng về host dùng cùng endpoint HTTP Neo4j nền tảng, nên cả Browser và endpoint kiểu REST đều khả dụng sau khi khởi động.
- APOC được bật thông qua `NEO4J_PLUGINS` và các thiết lập procedure APOC thoáng để việc nạp và biến đổi đồ thị cục bộ trong thử nghiệm dễ dàng hơn.
- `OLLAMA_BASE_URL` được đưa vào mẫu môi trường như một ghi chú tiện lợi cho các ứng dụng xung quanh, nhưng chính Neo4j không tiêu thụ biến đó trực tiếp trong stack compose này.
- Nếu bạn xây dựng luồng graph-RAG trên recipe này, hãy giữ embedding, trích xuất và điều phối truy vấn ở tầng ứng dụng thay vì kỳ vọng Neo4j tự động cung cấp.

## Dữ liệu bền vững

Recipe này lưu trữ trạng thái tại:

- `registry/recipes/neo4j-knowledge-graph-agent/data`
- `registry/recipes/neo4j-knowledge-graph-agent/logs`
- `registry/recipes/neo4j-knowledge-graph-agent/import`
- `registry/recipes/neo4j-knowledge-graph-agent/plugins`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose, bố cục thư mục bền vững và tài liệu
- căn chỉnh cổng Browser và Bolt của Neo4j với mặc định Docker Neo4j upstream cho HTTP `7474` và Bolt `7687`
- căn chỉnh các mẫu môi trường xác thực và plugin với quy ước image Docker Neo4j upstream cho `NEO4J_AUTH` và `NEO4J_PLUGINS`
- kiểm tra chẩn đoán trình soạn thảo cho các tệp recipe mới tạo

Chưa được kiểm chứng tại đây:

- chạy trực tiếp `docker compose up`, đăng nhập Browser, thực thi Cypher hoặc thực thi procedure APOC, vì Docker không khả dụng trong môi trường Windows này
- thông lượng import đồ thị, hành vi tải plugin hoặc tương thích với mọi framework graph-RAG phía dưới
- các tính năng chỉ dành cho doanh nghiệp như cụm, luồng sao lưu nâng cao hoặc add-on Neo4j có bản quyền
- hành vi agent đầu-cuối trên cơ sở dữ liệu đồ thị

## Ghi chú giấy phép

- Dự án upstream: `neo4j/docker-neo4j`
- Recipe này nhắm đến việc dùng image Neo4j Community; hãy xem xét điều khoản giấy phép Neo4j upstream trước khi phân phối lại hoặc triển khai sản xuất
- Một số plugin Neo4j và tính năng thương mại của Neo4j yêu cầu xem xét giấy phép riêng và không nên giả định được preset này bao gồm

## Ghi chú rủi ro

- Preset này ưu tiên hạ tầng trước và tự nó không tạo knowledge graph hay quy trình agent.
- Việc bật procedure APOC tiện lợi cho thử nghiệm cục bộ nhưng mở rộng bề mặt procedure khả dụng và nên được xem xét cẩn thận trước khi hiển thị rộng hơn.
- Việc tải plugin và khả năng tương thích có thể khác nhau giữa các image tag Neo4j, nên người đánh giá nên xác minh image tag đã chọn nếu dự định ghim nó dài hạn.
- Việc mở cổng cho Browser và Bolt hữu ích cho công việc tích hợp cục bộ nhưng nên được xem xét trước khi mở rộng ra mạng rộng hơn.
