> [English](README.md) | **Tiếng Việt**

# Kosmos-2.5 cho NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC

Wrapper Gradio cục bộ cho `microsoft/kosmos-2.5`, tập trung vào OCR và trích xuất image-to-markdown từ ảnh giàu văn bản.

## Ghi chú runtime

- Yêu cầu GPU hỗ trợ CUDA.
- Sử dụng hỗ trợ Transformers cho `Kosmos2_5ForConditionalGeneration`.
- Tác vụ mặc định được điều khiển qua `KOSMOS_TASK` trong `.env`.
- Đầu ra của model mang tính sinh và có thể bị hallucinate; hãy xác minh kết quả OCR và markdown trước khi dùng cho mục đích hạ nguồn.
