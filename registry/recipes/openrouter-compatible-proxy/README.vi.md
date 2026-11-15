> [English](README.md) | **Tiếng Việt**

# Proxy Tương thích OpenRouter

Baseline relay OpenRouter cục bộ, hiển thị một shim proxy nhỏ tương thích OpenAI trên host NVIDIA AI Hub trong khi chuyển tiếp yêu cầu tới API upstream được host bởi OpenRouter.

## Những gì gói này cung cấp

- Endpoint relay cục bộ trên cổng `3015`
- API cục bộ tương thích OpenAI tại `http://localhost:3015/v1`
- API upstream OpenRouter được host tại `https://openrouter.ai/api/v1`
- Kiểm tra sức khỏe relay cục bộ tại `/healthz`
- Chat completions định tuyến theo nhà cung cấp thông qua một khóa API upstream
- Header attribution tùy chọn như `HTTP-Referer`, `X-Title` và metadata danh mục
- Truy cập các ID mô hình có tiền tố tổ chức như `openrouter/auto`, `anthropic/claude-sonnet-4` hoặc các mục danh mục OpenRouter khác

## Truy cập mặc định

- Kiểm tra sức khỏe relay cục bộ: `http://localhost:3015/healthz`
- API mô hình relay cục bộ: `http://localhost:3015/v1/models`
- API chat completions relay cục bộ: `http://localhost:3015/v1/chat/completions`
- API chi tiết endpoint mô hình relay cục bộ: `http://localhost:3015/v1/models/<model>/endpoints`
- URL cơ sở upstream được host: `https://openrouter.ai/api/v1`

## Các dịch vụ đi kèm

- `openrouter-relay`: shim relay cục bộ nhẹ dựa trên NGINX, chuyển tiếp các yêu cầu `/v1/*` tới upstream OpenRouter

## Phạm vi của preset này

Recipe này cố ý cung cấp một baseline relay thận trọng:

- giữ việc thực thi mô hình thực tế, định tuyến nhà cung cấp, thử lại và tính khả dụng dưới quyền kiểm soát của OpenRouter
- hiển thị một endpoint cục bộ `/v1/*` để các client phía dưới có thể nói chuyện với một cổng cục bộ thay vì hostname công khai trực tiếp
- chuyển tiếp các header xác thực và attribution qua một shim NGINX đơn giản mà không tuyên bố tự host chính OpenRouter
- giữ trình môi giới thông tin xác thực, engine chính sách giới hạn tốc độ, tầng cache và gia cố egress riêng ngoài phạm vi

Preset này **không** bao gồm:

- runtime OpenRouter tự host hoặc bất kỳ engine thực thi mô hình cục bộ nào
- tự động tạo tài khoản OpenRouter, thiết lập thanh toán hoặc cấp phát API-key
- đảm bảo cho mọi mô hình nhà cung cấp upstream, vùng khả dụng nhà cung cấp hoặc kết quả định tuyến
- SSO doanh nghiệp, mạng riêng hoặc kiểm soát chính sách tổ chức ngoài những gì OpenRouter hiển thị upstream

## Cấu hình bắt buộc

Trước lần sử dụng đầu tiên, hãy xem `registry/recipes/openrouter-compatible-proxy/.env` và điều chỉnh ít nhất:

- `OPENROUTER_API_KEY`
- `OPENROUTER_DEFAULT_MODEL`
- `OPENROUTER_HTTP_REFERER`
- `OPENROUTER_APP_TITLE`
- `OPENROUTER_RELAY_PORT`
- `OPENROUTER_UPSTREAM_SCHEME`
- `OPENROUTER_UPSTREAM_HOST`

Bạn cũng cần một tài khoản OpenRouter đang hoạt động và khóa API.

## Khởi chạy

Từ gốc kho lưu trữ:

1. Chỉnh sửa `registry/recipes/openrouter-compatible-proxy/.env`.
2. Khởi động relay bằng lệnh khởi chạy trong `recipe.yaml`.
3. Đợi `GET /healthz` trên cổng relay trả về `200`.
4. Trỏ các client tương thích OpenAI tới `http://localhost:3015/v1`.
5. Gửi các yêu cầu kiểu OpenAI thông thường với `Authorization: Bearer <OPENROUTER_API_KEY>`.

