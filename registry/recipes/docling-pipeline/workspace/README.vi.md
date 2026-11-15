> [English](README.md) | **Tiếng Việt**

# Docling Pipeline Workspace

Không gian làm việc này lưu trữ dữ liệu runtime bền vững cho công thức `docling-pipeline`.

## Bố cục

- `inputs/<job-id>/` - tài liệu nguồn được tải lên cho một lô chuyển đổi
- `outputs/<job-id>/` - tạo phẩm chuyển đổi được xuất, nhóm theo tên gốc của file nguồn
- `manifests/<job-id>.json` - tóm tắt tác vụ, trạng thái và đường dẫn đầu ra

## Ghi chú

- File được tải lên có thể chứa nội dung tài liệu nhạy cảm. Hãy rà soát việc lưu giữ trước khi chia sẻ thư mục này.
- Xóa các thư mục tác vụ `inputs/` và `outputs/` cũ khi dung lượng đĩa tăng lên.
- API ghi manifest ngay cả khi một số file thất bại để người rà soát lô có thể xem kết quả một phần.
