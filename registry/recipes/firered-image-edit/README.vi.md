> [English](README.md) | **Tiếng Việt**

# FireRed Image Edit 1.1 cho NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC

Công thức NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC tự chứa cho `FireRedTeam/FireRed-Image-Edit-1.1`.

Hành vi cài đặt:
- NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC thực hiện build Docker cục bộ từ thư mục công thức này.
- Container đang chạy tải trọng số model khi khởi chạy lần đầu vào một volume cache Hugging Face bền vững.
- Kết quả được ghi vào một volume output bền vững.

Giao diện:
- Tải lên tối đa 3 ảnh đầu vào
- Nhập prompt chỉnh sửa
- Tùy chọn chọn LoRA `Covercraft`, `Lightning` hoặc `Makeup`
- Điều chỉnh seed, steps, CFG, độ phân giải và số lượng kết quả

Tham chiếu upstream:
- Model: https://huggingface.co/FireRedTeam/FireRed-Image-Edit-1.1
- Demo Space: https://huggingface.co/spaces/FireRedTeam/FireRed-Image-Edit-1.1
