> [English](README.md) | **Tiếng Việt**

# es-blueprint-rsg

Ghi chú ngắn dành cho người rà soát/người kiểm thử công thức `Intent-Based RAN Energy Efficiency Blueprint`.

## Công thức này gói gọn những gì

Công thức NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC này mở ra quy trình notebook VIAVI/NVIDIA upstream thông qua một container Jupyter nhẹ.

Nguồn upstream:
- Trang blueprint NVIDIA: `https://build.nvidia.com/viavi/intent-driven-ran-energy-efficiency`
- Kho upstream: `https://github.com/VIAVI-CTOO/es-blueprint-rsg`

## Danh sách kiểm tra cho người rà soát

1. Sao chép `registry/recipes/es-blueprint-rsg/.env.example` thành `.env` nếu file runtime chưa được tạo.
2. Cung cấp một `NVIDIA_API_KEY` hợp lệ.
3. Xác nhận quyền truy cập VIAVI AI RSG khả dụng cho môi trường kiểm thử.
4. Clone kho upstream vào:
   - `registry/recipes/es-blueprint-rsg/workspace/es-blueprint-rsg`
5. Cài đặt hoặc khởi chạy công thức từ NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC.
6. Mở giao diện notebook và xác minh Jupyter tải tại `/tree/notebooks`.
7. Mở `notebooks/es_blueprint_poc.ipynb` và xác nhận môi trường đã sẵn sàng để thực thi các cell tuần tự.

## Điều kiện tiên quyết quan trọng

- Đây là một blueprint nghiên cứu ưu tiên notebook, không phải ứng dụng web sản xuất được đóng gói.
- Quyền truy cập VIAVI ADK có thể yêu cầu một wheel riêng được phục vụ từ host RSG.
- Công thức mặc định không đóng gói dataset riêng, thông tin xác thực riêng hoặc nội dung kho upstream.

## Phạm vi kiểm chứng dự kiến

- Siêu dữ liệu công thức tải trong danh mục.
- Nhãn notebook xuất hiện thay cho nhãn ứng dụng web mặc định.
- Các tab cấu hình chuyên dụng khả dụng trong trang chi tiết công thức.
- Việc khởi chạy mở Jupyter thành công khi không gian làm việc upstream và thông tin xác thực đã có sẵn.
