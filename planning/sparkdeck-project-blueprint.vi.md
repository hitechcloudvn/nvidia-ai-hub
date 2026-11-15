> [English](sparkdeck-project-blueprint.md) | **Tiếng Việt**

# NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC — Bản thiết kế dự án
## Trình khởi chạy ứng dụng AI gốc Docker cho các nền tảng GPU NVIDIA

---

## 1. Tầm nhìn & Định vị

**Câu mô tả ngắn:** NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC là một trình khởi chạy ứng dụng dựa trên web cho các nền tảng GPU NVIDIA, biến các recipe Docker đã được cộng đồng xác minh thành các khối tải công việc AI một chạm trên máy trạm, máy chủ doanh nghiệp và môi trường DGX.

**Khoảng trống mà giải pháp lấp đầy:**
- Các trình khởi chạy ứng dụng AI hiện có không nhất quán trên các môi trường GPU NVIDIA, đặc biệt khi người dùng phải xoay xở giữa CUDA, driver, Docker và các bản vá riêng theo kiến trúc.
- "Custom Scripts" của NVIDIA Sync chứng minh UX đó là khả thi nhưng không có catalog, không có chia sẻ cộng đồng và không có vòng đời recipe theo phiên bản.
- Các playbook chính thức của NVIDIA rất giá trị nhưng vẫn yêu cầu clone thủ công, thiết lập môi trường và thao tác nặng về terminal.
- Cộng đồng GPU NVIDIA bị phân mảnh qua các hướng dẫn triển khai, hướng dẫn máy trạm, kho GitHub, chủ đề diễn đàn, bài blog và ghi chú nội bộ của đội ngũ.
- Các đội ngũ đầu tư mạnh vào phần cứng GPU NVIDIA nhưng vẫn cần chuyên môn nền tảng để vận hành hóa các stack AI cộng đồng một cách an toàn và lặp lại được.

**NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC hợp nhất các quy trình làm việc này** thành một catalog có thể duyệt với triển khai một chạm, các điều khiển vòng đời, guardrail kiểm chứng và mô hình vận hành rõ ràng hơn cho các môi trường GPU NVIDIA.

**Phạm vi nền tảng mục tiêu:**
- Các nền tảng NVIDIA DGX, bao gồm NVIDIA NVIDIA GPU
- Máy trạm GPU NVIDIA
- Máy chủ và hệ thống phòng thí nghiệm GPU NVIDIA
- Host Linux với GPU NVIDIA được hỗ trợ và NVIDIA Container Toolkit

---

## 2. Kiến trúc cốt lõi