## Ghi chú runtime

- Relay dịch các yêu cầu `/v1/*` cục bộ thành các yêu cầu `/api/v1/*` upstream tới `openrouter.ai`.
- Xác thực vẫn dùng `Authorization: Bearer <OPENROUTER_API_KEY>` và relay không lưu trữ hay tạo thông tin xác thực.
- OpenRouter tài liệu hóa `/api/v1/models` là endpoint danh mục được host để khám phá mô hình; relay cục bộ hiển thị nó thành `/v1/models`.
- ID mô hình nên được gửi theo cách đặt tên có tiền tố tổ chức của OpenRouter, như `openrouter/auto` hoặc ID có tiền tố nhà cung cấp.
- Các header attribution tùy chọn như `HTTP-Referer`, `X-Title` và `X-OpenRouter-Title` được relay chuyển tiếp.
- Relay này chỉ là một shim tiện lợi. Nó không thêm cache cục bộ, thử lại, lưu trữ registry mô hình hoặc chính sách xác thực ngoài việc chuyển tiếp header.

## Dữ liệu bền vững

Relay này không duy trì trọng số mô hình cục bộ hay trạng thái runtime cục bộ cho suy luận.

Chỉ cấu hình vận hành nhẹ và log container cục bộ được lưu trong:

- `registry/recipes/openrouter-compatible-proxy/.env`
- `registry/recipes/openrouter-compatible-proxy/.env.example`
- `registry/recipes/openrouter-compatible-proxy/relay/default.conf.template`
- `registry/recipes/openrouter-compatible-proxy/logs`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata registry, mẫu môi trường, cấu hình relay, định nghĩa compose và tài liệu vận hành cho shim OpenRouter cục bộ
- căn chỉnh hành vi relay cục bộ `/v1/*` với bề mặt API `https://openrouter.ai/api/v1` được công bố của OpenRouter và endpoint mô hình được host
- chuyển tiếp các header xác thực và attribution qua cấu hình relay trong khi vẫn giữ quyền sở hữu thực thi và định tuyến của OpenRouter upstream
- kiểm tra các tệp recipe bằng chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- xác thực OpenRouter trực tiếp với khóa API tenant thực
- các yêu cầu chat completion thực tế, hành vi thanh toán hoặc kết quả định tuyến nhà cung cấp
- xử lý header attribution hoặc hành vi định tuyến upstream trong thực tế
- các tính năng quản trị doanh nghiệp ngoài bề mặt API công khai
- chạy trực tiếp `docker compose up` hoặc hành vi relay tại runtime, vì Docker không khả dụng trong môi trường Windows này

## Ghi chú giấy phép

- Hãy xem xét điều khoản OpenRouter, điều khoản nhà cung cấp và giấy phép từng mô hình upstream đã chọn riêng trước khi sử dụng trong sản xuất
- Recipe relay này chỉ cung cấp cấu hình NGINX cục bộ và không phân phối lại phần mềm OpenRouter hoặc trọng số mô hình bên thứ ba

## Ghi chú rủi ro

- OpenRouter vẫn là một phụ thuộc upstream được quản lý, nên tính khả dụng dịch vụ, độ trễ và hành vi định tuyến có thể thay đổi bên ngoài kho này.
- Relay chuyển tiếp các header xác thực nhạy cảm, vì vậy nó nên nằm trên mạng cục bộ đáng tin cậy trừ khi thêm các kiểm soát ingress bổ sung.
- Giới hạn theo nhà cung cấp, hành vi kiểm duyệt và khả năng mô hình khác nhau tùy theo mô hình đã chọn và nhà cung cấp upstream.
- Việc sử dụng suy luận từ xa có thể gây ra các mối lo ngại về quản trị dữ liệu, nơi lưu trữ dữ liệu hoặc thanh toán nếu người vận hành không xem xét kỹ chính sách OpenRouter và nhà cung cấp.
