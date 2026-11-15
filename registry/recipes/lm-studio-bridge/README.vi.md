> [English](README.md) | **Tiếng Việt**

# LM Studio Bridge

Baseline LM Studio headless cho GPU NVIDIA, mô tả cách chạy `llmster` và CLI `lms` trên host, tải một mô hình cục bộ và hiển thị các API REST tương thích OpenAI và API gốc của LM Studio trên cổng `1234`.

## Những gì gói này cung cấp

- Quy trình LM Studio headless chính thức dựa trên `llmster` và CLI `lms`
- Máy chủ HTTP cục bộ mặc định trên cổng `1234`
- Các endpoint tương thích OpenAI như `/v1/models`, `/v1/chat/completions`, `/v1/completions`, `/v1/embeddings` và `/v1/responses`
- Các endpoint REST gốc của LM Studio như `/api/v0/models`
- Các lệnh tải mô hình, nạp mô hình và quản lý vòng đời máy chủ do host quản lý, dành cho môi trường mà LM Studio được cài đặt bên ngoài Docker

## Truy cập mặc định

- API mô hình: `http://localhost:1234/v1/models`
- API Chat Completions: `http://localhost:1234/v1/chat/completions`
- API Responses: `http://localhost:1234/v1/responses`
- API danh mục mô hình gốc: `http://localhost:1234/api/v0/models`

## Các dịch vụ đi kèm

Recipe cầu nối này không tạo dịch vụ Docker. Nó mô tả runtime LM Studio do host quản lý, được điều khiển bởi:

- `llmster`: daemon headless của LM Studio
- `lms`: CLI của LM Studio dùng để tải mô hình, nạp vào bộ nhớ và khởi động hoặc dừng máy chủ HTTP

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline cầu nối thận trọng:

- sử dụng đường triển khai headless chính thức của LM Studio thay vì container cộng đồng không chính thức
- giả định LM Studio hoặc `llmster` được cài đặt trực tiếp trên host đích
- mô tả luồng lệnh tối thiểu cần thiết để khởi động daemon, tải mô hình, nạp nó và hiển thị các API HTTP
- giữ quản lý mô hình và trạng thái máy chủ trong các thư mục host gốc của LM Studio thay vì cố gắng ánh xạ lại vào kho này
- giữ reverse proxy, systemd/service wrapper, kết thúc TLS và định tuyến đa host ngoài phạm vi

Preset này **không** bao gồm:

- image Docker đi kèm cho LM Studio, vì tài liệu chính thức tập trung vào cài đặt trên host và sử dụng daemon headless
- tác vụ khởi động tự động hoặc đăng ký dịch vụ cho Linux, Windows hoặc macOS
- đảm bảo tương thích cho mọi định dạng mô hình hoặc engine mà LM Studio hỗ trợ
- cổng xác thực doanh nghiệp, quản lý chứng chỉ hoặc thực thi chính sách mạng

## Cấu hình bắt buộc

Trước lần sử dụng đầu tiên, hãy xem `registry/recipes/lm-studio-bridge/.env` và điều chỉnh ít nhất:

- `LM_STUDIO_PORT`
- `LM_STUDIO_MODEL`
- `LM_STUDIO_MODEL_ALIAS`
- `LM_STUDIO_GPU_OFFLOAD`
- `LM_STUDIO_CONTEXT_LENGTH`
- `LM_STUDIO_ENABLE_CORS`
- `LM_STUDIO_API_KEY` nếu bạn có ý định yêu cầu xác thực bằng khóa quyền (permission key)

Ngoài ra, hãy đảm bảo các thành phần headless của LM Studio đã được cài đặt trên host đích. Các ví dụ cài đặt từ upstream là:

- Linux và macOS: `curl -fsSL https://lmstudio.ai/install.sh | bash`
- Windows PowerShell: `irm https://lmstudio.ai/install.ps1 | iex`

## Ghi chú runtime

- `lms daemon up` khởi động `llmster`, daemon LM Studio headless dùng cho các quy trình CLI và phục vụ HTTP.
- `lms server start --port <port>` khởi động máy chủ cục bộ; `--cors` là tùy chọn và chỉ nên bật cho các kịch bản phát triển đáng tin cậy.
- Tài liệu CLI nêu rõ `lms` khả dụng sau khi LM Studio đã được chạy ít nhất một lần.
- LM Studio có thể hiển thị các API tương thích OpenAI và API REST gốc của chính nó từ cùng cổng máy chủ.
- Nếu xác thực máy chủ được bật trong LM Studio, client phải gửi Bearer token được tạo dưới dạng khóa quyền của LM Studio.
- Đường dẫn host chính xác cho các mô hình đã tải do LM Studio quản lý và không bị recipe này di chuyển.
- Cầu nối này chỉ ghi lại các thư mục giữ chỗ `models/` và `logs/` cho tài liệu cục bộ và ghi chú vận hành; chúng không phải đường dẫn lưu trữ LM Studio chính thức.

## Dữ liệu bền vững

Trạng thái vận hành chủ yếu được lưu trong các thư mục host do LM Studio quản lý.

Recipe này chỉ giữ các thư mục giữ chỗ nhẹ trong kho tại:

- `registry/recipes/lm-studio-bridge/models`
- `registry/recipes/lm-studio-bridge/logs`

Hãy dùng cấu hình của chính LM Studio và quy trình sao lưu host cho việc lưu trữ mô hình và runtime thực tế.

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata registry, mẫu môi trường và tài liệu vận hành cho cầu nối
- căn chỉnh các lệnh và endpoint được tài liệu hóa với tài liệu headless, CLI và API chính thức của LM Studio
- mô hình hóa rõ ràng mục này như một cầu nối do host quản lý thay vì tuyên bố một runtime Docker chính thức chưa được xác minh
- kiểm tra các tệp recipe mới bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- cài đặt trực tiếp LM Studio, `llmster` hoặc `lms`
- hành vi tải mô hình, nạp mô hình hoặc suy luận thực tế trên GPU NVIDIA
- thiết lập xác thực máy chủ, hành vi CORS hoặc hiển thị trên mạng LAN
- các quy trình đăng ký dịch vụ trên Windows, Linux hoặc macOS
- bất kỳ luồng khởi động dựa trên Docker nào, vì cầu nối này cố ý không cung cấp container chính thức và Docker không khả dụng trong môi trường làm việc này

## Ghi chú giấy phép

- CLI của LM Studio (`lms`) được tài liệu hóa là giấy phép MIT
- Hãy xem xét điều khoản sản phẩm LM Studio, điều khoản runtime và giấy phép từng mô hình đã chọn riêng trước khi phân phối lại hoặc sử dụng thương mại
- Recipe cầu nối này chỉ mô tả các bước tích hợp; nó không phân phối lại các tệp nhị phân của LM Studio

## Ghi chú rủi ro

- Vì đây là cầu nối do host quản lý, đường dẫn cài đặt, quyền và hành vi vòng đời dịch vụ có thể khác nhau giữa các hệ điều hành.
- Hiển thị máy chủ LM Studio trên mạng LAN hoặc bật CORS sẽ mở rộng bề mặt tấn công và nên đi kèm với khóa quyền và kiểm soát mạng đáng tin cậy.
- Tải mô hình lớn và thiết lập context cao có thể vượt quá dung lượng đĩa, bộ nhớ hoặc GPU cục bộ nếu người vận hành không chọn kích thước mô hình phù hợp.
