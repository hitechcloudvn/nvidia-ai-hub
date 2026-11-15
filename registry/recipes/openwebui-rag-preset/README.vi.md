> [English](README.md) | **Tiếng Việt**

# Open WebUI RAG Preset

Bộ khởi động Open WebUI thực tế cho chat tài liệu cục bộ và các quy trình tăng cường truy vấn, sử dụng image Open WebUI chính thức với cơ sở dữ liệu vector Qdrant cục bộ đi kèm.

## Những gì gói này cung cấp

- Open WebUI trên cổng `3083`
- Cơ sở dữ liệu vector Qdrant cục bộ để truy vấn tài liệu đã lập chỉ mục
- Trạng thái ứng dụng bền vững trong `./data/open-webui`
- Dữ liệu vector bền vững trong `./data/qdrant`
- Biến môi trường Qdrant được nối dây sẵn cho RAG của Open WebUI
- Dễ ghép cặp với recipe `ollama-runtime` hiện có cho các mô hình chat

## Truy cập mặc định

- Web UI: `http://localhost:3083`
- Onboarding admin lần đầu: `http://localhost:3083`
- Qdrant REST API: `http://localhost:6335`
- Qdrant gRPC: `localhost:6336`

## Các dịch vụ đi kèm

- `open-webui`: container Open WebUI chính thức
- `qdrant`: cơ sở dữ liệu vector cục bộ cho embedding và truy vấn tài liệu

## Cấu hình bắt buộc

Trước lần khởi động đầu tiên, hãy xem `./.env` và thay đổi ít nhất:

- `WEBUI_SECRET_KEY`

Xem xét các giá trị này nếu bố cục runtime cục bộ của bạn khác:

- `OLLAMA_BASE_URL`
- `RAG_OLLAMA_BASE_URL`
- `OPEN_WEBUI_PORT`
- `QDRANT_HTTP_PORT`
- `QDRANT_GRPC_HOST_PORT`

## Phạm vi của preset này

Recipe này cố ý cung cấp một tập con tập trung RAG thực tế cho kho này:

- sử dụng image `ghcr.io/open-webui/open-webui:main` chính thức
- dùng Qdrant cục bộ thay vì cơ sở dữ liệu Chroma nhúng mặc định
- giả định suy luận mô hình được cung cấp bởi recipe `ollama-runtime` riêng biệt hoặc endpoint tương thích OpenAI / Ollama khác truy cập được
- giữ các sidecar nâng cao như Tika, Docling, Playwright, cụm phiên Redis và Ollama-trong-container đi kèm ngoài phạm vi

Theo mặc định, Open WebUI vẫn dùng mô hình embedding sentence-transformers cục bộ tích hợp cho RAG trừ khi bạn thay đổi engine embedding trong cài đặt admin hoặc qua biến môi trường.

## Dữ liệu bền vững

Recipe này lưu trữ dữ liệu tại:

- `registry/recipes/openwebui-rag-preset/data/open-webui`
- `registry/recipes/openwebui-rag-preset/data/qdrant`

## Phạm vi kiểm chứng

Được kiểm chứng trong kho này bằng cách:

- tạo metadata recipe, mẫu môi trường, định nghĩa compose và tài liệu
- căn chỉnh triển khai với image Docker Open WebUI chính thức và mount dữ liệu bền vững được tài liệu hóa
- kết nối Open WebUI với Qdrant cục bộ thông qua các biến môi trường được hỗ trợ
- hiển thị các cổng cục bộ mong đợi `3083`, `6335` và `6336`
- render `docker compose config` thành công cho recipe

Chưa được kiểm chứng tại đây:

- khởi động runtime đầy đủ và luồng đăng nhập lần đầu trên môi trường Windows này
- tải tài liệu trực tiếp, tạo embedding hoặc phản hồi truy vấn đầu-cuối
- các tích hợp tùy chọn Docling, Tika, tìm kiếm web, pipeline, Playwright hoặc reranker bên ngoài
- triển khai đa node, xác thực doanh nghiệp hoặc backend lưu trữ từ xa

## Ghi chú giấy phép

- Dự án upstream: `open-webui/open-webui`
- Giấy phép upstream: giấy phép hỗn hợp với thương hiệu Open WebUI và điều khoản thương mại cho một số phần của dự án
- Hãy xem `LICENSE` và `LICENSE_HISTORY` upstream trước khi phân phối lại, white-labeling hoặc đóng gói thương mại

## Ghi chú rủi ro

- Tag container `:main` theo dõi các thay đổi upstream và có thể gây ra hành vi breaking theo thời gian.
- Open WebUI có thể tải các tài nguyên embedding và mô hình phụ trợ khi sử dụng lần đầu, nên hành vi khởi động lạnh có thể chậm hơn những gì định nghĩa compose gợi ý.
- Hiển thị cả Web UI và Qdrant cục bộ làm tăng bề mặt tấn công; giữ stack trên mạng đáng tin cậy.
