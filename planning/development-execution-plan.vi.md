> [English](development-execution-plan.md) | **Tiếng Việt**

# Kế hoạch thực thi phát triển

## Mục đích
Kế hoạch này biến bản thiết kế sản phẩm thành một backlog triển khai thực tế cho kho lưu trữ `nvidia-ai-hub` hiện tại. Tài liệu nhằm hướng dẫn triển khai lặp dần qua các dòng công việc backend, frontend, registry, trình cài đặt và vận hành.

## Cơ sở hiện tại của kho lưu trữ
Kho lưu trữ đã có sẵn một nền tảng có thể sử dụng:

- `daemon/` cung cấp backend FastAPI cho recipe, container, trạng thái hệ thống và lưu trữ bền vững.
- `frontend/` cung cấp giao diện React + Vite để duyệt danh mục và vận hành.
- `registry/recipes/` đã chứa tập recipe AI dựa trên Docker rộng khắp.
- `deploy/` gồm các ví dụ reverse proxy và dịch vụ cho `systemd`, `nginx`, `caddy` và `pm2`.
- `docs/` đã đề cập cài đặt, triển khai sản xuất, phát triển cục bộ, bảo trì, quản trị và quy trình pull request.

Giai đoạn tiếp theo nên tập trung ít vào việc dựng khung thô mà chú trọng vào việc củng cố sản phẩm, tăng độ tự tin cho người vận hành, chất lượng recipe và các lát phát hành có thể dự đoán.

## Mục tiêu bàn giao 2026

### Mục tiêu 1 — Làm cho nền tảng vận hành tin cậy
Người vận hành phải có thể cài đặt, chạy, khởi động lại và xử lý sự cố hub mà không cần đọc mã nguồn.

### Mục tiêu 2 — Nâng cao chất lượng và tính nhất quán của recipe
Mỗi recipe nên có siêu dữ liệu rõ ràng, kỳ vọng kiểm chứng, ghi chú runtime và tích hợp UX tốt hơn.

### Mục tiêu 3 — Cải thiện trải nghiệm người dùng khi khám phá và khởi chạy
Người dùng cần hiểu mức độ phù hợp phần cứng, các URL được lộ ra, tác động lưu trữ và trạng thái khởi chạy trước khi nhấp cài đặt.

### Mục tiêu 4 — Chuẩn bị dự án cho tăng trưởng cộng đồng bền vững
Người đóng góp nên có lộ trình rõ ràng hơn, các lát triển khai nhỏ hơn và các cổng chất lượng được ghi thành tài liệu.

## Các dòng công việc

## Dòng công việc A — Độ tin cậy của backend
Trọng tâm: `daemon/`, hợp đồng API, an toàn điều phối, lưu trữ bền vững và báo cáo sức khỏe.

### A1. Tăng cường cấu hình
- Chuẩn hóa việc nạp biến môi trường và giá trị mặc định trên `install.sh`, `run.sh`, `check.sh` và `daemon/config.py`.
- Định nghĩa tài liệu tham chiếu cấu hình ổn định cho host, cổng, đường dẫn registry, khoảng thời gian polling và cài đặt giữ lại dữ liệu.
- Thêm thông báo lỗi khởi động rõ ràng hơn khi thiếu Docker, đường dẫn registry không hợp lệ hoặc thư mục dữ liệu không đọc được.

### A2. Tính bền vững của vòng đời container
- Đảm bảo các luồng start, stop, restart và remove là idempotent.
- Cải thiện thông báo lỗi khi recipe được cài một phần hoặc compose project đã tồn tại.
- Tách lỗi runtime có thể phục hồi khỏi lỗi điều phối nghiêm trọng trong phản hồi API.

### A3. Sự trưởng thành của mô hình dữ liệu
- Rà soát `daemon/models/` và phần lưu trữ trong `daemon/db.py` để nâng cấp an toàn.
- Thêm kế hoạch migration tường minh cho sự tiến hóa schema SQLite trong tương lai.
- Theo dõi lịch sử cài đặt, thời gian khởi chạy gần nhất và lý do thất bại khi hữu ích.

### A4. Hoàn thiện giám sát hệ thống
- Mở rộng các endpoint trạng thái hệ thống với tóm tắt sức khỏe GPU, bộ nhớ, đĩa và dịch vụ rõ ràng hơn.
- Thêm báo cáo trạng thái suy giảm khi dữ liệu `nvidia-smi` hoặc Docker không khả dụng.
- Chuẩn hóa định dạng timestamp và khoảng thời gian polling để frontend sử dụng.

