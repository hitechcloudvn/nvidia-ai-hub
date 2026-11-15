> [English](README.md) | **Tiếng Việt**

# Jan Runtime Bridge

Nền Jan do host quản lý cho NVIDIA GPU, ghi lại cách dùng Jan Desktop hoặc CLI `jan` để mở một server API tương thích OpenAI cục bộ trên cổng `1337` với bảo vệ API key bắt buộc.

## Những gì công thức này cung cấp

- Quy trình Jan Desktop và Jan CLI chính thức cho việc phục vụ model cục bộ
- Server API tương thích OpenAI tích hợp trên cổng `1337` theo mặc định
- API prefix `/v1` theo mặc định cho các client kiểu OpenAI
- Luồng `jan serve` của Jan CLI để khởi động từ terminal và phục vụ nền tùy chọn
- Yêu cầu API key tường minh cho truy cập client

## Truy cập mặc định

- Models API: `http://localhost:1337/v1/models`
- Chat Completions API: `http://localhost:1337/v1/chat/completions`
- Messages API tương thích Anthropic: `http://localhost:1337/v1/messages`
- Base URL cho client tương thích OpenAI: `http://localhost:1337/v1`

## Các dịch vụ đi kèm

Công thức cầu nối này không tạo dịch vụ Docker. Nó mô tả runtime Jan do host quản lý, được điều khiển bởi:

- Jan Desktop: dùng để khởi tạo thư mục dữ liệu, quản lý runtime và vận hành giao diện Local API Server
- CLI `jan`: dùng để phục vụ một model cục bộ được chọn trực tiếp từ terminal

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền cầu nối bảo thủ:

- dùng đường dẫn cài đặt desktop và CLI chính thức của Jan thay vì bịa ra một image container chưa được xác minh
- giả định Jan được cài trực tiếp trên host và engine cục bộ được cấu hình tại đó
- ghi lại cả cài đặt giao diện Jan Local API Server lẫn phục vụ Jan CLI như các đường dẫn vận hành được hỗ trợ
- giữ quyền sở hữu thư mục dữ liệu gốc của Jan cho model, log và cài đặt thay vì ánh xạ lại vào kho lưu trữ này
- loại trừ reverse proxy, Windows service, Linux systemd unit, TLS termination và định tuyến đa host

Preset này **không** bao gồm:

- image Docker đi kèm cho Jan
- tự động cài đặt Jan Desktop, Jan CLI hoặc backend runtime Jan
- đảm bảo hỗ trợ mọi tính năng hệ sinh thái Jan như agent, định tuyến MCP hoặc cloud connector
- tăng cường gateway sản xuất, SSO hoặc quản lý chứng chỉ

## Cấu hình bắt buộc

Trước khi sử dụng lần đầu, hãy rà soát `registry/recipes/jan-runtime-bridge/.env` và điều chỉnh ít nhất:

- `JAN_SERVER_PORT`
- `JAN_MODEL_ID`
- `JAN_CONTEXT_LENGTH`
- `JAN_API_KEY`
- `JAN_SERVER_HOST`
- `JAN_API_PREFIX`
- `JAN_TRUSTED_HOSTS`

Cài đặt Jan trên host trước:

- Windows: tải và chạy trình cài đặt Jan, sau đó khởi chạy Jan một lần
- Linux: cài biến thể `.deb` hoặc AppImage do Jan ghi nhận, sau đó khởi chạy Jan một lần

Tài liệu upstream nêu rằng Jan CLI được cài tự động sau khi Jan Desktop được khởi chạy lần đầu.

## Ghi chú runtime

- Local API Server của Jan mặc định `127.0.0.1:1337` với API prefix `/v1`.
- Tài liệu Jan nêu rằng Local API Server yêu cầu API key khác rỗng và client phải gửi `Authorization: Bearer <key>`.
- Giao diện Jan có thể expose server trên `0.0.0.0`, nhưng chỉ nên dùng trên mạng đáng tin cậy với `Trusted Hosts` được rà soát cẩn thận.
- CORS được bật theo mặc định trong cài đặt Local API Server của Jan.
- `jan serve` mặc định expose một model cục bộ tại `localhost:6767/v1`, nhưng công thức này chuẩn hóa về cổng `1337` để khớp với nền tảng Local API Server được ghi nhận của Jan.
- Jan CLI có thể tự tải model Hugging Face khi truyền repo ID và model chưa có sẵn cục bộ.
- Các tham số server `llama.cpp` bổ sung có thể được truyền cho Jan CLI bằng biến môi trường `LLAMA_ARG_` khi backend được chọn là `llama.cpp`.
- Jan lưu trạng thái vận hành thực trong các thư mục dữ liệu do host quản lý, chẳng hạn `%APPDATA%\Jan\data` trên Windows và `~/.config/Jan/data` trên Linux.

## Dữ liệu bền vững

Trạng thái vận hành chủ yếu được lưu trong thư mục dữ liệu gốc của Jan.

Công thức này chỉ giữ các placeholder nhẹ trong kho lưu trữ tại:

- `registry/recipes/jan-runtime-bridge/models`
- `registry/recipes/jan-runtime-bridge/logs`

Dùng thư mục dữ liệu host của Jan và quy trình sao lưu để lưu bền model, cấu hình và log thực tế.

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu registry, mẫu môi trường và tài liệu cầu nối
- căn chỉnh lệnh, cổng và mô tả endpoint với tài liệu Jan Desktop và Jan CLI chính thức
- mô hình hóa Jan như một cầu nối do host quản lý thay vì tuyên bố một triển khai Docker chính thức chưa được xác minh
- kiểm tra các file công thức mới theo chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- cài đặt Jan trực tiếp, thiết lập lần chạy đầu hoặc cấu hình backend GPU
- khởi động `jan serve` thực tế, tự động tải model hoặc hành vi suy luận
- thay đổi cấu hình giao diện Local API Server trong Jan Desktop
- expose mạng trên `0.0.0.0`, áp dụng trusted host hoặc hành vi CORS trong thực tế
- bất kỳ quy trình Docker nào, vì công thức này cố ý không cung cấp container Jan và Docker không khả dụng trong môi trường làm việc này

## Ghi chú giấy phép

- Tài liệu Jan mô tả dự án được cấp phép Apache 2.0
- Rà soát binary Jan, runtime đi kèm và giấy phép từng model được chọn riêng trước khi phân phối lại hoặc đóng gói thương mại
- Công thức cầu nối này chỉ ghi lại tích hợp và không phân phối lại trình cài đặt hoặc binary Jan

## Ghi chú rủi ro

- Thiết lập theo desktop của Jan có nghĩa là tính khả dụng của runtime và cấu hình backend có thể khác nhau giữa các hệ điều hành host.
- Phục vụ trên `0.0.0.0` hoặc nới lỏng hạn chế host có thể expose endpoint suy luận cục bộ ra ngoài ranh giới tin cậy dự kiến.
- Model cục bộ lớn hoặc cài đặt context mạnh tay có thể vượt quá đĩa, RAM hoặc bộ nhớ GPU khả dụng nếu người vận hành không định cỡ triển khai cẩn thận.
