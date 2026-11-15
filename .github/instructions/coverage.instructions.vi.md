---
description: "Use when describing test coverage, validation coverage, regression checks, or manual verification for backend, frontend, recipe, and installer changes in NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC."
name: "Coverage Instructions"
---
> [English](coverage.instructions.md) | **Tiếng Việt**

# Hướng dẫn phạm vi kiểm chứng

- Ưu tiên bằng chứng kiểm chứng cụ thể thay cho các phát biểu chung chung như "đã test".
- Với thay đổi frontend, ghi lại liệu `npm run build`, `npm run lint` và xác minh UI thủ công đã hoàn tất hay chưa.
- Với thay đổi backend, ghi lại liệu kiểm chứng khởi động, kiểm tra API, nạp recipe và hành vi riêng theo nền tảng liên quan đã được xác minh hay chưa.
- Với thay đổi registry hoặc recipe, nêu rõ recipe nào đã được nạp, cập nhật hoặc smoke test.
- Với thay đổi script hoặc trình cài đặt, nêu rõ hệ điều hành và shell dùng để kiểm chứng.
- Nếu khu vực bị ảnh hưởng không có coverage tự động, hãy nêu rõ điều đó và tóm tắt các kiểm tra thủ công đã thực hiện.
- Khi một bước kiểm chứng không được chạy, hãy giải thích lý do và xác định rủi ro sót lại cho người rà soát.
- Giữ ghi chú kiểm chứng ngắn gọn, có thể rà soát được và cụ thể cho các tệp đã thay đổi.