## Dòng công việc B — UX sản phẩm của frontend
Trọng tâm: `frontend/src/`, tính dễ sử dụng, độ tự tin cho người vận hành và sự rõ ràng của trạng thái.

### B1. Sự rõ ràng của danh mục
- Cải thiện cách đặt tên danh mục, lọc và hiển thị tag.
- Nhấn mạnh trạng thái recipe, yêu cầu phần cứng, loại runtime và nhóm banner nhất quán hơn.
- Thêm hướng dẫn trạng thái rỗng cho phần cứng không được hỗ trợ, recipe bị thiếu và lỗi nạp registry.

### B2. Niềm tin khi cài đặt và khởi chạy
- Trình bày các kiểm tra preflight trước khi cài đặt.
- Hiển thị cổng dự kiến, tác động đĩa, lượng model tải xuống và ghi chú lần chạy đầu tiên trước khi khởi chạy.
- Làm cho trạng thái thất bại có thể hành động được với gợi ý thử lại và xử lý sự cố.

### B3. Bảng điều khiển ứng dụng đang chạy
- Hiển thị URL ứng dụng, trạng thái container, thời gian chạy và sức khỏe trong một cái nhìn.
- Phân biệt giữa các trạng thái đang khởi động, healthy, suy giảm, đã dừng và thất bại.
- Thêm lối truy cập nhanh vào log và ghi chú vận hành riêng của recipe.

### B4. Hoàn thiện vận hành
- Chuẩn hóa trạng thái đang tải, toast và xử lý lỗi.
- Giảm sự mơ hồ của UI quanh thiết lập nền, image pull và độ sẵn sàng sau cài đặt.
- Giữ UI tương thích đầy đủ với bản build sản xuất được backend phục vụ từ `frontend/dist`.

## Dòng công việc C — Chất lượng registry và recipe
Trọng tâm: `registry/recipes/`, chất lượng siêu dữ liệu, khả năng bảo trì và kiểm chứng.

### C1. Chuẩn hóa siêu dữ liệu recipe
- Rà soát hệ thống phân loại danh mục theo lộ trình mở rộng registry.
- Đảm bảo các recipe khai báo nhất quán yêu cầu, thuộc tính UI, hành vi cổng và ghi chú lưu trữ.
- Thêm hướng dẫn người rà soát mạnh hơn về tham chiếu nguồn upstream và kỳ vọng host được hỗ trợ.

### C2. Chính sách kiểm chứng theo từng recipe
- Định nghĩa checklist smoke test nhẹ cho các đề xuất recipe.
- Ghi lại recipe nào đã được kiểm chứng, kiểm chứng một phần hoặc chỉ có siêu dữ liệu.
- Đánh dấu các recipe cần thông tin đăng nhập bên ngoài, lượng tải xuống lớn hoặc các bước thủ công từ upstream.

### C3. Quy ước recipe dùng chung
- Chuẩn hóa `.env.example`, bố cục mount dữ liệu, ảnh chụp màn hình và kỳ vọng README.
- Ưu tiên các mẫu compose tái sử dụng cho reverse proxy, lưu trữ bền vững và cache model.
- Xác định các nhóm nên dùng chung tài sản banner và mẫu siêu dữ liệu.

### C4. Thực thi mở rộng registry
- Dùng `planning/registry-expansion-roadmap.md` làm kế hoạch tìm nguồn.
- Thêm mục mới theo từng lô có giới hạn thay vì nhập hàng loạt.
- Hoàn thành từng nhóm danh mục một với tài liệu và banner phù hợp.

## Dòng công việc D — Trải nghiệm cài đặt và triển khai
Trọng tâm: luồng cài đặt, luồng nâng cấp, vận hành Linux và ranh giới hỗ trợ.

### D1. Tính có thể dự đoán của trình cài đặt
- Giữ Linux là mục tiêu triển khai chính.
- Cải thiện thông báo lỗi cho cài đặt dependency, build frontend và khởi động backend.
- Giữ nguyên hoặc di chuyển tường minh các cài đặt `.env` cục bộ trong khi cập nhật.

