> [English](registry-expansion-roadmap.md) | **Tiếng Việt**

# Lộ trình mở rộng registry

## Mục tiêu
Thêm ít nhất 100 mục registry mới trên tất cả các nhóm catalog chính với danh mục phù hợp, banner theo nhóm và siêu dữ liệu đã được rà soát.

## Phương thức triển khai
- Chiến lược: lập kế hoạch trước, sau đó triển khai theo từng lô.
- Tiêu chuẩn chất lượng: chỉ các mục đã được nghiên cứu đầy đủ.
- Phạm vi: vLLM / NVIDIA chính thức, ứng dụng đa phương thức, ảnh/video/3D, runtime Ollama/cục bộ.

## Các danh mục catalog mới được đề xuất
Các danh mục này nên được thêm khi các lô hoàn thành để catalog luôn dễ điều hướng:
- `chat-ui` — ứng dụng web và trợ lý theo hướng chat
- `rag` — trợ lý truy xuất và tri thức
- `speech` — TTS, ASR, nhân bản giọng nói, agent âm thanh
- `vision-language` — VLM và hiểu tài liệu/ảnh
- `code-gen` — mô hình/ứng dụng viết code và agent coding
- `reasoning` — các mô hình tập trung vào suy luận
- `image-edit` — ứng dụng chỉnh sửa ảnh và inpainting
- `image-understanding` — OCR, document AI, captioning, grounding
- `video-tools` — chỉnh sửa video, captioning, sinh video, công cụ avatar
- `3d-tools` — tái dựng 3D, sinh 3D, quy trình mesh
- `runtime` — runtime phục vụ model và API gateway
- `workflow` — điều phối, pipeline, trình dựng agent

## Các nhóm banner được đề xuất
Tạo hoặc tái sử dụng banner theo nhóm khi thêm mục:
- `llama-aurora-lattice.svg`
- `qwen-vision-atlas.svg`
- `gemma-spectrum-grid.svg`
- `phi-prism-arc.svg`
- `nemotron-nebula-core.svg`
- `gptoss-forge-grid.svg`
- `seed-crystal-mesh.svg`
- `mistral-monsoon-flow.svg`
- `deepseek-orbit-matrix.svg`
- `glm-signal-weave.svg`
- `internvl-canvas-array.svg`
- `granite-foundry-stack.svg`
- `smollm-pocket-pulse.svg`
- `rag-knowledge-weave.svg`
- `speech-wave-studio.svg`
- `video-motion-ribbon.svg`
- `3d-holo-mesh.svg`
- `runtime-control-plane.svg`

## Kế hoạch theo lô

### Lô 1 — Các nhóm nền tảng vLLM (20)
1. Llama 3.2 1B Instruct
2. Llama 3.2 3B Instruct
3. Llama 3.1 70B Instruct FP8
4. Llama 3.3 70B Instruct
5. Mistral 7B Instruct v0.3
6. Mixtral 8x7B Instruct
7. Mixtral 8x22B Instruct
8. Ministral 8B Instruct
9. DeepSeek R1 Distill Qwen 7B
10. DeepSeek R1 Distill Llama 8B
11. DeepSeek V2 Lite Chat (phương án thay thế DeepSeek nhẹ chính thức; không có bản phát hành DeepSeek V3 Lite công khai)
12. GLM 4.5 Air
13. GLM 4.5
14. Granite 3.1 8B Instruct
15. Granite 3.1 2B Instruct
16. SmolLM3 3B Instruct
17. Aya Expanse 8B
18. Aya Expanse 32B
19. Command R7B
20. Command R+

### Lô 2 — Các nhóm đa phương thức vLLM (20)
1. Qwen2.5 VL 3B Instruct
2. Qwen2.5 VL 7B Instruct
3. Qwen2.5 VL 32B Instruct
4. Llama 3.2 11B Vision
5. Llama 3.2 90B Vision
6. InternVL 2.5 4B
7. InternVL 2.5 8B
8. InternVL 2.5 26B
9. Phi 3.5 Vision Instruct
10. Phi 4 Multimodal base variant
11. MiniCPM V 4
12. MiniCPM-o 2.6 variant
13. Molmo 7B O
14. Molmo 72B
15. VLM-R1 7B
16. VLM-R1 32B
17. OCRFlux Doc VLM
18. Florence 2 Large API
19. Kosmos 2.5 Instruct
20. Pixtral Large

