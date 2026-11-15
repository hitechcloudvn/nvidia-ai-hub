> [English](README.md) | **Tiếng Việt**

# ComfyUI Manager Preset Pack

Không gian làm việc ComfyUI có Manager cho NVIDIA GPU, xếp lớp phần mở rộng `ComfyUI-Manager` chính thức lên image nền `comfyui-nvidia-ai-hub` hiện có để người vận hành có thể cài custom node, quản lý snapshot và nhập gói thành phần tái sử dụng từ một môi trường quy trình trực quan bền vững.

## Những gì công thức này cung cấp

- Giao diện web ComfyUI trên cổng `8188`
- `ComfyUI-Manager` chính thức được cài tại `ComfyUI/custom_nodes/comfyui-manager`
- Khởi động có manager qua `--enable-manager`
- Model, input, output, custom node và dữ liệu người dùng ComfyUI bền vững
- Cấu hình manager, snapshot và lưu trữ gói thành phần bền vững tại `ComfyUI/user/__manager`
- Biến môi trường mirror tùy chọn cho GitHub và Hugging Face trong môi trường mạng hạn chế

## Truy cập mặc định

- Giao diện ComfyUI: `http://localhost:8188/`
- Điểm vào giao diện Manager: mở menu ComfyUI chính và nhấp **Manager**

## Các dịch vụ đi kèm

- `comfyui-manager-preset-pack`: một container ComfyUI có GPU với phần mở rộng manager được cài sẵn

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền ComfyUI sẵn sàng cho manager:

- giữ runtime `comfyui-nvidia-ai-hub` hiện có làm lớp ứng dụng nền
- cài phần mở rộng `ComfyUI-Manager` chính thức theo bố cục `custom_nodes/comfyui-manager` được ghi nhận
- bật giao diện manager khi khởi động với `--enable-manager`
- lưu bền cấu hình, snapshot và gói thành phần do manager sở hữu qua các lần khởi động lại
- để việc chọn custom node, nhập gói và tuyển chọn quy trình cho người vận hành sau khi khởi chạy

Preset này **không** bao gồm:

- bộ custom node bên thứ ba đi kèm hoặc gói node có quan điểm sẵn
- checkpoint, LoRA hoặc tài sản model được tải sẵn
- xác thực reverse proxy, TLS termination hoặc cách ly nhiều người dùng
- kiểm chứng rằng mọi custom node cài được qua manager đều hoạt động trong image này

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu, hãy rà soát `registry/recipes/comfyui-manager-preset-pack/.env` và thay đổi các mục phù hợp với môi trường của bạn:

- `COMFYUI_PORT`
- `CLI_ARGS`
- `COMFYUI_MANAGER_SECURITY_LEVEL`
- `COMFYUI_MANAGER_NETWORK_MODE`
- `COMFYUI_MANAGER_BYPASS_SSL` nếu việc xác thực chứng chỉ upstream thất bại trong môi trường của bạn
- `GITHUB_ENDPOINT` và `HF_ENDPOINT` nếu bạn dựa vào mirror hoặc relay

## Ghi chú runtime

- ComfyUI upstream ghi nhận việc bật manager bằng cờ `--enable-manager`.
- ComfyUI-Manager upstream ghi rằng phần mở rộng phải nằm tại `ComfyUI/custom_nodes/comfyui-manager`.
- Gói thành phần được lưu tại `ComfyUI/user/__manager/components` và snapshot tại `ComfyUI/user/__manager/snapshots`.
- Lần khởi chạy đầu vẫn có thể yêu cầu người vận hành cài thêm custom node hoặc model từ giao diện Manager tùy theo quy trình họ dự định chạy.
- Các giá trị mặc định về bảo mật và mạng trong preset này bảo thủ nhưng chưa được tăng cường cho môi trường đa tenant dùng chung.

## Dữ liệu bền vững

Công thức này lưu trạng thái qua Docker volume cho:

- `/app/ComfyUI/models`
- `/app/ComfyUI/output`
- `/app/ComfyUI/input`
- `/app/ComfyUI/custom_nodes`
- `/app/ComfyUI/user`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu danh mục, mẫu môi trường, định nghĩa compose, công thức build Docker, wrapper khởi động và tài liệu vận hành cho preset có manager
- căn chỉnh cấu trúc build và runtime với hướng dẫn của ComfyUI upstream cho `--enable-manager` và hướng dẫn ComfyUI-Manager upstream cho việc cài đặt tại `ComfyUI/custom_nodes/comfyui-manager`
- kết nối lưu trữ bền vững cho cấu hình manager, snapshot, thành phần, trạng thái người dùng, custom node và các đường dẫn input/output/model chuẩn của ComfyUI
- kiểm tra các file công thức mới theo chẩn đoán trình soạn thảo

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, build image, hiển thị giao diện Manager, cài custom node hoặc thực thi quy trình, vì Docker không khả dụng trong môi trường làm việc Windows này
- khả năng tương thích của bất kỳ custom node bên thứ ba cụ thể nào được cài sau qua giao diện Manager
- hành vi mirror/proxy cho `GITHUB_ENDPOINT` hoặc `HF_ENDPOINT` trong triển khai mạng hạn chế
- hành vi bảo mật tăng cường cho triển khai ComfyUI lộ ra internet hoặc nhiều người dùng

## Ghi chú giấy phép

- ComfyUI upstream: GPL-3.0
- ComfyUI-Manager upstream: GPL-3.0
- Rà soát giấy phép của bất kỳ custom node đã cài hoặc model đã tải nào riêng trước khi sử dụng trong sản xuất.

## Ghi chú rủi ro

- Custom node được cài sau qua giao diện Manager có thể gây xung đột phụ thuộc hoặc đưa vào mã chưa được rà soát.
- Mở giao diện manager cho các mạng không đáng tin cậy làm tăng rủi ro vận hành và chuỗi cung ứng.
- Các giá trị mặc định của manager tại đây không thay thế reverse proxy chính thức, lớp kiểm soát truy cập hoặc quy trình allowlist được tuyển chọn cho môi trường sản xuất.