### D2. An toàn nâng cấp
- Tài liệu hóa cách cập nhật các triển khai hiện có mà không mất dữ liệu runtime.
- Thêm ghi chú rollback rõ ràng cho các lần nâng cấp thất bại.
- Kiểm tra khởi động lại dịch vụ và hành vi build lại frontend sau khi cập nhật kho lưu trữ.

### D3. Hồ sơ triển khai
- Định nghĩa các hồ sơ được hỗ trợ như máy trạm cục bộ, máy chủ phòng thí nghiệm, triển khai sản xuất qua reverse proxy và host dùng chung kiểu DGX.
- Ánh xạ từng hồ sơ sang tài liệu, cổng và hướng dẫn quản lý dịch vụ cần thiết.
- Giữ các cấu hình ví dụ trong `deploy/` đồng bộ với kỳ vọng runtime thực tế.

## Dòng công việc E — Trải nghiệm nhà phát triển và cổng chất lượng
Trọng tâm: tốc độ đóng góp, khả năng rà soát và kiểm chứng nhất quán.

### E1. Chia nhỏ pull request
- Giữ thay đổi giới hạn trong một mối quan tâm khi có thể.
- Khuyến khích pull request riêng cho các phần việc backend, frontend, recipe và quản trị trừ khi chúng liên kết chặt chẽ.
- Dùng tài liệu hoạch định để định nghĩa từng lát triển khai trước khi bắt đầu viết mã.

### E2. Kỷ luật kiểm chứng
- Thay đổi frontend: ghi lại `npm run build`, `npm run lint` và ghi chú xác minh thủ công ngắn gọn.
- Thay đổi backend: ghi lại kiểm chứng khởi động, kiểm tra API và hành vi runtime đã kiểm tra.
- Thay đổi recipe: ghi lại các recipe bị ảnh hưởng và trạng thái smoke test hoặc chỉ siêu dữ liệu.
- Thay đổi trình cài đặt: ghi lại hệ điều hành và shell đã dùng.

### E3. Theo dõi tự động hóa
- Chỉ mở rộng GitHub Actions tùy chọn sau khi phạm vi kiểm chứng đã ổn định.
- Ưu tiên các kiểm tra nhẹ cho schema, build và lint trước các tự động hóa nặng hơn.
- Thêm tự động hóa dần dần để tránh chặn người đóng góp bằng các lỗi nhiễu.

## Các giai đoạn bàn giao được khuyến nghị

## Giai đoạn 1 — Ổn định và rõ ràng
Mục tiêu: 2 đến 3 tuần

Kết quả chính:
- Xử lý lỗi backend tốt hơn
- Trạng thái thất bại của frontend rõ ràng hơn
- Xử lý cấu hình nhất quán
- Lượt đầu tiên về quy tắc chất lượng siêu dữ liệu recipe

Backlog đề xuất:
1. Dọn dẹp chẩn đoán khởi động backend
2. Lượt xử lý trạng thái lỗi/đang tải của frontend
3. Tài liệu tham chiếu cấu hình dùng chung
4. Kiểm toán siêu dữ liệu recipe cho các mục được dùng nhiều nhất

## Giai đoạn 2 — Niềm tin khi khởi chạy
Mục tiêu: 2 đến 4 tuần

Kết quả chính:
- Thông tin preflight cài đặt tốt hơn
- Tăng khả năng quan sát ứng dụng đang chạy
- Chuẩn hóa README recipe và `.env.example`
- Lô mở rộng registry đầu tiên có giới hạn

Backlog đề xuất:
1. Bảng preflight cài đặt trong UI
2. Cải thiện tóm tắt sức khỏe ứng dụng đang chạy
3. Lượt nhất quán README cho các recipe hàng đầu
4. Lô 1 từ lộ trình mở rộng registry

## Giai đoạn 3 — Trưởng thành vận hành
Mục tiêu: 3 đến 4 tuần

Kết quả chính:
- Hướng dẫn hồ sơ triển khai mạnh hơn
- Tài liệu nâng cấp và rollback
- Tín hiệu giám sát hệ thống đầy đủ hơn
- Đường dẫn rà soát người đóng góp tốt hơn

Backlog đề xuất:
1. Rà soát hành vi cài đặt/cập nhật an toàn khi nâng cấp
2. Kiểm toán reverse proxy và hồ sơ dịch vụ
3. Làm giàu API trạng thái hệ thống
4. Làm mới checklist người đóng góp cho recipe và thay đổi runtime

## Giai đoạn 4 — Quy mô và sẵn sàng cho cộng đồng
Mục tiêu: liên tục

