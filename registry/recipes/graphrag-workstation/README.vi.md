> [English](README.md) | **Tiếng Việt**

# GraphRAG Workstation

Trạm làm việc GraphRAG thực tế cho NVIDIA GPU, sử dụng bàn làm việc Streamlit cục bộ và gói Python `graphrag` chính thức.

## Những gì công thức này cung cấp

- Trạm làm việc GraphRAG trên Streamlit tại cổng `3086`
- Không gian làm việc dự án bền vững tại `./workspace/projects`
- Luồng khởi tạo dataset một cú nhấp được hỗ trợ bởi `graphrag init`
- Quy trình corpus được lập chỉ mục được hỗ trợ bởi `graphrag index`
- Quy trình so sánh truy vấn cho các chế độ tìm kiếm `basic`, `local`, `global` và `drift`
- `listing.json` được tạo tự động tương thích với bố cục dataset chính thức của `unified-search-app`

## Truy cập mặc định

- Giao diện trạm làm việc: `http://localhost:3086`

## Các dịch vụ đi kèm

- image Python 3.11 cục bộ tùy chỉnh được build trong kho lưu trữ này
- gói Python `graphrag` upstream chính thức được cài lúc build container
- Bàn làm việc dựa trên Streamlit để quản lý thư mục dự án GraphRAG

## Phạm vi của trạm làm việc này

Công thức này cố ý thực tế thay vì cố gắng phản chiếu toàn bộ bố cục kho upstream.

Bao gồm tại đây:

- tạo thư mục dataset bên trong `registry/recipes/graphrag-workstation/workspace/projects`
- tạo nội dung `input/` khởi tạo để kiểm tra lần chạy đầu
- tạo `settings.yaml`, `.env` và `prompts/` qua CLI upstream
- đồng bộ cấu hình cho các cài đặt nhà cung cấp kiểu LiteLLM như `model_provider`, `model`, `api_base` và `api_version`
- lập chỉ mục GraphRAG và thực thi truy vấn từ một giao diện cục bộ duy nhất
- tạo file `listing.json` cấp cao nhất theo quy ước dataset của trạm làm việc upstream

Không bao gồm tại đây:

- cây nguồn `unified-search-app` đầy đủ của upstream
- hosting dataset trên Azure Blob
- xác thực doanh nghiệp, RBAC hoặc kho bí mật bên ngoài
- tăng tốc GPU tự động cho khối lượng công việc GraphRAG
- tự động hóa tinh chỉnh prompt có quan điểm sẵn ngoài chính CLI upstream

## Cấu hình bắt buộc

Trước khi lập chỉ mục hoặc truy vấn lần đầu:

1. Mở giao diện trạm làm việc.
2. Tạo một dataset hoặc làm mới không gian làm việc dataset hiện có.
3. Cung cấp thông tin xác thực model hợp lệ và cài đặt endpoint cho nhà cung cấp tương thích LiteLLM bạn chọn.
4. Thêm file nguồn `.txt` hoặc `.csv` vào thư mục `input/` của dataset.
5. Chạy lập chỉ mục trước khi thử truy vấn `local`, `global`, `drift` hoặc `basic`.

## Bố cục dataset

Mỗi không gian làm việc dataset được lưu tại:

- `registry/recipes/graphrag-workstation/workspace/projects/<dataset>/input`
- `registry/recipes/graphrag-workstation/workspace/projects/<dataset>/settings.yaml`
- `registry/recipes/graphrag-workstation/workspace/projects/<dataset>/.env`
- `registry/recipes/graphrag-workstation/workspace/projects/<dataset>/prompts`
- `registry/recipes/graphrag-workstation/workspace/projects/<dataset>/output`
- `registry/recipes/graphrag-workstation/workspace/projects/<dataset>/metadata.json`

Công thức cũng duy trì:

- `registry/recipes/graphrag-workstation/workspace/projects/listing.json`

File đó theo cùng cấu trúc cấp cao được mô tả trong mẫu unified search chính thức của GraphRAG.

## Ghi chú tương thích model

GraphRAG v3 dùng cấu hình kiểu LiteLLM. Công thức này mở ra các trường phổ biến nhất qua `.env` và biểu mẫu bootstrap Streamlit:

- `GRAPHRAG_MODEL_PROVIDER`
- `GRAPHRAG_COMPLETION_MODEL`
- `GRAPHRAG_EMBEDDING_MODEL`
- `GRAPHRAG_API_KEY`
- `GRAPHRAG_API_BASE`
- `GRAPHRAG_API_VERSION`
- tên deployment Azure tùy chọn cho chat và embeddings

`settings.yaml` của dataset được tạo được chuẩn hóa để:

- dùng `input.base_dir: input`
- dùng `output.base_dir: output`
- dùng LanceDB cục bộ tại `output/lancedb`
- bật `snapshots.graphml: true` để kiểm tra đồ thị hạ nguồn

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/graphrag-workstation/workspace/projects`

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, tài sản build Docker, định nghĩa compose, ứng dụng trạm làm việc, khung không gian làm việc và tài liệu công thức
- kiểm tra chẩn đoán trình soạn thảo cho các file trạm làm việc GraphRAG mới
- xác nhận cú pháp Python cho ứng dụng trạm làm việc Streamlit cục bộ

Chưa được kiểm chứng tại đây:

- build Docker hoặc khởi động container trực tiếp, vì Docker không khả dụng trong môi trường làm việc Windows này
- thực thi `graphrag init`, `graphrag index` hoặc `graphrag query` trực tiếp với thông tin xác thực nhà cung cấp thật
- chất lượng truy xuất, chi phí lập chỉ mục hoặc khả năng tương thích structured-output riêng theo nhà cung cấp

## Ghi chú giấy phép

- Dự án upstream: `microsoft/graphrag`
- Giấy phép dự án upstream: MIT
- Rà soát điều khoản phụ thuộc và nhà cung cấp trước khi phân phối lại sản xuất hoặc triển khai thương mại.

## Ghi chú rủi ro

- API và giá trị mặc định cấu hình của GraphRAG upstream phát triển nhanh; các bản phát hành tương lai có thể yêu cầu cập nhật logic đồng bộ dataset.
- Chất lượng truy vấn và thành công lập chỉ mục phụ thuộc vào việc nhà cung cấp được chọn hỗ trợ kỳ vọng prompt và structured-output của GraphRAG.
- Corpus lớn có thể tiêu tốn nhiều thời gian, token và dung lượng đĩa trong quá trình lập chỉ mục.
- Công thức này được định hướng như một trạm làm việc khởi tạo cho phạm vi lộ trình và thử nghiệm, không phải triển khai sản xuất đã tăng cường.
