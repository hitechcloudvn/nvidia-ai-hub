> [English](README.md) | **Tiếng Việt**

# OpenHands

Recipe OpenHands dựa trên image chính thức cho GPU NVIDIA.

## Những gì gói này cung cấp

- Web UI OpenHands trên cổng `3000`
- Trạng thái ứng dụng bền vững trong `./data/.openhands`
- Workspace mount bền vững trong `./workspace`
- Sandbox agent trên nền Docker sử dụng Docker socket của host
- Điều khiển `.env` cho tham chiếu image agent-server chính

## Truy cập mặc định

- Web UI: `http://localhost:3000`

## Quyền truy cập host bắt buộc

Recipe này mount:

- `/var/run/docker.sock`
- `./data/.openhands` vào `/.openhands`
- `./workspace` vào `/opt/workspace_base`

OpenHands sử dụng Docker socket để khởi chạy các container sandbox agent. Thư mục workspace được mount là nơi các tác vụ agent có thể tạo, chỉnh sửa và xóa tệp.

## Ghi chú bảo mật quan trọng

OpenHands là một runtime agent có mức tin cậy cao. Nó có thể thực thi code, thay đổi tệp trong workspace được mount và điều khiển các container bổ sung thông qua Docker socket. Chỉ chạy các tác vụ bạn tin tưởng, giữ dịch vụ trên mạng đáng tin cậy và xem xét kỹ kết quả trước khi sử dụng nó trên các kho hoặc host quan trọng.

## Các biến môi trường chính

- `OPENHANDS_PORT`: cổng host cho web UI
- `AGENT_SERVER_IMAGE_REPOSITORY`: kho image sandbox agent
- `AGENT_SERVER_IMAGE_TAG`: tag image sandbox agent
- `WORKSPACE_MOUNT_PATH`: đường dẫn cơ sở workspace trong container
