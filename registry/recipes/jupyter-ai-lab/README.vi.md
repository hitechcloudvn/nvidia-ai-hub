> [English](README.md) | **Tiếng Việt**

# Jupyter AI Lab

Preset không gian làm việc JupyterLab cho người dùng NVIDIA GPU muốn một môi trường ưu tiên notebook thực tế với các gói Python khoa học, lưu trữ notebook bền vững và Jupyter AI được cài để thử nghiệm cục bộ với các runtime model dùng chung.

## Những gì công thức này cung cấp

- JupyterLab trên cổng `3095`
- Image tùy chỉnh dựa trên `quay.io/jupyter/scipy-notebook:2025-12-31`
- `jupyter-ai==3.0.0` được cài vào môi trường notebook
- Gói lệnh magic AI tùy chọn cho cách dùng notebook `%ai` và `%%ai`
- Thư mục không gian làm việc notebook, cài đặt Jupyter, workspace và cache bền vững
- Ghép nối mặc định với công thức `ollama-runtime` dùng chung qua `http://host.docker.internal:11435`
- Một nền phòng thí nghiệm thực tế cho notebook, thử nghiệm ad hoc, khám phá dữ liệu cục bộ, lặp prompt và quy trình AI lấy notebook làm trung tâm

## Truy cập mặc định

- JupyterLab: `http://localhost:3095/lab?token=<JUPYTER_TOKEN>`
- Thư mục không gian làm việc notebook trong container: `/home/jovyan/work`
- Token mặc định: được định nghĩa trong `registry/recipes/jupyter-ai-lab/.env`

## Các dịch vụ đi kèm

- `jupyter-ai-lab`: image Jupyter Docker Stacks tùy chỉnh với JupyterLab, công cụ Python khoa học, Jupyter AI và lệnh magic AI tùy chọn
- phụ thuộc bên ngoài vào `ollama-runtime` qua `http://host.docker.internal:11435` để truy cập model dựa trên Ollama cục bộ nếu bạn chọn nhà cung cấp đó trong Jupyter AI

## Phạm vi của preset này

Công thức này cố ý cung cấp một nền notebook thực tế:

- xây dựng trên image `scipy-notebook` của Jupyter Docker Stacks upstream để các gói data-science Python phổ biến đã sẵn sàng
- cài Jupyter AI vào cùng môi trường với JupyterLab
- giữ file notebook, workspace lab và cài đặt bền vững qua các lần khởi động lại
- mở ra các giá trị mặc định môi trường giúp thử nghiệm cục bộ dựa trên Ollama dễ dàng hơn từ Jupyter AI và notebook magics
- hỗ trợ công việc notebook tổng quát, phân tích tạm, khám phá prompt và thử nghiệm AI hỗ trợ nhẹ

Preset này **không** bao gồm:

- vector database, dịch vụ nạp tài liệu hoặc trình điều phối quy trình đi kèm
- bí mật nhà cung cấp Jupyter AI được cấu hình sẵn ngoài các giá trị mặc định tương thích Ollama cục bộ
- JupyterHub doanh nghiệp, đa tenant, SSO, reverse proxy hoặc tăng cường TLS
- đảm bảo tương thích với mọi persona, nhà cung cấp hoặc phần mở rộng notebook tùy chọn của Jupyter AI
- quy trình agent notebook đầu-cuối đã kiểm chứng trong môi trường làm việc này

## Cấu hình bắt buộc

Trước khi khởi chạy lần đầu:

1. Khởi động `ollama-runtime` nếu bạn muốn suy luận cục bộ dựa trên Ollama.
2. Rà soát `registry/recipes/jupyter-ai-lab/.env`.
3. Đổi `JUPYTER_TOKEN` thành một bí mật mạnh.
4. Khởi chạy công thức.
5. Mở `http://localhost:3095/lab?token=<your-token>`.
6. Trong cài đặt Jupyter AI, chọn nhà cung cấp và model bạn muốn dùng.
7. Nếu bạn muốn notebook magics, hãy nạp chúng trong notebook với `%load_ext jupyter_ai_magic_commands`.

## Ghi chú Jupyter AI và notebook

- JupyterLab là frontend mặc định được các image Jupyter Docker Stacks hiện tại sử dụng.
- Công thức này dùng luồng khởi động Jupyter Docker Stacks upstream thay vì entrypoint tùy chỉnh.
- `OLLAMA_HOST` mặc định `http://host.docker.internal:11435` để Jupyter AI có thể trỏ tới mẫu runtime dùng chung đã được dùng trong kho lưu trữ này.
- `OPENAI_API_BASE` và `OPENAI_API_KEY=ollama` được đưa vào làm giá trị mặc định tiện lợi cho các thử nghiệm runtime cục bộ tương thích OpenAI khi phù hợp.
- Lựa chọn nhà cung cấp, allowlist model, nhà cung cấp bị chặn và hành vi Jupyter AI nâng cao vẫn được cấu hình trong giao diện Jupyter hoặc qua cài đặt runtime Jupyter sau khi khởi chạy.
- Gói lệnh magic tùy chọn đã được cài, nhưng người dùng notebook vẫn cần nạp IPython extension cho từng phiên khi muốn dùng lệnh `%ai` hoặc `%%ai`.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/jupyter-ai-lab/workspace`
- `registry/recipes/jupyter-ai-lab/jupyter-config`
- `registry/recipes/jupyter-ai-lab/cache`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, file môi trường runtime, định nghĩa build Docker, định nghĩa compose, thư mục bền vững và tài liệu rà soát
- căn chỉnh lựa chọn image và mô hình khởi động với hướng dẫn Jupyter Docker Stacks upstream, nơi JupyterLab là frontend mặc định trên cổng `8888`
- căn chỉnh ghi chú Jupyter AI với tài liệu upstream cho thấy ghi đè base URL Ollama và cài đặt lệnh magic tùy chọn
- kiểm tra chẩn đoán trình soạn thảo cho các file công thức mới tạo

Chưa được kiểm chứng tại đây:

- chạy `docker compose up` trực tiếp, đăng nhập bằng token, thực thi notebook hoặc dùng chat Jupyter AI, vì Docker không khả dụng trong môi trường làm việc Windows này
- thực thi magic `%ai` hoặc `%%ai` trực tiếp với Ollama hoặc bất kỳ nhà cung cấp nào khác
- khả năng tương thích với mọi phần mở rộng JupyterLab, kernel từ xa hoặc gói agent Jupyter AI tùy chọn
- tăng cường bảo mật đa người dùng, kết thúc HTTPS hoặc triển khai gateway sản xuất

## Ghi chú giấy phép

- Các dự án upstream: `jupyter/docker-stacks` và `jupyterlab/jupyter-ai`
- Rà soát giấy phép gói và container upstream trước khi phân phối lại hoặc đóng gói sản xuất
- Các nhà cung cấp, agent và backend model Jupyter AI bên thứ ba tùy chọn có thể đưa thêm điều khoản cấp phép hoặc sử dụng nằm ngoài preset này

## Ghi chú rủi ro

- Preset này là một nền không gian làm việc notebook, không phải nền tảng notebook sản xuất đã tăng cường.
- Token trong `.env` là bí mật và nên được đổi trước khi expose rộng hơn.
- Năng lực Jupyter AI phụ thuộc vào cấu hình nhà cung cấp đã chọn và endpoint model có thể truy cập; chỉ cài đặt không đảm bảo quy trình AI cục bộ hoạt động.
- Thư mục notebook bền vững có thể tích lũy dataset, kết quả và cache lớn theo thời gian và nên được rà soát về tăng trưởng dung lượng.