```
┌─────────────────────────────────────────────────────────┐
│                    USER'S BROWSER                        │
│              (laptop/desktop via network)                │
│                                                         │
│   ┌───────────────────────────────────────────────────┐ │
│   │ NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC UI    │ │
│   │                                                    │ │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │ │
│   │  │ Catalog   │ │ Running  │ │ System Monitor   │  │ │
│   │  │ (Browse & │ │ Apps     │ │ (GPU/RAM/Disk)   │  │ │
│   │  │  Search)  │ │ (Manage) │ │                  │  │ │
│   │  └──────────┘ └──────────┘ └──────────────────┘  │ │
│   └───────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/WebSocket
                         ▼
┌─────────────────────────────────────────────────────────┐
│      NVIDIA GPU WORKSTATION / SERVER / DGX PLATFORM HOST             │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC Daemon │  │
│  │                                                     │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────┐ │  │
│  │  │ Recipe       │  │ Docker       │  │ System    │ │  │
│  │  │ Registry     │  │ Orchestrator │  │ Monitor   │ │  │
│  │  │ (Git-backed) │  │ (compose)    │  │ (nvidia-  │ │  │
│  │  │              │  │              │  │  smi, df) │ │  │
│  │  └─────────────┘  └──────┬───────┘  └───────────┘ │  │
│  └───────────────────────────┼────────────────────────┘  │
│                              │                            │
│  ┌───────────────────────────▼────────────────────────┐  │
│  │              Docker Engine + NVIDIA Runtime         │  │
│  │                                                     │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │  │
│  │  │ Open     │ │ ComfyUI  │ │ Hunyuan  │  ...      │  │
│  │  │ WebUI    │ │ +SageAttn│ │ 3D 2.1   │           │  │
│  │  │ +Ollama  │ │ +Wan2.2  │ │          │           │  │
│  │  └──────────┘ └──────────┘ └──────────┘           │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ NVIDIA GPU(s) + local NVMe / shared storage / datasets │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### Các quyết định thiết kế then chốt

1. **Web UI, không phải ứng dụng desktop** — Chạy trên host đích và được truy cập qua trình duyệt từ bất kỳ thiết bị nào. Không gánh nặng đóng gói Electron, không phụ thuộc GUI cục bộ, và không cần phát hành client desktop riêng cho từng hồ sơ nền tảng GPU NVIDIA.

2. **Recipe docker-compose, không phải script pip/conda** — Container đóng gói CUDA, kỳ vọng driver, bản vá riêng theo kiến trúc và cấu trúc dịch vụ. Một recipe là một `docker-compose.yml` kèm siêu dữ liệu, không phải script cài đặt mong manh.

3. **Recipe registry dựa trên Git** — Các recipe được lưu trong một kho GitHub. Daemon kéo cập nhật. Người đóng góp cộng đồng gửi PR. Có phiên bản, có thể kiểm toán, có thể fork.

4. **Daemon nhẹ** — Một tiến trình Python duy nhất (FastAPI) chạy trên host GPU NVIDIA được quản lý. Nó giao tiếp với Docker qua Docker SDK for Python và lộ các endpoint REST và WebSocket cho các thao tác vòng đời, sức khỏe và log.

5. **Tích hợp nhận biết nền tảng** — Tích hợp NVIDIA Sync vẫn khả dụng khi phù hợp, trong khi lõi nền tảng vẫn di động được qua các triển khai máy trạm, máy chủ, phòng thí nghiệm và DGX.

---

## 3. Định dạng recipe

Một recipe là một thư mục trong kho registry:

```
recipes/
├── hunyuan3d-2.1/
│   ├── recipe.yaml            # Siêu dữ liệu (Metadata)
│   ├── docker-compose.yml     # Phần triển khai thực tế (The actual deployment)
│   ├── Dockerfile             # Tùy chọn: build tùy chỉnh (Optional: custom build)
│   ├── scripts/
│   │   └── launch.sh          # Script tùy chỉnh NVIDIA Sync (NVIDIA Sync custom script)
│   ├── screenshot.png         # Ảnh xem trước (Preview image)
│   └── README.md              # Tài liệu chi tiết (Detailed docs)
├── comfyui-sparky/
│   ├── recipe.yaml
│   ├── docker-compose.yml
│   └── ...
└── ...
```

### Schema recipe.yaml

```yaml
name: "Hunyuan3D 2.1"
slug: hunyuan3d-2.1
version: "1.0.0"
description: "Text/Image to 3D model generation with full PBR texturing"
author: "dr-vij"
upstream: "https://github.com/Tencent/Hunyuan3D-2"
fork: "https://github.com/dr-vij/Hunyuan3D-2.1-DGX-Docker"

category: "3d-generation"           # Enum: llm, image-gen, video-gen, 
                                     # 3d-generation, audio, coding, 
                                     # multi-modal, tools
tags:
  - "3d"
  - "texturing"
  - "mesh"

# Yêu cầu phần cứng (Hardware requirements)
requirements:
  min_memory_gb: 40                  # RAM tối thiểu cần thiết (Minimum RAM needed)
  recommended_memory_gb: 80          # Để đạt hiệu năng tốt nhất (For best performance)
  disk_gb: 50                        # Dung lượng đĩa xấp xỉ (Approximate disk footprint)
  cuda_compute: "12.1"               # sm_121 (Blackwell GB10)
  
