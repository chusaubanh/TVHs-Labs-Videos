# THANH VINH VIDEO PIPELINE — SỔ BỘ NHỚ QUYẾT ĐỊNH KIẾN TRÚC (DECISIONS.md)
> **External Brain:** Nơi lưu trữ vĩnh viễn mọi quyết định kiến trúc, quy tắc đã chốt, bài học sự cố và thỏa thuận dữ liệu. Tuyệt đối không để trôi trong chat.

---

## 1. NHẬT KÝ QUYẾT ĐỊNH KIẾN TRÚC (ARCHITECTURAL DECISIONS)

| Ngày chốt | Hạng mục / Quyết định | Nội dung chi tiết | Nơi lưu trữ / Cổng đo |
| :---: | :--- | :--- | :--- |
| **27/10/2026** | **Chuẩn ngôn ngữ hệ thống** | File hướng dẫn hệ thống (`CLAUDE.md`, `AGENTS.md`) viết bằng tiếng Anh để tiết kiệm token và tối ưu Prompt Cache; toàn bộ giao tiếp với User và deliverables đầu ra (kịch bản, transcript, video) luôn luôn bằng tiếng Việt. | `AGENTS.md`, `CLAUDE.md` |
| **27/10/2026** | **Tối ưu hóa Context (<30 dòng)** | Chưng cất `AGENTS.md` và `CLAUDE.md` về đúng 20 dòng chuẩn Canonical 4 khối. Di dời multi-agent sang `docs/MULTI_AGENT_MODEL.md` và gate rules sang `docs/PIPELINE_GATES_AND_RULES.md`. Giữ Prompt Cache 90%. | `AGENTS.md`, `CLAUDE.md`, `docs/` |
| **27/10/2026** | **Cờ Terminal im lặng** | Thay thế toàn bộ lệnh test sang `npm test -- --bail=1 --reporter=dot` để tránh tràn output >30k ký tự vào context. | `CLAUDE.md`, `AGENTS.md` |
| **23/10/2026** | **Kiểm tái diễn sự cố Rule** | Đánh giá số lỗi do người dùng phát hiện ở video dựng sau 09/10/2026 (mục tiêu: 0 lỗi). | `src/render/rule-gates.canary.test.ts` |
| **22/10/2026** | **Quy trình Chế độ C (Talking Head)** | Dựng từ clip quay thật. Giọng gốc (không TTS, không `pipeline.mjs`). Dãy 22 bước nghiêm ngặt. Duyệt qua `th:approve`, editor web localhost, xuất bằng `th:render`. | `docs/CHE-DO-C-SPEC.md`, `SKILL.md` |
| **15/10/2026** | **Ngoại lệ nhịp đọc chậm** | Video tư duy sâu: `speed: 1.0`, `sentenceGapSec: 0.6`. Mặc định các video khác: `speed: 1.1`, gap: 0.12s. | `script.json -> voice` |
| **13/10/2026** | **Phân tầng Model Opus-Sonnet-Haiku** | Opus (C-level: brief & kiểm MẮT), Sonnet (Manager: lập plan & phiếu việc), Haiku (Thực tập sinh: thi công đúng phiếu). | `docs/MULTI_AGENT_MODEL.md` §2b |
| **09/10/2026** | **Khung thiết kế chuẩn & Tự vấn 5 Why** | Mọi video dùng chung `_tvhs_scene.mjs` + `_tvhs_art.mjs`. Cấm template catalog generic. Bắt buộc 5 Why dạng bảng khi xảy ra lỗi. | `docs/PIPELINE_GATES_AND_RULES.md` |
| **08/10/2026** | **Chuẩn cảnh theo Video Wiki** | 8–14 cảnh / video 3 phút; 10–17s/cảnh; $\ge 25$ chi tiết SVG/cảnh; cấm hộp viền rỗng ruột. | `SKILL.md`, `docs/MULTI_AGENT_MODEL.md` |
| **30/09/2026** | **Ba Chế Độ Nội Dung & Cổng thời lượng** | Chế độ A (Học liệu: chỉ dùng tin trong tài liệu, đánh giá 3 phút đủ không, nếu không đủ phải trình phương án tách qua `lengthDecision`); Chế độ B (Bài viết AI: viết mới); Chế độ C (Talking head). | `SKILL.md` |
| **28/09/2026** | **Soát lỗi chính tả & Hợp đồng câu-hình** | Lỗi chính tả không được đến tay người duyệt. 1 câu thoại = 1 `voiceSegments` = 1 nhịp hình SVG. | `scripts/scene-kit/`, `sync-check.md` |

---

## 2. NGUYÊN TẮC CONTEXT HYGIENE DÀNH CHO AGENT TRONG REPO NÀY

1. **Quy tắc Atomic Session:**
   - Mỗi phiên làm việc chỉ tập trung giải quyết 1 mục tiêu cụ thể (ví dụ: viết dàn ý, viết kịch bản, dựng 1 bộ cảnh, sửa lỗi test).
   - Khi hoàn thành mục tiêu, thông báo User gõ `/clear` để reset sạch context, tránh hiện tượng Attention Dilution (suy thoái ngữ cảnh).

2. **Quy tắc Cố định Model & Giữ Prompt Cache:**
   - Phiên bắt đầu bằng model nào (ví dụ: Gemini 3.8 Flash / Claude Opus 5.5 / Sonnet 5.5) thì giữ nguyên trong suốt phiên đó.
   - Không chuyển đổi model hoặc thay đổi thinking effort giữa chừng để bảo toàn 100% prefix cache (tiết kiệm 90% chi phí & tăng tốc độ sinh token).
   - Tuyệt đối không chạy lệnh `/compact` (tránh mất 47% – 95% các quy tắc nghiệp vụ).

3. **Quy tắc Terminal Quiet Mode:**
   - Mọi lệnh terminal trong repo bắt buộc dùng cờ tóm tắt:
     * Kiểm tra nhanh: `npm test -- --bail=1 --reporter=dot`
     * Kiểm tra bác sĩ: `npm run doctor`
     * Git: `git log -n 5 --oneline` | `git status -s`
     * Không in full log render/ASR ra console, ghi ra file `scratch/*.log` rồi dùng lệnh lọc dòng cần đọc.
