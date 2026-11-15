> [English](README.md) | **Tiếng Việt**

# Docling Pipeline

Pipeline chuyển đổi tài liệu cục bộ cho NVIDIA GPU, sử dụng gói Python `docling` chính thức và API tác vụ FastAPI nhẹ.

## Những gì công thức này cung cấp

- Tài liệu FastAPI trên cổng `3087`
- Endpoint kiểm tra sẵn sàng `GET /health`
- `GET /config` để xem cài đặt xuất và giới hạn tải lên
- `POST /convert` để chuyển đổi tài liệu hàng loạt từ tải lên multipart
- `GET /jobs` và `GET /jobs/{job_id}` để xem manifest hàng loạt đã lưu
- `GET /jobs/{job_id}/artifacts/{relative_path}` để tải xuống kết quả xuất
- Mount không gian làm việc bền vững cho uploads, exports và manifest chuyển đổi

## Truy cập mặc định

- Tài liệu API: `http://localhost:3087/docs`
- Health: `http://localhost:3087/health`
- Config: `http://localhost:3087/config`

## Các dịch vụ đi kèm

- image Python 3.11 cục bộ tùy chỉnh được build trong kho lưu trữ này
- gói Python `docling` upstream chính thức được cài lúc build container
- Wrapper FastAPI cho quy trình tải lên, chuyển đổi và tải tạo phẩm có thể lặp lại

## Phạm vi của pipeline này

Bao gồm tại đây:

- quy trình tải lên hàng loạt cho một hoặc nhiều tài liệu cục bộ mỗi tác vụ
- thư mục tác vụ bền vững tại `workspace/inputs`, `workspace/outputs` và `workspace/manifests`
- chuyển đổi Docling trực tiếp từ file cục bộ bằng `DocumentConverter()`
- tạo bản xuất cho Markdown, JSON, HTML, plain text, YAML và DocTags
- manifest được lưu bền vững ngay cả khi một số file trong lô thất bại

Không bao gồm tại đây:

- bộ dịch vụ Docling thử nghiệm của upstream
- xác thực, RBAC hoặc hàng đợi đa tenant
- giao diện xem trước phong phú trên trình duyệt ngoài Swagger docs của FastAPI
- các cờ tinh chỉnh pipeline tùy chọn cho VLM, dịch vụ từ xa hoặc GPU
- nạp RAG dựng sẵn cho vector store hoặc framework hạ nguồn

## Quy trình được hỗ trợ

1. Mở tài liệu API.
2. Gửi một hoặc nhiều tài liệu cục bộ tới `POST /convert`.
3. Tùy chọn đặt `export_formats` dưới dạng danh sách phân tách bằng dấu phẩy như `md,json,html`.
4. Xem manifest tác vụ được trả về.
5. Dùng `GET /jobs/{job_id}` hoặc route tải tạo phẩm để xem kết quả.

Docling upstream hỗ trợ nhiều loại tài liệu, bao gồm PDF, DOCX, PPTX, XLSX, HTML, ảnh, audio, đầu vào văn bản họ Markdown và nhiều loại khác. Thành công thực tế phụ thuộc vào file đầu vào được chọn và hỗ trợ parser của upstream.

## Dữ liệu bền vững

Công thức này lưu trữ trạng thái tại:

- `registry/recipes/docling-pipeline/workspace/inputs`
- `registry/recipes/docling-pipeline/workspace/outputs`
- `registry/recipes/docling-pipeline/workspace/manifests`

## Ghi chú cấu hình

Đặt các giá trị này trong `.env` trước khi khởi chạy nếu cần:

- `HOST_PORT` - cổng host cho dịch vụ FastAPI
- `API_PORT` - cổng container do Uvicorn sử dụng
- `WORKSPACE_ROOT` - gốc không gian làm việc bền vững được mount trong container
- `DEFAULT_EXPORT_FORMATS` - danh sách xuất mặc định phân tách bằng dấu phẩy
- `MAX_UPLOAD_MB` - giới hạn tải lên mỗi file do API áp dụng
- `LOG_LEVEL` - mức chi tiết log runtime

## Phạm vi kiểm chứng

Đã được kiểm chứng trong kho lưu trữ này bằng cách:

- tạo siêu dữ liệu công thức, mẫu môi trường, tài sản build Docker, định nghĩa compose, khung không gian làm việc, ứng dụng API và tài liệu công thức
- căn chỉnh hành vi API với các phương thức chuyển đổi và xuất được ghi nhận của Docling như `export_to_markdown`, `export_to_dict`, `export_to_html` và `export_to_doctags`
- kiểm tra chẩn đoán trình soạn thảo cho các file công thức Docling mới
- xác nhận cú pháp Python cho ứng dụng FastAPI cục bộ

Chưa được kiểm chứng tại đây:

- build Docker hoặc khởi động container trực tiếp, vì Docker không khả dụng trong môi trường làm việc Windows này
- kiểm tra nhanh tải lên và chuyển đổi tài liệu thật với file mẫu cục bộ trong container đang chạy
- các luồng OCR, VLM, audio hoặc dịch vụ từ xa tùy chọn được mô tả trong tài liệu Docling upstream

## Ghi chú giấy phép

- Dự án upstream: `docling-project/docling`
- Giấy phép dự án upstream: MIT
- Rà soát điều khoản sử dụng model, OCR engine và xuất hạ nguồn trước khi phân phối lại trong sản xuất.

## Ghi chú rủi ro

- Docling upstream phát triển nhanh và hỗ trợ nhiều pipeline tùy chọn; các phiên bản tương lai có thể thay đổi giá trị mặc định chuyển đổi hoặc dấu chân phụ thuộc.
- Tài liệu lớn hoặc phức tạp có thể tiêu tốn nhiều CPU, RAM và đĩa trong quá trình chuyển đổi và tạo bản xuất.
- File được tải lên và kết quả có cấu trúc được xuất có thể chứa nội dung nhạy cảm; hãy rà soát lưu giữ và kiểm soát truy cập trước khi sử dụng vận hành.
- Công thức này là một pipeline cục bộ khởi tạo thực tế cho phạm vi lộ trình và thử nghiệm, không phải nền tảng xử lý tài liệu sản xuất đã tăng cường.