### Lô 3 — Ứng dụng ảnh / video / 3D (20)
1. InvokeAI
2. Fooocus
3. Stable Diffusion WebUI Forge
4. SwarmUI
5. Kohya SS
6. ComfyUI Manager preset pack
7. FramePack
8. CogVideoX Studio
9. Mochi 1 Preview app
10. Hunyuan Video
11. Wan 2.1 app
12. InstantMesh
13. TripoSR
14. Wonder3D
15. Meshy workflow bridge
16. ImageBind demo app
17. Segment Anything Studio
18. Grounded SAM workstation
19. OCR + captioning studio
20. Diffusers playground

### Lô 4 — Ứng dụng giọng nói / âm thanh / agent (15)
1. Open WebUI Pipelines
2. LibreChat
3. OpenHands
4. STT server (Whisper/FastAPI)
5. WhisperX workstation
6. Parler TTS Studio
7. F5 TTS app
8. CosyVoice Studio
9. MeloTTS Studio
10. VoiceCraft lab
11. RVC voice conversion
12. Live transcription hub
13. Audio agent console
14. Browser-use workstation
15. AgentOps starter

### Lô 5 — Ứng dụng RAG / workflow / doanh nghiệp (15)
1. Dify
2. Ragflow
3. OpenWebUI RAG preset
4. LlamaIndex starter
5. Haystack studio
6. GraphRAG workstation
7. Docling pipeline
8. AnythingLLM enterprise preset
9. Flowise RAG preset
10. Langflow RAG preset
11. OpenSearch AI assistant
12. Milvus assistant stack
13. Qdrant assistant stack
14. Neo4j knowledge graph agent
15. Jupyter AI lab

### Lô 6 — Runtime cục bộ / gateway (16)
1. Ollama base runtime presets
2. llama.cpp server
3. SGLang runtime
4. TensorRT-LLM API gateway
5. TGI runtime
6. Aphrodite engine
7. LM Studio bridge
8. Jan runtime bridge
9. VLLM multi-model gateway
10. LiteLLM proxy
11. OpenRouter-compatible proxy
12. FastChat runtime
13. Text Embeddings Inference
14. Infinity embeddings runtime
15. rerank server
16. OmniRoute là một AI gateway cho LLM đa nhà cung cấp: một endpoint tương thích OpenAI với định tuyến thông minh, cân bằng tải, thử lại và dự phòng. Thêm policy, giới hạn tốc độ, caching và observability để có suy luận tin cậy, tối ưu chi phí.

## Tổng số mục dự kiến bổ sung
- 106 mục registry ứng viên.

## Thứ tự triển khai đề xuất
1. Lô 1: làm sâu catalog vLLM hiện tại.
2. Lô 2: mở rộng độ phủ đa phương thức và banner VLM chuyên biệt.
3. Lô 3: mở rộng các danh mục pipeline sáng tạo.
4. Lô 4: hoàn thiện các bề mặt giọng nói và agent.
5. Lô 5: thêm các stack tri thức doanh nghiệp và workflow.
6. Lô 6: hoàn thiện hệ sinh thái runtime và gateway.

## Rủi ro cho người rà soát
- Hơn 100 mục được nghiên cứu đầy đủ sẽ cần kiểm chứng nguồn theo từng giai đoạn cho mỗi nhóm.
- Một số model có thể ưu tiên TensorRT-LLM hoặc Ollama thay vì vLLM; sự phù hợp của runtime phải được xác nhận theo từng recipe.
- UX catalog không nên lộ quá nhiều danh mục cùng lúc nếu chưa có cải tiến về nhóm hoặc tìm kiếm.
- Việc tạo banner nên dừng ở cấp nhóm, không phải riêng lẻ theo từng model, để giữ tài sản dễ bảo trì.

## Lát triển khai tiếp theo
Lát tiếp theo được khuyến nghị: chỉ Lô 1, với 15 đến 20 nhóm vLLM cùng các cập nhật danh mục và banner cần thiết.
