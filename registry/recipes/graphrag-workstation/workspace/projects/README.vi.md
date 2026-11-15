> [English](README.md) | **Tiếng Việt**

# GraphRAG Workstation Projects

Mỗi thư mục con trong thư mục này được coi là một không gian làm việc dataset GraphRAG.

Cấu trúc khuyến nghị cho mỗi dataset:

- `input/` cho file nguồn `.txt` hoặc `.csv` thô
- `settings.yaml` được tạo bởi `graphrag init`
- `.env` cho thông tin xác thực model GraphRAG và ghi đè endpoint
- `prompts/` được tạo bởi `graphrag init`
- `output/` được tạo bởi `graphrag index`
- `metadata.json` cho metadata hiển thị cục bộ tùy chọn được trạm làm việc này sử dụng

Bàn làm việc Streamlit đi kèm có thể khởi tạo thư mục dataset mới, tạo file mẫu khởi tạo, chạy lập chỉ mục và so sánh các chế độ truy vấn sau khi dataset đã được lập chỉ mục.