Kết quả chính:
- Việc tiếp nhận recipe có thể dự đoán hơn
- Triển khai tự động hóa tùy chọn an toàn hơn
- Truyền thông lộ trình có cấu trúc
- Truy vết tốt hơn từ issue đến kế hoạch đến PR

Backlog đề xuất:
1. Quy trình tiếp nhận recipe theo lô
2. Kế hoạch bật workflow tùy chọn
3. Định dạng công bố chỉ mục hoạch định và lộ trình
4. Hoàn thiện nhãn triage và phân định trách nhiệm của maintainer

## Lát triển khai tiếp theo ngay
Nếu phát triển bắt đầu ngay bây giờ, lát triển khai tốt nhất tiếp theo là:

1. Kiểm toán các đường dẫn lỗi API backend hiện tại cho nạp recipe, khởi chạy compose và kết nối Docker.
2. Cải thiện cách frontend xử lý trạng thái đang tải, suy giảm và thất bại trong các chế độ xem danh mục và ứng dụng đang chạy.
3. Chuẩn hóa 10 đến 15 recipe hàng đầu theo mẫu README và `.env.example` nhất quán.
4. Chỉ bàn giao Lô 1 của lộ trình mở rộng registry sau khi các quy ước siêu dữ liệu đã được chốt.

Trình tự này giảm sự đảo lộn vì hành vi nền tảng trở nên rõ ràng hơn trước khi thêm nhiều recipe mới.

## Backlog đề xuất theo khu vực

### Backend
- mở rộng health endpoint
- structured error payload
- lưu trữ lịch sử cài đặt
- thông báo kiểm chứng phân tích recipe
- quy trình dọn dẹp container an toàn hơn

### Frontend
- bảng chi tiết recipe phong phú hơn
- tóm tắt preflight cài đặt
- badge trạng thái ứng dụng đang chạy
- ngăn kéo hoặc bảng log
- thông báo host không được hỗ trợ rõ ràng hơn

### Registry
- dọn dẹp hệ thống phân loại danh mục
- ánh xạ nhóm banner
- căn chỉnh mẫu README
- chuẩn hóa `.env.example`
- checklist rà soát siêu dữ liệu

### Tài liệu và vận hành
- ma trận hồ sơ triển khai
- hướng dẫn nâng cấp và rollback
- cây quyết định xử lý sự cố
- mẫu checklist kiểm chứng
- nhịp công bố lộ trình

## Định nghĩa hoàn thành cho các lát tương lai
Một lát chỉ được coi là hoàn thành khi:

- khu vực thay đổi đã được tài liệu hóa hoặc có chủ đích ghi rõ là không thay đổi
- ghi chú kiểm chứng cụ thể cho các tệp đã chạm vào
- thay đổi frontend vượt qua kiểm chứng build sản xuất
- thay đổi backend được thực thi trên một instance API đang chạy khi áp dụng
- thay đổi recipe xác định chính xác các recipe đã chạm và trạng thái kiểm chứng của chúng
- phần việc trì hoãn được ghi lại tường minh

## Rủi ro cần quản lý
- Sự tăng trưởng recipe có thể vượt xa chất lượng siêu dữ liệu nếu việc tiếp nhận theo lô quá tích cực.
- Thay đổi UX frontend có thể che giấu vấn đề backend trừ khi lỗi API vẫn được thể hiện tường minh.
- Cải tiến trình cài đặt có thể tạo ra các giả định riêng của Linux phải được tài liệu hóa.
- Tự động hóa tùy chọn có thể trở nên nhiễu nếu được bật trước khi các quy ước ổn định.
- Hoạch định rộng mà không có lát giới hạn có thể tạo ra các PR rải rác với phần kiểm chứng không rõ ràng.

## Quy tắc bảo trì hoạch định
- Cập nhật tệp này khi một giai đoạn mới bắt đầu hoặc ưu tiên thay đổi.
- Giữ các mục lộ trình được nhóm theo sản phẩm bàn giao, không theo ý tưởng mơ hồ.
- Chia các sáng kiến lớn thành các lát triển khai có thể rà soát trước khi viết mã.
- Liên kết các pull request tương lai về đúng dòng công việc và giai đoạn mà chúng thực hiện.

## Tài liệu hoạch định liên quan
- `planning/sparkdeck-project-blueprint.md`
- `planning/registry-expansion-roadmap.md`