# Những gì người dùng thấy (What the user sees)
ui:
  type: "gradio"                     # gradio | web | api-only | cli
  port: 7860
  path: "/"
  
# Cấu hình container (Container config)
docker:
  build: true                        # Cần docker build thay vì pull (Needs docker build (vs. pull))
  build_time_minutes: 30             # Thời gian build ước tính (Estimated build time)
  gpu: true
  
# Trạng thái xác minh (Verification status)
status: "community-verified"         # community-verified | official | 
                                     # experimental | broken
tested_on:
  platforms:
    - name: "NVIDIA DGX platform"
      os: "DGX OS 7.2"
      arch: "arm64"
    - name: "NVIDIA GPU workstation or server"
      os: "Ubuntu 24.04"
      arch: "x86_64"
  date: "2025-12-01"
  tester: "dr-vij"
  
# Phụ thuộc vào recipe khác (tùy chọn) (Dependencies on other recipes (optional))
depends_on: []

# Tải model (hiển thị cho người dùng trước khi cài) (Model downloads (shown to user before install))
models:
  - name: "Hunyuan3D-2.1 weights"
    size_gb: 25
    auto_download: true
```

---

## 4. Tech Stack

### Backend (chạy trên các host GPU NVIDIA được hỗ trợ)

| Thành phần | Lựa chọn | Lý do |
|-----------|--------|-----------|
| Ngôn ngữ | Python 3.12 | Hệ sinh thái trưởng thành, di động qua các host Linux được hỗ trợ |
| Framework | FastAPI + Uvicorn | Async, hỗ trợ WebSocket, nhẹ |
| Docker SDK | `docker` (Python) | Docker SDK chính thức, hỗ trợ compose |
| Quản lý tiến trình | systemd service | Nguyên bản trên các bản phát hành Linux hiện đại, tự khởi động lại |
| Kho dữ liệu | SQLite | Không cần cấu hình, một tệp, đủ cho siêu dữ liệu |
| Đồng bộ recipe | GitPython / subprocess git | Kéo từ kho registry |

### Frontend (được backend phục vụ, chạy trong trình duyệt)

| Thành phần | Lựa chọn | Lý do |
|-----------|--------|-----------|
| Framework | React 19 + Vite | Hiện đại, nhanh, hệ sinh thái tốt |
| Styling | Tailwind CSS | Utility-first, không phức tạp khi build |
| State | Zustand | Nhẹ, không boilerplate |
| Thời gian thực | WebSocket (native) | Log container trực tiếp, tiến trình build |
| Biểu đồ | Recharts | Giám sát GPU/bộ nhớ |

### Registry (kho GitHub)

| Thành phần | Lựa chọn | Lý do |
|-----------|--------|-----------|
| Hosting | GitHub | Miễn phí, PR cho đóng góp, Actions cho CI |
| CI | GitHub Actions | Tự động kiểm chứng recipe.yaml, test tệp compose |
| Image | GitHub Container Registry | Miễn phí cho kho công khai, hỗ trợ cả ARM64 và x86_64 |

---

## 5. Các tính năng cốt lõi (MVP)

### Giai đoạn 1: Nền tảng (4-6 tuần)

**P1.1 — Catalog recipe & trình duyệt**
- Duyệt recipe theo danh mục (LLM, Image Gen, Video Gen, 3D, Audio, Coding)
- Tìm kiếm và lọc
- Trang chi tiết recipe: mô tả, ảnh chụp màn hình, yêu cầu, ước tính thời gian build
- Kiểm tra mức độ phù hợp phần cứng: cảnh báo nếu một recipe vượt quá RAM, dung lượng đĩa, bộ nhớ GPU hoặc khả năng tính toán hiện có

**P1.2 — Cài đặt & khởi chạy một chạm**
- Nhấp "Install" → daemon kéo image / build container
- Stream log build trực tiếp qua WebSocket
- Thanh tiến trình với thời gian ước tính
- Nhấp "Launch" → khởi động container, mở UI trong tab mới
- Nhấp "Stop" → tắt container mềm mại

**P1.3 — Bảng điều khiển ứng dụng đang chạy**
- Danh sách các container đang chạy kèm trạng thái
- Hiển thị ánh xạ cổng (nhấp để mở trong trình duyệt)
- Mức sử dụng tài nguyên theo container (GPU%, bộ nhớ)
- Điều khiển Stop / Restart / Remove

**P1.4 — Trình giám sát hệ thống**
- Mức sử dụng GPU (từ `nvidia-smi`)
- Phân tích mức sử dụng bộ nhớ (tổng, được container dùng, còn trống)
- Dung lượng đĩa (đặc biệt quan trọng với các model lớn)
- Nhiệt độ
- Nhận biết topology đa GPU khi có

### Giai đoạn 2: Cộng đồng và vận hành (tuần 6-10)

**P2.1 — Cập nhật recipe**
- Kiểm tra cập nhật recipe (git pull)
- Hiển thị changelog
- Cập nhật một chạm (build lại container với recipe mới)

**P2.2 — Xuất tích hợp nền tảng**
- Sinh các mục NVIDIA Sync Custom Script khi áp dụng được
- Cung cấp metadata khởi chạy di động cho môi trường máy trạm, phòng thí nghiệm, máy chủ và DGX
- Copy-paste hoặc tự động cấu hình qua SSH khi cần

**P2.3 — Trình quản lý model**
- Thư mục lưu trữ model dùng chung (`~/nvidia-ai-hub/models/`)
- Mount vào container qua bind mount
- Duyệt các model đã tải xuống
- Tải model từ Hugging Face / Ollama registry
- Ngăn tải xuống trùng lặp giữa các recipe

**P2.4 — Đóng góp cộng đồng**
- Luồng "Submit Recipe" → tạo PR trên GitHub
- Đánh giá recipe / nút "verified on my system"
- Bình luận / mẹo theo từng recipe (lưu trong kho registry dưới dạng YAML)

### Giai đoạn 3: Người dùng chuyên sâu (tuần 10-14)

**P3.1 — Trình soạn thảo Compose**
- Chỉnh sửa docker-compose.yml cho bất kỳ recipe nào ngay trong trình duyệt
- Ghi đè biến môi trường (ví dụ: đổi model, cổng)
- Lưu thành "my fork" của một recipe

**P3.2 — Hỗ trợ đa nút / đa GPU**
- Phát hiện danh mục GPU của host và topology
- Hỗ trợ các recipe phân tán qua nhiều GPU hoặc nhiều host NVIDIA khi mạng và lưu trữ đã được cấu hình
- Bật các hồ sơ triển khai cho thiết lập suy luận một GPU, đa GPU và cụm

**P3.3 — Sao lưu & khôi phục**
- Xuất danh sách ứng dụng đã cài + danh sách model
- Khôi phục trên một host GPU NVIDIA mới được hỗ trợ

---

## 6. Cài đặt NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC

Công cụ phải cài đặt được một cách dễ dàng trên hệ thống Linux được hỗ trợ có Docker và NVIDIA Container Toolkit. Một lệnh:

```bash
curl -fsSL https://nvidia-ai-hub.dev/install.sh | bash
```

Lệnh này làm gì:
1. Tạo thư mục `~/nvidia-ai-hub/`
2. Clone daemon + frontend của NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC (đã build sẵn)
3. Clone kho recipe registry
4. Cài một systemd service (`nvidia-ai-hub.service`)
5. Khởi động dịch vụ trên cổng 9000
6. In ra: "NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC is running at http://localhost:9000"

Không pip, không conda, không node cho người dùng cuối trong luồng đóng gói lý tưởng — daemon được phân phối như một dịch vụ nhẹ và frontend được phục vụ dưới dạng tệp tĩnh đã build sẵn.

---

## 7. Cấu trúc dự án

```
nvidia-ai-hub/
├── daemon/                          # Backend
│   ├── main.py                      # Điểm vào ứng dụng FastAPI (FastAPI app entry)
│   ├── routers/
│   │   ├── recipes.py               # CRUD cho recipe (CRUD for recipes)
│   │   ├── containers.py            # Thao tác Docker (Docker operations)
│   │   ├── system.py                # nvidia-smi, đĩa, v.v. (nvidia-smi, disk, etc.)
│   │   └── models.py                # Quản lý model (Model management)
│   ├── services/
│   │   ├── docker_service.py        # Trình bọc Docker SDK (Docker SDK wrapper)
│   │   ├── registry_service.py      # Thao tác Git (Git operations)
│   │   ├── monitor_service.py       # Chỉ số hệ thống (System metrics)
│   │   └── sync_export.py           # Tích hợp NVIDIA Sync (NVIDIA Sync integration)
│   ├── models/                      # Schema Pydantic (Pydantic schemas)
│   │   ├── recipe.py
│   │   └── container.py
│   ├── db.py                        # SQLite
│   └── config.py                    # Cài đặt (Settings)
├── frontend/                        # Ứng dụng React (React app)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Catalog.jsx
│   │   │   ├── AppDetail.jsx
│   │   │   ├── Running.jsx
│   │   │   └── System.jsx
│   │   ├── components/
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── BuildLog.jsx
│   │   │   ├── ResourceMonitor.jsx
│   │   │   └── ...
│   │   └── App.jsx
│   └── dist/                        # Build sẵn để phân phối (Pre-built for distribution)
├── registry/                        # Git submodule → kho recipe (Git submodule → recipe repo)
│   └── recipes/
│       ├── ollama-openwebui/
│       ├── comfyui-sparky/
│       ├── hunyuan3d-2.1/
│       ├── trellis2/
│       ├── lm-studio/
│       ├── localai/
│       ├── vllm-community/
│       └── ...
├── install.sh                       # Script cài đặt một dòng (One-line installer)
├── nvidia-ai-hub.service               # Unit systemd (systemd unit)
└── README.md
```

---

## 8. Catalog tham chiếu ban đầu (ngày ra mắt)

| Recipe | Danh mục | Nguồn | Trạng thái | Thời gian build |
|--------|----------|--------|--------|------------|
| Ollama + Open WebUI | LLM | NVIDIA Playbook | Official | < 5 min |
| LM Studio | LLM | lmstudio.ai | Official | < 2 min |
| ComfyUI (SparkyUI) | Image/Video Gen | ecarmen16/SparkyUI | Community | ~15 min |
| Hunyuan3D 2.1 | 3D Generation | dr-vij fork | Community | ~30 min |
| TRELLIS.2 | 3D Generation | raziel2001au fork | Community | ~20 min |
| LocalAI | Multi-modal API | mudler/LocalAI | Official | < 5 min |
| vLLM (sm_121 fork) | LLM Serving | seli-equinix fork | Community | ~25 min |
| TensorRT-LLM | LLM Serving | NVIDIA NGC | Official | < 10 min |
| llama.cpp (ggml) | LLM Serving | ggml-org guide | Community | ~10 min |
| Stable Diffusion WebUI | Image Gen | AUTOMATIC1111 | Community | ~15 min |

---

## 9. Khác biệt so với các phương án thay thế

| Tính năng | Pinokio | NVIDIA Sync | NVIDIA Playbooks | NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC |
|---------|---------|-------------|-----------------|------------|
| Hoạt động trên host GPU NVIDIA | ❌ | ⚠️ Hạn chế | ⚠️ Thủ công | ✅ |
| Cài đặt một chạm | ✅ | ⚠️ Script thủ công | ❌ Copy-paste | ✅ |
| Catalog/khám phá ứng dụng | ✅ | ❌ | ✅ (tài liệu) | ✅ |
| Đóng góp cộng đồng | ✅ | ❌ | ❌ | ✅ |
| Log build trực tiếp | ✅ | ❌ | ❌ | ✅ |
| Giám sát hệ thống | ❌ | ✅ (Dashboard) | ❌ | ✅ |
| Quản lý model | ❌ | ❌ | ❌ | ✅ |
| Gốc Docker | ❌ (pip/conda) | N/A | ✅ | ✅ |
| Mục tiêu NVIDIA ARM64 và x86_64 | ❌ | ⚠️ Một phần | ⚠️ Thủ công | ✅ |

---

## 10. Giảm thiểu rủi ro

| Rủi ro | Khả năng | Biện pháp giảm thiểu |
|------|-----------|------------|
| NVIDIA tự xây dựng cửa hàng ứng dụng của riêng họ | Trung bình | Định vị như một sự bổ trợ do cộng đồng dẫn dắt, không phải đối thủ. Tích hợp với công cụ của họ, không thay thế họ. Sẵn lòng hợp nhất nếu được đề nghị. |
| Hệ sinh thái CUDA trưởng thành, giảm nhu cầu | Cao (12-18 tháng) | Mở rộng giá trị vượt ra ngoài tự động hóa cài đặt sang quản trị catalog, kiểm chứng, observability và vận hành có thể tái lập trên các fleet GPU NVIDIA. |
| Gánh nặng bảo trì recipe | Cao | Mô hình do cộng đồng dẫn dắt với các cấp xác minh rõ ràng. CI test tự động. Đánh dấu recipe là "stale" sau N tháng không test. |
| Cơ sở người dùng nhỏ | Trung bình | Bắt đầu với những người dùng sớm hạ tầng GPU NVIDIA, sau đó mở rộng sang người dùng máy trạm, phòng thí nghiệm và máy chủ rộng hơn cần triển khai ứng dụng GPU có thể tái lập. |
| Lo ngại bảo mật (chạy Docker không đáng tin) | Trung bình | Các cấp xác minh (official / community-verified / experimental). Tất cả recipe đều open-source. Dấu vết kiểm toán qua Git. |

---

## 11. Ý tưởng tên gọi & thương hiệu

- **NVIDIA AI Hub by Pho Tue SoftWare Solutions JSC** — thương hiệu sản phẩm đã được áp dụng cho dự án này.
- **GPUHub** — Độ phủ nền tảng rộng. Rủi ro: quá chung chung.
- **Ignite** — Ẩn dụ kích hoạt mạnh. Sạch nhưng chung chung.
- **LaunchPad** — Ý nghĩa vận hành mạnh. Rủi ro: thuật ngữ phổ biến.
- **Anvil** — Ẩn dụ lò rèn. Ngắn gọn.
- **Kindling** — Gợi ý khởi động và kích hoạt nhanh. Thông minh, nhưng ít thiên về hạ tầng hơn.

---

## 12. Bắt đầu: 2 tuần đầu tiên

**Tuần 1: Khung backend**
- [ ] Ứng dụng FastAPI với tích hợp Docker SDK
- [ ] Trình phân tích recipe YAML
- [ ] Endpoint: liệt kê recipe, cài đặt recipe (docker-compose up), dừng, trạng thái
- [ ] Endpoint WebSocket cho log build docker trực tiếp
- [ ] Endpoint polling nvidia-smi

**Tuần 2: Frontend MVP + các recipe đầu tiên**
- [ ] Ứng dụng React: trang catalog, trang chi tiết ứng dụng, trang ứng dụng đang chạy
- [ ] Kết nối với backend API
- [ ] Đóng gói 3-5 recipe (Open WebUI, ComfyUI/SparkyUI, Hunyuan3D, LocalAI, LM Studio)
- [ ] Script install.sh
- [ ] Test end-to-end trên ít nhất một mục tiêu nền tảng DGX và một host Linux GPU NVIDIA tiêu chuẩn để kiểm chứng hành vi đa nền tảng

**Tuần 3-4: Hoàn thiện & ra mắt**
- [ ] Trang trình giám sát hệ thống
- [ ] Xử lý lỗi & phục hồi (build thất bại, OOM, v.v.)
- [ ] README, tài liệu, ảnh chụp màn hình
- [ ] Đăng lên các kênh cộng đồng NVIDIA developer, enterprise AI và DGX
- [ ] Ra mắt công khai kho GitHub
