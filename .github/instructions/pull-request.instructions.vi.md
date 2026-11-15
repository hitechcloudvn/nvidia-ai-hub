---
description: "Use when preparing pull requests, updating the PR template, or documenting reviewer guidance, validation scope, risks, and rollout notes for NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC changes."
name: "Pull Request Instructions"
---
> [English](pull-request.instructions.md) | **Tiếng Việt**

# Hướng dẫn Pull Request

- Giữ mỗi pull request giới hạn trong một mối quan tâm khi có thể.
- Tóm tắt tác động tới người dùng và vận hành bằng ngôn ngữ dễ hiểu.
- Liên kết issue, yêu cầu recipe hoặc hạng mục công việc nội bộ liên quan khi có.
- Nêu rõ các khu vực bị ảnh hưởng: backend, frontend, registry, script, tài liệu quản trị hoặc giấy phép.
- Tài liệu hóa rủi ro một cách rõ ràng, đặc biệt về bảo mật, giấy phép, hành vi trình cài đặt, hành vi runtime Docker hoặc thay đổi phá vỡ tương thích.
- Nếu lệnh, cổng, biến môi trường hoặc điều kiện tiên quyết thay đổi, hãy cập nhật tài liệu liên quan trong cùng pull request.
- Kèm bằng chứng cho các khẳng định kiểm chứng: output lệnh, ảnh chụp màn hình hoặc ghi chú ngắn cho người rà soát.
- Đánh dấu bất kỳ phần việc tiếp theo nào bị trì hoãn một cách có chủ đích.
