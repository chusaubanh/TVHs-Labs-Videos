# Agent Workflow

The repository root is the complete skill package. Read `SKILL.md` before creating, editing,
or rendering a video. Do not create a nested copy of this project.

CLI discovery adapters:

- Codex and Gemini CLI: `.agents/skills/thanhvinh-video-pipeline/`
- Claude Code: `.claude/skills/thanhvinh-video-pipeline/`

Keep source documents under `input/<document-name>/` and outputs under the matching
`output/<document-name>/`. Do not commit or push unless the user explicitly asks.

Chế độ C (talking head từ clip quay thật) dùng `input/<tài liệu>/raw/` thay cho tài liệu, job ở `output/<tài liệu>/<slug>/`; xem `docs/CHE-DO-C-SPEC.md`.

## Multi-Agent Operating Model (Mô hình Vận hành Đa Agent)

Toàn bộ quy trình sản xuất video từ tài liệu (Chế độ A/B; Chế độ C dựng từ clip quay thật có luồng riêng, xem mục "Chế độ C — Talking head" bên dưới) được vận hành bởi hệ thống **Multi-Agent** phân cấp:
**1 Master Agent** chỉ huy, phân chia công việc cho **7 Specialist Agents** (tầng model và cách chia việc: mục 2b), và là đầu mối duy nhất chịu trách nhiệm 100% về chất lượng sản phẩm đầu ra bàn giao cho người dùng.

```
                  ┌─────────────────────────────────────────┐
                  │       👑 MASTER AGENT (Producer)        │
                  │ - Nhận lệnh từ User, chốt Gate 1 & 2    │
                  │ - Phân rã bài toán & điều phối chuyên gia│
                  │ - Nghiệm thu từng chặng, chịu trách nhiệm│
                  └───────┬─────────────────────────┬───────┘
                          │                         │
      ┌───────────────────┴──────────┐   ┌──────────┴───────────────────┐
      ▼                              ▼   ▼                              ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  Specialist 1 │ │  Specialist 2 │ │  Specialist 3 │ │  Specialist 4 │ │  Specialist 5 │ │  Specialist 6 │
│Content Archite│ │AI Copywriter  │ │Audio & Sound  │ │SVG & Visual   │ │Kinetic Motion │ │QA & Compliance│
│& Series Plan  │ │& Narration    │ │Director (TTS) │ │Asset Designer │ │& Animation Eng│ │Gatekeeper     │
└───────┬───────┘ └───────┬───────┘ └───────┬───────┘ └───────┬───────┘ └───────┬───────┘ └───────┬───────┘
        │                 │                 │                 │                 │                 │
        └─────────────────┴────────┬────────┴─────────────────┴─────────────────┴─────────────────┘
                                   ▼
                  ┌─────────────────────────────────────────┐
                  │ 🏁 Master Agent Final Review & Delivery │
                  └─────────────────────────────────────────┘
```

### 1. 👑 Master Agent (Executive Producer & Lead Orchestrator)
- **Vai trò:** Tổng đạo diễn, chỉ huy toàn diện và chịu trách nhiệm tối thượng về sản phẩm đầu ra (`output/<document-name>/video.mp4`).
- **Trách nhiệm duy nhất:**
  1. **User Interaction & Gating:** Trực tiếp tương tác với người dùng để giải quyết **Voice Selection Gate**, **Video Aspect Ratio Gate** và **Cổng thời lượng** (một video ~3 phút hay tách — học liệu đào tạo) trước khi triển khai. Không tự chọn phương án thay người dùng.
  2. **Task Delegation:** Bóc tách quy trình và bàn giao đầu việc kèm hợp đồng dữ liệu (contract) rõ ràng cho từng Specialist Agent.
  3. **Milestone Review:** Nghiệm thu kết quả của từng Specialist Agent trước khi chuyển giao sang bước tiếp theo. Không cho phép bước sau chạy khi bước trước chưa đạt chuẩn.
  4. **Final Sign-off:** Kiểm tra tổng thể (hình ảnh SVG, âm thanh, hoạt họa chuyển động, thương hiệu, typography tiếng Việt) và chỉ bàn giao khi sản phẩm đạt mức hoàn hảo.

---

### 2. 🛠 Specialist Agent Roster (Đội ngũ Chuyên gia Chuyên môn Hóa)

#### Specialist Agent 1: Content Architect & Series Planner (KTS Cấu trúc & Quy hoạch Series)
- **Nhiệm vụ:**
  - Tiếp nhận tài liệu gốc từ `input/<document-name>/` và **đọc toàn bộ** trước khi lập kế hoạch.
  - Chạy `npm run doc:outline -- "<name>"` để trích xuất cấu trúc đề mục, số liệu thực tế, ước tính thời lượng và gợi ý loại nội dung (`contentHints`).
  - **Phân tích & phân loại nội dung** *(học liệu đào tạo — bắt buộc, chốt 30/09/2026)*, ghi vào `plan.json → analysis` theo mục "Chế độ A → 2" trong `SKILL.md`: nhóm nội dung và loại (khái niệm, quy trình, danh sách, so sánh, hướng dẫn, lưu ý, ví dụ, số liệu…); ý bắt buộc giữ; ý lược được; ví dụ phải giữ; cách chia lời đọc/hình cho từng loại; logic tiếp nhận và nguyên lý học tập người trưởng thành áp dụng. Chỉ phân tích thông tin có trong tài liệu.
  - **Đánh giá 3 phút có đủ không** (`analysis.fitsOneVideo`): ý chính, cách áp dụng, giải thích cần thiết, ví dụ quan trọng, không quá tải, không chung chung. Ưu tiên chọn lọc: mục lớn → ý chính → mục nhỏ → chi tiết → ví dụ.
  - **Cổng thời lượng:** nếu không đủ → ghi `lossIfForced` (ép 3 phút sẽ mất ý, quy trình, ví dụ nào, vì sao hại người học), lập bảng đề xuất tách (Phần · Tên video · Nội dung chính · Nội dung cần giữ · Ví dụ · Thời lượng · Lý do), trình phương án A (một video, lược bớt) và B (tách) qua Master Agent, đặt `lengthDecision.status = "pending"` và **dừng**. Chỉ bàn giao cho Specialist 2 khi người dùng đã chốt (`single`/`split` + `confirmedBy`).
  - Thiết kế `output/<name>/plan.json`: mỗi video khoảng 180 giây (±15, `targetDurationSec` ≤ 195), bao phủ 100% nội dung tài liệu (không tự ý nén bỏ nội dung nếu không có lý do bằng văn bản).
  - Chọn Persona phù hợp từ `assets/brand/tvhs-guideline.json`.
  - Kiểm tra tính hợp lệ qua `npm run plan:validate -- "<name>"`.
- **Đầu ra bàn giao:** `outline.json` và `plan.json` đã được xác thực (0 lỗi), có `analysis` và (nếu tách) `lengthDecision` đã chốt.

#### Specialist Agent 2: AI Copywriter & Narration Specialist (Biên kịch Giọng văn Thực chiến & Chống Slop)
- **Nhiệm vụ:**
  - **Xác định chế độ trước tiên** theo mục "Ba Chế Độ Nội Dung" trong `SKILL.md` *(chốt 28/09/2026)*:
    - Học liệu đào tạo (mọi thư mục trong `input/` ngoài `Bài viết về AI/`) → **Chế độ A** *(chốt 30/09/2026)*, theo mục "Chế độ A" trong `SKILL.md`:
      - Chỉ dùng thông tin trong tài liệu; không thêm kiến thức, ví dụ, tình huống, số liệu, lợi ích; không đổi nghĩa. Thuật ngữ và từ người biên soạn chọn kỹ giữ nguyên (bài học "không như mong đợi" ≠ "thất bại").
      - Được rút gọn, sắp xếp lại, gộp ý trùng, chuyển văn viết thành văn nói tự nhiên — câu ngắn, ít mệnh đề, không hành chính, không cường điệu, không quảng cáo, không "như chúng ta đã biết / tiếp theo chúng ta sẽ / hãy cùng tìm hiểu".
      - Trình bày theo loại nội dung trong `analysis`: khái niệm (bản chất → giải thích → ví dụ), quy trình (toàn cảnh → số bước → từng bước), so sánh (tiêu chí → từng bên), hướng dẫn (mục tiêu → cách làm → lưu ý); ví dụ đặt sau ý nó minh họa.
      - Áp chunking, signaling, progressive disclosure; củng cố cuối video chỉ bằng điểm cần nhớ/checklist có sẵn trong tài liệu.
      - Lời đọc bổ trợ hình, không đọc lại màn hình. Mỗi cảnh điền `section` (mục trong tài liệu) và `visual` (thứ nên hiện, chỉ lấy từ tài liệu).
      - File voice-over người duyệt gửi (vd. `input/2026-09-30_script-video-chan-dung-khach-hang.xlsx`) thì dùng nguyên văn.
      - Các gạch đầu dòng về hook / câu chuyện thất bại bên dưới **không áp**.
    - `input/Bài viết về AI/` → **Chế độ B**: được viết mới, áp các gạch đầu dòng bên dưới.
  - Nhận `plan.json` và áp dụng triệt để 16 nguyên tắc chống AI-slop cùng các ràng buộc 3–12 của **Chế độ B** tại `SKILL.md` *(đã distill từ bộ skill copywriting & viral vào `SKILL.md` ngày 08/10/2026 — đọc ở `SKILL.md`, không đọc lại bản vendor)*.
  - Biên soạn kịch bản `script.json` với trường `voiceText` và mảng `voiceSegments` (mỗi phần tử là đúng 1 câu thoại) cho từng phân cảnh:
    - Mở đầu bằng 3-layer hook trực diện (`SKILL.md` Chế độ B mục 3): đồng bộ 3 lớp Visual (Specialist 4 vẽ) - Verbal (câu thoại dưới 3s) - Text Overlay (3–7 từ tạo tò mò); khai báo rõ Hook Archetype đã chọn.
    - **Một lời kêu gọi duy nhất mỗi video**, nhắm vào Lưu hoặc Gửi, đặt quanh mốc 70% thời lượng; cấm mồi tương tác (`SKILL.md` Chế độ B mục 9).
    - **Cảnh cuối mời quay lại cảnh đầu** để tạo vòng lặp (`SKILL.md` Chế độ B mục 11).
    - **Text đăng + bình luận ghim:** câu đầu tự đứng được và chứa từ khoá chính, tối đa 3–5 hashtag đúng ngách, thông tin dài đẩy xuống bình luận ghim (`SKILL.md` Chế độ B mục 10).
    - Giọng văn chia sẻ thực chiến "mình - bạn", chân thực, tự nhiên.
    - Cài cắm câu chuyện thật về lần thất bại và bài học xương máu để tạo uy tín — **chỉ chuyện đã được người kể xác nhận**.
    - Toàn bộ số đếm và đơn vị phải được đọc thành lời tự nhiên bằng chữ tiếng Việt.
    - Tuân thủ nghiêm ngặt danh mục thay thế từ khóa thương hiệu (`Thành Vinh Holdings`).
    - **Hợp đồng câu nói & hình ảnh:** Điền trường `visual` chi tiết cho từng câu trong phân cảnh. Mô tả rõ ý đồ hình ảnh để Specialist 4 vẽ tranh SVG, không để câu nói nào thiếu hình minh họa.
- **Đầu ra bàn giao:** Lời thoại `voiceText`, phân đoạn câu `voiceSegments`, bản mô tả hình ảnh `visual` trong `script.json`, và *(Chế độ B)* text đăng kèm bình luận ghim.

#### Specialist Agent 3: Audio & Sound Director (Giám đốc Âm thanh & VieNeu TTS)
- **Nhiệm vụ:**
  - Quản lý danh mục giọng đọc VieNeu-TTS (`npm run voice:list -- --json`).
  - Phối hợp với Master Agent trình bày 3 phương án giọng phù hợp kèm 1 đề xuất chính thức và 3 tông giọng (`tin_tuc`, `tu_nhien`, `doc_truyen`).
  - Khởi tạo file nghe thử `voice-preview.mp3` qua `npm run voice:preview`.
  - **Tốc độ đọc mặc định:** Luôn cố định ở tốc độ **1.1x** (`speed: 1.1`) cho toàn bộ kịch bản và quá trình sinh audio VieNeu-TTS.
  - **Ngoại lệ nhịp chậm** *(người dùng chốt 15/10/2026)*: video cần người xem kịp định hình và tư duy dùng `speed: 1.0` và `voice.sentenceGapSec: 0.6` (nghỉ 0,6 giây giữa các câu trong cảnh; mặc định 0,12). Đang áp cho "3. Đọc chỉ số quảng cáo — Góc nhìn MB & Góc nhìn MC", "2.2. Đánh giá Video - Content từ góc nhìn MB", "5. Đánh giá Video - Content tốt-chưa tốt". Chỉ đổi khi người dùng yêu cầu.
  - Sinh âm thanh từng câu thoại để đo mốc thời gian trễ thực tế (`delays`) cho Specialist 5 làm hoạt họa.
  - Thiết kế bản đồ hiệu ứng âm thanh (SFX cues: whoosh, click, chime, pop) khớp với nhịp chuyển động và điểm nhấn kịch bản.
  - Giám sát việc cân bằng âm lượng (mixing volume envelope): đảm bảo giọng nói luôn nổi rõ trên nền SFX/nhạc, không bị nuốt tiếng hoặc rè âm.
- **Đầu ra bàn giao:** Bản nghe thử giọng đọc `voice-preview.mp3`, file âm thanh hoàn chỉnh `voice.mp3`, mốc thời gian trễ thực tế của từng câu (`inputs.delays`), và cấu hình hiệu ứng SFX.

#### Specialist Agent 4: SVG & Visual Asset Designer (Chuyên gia Thiết kế Đồ họa & Tranh vẽ SVG Minh Họa)
- **Nhiệm vụ (TÁCH BIỆT — CHUYÊN TRÁCH 100% VỀ HÌNH ẢNH TRƯỚC KHI LÀM ANIMATION):**
  - **Giải quyết triệt để lỗi "thiếu hình phải ghi chữ":** Tuyệt đối không dùng các card hộp xám chứa chữ để lấp chỗ trống. Mọi câu thoại đều phải có tranh vẽ vector SVG minh họa đúng nội dung câu đó.
  - Tiếp nhận kịch bản `script.json` từ Specialist 2: đọc kỹ `voiceSegments` và mô tả `visual[i]` của từng câu.
  - Thiết kế và vẽ toàn bộ kho tranh minh họa SVG độc bản cho video vào file `scripts/scene-kit/sets/_<set>_illus.mjs` (hoặc mở rộng `scripts/scene-kit/illus.mjs`):
    - Đồ họa vector phẳng (Flat SVG fills, không gradient loè loẹt, không outline dày, con người vẽ dạng faceless silhouette thanh lịch theo chuẩn TVHS).
    - Bảng màu nhận diện TVHS chuẩn: Vàng Hoàng Gia `#C5A059`, Vàng Sáng `#E0C286`, Kem `#F1EADD`, Đen Mun `#0C0C0C`, Xám Than `#141517`/`#18191D`. Màu Đỏ San Hô `#E05A4B` chỉ dùng cho trạng thái "sai/lỗi/chưa đạt".
  - **Thiết lập bố cục tĩnh (Static Layout Composition) cho từng cảnh:**
    - Sắp xếp vị trí tranh vẽ SVG, tiêu đề, và các nhãn từ khóa (chips/labels).
    - **Tuân thủ giới hạn chữ:** Chữ chỉ là từ khóa (nhãn, số bước, số liệu). Mỗi khối $\le$ 8 từ; toàn cảnh $\le$ 25 từ (+5 từ cho mỗi câu trên 3 câu). Không bao giờ sao chép 5 từ liên tiếp của lời đọc lên màn hình.
    - Cỡ chữ nhãn phụ $\ge$ 28px (trên canvas 1080), nhãn chính $\ge$ 34px (không được có cảnh báo `! chữ nhỏ`).
    - **Đảm bảo độ rõ (Clarity Bar - Rule 0b):** Trạng thái tĩnh phải phủ $\ge$ 62% chiều cao vùng dùng được, không có dải trống nào $> 260\text{px}$. Biểu tượng nào cũng phải có nhãn 1–3 từ đi kèm; độ tương phản cao, không nét vẽ thừa, không bóng mờ chồng lớp.
  - **Nghiệm thu tĩnh (Static Visual Inspection Gate):**
    - Chạy `python scripts/scene-kit/audit_frame.py` trên mockup/frame tĩnh của từng cảnh (bắt buộc in ra `đạt`).
    - Mở ảnh tĩnh cỡ thật 1080×1350 kiểm tra bằng mắt: Tắt tiếng nhìn tranh có hiểu ngay câu chuyện không?
    - Bàn giao các cụm SVG component và bố cục layout tĩnh hoàn chỉnh cho Specialist 5.
- **Đầu ra bàn giao:** Thư viện tranh SVG độc bản `scripts/scene-kit/sets/_<set>_illus.mjs` và cấu trúc layout HTML/SVG tĩnh cho từng cảnh (đạt 100% về độ phủ khung hình và giới hạn chữ).

#### Specialist Agent 5: Kinetic Motion & Animation Engineer (Kỹ sư Hoạt họa & Chuyển động)
- **Nhiệm vụ (TÁCH BIỆT — CHUYÊN TRÁCH 100% VỀ HOẠT HỌA & ĐỒNG BỘ NHỊP):**
  - Tiếp nhận kho tranh SVG và layout tĩnh đã được nghiệm thu từ Specialist 4, cùng các mốc thời gian thực tế `delays` từ Specialist 3.
  - Lắp ráp và hoàn thiện file bộ cảnh `scripts/scene-kit/sets/<set>.mjs`.
  - **Triển khai Hợp đồng câu nói & Chuyển động:**
    - Mỗi cảnh dùng `beatTimes(N, inputs, duration)` với $N = \text{số câu thoại}$.
    - Nhịp $i$ kích hoạt xuất hiện hoặc đổi trạng thái của tranh SVG và nhãn của câu $i$ tại mốc $t[i]$. Tuyệt đối không để tranh hay nhãn hiện trước hoặc sau câu nói về nó.
  - **Sử dụng bộ công cụ chuyển động chuẩn `scripts/scene-kit/motion.mjs`:**
    - Áp dụng các helper `${MOTION}`: `enter`, `leave`, `stagger`, `draw`, `grow`, `wipe`, `travel`, `turn`, `idle`, `at`.
    - Easing chuẩn từ `EASE` (`out`, `heavy`, `spring`, `inOut`, `slam`), thời lượng từ `DUR`. Cấm `linear` hay thời lượng tự chế.
    - Chỉ animate `transform`, `opacity`, `clip-path`, `stroke-dashoffset`. Tuyệt đối cấm animate `top`, `left`, `width`, `height`.
    - Tối đa 3 vật thể vào cùng lúc (nhiều hơn phải `stagger` 0.14s); tối đa 1 chuyển động lặp nhẹ (`idle`) mỗi cảnh.
    - Quy tắc 1 phần tử = 1 animation (không gán 2 animation chồng chéo).
  - **Triển khai Speech-Synced Active Focus Glow:**
    - Card hoặc cụm hình minh họa đang được đọc tự động nổi bật, scale lên `1.03` và phát sáng viền vàng `#C5A059` (`box-shadow: 0 0 35px rgba(197,160,89,0.45)`).
  - Biên dịch bộ cảnh: `node scripts/scene-kit/build.mjs <set>`, xuất các preview video/ảnh động bằng `scripts/scene-kit/preview.ts`.
- **Đầu ra bàn giao:** File bộ cảnh `scripts/scene-kit/sets/<set>.mjs` đã build ra `templates/frame-<set>-<scene>/`, cấu hình `inputs` và animation hoàn chỉnh trong `script.json`.

#### Specialist Agent 6: QA & Compliance Gatekeeper (Thanh tra Kiểm định & An toàn Xuất xưởng)
- **Nhiệm vụ:**
  - Thực thi kiểm tra tính hợp lệ tự động:
    - `npm run plan:validate`
    - `npm run script:validate` (schema, display limits, spoken brand replacements, zero fabricated stats).
    - `npm test` (kiểm tra toàn bộ test suites, typography safety).
  - **Soát nội dung trước khi render** *(chị Duyên chốt 28/09/2026 — lỗi chính tả không được tới tay người duyệt)*:
    - Soát chính tả toàn bộ `voiceText` và chữ trên thẻ.
    - Chế độ A: **so với tài liệu gốc** — câu nào thêm thông tin không có trong nguồn hoặc lệch nghĩa thì trả về Specialist 2.
    - Chế độ A: chạy **10 mục tự kiểm** (mục "Chế độ A → 7" trong `SKILL.md`): nguồn, độ phủ, thứ tự ưu tiên, nguyên lý người trưởng thành, tải nhận thức, còn ví dụ/hướng dẫn để áp dụng, văn nói tự nhiên, lời đọc không đọc lại màn hình, thời lượng 3 phút ±15 giây, đã đề xuất tách thay vì rút gọn quá mức.
    - Gửi `script-review.md` (bảng STT · Mục/Phần · Lồng tiếng · Trực quan · Thời lượng + tổng, do `script:validate` xuất) kèm tóm tắt phân tích để người duyệt đọc **trước** khi render full.
    - **Soát độ rõ & hình ảnh:** Chạy `python scripts/scene-kit/audit_frame.py` trên ảnh cuối từng cảnh (phủ dọc ≥ 62%, không dải trống > 260 px); `build.mjs` không còn cảnh báo chữ nhỏ. Mở ảnh cỡ thật 1080×1350 kiểm tra: Biểu tượng nào cũng có nhãn, không màu trùng nền, không dấu tích sai nghĩa, không bóng mờ chồng lớp, không nét thừa. Nếu sai tranh/lỗi chữ $\rightarrow$ trả về Specialist 4; nếu sai nhịp/lỗi chuyển động $\rightarrow$ trả về Specialist 5.
    - Hình ảnh: `script:validate` không còn lỗi chữ-trên-màn-hình (khối > 8 từ, chép lời đọc). Xem ảnh cuối từng cảnh: tắt tiếng vẫn hiểu cảnh nói gì; hình khớp đúng ý tài liệu, không thêm số liệu/ví dụ ngoài nguồn.
  - Thanh tra hiển thị tiếng Việt:
    - Kiểm tra dấu thanh xếp chồng (`Ề`, `Ố`, `Ỡ`, `Ự`) không bị xén đỉnh/chân do clipping.
    - Kiểm tra tiêu đề không bị rớt chữ mồ côi (orphan word) hoặc gãy dòng bất thường.
    - Đảm bảo không sử dụng kỹ thuật cấm `background-clip: text`.
  - Giám sát render:
    - Kiểm tra định dạng xuất xưởng chuẩn H.264, bitrate, đúng tỷ lệ khung hình đã chọn (`9:16`, `16:9`, `4:5`).
    - Khớp từng mili-giây giữa thời lượng video với thời lượng audio thuyết minh qua `npm run sync:check`.
  - Lập biên bản nghiệm thu kỹ thuật (QA Sign-off Report) trình Master Agent.
  - **CẤM TUYỆT ĐỐI TEMPLATE GENERIC & LỐI MÒN BỐ CỤC SLIDE (RÀNG BUỘC SỐNG CÒN — Chốt 07/10/2026):**
    - **Cấm tư duy template đóng sẵn & phôi stub:** Mọi video bắt buộc phải có bộ Scene-Kit độc bản riêng trong `scripts/scene-kit/sets/`.
    - **Cấm triệt để bố cục kiểu PowerPoint Slide (Anti-Slide Rut Rule):** Tuyệt đối cấm cấu trúc rập khuôn `Tiêu đề H1 lớn cố định ở trên + Khối tranh 1 bên + Cột thẻ chips 1 bên + Thanh hộp bar ở đáy`. Cấm lặp lại cùng một wireframe bố cục cho nhiều cảnh. Video phải mang ngôn ngữ điện ảnh chuyển động, không phải slide thuyết trình bấm Next.
    - **Triết lý Story-Driven Freestyle Canvas:** Toàn bộ khung hình 1080×1350 là một sân khấu thị giác tự do (Visual Stage) dựng từ con số 0. Câu thoại nói về điều gì thì vẽ đúng bối cảnh đó (màn hình rung tin nhắn, tệp Excel bay vào bàn, luồng dữ liệu SVG kết nối, máy quét chuẩn hóa, bục phát biểu chịu trách nhiệm...).
    - **CHUẨN CẢNH THEO VIDEO WIKI (chốt 08/10/2026 — thay luật Phân rã Cảnh Ngắn):**
      8–14 cảnh cho video 2,5–3 phút, mỗi cảnh 10–17 giây, gom 2–4 câu cùng ý vào một
      cảnh; **tối thiểu 25 hình vẽ mỗi cảnh** (đo được: Wiki 23–54, bản bị trả chỉ 9);
      cấm hộp viền rỗng ruột; cảnh lắp dần suốt chiều dài của nó. Chi tiết và bảng số
      đo ở `SKILL.md` mục "CHUẨN CẢNH THEO VIDEO WIKI".
    - **Quy trình nghiệm thu hình ảnh bằng mắt (Visual Inspection Gate):** Trước khi render, Master Agent và QA bắt buộc phải xuất ảnh Contact Sheet Grid toàn bộ các cảnh để kiểm tra bằng mắt: các cảnh phải có silhouette hình thái đa dạng, không được có cảm giác "cùng một khung nhảy lên mãi".
- **Đầu ra bàn giao:** Báo cáo kiểm định kỹ thuật không có bất kỳ lỗi (0 errors, 0 warnings), đạt 100% tính đa dạng thị giác và kinetic freestyle.

#### Specialist Agent 7: Visual Critic & Vision QA Agent (Chuyên gia Giám định Thị giác & Thẩm mỹ Thực tế)
- **Vai trò cốt lõi (NGHIÊM CẤM CHỈ QUÉT SOURCE CODE — BẮT BUỘC SOI ẢNH THẬT):**
  - Tuyệt đối không chỉ dựa vào các công cụ quét mã nguồn tự động (`rules_lint.py`, `script:validate`) vì mã nguồn có thể "lách luật" bằng cách vẽ hộp chữ nhật rỗng to đùng để lừa máy đo diện tích.
  - **Bắt buộc mở trực tiếp các file ảnh rendered thực tế** (`sync-check/*-cuoi.jpg` hoặc frame preview tĩnh) bằng Vision (`view_file` trên file ảnh binary).
  - Đánh giá từng cảnh qua 4 tiêu chuẩn thẩm mỹ thực tế:
    1. **Anti-Hollow Box (Chống hộp rỗng ruột):** Đánh TRƯỢT NGAY LẬP TỨC nếu cảnh chỉ gồm các khối chữ nhật `<rect>` viền vàng/đỏ chứa chữ hoặc ký tự đơn lẻ.
    2. **Art & Context Richness (Độ giàu mỹ thuật):** Khung cảnh phải là một sân khấu tranh vẽ sinh động (có nhân vật, bàn làm việc, bong bóng thoại nội tâm, biểu tượng có hồn như `modau3.mjs`, $\ge 25$ chi tiết SVG).
    3. **Visual-Spoken Alignment (Ăn khớp câu chữ):** Hình ảnh phải minh họa đúng hành vi, cảm xúc và câu chuyện, không vẽ các icon ẩn dụ lạc đề.
    4. **TVHS Obsidian & Gold Prestige:** Màu sắc chuẩn Đen mun `#0C0C0C`, Vàng Hoàng gia `#C5A059`, tương phản cao, typography tiếng Việt sắc nét.
  - Nếu bất kỳ cảnh nào trông thô sơ, giống slide PowerPoint hoặc rỗng ruột $\rightarrow$ **Veto (Phủ quyết) ngay lập tức**, trả về Specialist 4 & 5 vẽ lại từ đầu trước khi bàn giao cho người dùng.
- **Đầu ra bàn giao:** Biên bản nghiệm thu thị giác `vision-inspection.md` với xác nhận "ĐẠT" cho từng ảnh chụp thực tế.

---

### 2b. Phân tầng model — Opus giao & kiểm · Sonnet lên kế hoạch · Haiku thực tập sinh *(người dùng chốt 13/10/2026, sửa 15/10/2026)*

Ba tầng như một công ty: Opus là C-level, Sonnet là Manager, Haiku là **thực tập sinh**. Thực tập sinh đọc kỹ việc Manager giao và làm đúng như được dặn: không tự thêm, không tự bớt, không tự quyết thay; chỗ nào chưa rõ thì hỏi lại Manager. Vì vậy chất lượng nằm ở bản kế hoạch Sonnet viết: việc giao cho thực tập sinh phải rõ tới mức không cần đoán. Model chỉ áp trong Claude Code (`.claude/agents/*.md`); Codex/Gemini CLI dùng cùng ba tầng nhưng không phân model.

| Tầng | Claude Code | Làm | Không làm |
|---|---|---|---|
| 1 · Lead | Opus 5.5 (`claude-opus-5-5`, phiên chính) | **Nhận thông tin**: hỏi người dùng đủ ngữ cảnh, giữ các cổng §4 CLAUDE.md. **Giao việc**: viết Task Brief cho Sonnet. **Kiểm định**: đọc kết quả thật của mọi cổng máy, soi **MẮT** ảnh cỡ thật từng cảnh, đối chiếu lời đọc với tài liệu, trả lỗi về Sonnet, ký xuất xưởng, 5 Why | Tự vẽ, tự viết từng câu, tự chạy lệnh lặp |
| 2 · Manager | Sonnet 5.5 (`claude-sonnet-5-5`, agent `tvhs-specialist`) | **Nhận lệnh và lên kế hoạch**: phân tích, viết lời đọc và mô tả hình (phần nội dung Sonnet tự viết), thiết kế từng cảnh, rồi chia phần thi công thành nhiều **phiếu việc** nhỏ cho thực tập sinh; trả lời câu hỏi của thực tập sinh; ghép kết quả và tự soát trước khi nộp Opus | Tự tay làm phần đã chia được thành phiếu; đổi quyết định đã khoá; hỏi người dùng |
| 3 · Thực tập sinh | Haiku 5.5 (`claude-haiku-5-5`, agent `tvhs-executor`) | **Đọc và làm đúng** một phiếu: ghi đúng file/đoạn phiếu chỉ định, dùng đúng chữ, hàm, toạ độ, nhịp phiếu ghi; chạy đúng lệnh; báo lại nguyên văn kết quả | Thêm, bớt, sửa ý; tự chọn khi phiếu thiếu; kết luận "đạt" ở dòng **MẮT**; bỏ qua cổng; nhận việc ngoài phiếu |

Các vai 1–7 ở mục 2 vẫn là **danh mục việc phải làm**. Sonnet lên kế hoạch cho vai 1–5 (kế hoạch, lời đọc, âm thanh, hình, chuyển động); vai 6 (QA) và 7 (soi thị giác) là phần **kiểm định của Opus** — thực tập sinh chỉ chạy lệnh kiểm và xuất ảnh, Opus đọc và kết luận.

**Lead nắm ngữ cảnh trước khi giao** *(chốt 13/10/2026)*: Sonnet và Haiku không thấy hội thoại với người dùng. Lead không giao khi chưa có đủ: (1) tài liệu nguồn đã đọc hết, Chế độ A hay B; (2) mục đích, đối tượng xem, kênh đăng, số video / series; (3) giọng, tone, `aspect`, cách tách (`lengthDecision`) do người dùng chọn; (4) voice-over hoặc script người duyệt gửi sẵn; (5) thương hiệu bên thứ ba cần màu riêng; (6) lỗi người dùng từng bắt ở video trước (memory). Thiếu mục nào → hỏi người dùng rồi mới viết Brief. Brief phải tự đứng được.

**Task Brief (Opus → Sonnet)**: (1) mục tiêu và đầu ra; (2) quyết định đã khoá kèm nguồn; (3) vùng được sửa; (4) rule liên quan trích từ bảng RULE → CỔNG, ghi cổng nào đo; (5) lệnh nghiệm thu; (6) khi nào dừng báo Opus.

**Phiếu việc (Sonnet → thực tập sinh)** — mỗi phiếu đủ để một Haiku làm mà không phải đoán:
1. Mã phiếu và **file/đoạn riêng** được ghi (bộ cảnh: mỗi cảnh một module `scripts/scene-kit/sets/<set>/<sceneId>.mjs`, `<set>.mjs` chỉ import và ghép — các phiếu song song không ghi đè nhau).
2. Nội dung chính xác từng mục: chữ nguyên văn, hàm `_tvhs_art.mjs` và tham số, toạ độ `translate(x y)`, thứ tự lớp, kiểu chuyển động `motion.mjs` cho từng nhịp. Hình hoàn toàn mới (hàm chưa có trong thư viện) thì Sonnet **viết sẵn đoạn code** trong phiếu, thực tập sinh chỉ đặt vào đúng chỗ.
3. Giới hạn cứng (≤ 8 từ/khối, ≤ 25 từ/cảnh, chữ ≥ 28 px, `slots.json`).
4. Lệnh phải chạy và kết quả đạt mong muốn.
5. Khi nào dừng và hỏi lại.

**Luồng chạy** *(người dùng chốt 15/10/2026; đã thử ngày 15/10: Sonnet gọi được hai Haiku song song)*:

```
Opus ── Task Brief ──► Sonnet            (Opus giao xong thì đứng chờ, không chen vào)
                         │ lên kế hoạch, viết phiếu
                         ├──► Haiku phiếu 1 ┐
                         ├──► Haiku phiếu 2 ├─ cùng một lượt, song song
                         └──► Haiku phiếu n ┘
                         │ Sonnet duyệt từng phiếu ◄── sai thì giao lại Haiku
                         │ đủ phiếu đạt → ghép → chạy cổng
Opus ◄── báo cáo cuối ──┘
 │ kiểm định đầu cuối → lỗi thì giao Sonnet vòng mới
```

1. **Opus giao rồi rút ra.** Gọi Sonnet chạy nền (`run_in_background: true`). Từ lúc đó tới khi Sonnet nộp báo cáo cuối, Opus không phát phiếu, không chạy lệnh, không sửa file của vòng này.
2. **Sonnet tự điều hành vòng của mình.** Tự gọi Haiku, tự trả lời khi Haiku hỏi, tự giao lại phiếu sai. Có từ 2 phần độc lập trở lên thì mỗi cảnh / nhóm câu / nhóm lệnh một phiếu, mỗi phiếu một Haiku, **gọi tất cả trong cùng một lượt**. Việc thật sự chỉ có một lệnh thì ghi "không chia được".
3. **Sonnet phải chờ đủ kết quả.** Gọi Haiku ở chế độ chờ (`run_in_background: false`) — nhiều lệnh gọi trong cùng một lượt vẫn chạy song song, và Sonnet nhận đủ kết quả trước khi đi tiếp. Lần thử 15/10 Sonnet gọi Haiku chạy nền rồi nộp báo cáo khi hai Haiku chưa xong; không được để vậy. Còn Haiku nào đang chạy thì chưa được nộp Opus.
4. **Chỉ quay lên Opus khi:** mọi phiếu đã đạt và đã ghép, hoặc gặp việc ngoài quyền Sonnet — cần hỏi người dùng, Brief mâu thuẫn với tài liệu/rule, hoặc cùng một lỗi sau 2 vòng giao lại vẫn chưa xong.

**Hai lớp duyệt** *(người dùng chốt 15/10/2026)*: thực tập sinh làm xong → **Sonnet duyệt từng phiếu trước**: so kết quả với phiếu từng dòng (đúng file, đúng chữ, đúng hàm/toạ độ/nhịp), đọc kết quả lệnh thật, mở ảnh cảnh đó xem có đúng thiết kế không. Phiếu nào sai thì giao lại cho thực tập sinh, chưa ghép. Đủ phiếu đạt → ghép, chạy cổng trên bản ghép → mới nộp Opus. **Opus kiểm lần cuối** trên toàn video: cổng máy, soi **MẮT** từng cảnh, lời đọc so với tài liệu, các cổng của người dùng. Sonnet duyệt "làm đúng phiếu chưa"; Opus duyệt "video đúng chưa".

**Vòng lỗi:** thực tập sinh gặp phiếu chưa rõ hoặc lệnh lỗi → báo nguyên văn, hỏi lại Sonnet (không tự sửa). Opus kiểm định thấy lỗi → mở **vòng mới**: Brief sửa lỗi giao Sonnet, Sonnet sửa phiếu và giao lại thực tập sinh; Opus không sửa thẳng phần thực tập sinh đã làm. Chỉ Opus hỏi người dùng (`AskUserQuestion`).

**Kiểm định của Opus:** đọc kế hoạch, tập phiếu và kết quả lệnh thật (không tin dòng "đã đạt"); mở ảnh cỡ thật từng cảnh cho các dòng **MẮT**; đối chiếu lời đọc với tài liệu. Cổng nào chưa chạy thì báo "bỏ qua", không báo "đạt".

### 3. Quy trình Bàn giao & Phối hợp Liên Agent (Delegation & Handoff Protocol)

```
[User Request]
       │
       ▼
[Master Agent] ──(Gate 1 & 2: Voice & Aspect Ratio)──► [User Confirmation]
       │
       ▼
[Specialist 1: Content Architect] ──► outline.json & plan.json + analysis (Validate OK)
       │
       ▼
[Master Agent] ──(Gate 3: 1 video ~3 phút hay tách? chỉ khi 3 phút không đủ)──► [User Confirmation]
       │
       ▼
[Specialist 2: Copywriter] ──► voiceSegments (1 câu/đoạn) + visual[i] (mô tả tranh từng câu)
       │
       ├────────────────────────────────────────┐
       ▼                                        ▼
[Specialist 3: Audio Director]           [Specialist 4: SVG & Visual Designer]
       │ (TTS từng câu, đo delays)              │ (Vẽ SVG _illus.mjs, dựng layout tĩnh,
       │                                        │  audit_frame.py đạt >= 62%, nhãn <= 8 từ)
       │                                        ▼
       │                                 [Static Visual Inspection Gate: QA duyệt hình tĩnh]
       │                                        │
       └───────────────────┬────────────────────┘
                           ▼
                 [Specialist 5: Kinetic Motion & Animation Engineer]
                           │ (Lắp ráp sets/<set>.mjs, beatTimes(N), Active Focus Glow,
                           │  motion.mjs tokens, build & preview.ts)
                           ▼
                 [Specialist 6: QA Gatekeeper]
                           │ (script:validate, audit_frame, script-review.md, sync:check)
                           ▼
                 [Master Agent Final Sign-off]
                           │ (Duyệt kịch bản & hình ảnh toàn diện)
                           ▼
                 [Local Multi-Worker Engine on User PC]
                           │ (Render song song 10-12 workers, ghép video & xuất output/)
                           ▼
                 [video.mp4 Hoàn Chỉnh]
```

### 3b. Phân công worker theo câu nói *(chốt 30/09/2026 — hình nhảy đúng câu nói)*

Đơn vị bàn giao giữa các worker là **câu nói**: một câu = một `voiceSegments` = một nhịp hình.
Mỗi worker chỉ sửa phần mình sở hữu trong `script.json` và scene-kit, để chạy song song mà không ghi đè nhau:

| Worker | Sở hữu (được sửa) | Đầu vào | Bàn giao |
|---|---|---|---|
| Specialist 2 · Copywriter | `voiceText`, `voiceSegments`, `section`, `visual` | `plan.json` + `analysis` | Mỗi cảnh: danh sách câu (1 câu/đoạn, ≤ 8 câu/cảnh) và `visual[i]` = ý đồ hình cho câu i, chỉ lấy từ tài liệu |
| Specialist 4 · SVG Designer | `scripts/scene-kit/sets/_<set>_illus.mjs`, layout tĩnh SVG | Danh sách câu + `visual[i]` đã chốt | Tranh vector SVG cho từng câu, layout tĩnh hoàn chỉnh (phủ ≥ 62%, nhãn ≤ 8 từ, không chữ nhỏ), qua `audit_frame.py` tĩnh |
| Specialist 3 · Audio | `voice`, `voiceCue`, `sfx`, `sfxCues` | Câu đã chốt | TTS từng câu; pipeline đo giờ bắt đầu từng câu → `inputs.delays`, `timeline.json` |
| Specialist 5 · Motion Engineer | `scripts/scene-kit/sets/<set>.mjs`, `templateId`, `inputs` (trừ `delays`) | Layout & tranh SVG từ Specialist 4, mốc `delays` từ Specialist 3 | Khung có đúng N nhịp (`beatTimes(N)`); nhịp i hiện/đổi hình câu i tại `t[i]`; Active Focus Glow; motion tokens |
| Specialist 6 · QA | chỉ đọc; trả lỗi về đúng worker sở hữu | `script.json`, template, `video.mp4` | `script:validate` sạch, `sync-check.md` đạt từng câu, nghiệm thu kỹ thuật |
| Specialist 7 · Visual Critic (Vision QA) | chỉ đọc ảnh thực tế; veto nếu vi phạm thẩm mỹ | ảnh rendered thực tế (`sync-check/*-cuoi.jpg`) | Soi trực tiếp bằng mắt (`view_file`); cấm hộp viền rỗng ruột, yêu cầu tranh minh hoạ giàu bối cảnh chuẩn TVHS |
| Master Agent | các cổng duyệt, `plan.json → lengthDecision` | Mọi bàn giao | Duyệt người dùng, ký nghiệm thu xuất xưởng |

Chạy song song hợp lý:

- **Theo video:** sau khi plan và cổng thời lượng đã chốt, mỗi video có đội ngũ triển khai riêng chạy song song. Bộ cảnh mỗi video nằm trong file `sets/<set>.mjs` và `sets/_<set>_illus.mjs` riêng nên không đụng nhau.
- **Trong một video:** Copywriter chốt câu theo từng cảnh $\rightarrow$ Specialist 4 vẽ ngay tranh SVG cho cảnh đó $\rightarrow$ Sau khi tranh và layout tĩnh đạt chuẩn, Specialist 5 nhận để ráp kinetic motion và timing.
- **Đổi câu = đổi hợp đồng:** Copywriter thêm, bớt, gộp hay tách câu ở cảnh nào thì phải báo Specialist 4 vẽ lại hình và Specialist 5 làm lại số nhịp của cảnh đó.
- **Lỗi quay về đúng chủ:** câu sai $\rightarrow$ Copywriter; thiếu tranh/chữ nhiều/hình mờ $\rightarrow$ Specialist 4 (SVG Designer); lệch nhịp/lỗi chuyển động $\rightarrow$ Specialist 5 (Motion Engineer); giọng, giờ bắt đầu $\rightarrow$ Specialist 3 (Audio). QA không tự sửa phần của worker khác.

### 4. ⚡ Local Multi-Worker Execution Architecture (Kiến Trúc Render Đa Worker Trên Máy Người Dùng)
- **Tách bạch tác vụ (Decoupling):**
  - **AI Agent (Hệ thống điều phối):** Tập trung 100% vào nghiệp vụ trí tuệ: phân tích tài liệu (`plan.json`), biên kịch lời thoại (`script.json`), kỹ thuật hoạt họa scene-kit, sinh âm thanh VieNeu-TTS, và kiểm tra QA tiêu chuẩn. Tuyệt đối không để việc render video ngốn tài nguyên làm nghẽn tiến trình chat hoặc làm lệch nhiệm vụ của Agent.
  - **Máy người dùng (Local Terminal / Multi-Worker Engine):** Chịu trách nhiệm thực thi tác vụ nặng (render đồ họa Chrome/Puppeteer + encode FFmpeg). Tận dụng tối đa 12 CPU Threads và 32GB RAM của máy người dùng thông qua cơ chế song song (10-12 workers).
- **GPU** *(người dùng chốt 13/10/2026)*: render chạy trên GPU của máy người dùng — `template-composer.ts` truyền `--gpu --browser-gpu` cho HyperFrames, `video-tools.ts` mã hoá `h264_nvenc` khi ffmpeg thật sự dùng được NVENC (thăm dò một lần), không thì rơi về `libx264`. Đặt `TVHS_GPU=0` để ép CPU. Log render phải có dòng `GPU: encoder GPU + browser GPU`. TTS VieNeu (ONNX) hiện chạy CPU; đổi sang GPU cần `onnxruntime-gpu` + CUDA 12/cuDNN 9, chưa làm.
- **Phương thức thực thi đơn giản:**
  - Chạy tương tác qua menu: `.\render.bat` hoặc `npm run render`
  - Render siêu tốc với workers: `.\render.bat --workers 10`
  - Render hàng loạt toàn bộ thư mục: `.\render.bat --all --workers 10`
  - Render 1 video chỉ định: `.\render.bat "output/<tên-thư-mục>/script.json" --workers 10`
- **Tự động ghép nối & xuất xưởng:**
  - Tự động fit clip theo mốc thời gian lời đọc, ghép nối các cảnh, hòa âm SFX/nhạc nền, chèn watermark thương hiệu cố định (góc phải trên, opacity 0.40).
  - Xuất thành phẩm `.mp4` chuẩn trực tiếp vào thư mục tương ứng: `output/<document-name>/video.mp4`.

---

## Chế độ C — Talking head từ clip quay thật (chốt 22/10/2026)

Pipeline không chỉ làm từ tài liệu: Chế độ C dựng video từ clip quay thật, đặc tả ở `docs/CHE-DO-C-SPEC.md`. Luồng này không có
Specialist 3 (giọng là audio gốc, không TTS) và không đi qua `npm run pipeline`.

- **Master giữ cổng:** chỉ Master hỏi người dùng — chỗ không chắc của hiệu đính (`questions.md`), xác nhận dàn ý + yêu cầu cắt
  (`th:approve --stage outline`), duyệt danh sách cắt (`th:approve --stage cut`). Không tự duyệt thay người dùng.
- **ASR chạy tuần tự trên GPU** (RTX 3050 8 GB): phiên âm, căn từ, giảm ồn chạy lần lượt, không song song; nhả VRAM giữa các bước.
  Không giao hai worker cùng dùng GPU một lúc.
- **Hiệu đính, dàn ý, kế hoạch đồ hoạ do AI viết** (không bịa nội dung; mốc thời gian lấy từ `transcript.raw.json`); cảnh scene-kit
  chèn vào đi qua Specialist 4/5/6/7 như chế độ A/B.
- **Editor do người dùng chỉnh** (`npm run editor -- <job>`); AI không render mp4 cuối trước khi người dùng chỉnh xong và chọn xuất.
- Một việc thất bại 2 lần thì dừng và báo người dùng; trạng thái mỗi bước ghi vào `output/<job>/run.json` để phiên khác làm tiếp.
- **Thứ tự và quy tắc cứng:** dãy 22 bước (có ✋ cổng người dùng và cảnh báo thứ tự: `th:project` xoá layer; có `videoClips` thì `th:cut`/`th:audio`/`th:intro`/`th:project --force` bị từ chối; `th:intro` trước `th:clips-init`) ở `SKILL.md` "Nhánh Chế độ C"; quy tắc cứng và mục "Vận hành" ở `docs/CHE-DO-C-SPEC.md`. `th:render` chỉ chạy khi người dùng nói "xuất".
- **Agent chạm giới hạn API:** tiếp tục agent cũ bằng `SendMessage`, không khởi tạo agent mới mất ngữ cảnh. Chỉ dừng đúng PID mình khởi động; kiểm `nvidia-smi` trước Whisper.


## Voice Selection Gate

Before creating or modifying a video `script.json`, the agent must obtain an
explicit voice and tone choice from the user. Do not silently choose the
default voice.

1. Run `npm run voice:list -- --json` to read the current VieNeu voice catalog.
2. If the conversation does not already contain an explicit voice choice, use
   the platform's native structured-question UI:
   - Claude Code: `AskUserQuestion`
   - Codex/ChatGPT: `request_user_input` when available
   - Other agents: an equivalent choice/picker tool
3. First show three relevant voices for the document, each with gender, region,
   and speaking character. Mark one recommendation. Let the user request the
   complete 20-voice catalog through the tool's free-form choice.
4. Ask for exactly one tone:
   - `tin_tuc`: professional, firm, corporate/news
   - `tu_nhien`: conversational, warm, instructional/social
   - `doc_truyen`: slower, expressive, storytelling
5. If structured questions are unavailable, display the same choices as a
   compact Markdown table and ask directly. Wait for the answer.
6. Write the result once to `voice.preset` and `voice.style`. Never switch voice
   between scenes.
7. Generate a short preview and ask for confirmation before the full render,
   unless the user explicitly says to skip preview or use the recommendation.

The agent must not generate the script or start the full pipeline while the
voice choice is unresolved.

## Video Aspect Ratio & Framing Gate

Before generating `script.json` or rendering, the agent must ask and confirm the user's preferred video aspect ratio (`aspect`) unless already explicitly specified in the user request:

1. Ask the user using the platform's native structured-question tool (`ask_question` / picker UI):
   - `9:16` (Vertical / Khung dọc - Shorts, TikTok, Reels, Mobile Training) — *Recommended*
   - `16:9` (Landscape / Khung ngang - YouTube Desktop, TV, Web)
   - `4:5` (Social Feed / Khung 4:5 - Facebook Feed, Instagram, Social Post)
2. Write the chosen value to `script.json` under `"aspect"`.
3. Ensure all template compositions match the selected aspect ratio.

## Anti-Slop Design & Agentic Motion Standards Gate

When authoring or updating any video script/template:

1. Mandatory Skill Applications:
   - Apply `.agents/skills/design-taste-frontend/` (`DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 8`, `VISUAL_DENSITY: 4`).
   - Apply the motion rules already distilled into `SKILL.md` mục "0c" and built in `scripts/scene-kit/motion.mjs`. The renderer takes seekable CSS keyframes, so GSAP/React/Framer Motion are explicitly out of scope here (see SKILL.md mục "0c", đoạn cuối).
2. Enforce Speech-Synced Active Focus Glow:
   - When narration speaks an item, that item MUST illuminate with gold `#C5A059` glow (`box-shadow: 0 0 35px rgba(197,160,89,0.45)`) and scale to `1.03`.
   - Compute entrance delays using narration timing (`inputs.delays` or `sceneDuration` step gaps).
3. Banned Defaults:
   - Static bullet-point slide transitions, flat linear slides, generic AI purple gradients, and low-contrast text.
   - Text-only scenes, and a run of scenes that differ only in how dark cards are arranged. Follow the **Visual Design Standard** in `SKILL.md`.
   - Sentences on screen: narration or source text written out, definition paragraphs, subtitle lines under a headline. The screen shows pictures and motion; text is keywords only.

## Persistent Brand Watermark Gate (Quy chuẩn Watermark Thương hiệu)

Mọi video xuất xưởng từ pipeline BẮT BUỘC phải luôn có logo mờ (watermark) nằm cố định ở góc phải trên cùng:

1. **Asset Watermark:** `assets/brand/watermark.png` (nguồn chuẩn từ `D:\TVH\New folder\TVHS\logo\Asset 1.png` - Huy hiệu Rồng vàng TVHS hình tròn hoàng gia).
2. **Quy cách hiển thị:**
   - **Vị trí:** Góc phải trên (`top: 44px, right: 44px`). Vị trí này hoàn toàn thông thoáng, không đè hay va chạm với tiêu đề, kicker badge, thẻ nội dung hay mock-up điện thoại.
   - **Kích thước:** `width: 84px` (~7.7% chiều rộng khung hình 1080px).
   - **Độ mờ (Opacity):** `opacity: 0.40` (`colorchannelmixer=aa=0.40`).
3. **Cơ chế hoạt động:** Được tự động tích hợp trong bước đóng gói video (`muxAudioOntoVideo` qua ffmpeg filter overlay). Watermark phải hiển thị liên tục, bất biến từ giây 0.00 đến giây cuối cùng, không được giật, chớp tắt hay mất đi khi chuyển giữa các scene.

## Company Brand Palette Preservation & Third-Party Brand Exception Gate (Bảo Toàn Nhận Diện Thương Hiệu Công Ty)

Khi thiết kế visual và template cho mọi video trong pipeline:

1. **Bảo tồn tuyệt đối màu thương hiệu công ty (Thành Vinh Holdings - TVHS):**
   - **Màu nền chủ đạo:** Obsidian Black / Deep Charcoal sang trọng (`#080A0E`, `#0A0C10`, `#0C0C0C`, `#141517`) điểm xuyết vầng sáng radial vàng `#C5A059` tinh tế.
   - **Màu nhấn thương hiệu:** Gold hoàng gia `#C5A059`, Gold nhạt `#E0C286`.
   - **Màu chữ & thẻ:** Chữ chính trắng sáng `#FFFFFF`, chữ phụ xám bạc `#EDEDED` / `#A0A5B0`. Thẻ nội dung bán trong suốt với viền mảnh vàng gold hoặc trắng tinh tế.
   - **Hiệu ứng tiêu điểm:** Active Focus Glow vàng `#C5A059` (`box-shadow: 0 0 35px rgba(197,160,89,0.45)`).
   - **Cấm tuyệt đối:** Không được tự ý đổi màu nền sang các tông pastel, giấy kem (cream paper), tím mận, hay xanh lá phủ toàn khung đối với nội dung công ty. Sự biến thiên thị giác giữa các cảnh phải được tạo ra từ bố cục (layout scale), hình minh họa độc bản, và chuyển động nhịp nhàng.
2. **Ngoại lệ duy nhất dành cho cá thể & nền tảng bên ngoài:**
   - Khi kịch bản nhắc đến hoặc phân tích các nền tảng/thương hiệu bên thứ ba (ví dụ: **Facebook** `#1877F2`, **TikTok** `#FE2C55` / `#25F4EE`, **Google** `#4285F4`, **Shopee** `#EE4D2D`, **YouTube** `#FF0000`), ĐƯỢC PHÉP sử dụng màu sắc nhận diện đặc trưng của thương hiệu đó trên icon, badge, màn hình mockup điện thoại hoặc hiệu ứng điểm nhấn tương ứng.
   - Mọi phân cảnh khác không liên quan đến bên thứ ba đều phải tuân thủ nghiêm ngặt 100% màu thương hiệu của công ty.

## 9. Giữ context gọn (chốt 16/10/2026)

Mọi output lệnh nằm lại trong context ở mọi lượt sau. In log/output terminal luôn giới hạn dòng (`tail -n 20`, `grep`),
không in nguyên log render/TTS/pip (ghi ra `scratch/*.log` rồi đọc dòng cần). Test chạy gọn: `npm test -- --bail=1 --reporter=dot`.
Mỗi việc lớn một phiên; chọn model từ đầu phiên và giữ nguyên (đổi model/effort giữa phiên làm mất prompt cache).

## Cổng QA scene-kit (khoá 09/10/2026, sửa cùng ngày)

Thứ tự làm và danh sách cổng nằm ở mục **"Bảng RULE → CỔNG"** bên dưới. Bản đầu của mục này xếp `scene:qa`
trước render nhưng `scene:qa` lại cần `timeline.json` chỉ có sau khi render, nên trên thực tế phải render rồi mới
soi được cảnh; đã thay bằng `npm run pipeline:voice`. Cổng nào bỏ qua thì báo "bỏ qua", không báo "đạt".

## Khuôn thiết kế cảnh chuẩn (khoá 09/10/2026, rút từ bộ `modau3`)

Mọi video mới dựng bằng cùng một bộ khung — không tự viết lại khung từng video:

- **Khung cảnh:** `scripts/scene-kit/sets/_tvhs_scene.mjs` — `scene({ id, kicker, title, bg, beats, art, chips, script })`
  và `BG` (nền chỉ gồm màu công ty). Một cảnh = kicker + tiêu đề + sân khấu SVG + hàng nhãn.
- **Thư viện hình:** `scripts/scene-kit/sets/_tvhs_art.mjs` — bảng màu `A`, `tx` (chữ ≥ 28), `grp`, `stage`,
  `deskPerson`, `appWindow`, `sheetCard`, `folderOpen`, `botFig`, `arrow`, `clockFace`, `bar`, `stampBox`, `seal`,
  `banMark`, `qMark`, `bubble`, `crowd`, `page`, `pageTag`, `tile`. Cần hình mới → thêm vào thư viện này
  (dùng chung được), không vẽ riêng một lần trong file bộ cảnh.
- **Cách bố cục:** khung mở ra gần trống, mỗi câu lắp thêm một lớp (`grp` + `enter/stagger/grow/draw`);
  8–14 cảnh/video, 2–4 câu/cảnh, ≥ 25 hình vẽ/cảnh; không ô viền rỗng; mọi chữ nằm trong nhóm có chuyển động.
- **Đặt vị trí:** `<g transform="translate(x y)">` ngoài, nhóm có `id` lồng trong (`enter()` kết thúc bằng
  `transform:none`). Nhãn cách mép hình ≥ 24px; viền khung không cắt ngang chữ; hình không chồng lên thẻ khác.
- **Nội dung chữ:** chỉ từ khoá rút từ lời đọc; không thêm con số/ý tài liệu không nói; chip không chép nguyên lời đọc.
- Mẫu tham chiếu về **cách lắp lớp và đặt vị trí**: `sets/modau3.mjs` (14 cảnh, 62 câu). **Không** lấy nó làm chuẩn
  mật độ chữ: `scene:rules` đo 10/14 cảnh của nó quá 25 từ. Chuẩn chữ và hình là rule 0 và 0c trong bảng RULE → CỔNG.

## Cổng trước render (khoá 09/10/2026)

Sự cố 09/10/2026: 6 video Wiki có 72 lỗi rule (`scene:rules`) trong khi `script:validate` báo hợp lệ 6/6; 5 video
được render full khi 0/5 có xác nhận của người dùng. Bốn phiên 5 Why cùng ngày chỉ ra bốn cơ chế, đã sửa:

1. Hàm đếm chữ của validate bỏ cả khối `<svg>` → đếm 0 từ cho cảnh 47 từ. Sửa `src/render/screen-text.ts`; thêm
   bộ cảnh cố ý vi phạm `scripts/scene-kit/fixtures/canary/` chạy trong `npm test`.
2. `scene()` nhận `beats` là một con số → cảnh dựng được khi chưa ai mô tả hình, 158/218 mục `visual` là chữ giữ
   chỗ. Giờ `beats` là danh sách mô tả; `build.mjs` ghi `beats.json`; validate so với cột `visual`.
3. Pipeline không có điểm dừng giữa bước giọng và render → muốn có mốc câu để soi cảnh thì phải render. Thêm
   `npm run pipeline:voice`. `npm run pipeline` chặn khi thiếu `approval.json` (tạo bằng `npm run approve` **chỉ
   sau khi người dùng xác nhận bằng lời**), khi `script.json` đổi sau khi duyệt, hoặc khi `scene:rules` báo lỗi.
   Bỏ qua có chủ đích: `--skip-gates="<lý do>"`, ghi vào `output/gate-skips.log`.
4. Việc đọc rule gắn với "phiên mới" trong khi một phiên dựng 9 bộ cảnh → gắn lại với lúc dựng (`rulesRead`) và
   đưa bảng rule vào file tự nạp.

Kiểm tái diễn: 23/10/2026 — số lỗi rule do người dùng phát hiện ở video dựng sau 09/10 (mong muốn 0).

## Bảng RULE → CỔNG (khoá 09/10/2026) — đọc trước khi dựng bất kỳ bộ cảnh nào

Bảng này nằm trong file tự nạp để rule còn trong ngữ cảnh sau khi hội thoại bị tóm tắt. Cột "Cổng" ghi **cái gì
đo rule đó**; ghi **MẮT** nghĩa là không có máy nào đo, người vẽ phải mở ảnh cỡ thật 1080×1350 của từng cảnh và tự
soi trước khi báo xong. "Qua hết cổng máy" không có nghĩa là đúng rule. Chi tiết từng rule: `SKILL.md` mục
"Visual Design Standard" (0, 0b, 0c) và "Ba Chế Độ Nội Dung".

| Rule (SKILL.md) | Nội dung một dòng | Cổng | Ca vi phạm mẫu |
|---|---|---|---|
| 0 | Khối chữ trên hình ≤ 8 từ | `script:validate` (lỗi) · `scene:rules` E1 | canary |
| 0 | Cả cảnh ≤ 25 từ (+5 mỗi câu từ câu 4), **kể cả chữ trong SVG** | `scene:rules` E2 (chặn render) · `script:validate` (cảnh báo) | canary |
| 0 | Không chép ≥ 5 từ liền của lời đọc lên hình | `script:validate` (lỗi) | test `screen-text` |
| 0 | Mỗi câu một mô tả hình, viết cùng lúc vẽ cảnh | `build.mjs` (`beats` là danh sách) · `script:validate` so `visual` với `beats.json` · `scene:rules` E4 | canary · test `screen-text` |
| 0 | Hình đổi đúng lúc câu bắt đầu | `script:validate` (số nhịp = số câu) · `sync:check` | — |
| 0 | Không gì của câu sau hiện trước | `scene:static` | — |
| 0, 0c.8 | Số trên hình phải có trong tài liệu | `scene:rules` E3 | canary |
| 0 | **Hình mang ý, chữ chỉ là nhãn**; hình đúng loại nội dung (quy trình = đường đi, so sánh = chia đôi…) | **MẮT** | — |
| 0 | Chỉ vẽ thứ có trong tài liệu (không thêm ví dụ, nhân vật, ẩn dụ) | **MẮT** | — |
| 0b.1 | Phủ ≥ 62% chiều cao, không dải trống > 260 px | `scene:qa` (đếm cả viền thẻ là "đầy", không tin riêng) · **MẮT** | — |
| 0b.2 | Chữ ≥ 28 px | `build.mjs` (`! chữ nhỏ hơn 28px`) | — |
| 0b.3–8 | Icon có nhãn · tương phản · dấu tích chỉ khi đã xong · không bóng mờ chồng lớp · không nét thừa · hình gắn liền, cân giữa | **MẮT** | — |
| 0c.1 | Một hệ bo góc cho cả video | **MẮT** | — |
| 0c.2 | Chỉ vàng là màu nhấn; đỏ san hô chỉ cho nghĩa "sai / chưa đạt" | **MẮT** | — |
| 0c.3 | Không lặp một bố cục quá hai cảnh liền | `scene:rules` W1 (cảnh báo) · **MẮT** | canary |
| 0c.4, 0c.6 | Thẻ chỉ khi cần nhóm · lề 60 px, khoảng cách bội số 20 | **MẮT** | — |
| 0c.10, 0c.16 | Chuyển động có nghĩa, đúng kiểu theo loại nội dung (`travel`/`draw`, `wipe`, `grow`, `stamp`) | `scene:rules` W2 (chỉ bắt cảnh toàn trượt vào) · **MẮT** | canary |
| 0c.15 | Một phần tử một animation · chữ không tràn khung | băng đỏ trên khung → `scene:qa`, `video:qa` | — |
| 0b.10 | Đọc được ở cỡ điện thoại 360 px (chữ 28 px ở 1080 còn ~9 px) | `scene:qa` xuất `phone-sheet.png` · **MẮT** | — |
| QA | Chấm 7 tiêu chí 1–10 (hook 2 giây đầu · đọc ở 360 px · chuyển động · đa dạng mỗi 2–4 giây · bố cục · đúng thương hiệu · đồng bộ giọng); mỗi tiêu chí ≥ 8 trước khi render full | **MẮT** (ghi `scratch/qa-<set>/score.md`) | — |
| 2 (Scale) | Mỗi video ít nhất một cảnh có hình khổng lồ làm chủ đạo | **MẮT** | — |
| Chế độ A | `plan.json` có `analysis` và `lengthDecision` đã chốt, trước khi viết script | `plan:validate` · `scene:rules` E5 | canary |
| Chế độ A | Lời đọc chỉ dùng thông tin trong tài liệu, giữ nghĩa | `script:validate` (chỉ bắt số liệu lạ) · **MẮT** | — |
| CLAUDE.md §4 | Giọng, tỷ lệ khung, cách tách video do người dùng chọn | `AskUserQuestion` — không có cổng máy | — |
| CLAUDE.md §4 | Người dùng duyệt `script-review.md` và nghe `voice-preview.mp3` trước khi render full | `npm run pipeline` chặn khi thiếu `approval.json` | — |
| CLAUDE.md §1 | Đọc rule hình trước khi dựng | `build.mjs` đòi `rulesRead` ở bộ cảnh mới | đã thử 09/10 |
| Chế độ C | Dàn ý và yêu cầu cắt do người dùng xác nhận trước khi lập kế hoạch cắt | `th:approve --stage outline` (ghi `th-approval.json`) | — |
| Chế độ C | Danh sách cắt do người dùng duyệt trước khi cắt clip | `th:approve --stage cut` (ghi `th-approval.json`) | — |
| Chế độ C | Hiệu đính không bịa nội dung; chỗ không chắc phải hỏi người dùng (`questions.md`) | **MẮT** · `AskUserQuestion` — không có cổng máy | — |
| Chế độ C | Không render mp4 cuối khi chưa qua editor; xuất do người dùng chọn | quy trình (`th:render` chỉ chạy sau `npm run editor`) — không có cổng máy | — |
| Chế độ C | Clip gốc chỉ được sao chép, không di chuyển/sửa | `th:intake` (chỉ copy vào `input/<tài liệu>/raw/`) · **MẮT** | — |
| Chế độ C | Không dùng cổng giọng/TTS; không đi qua `npm run pipeline`/`approval.json` | CLAUDE.md §4 — không có cổng máy | — |
| Chế độ C | Khung 16:9 hoặc 4:5 do người dùng chọn mỗi job; crop người nói từ bụng lên (lấy mẫu ~20 khung) | `AskUserQuestion` · **MẮT** — không có cổng máy | — |
| Chế độ C | Không vẽ/khoanh/mũi tên lên cơ thể người nói; overlay chừa dải phụ đề (y 68–88%) và không che mặt | `th:broll` cảnh báo vị trí · **MẮT** | — |
| Chế độ C | Overlay xuất hiện thì người nói dịch sang phía đối diện (`side` → `videoShifts`) | `th:broll` sinh `videoShifts` · **MẮT** (kiểm `side` đúng bên) | — |
| Chế độ C | Mọi phần tử xuất hiện có SFX pop, kể cả từng beat trong cảnh scene-kit | `th:broll` (planSfx, pack `corporate`) · **MẮT** (nghe) | — |
| Chế độ C | Màu minh hoạ khớp lời nói; không đưa con số người nói không nói; minh hoạ vẽ riêng từng bài | **MẮT** — không có cổng máy | — |
| Chế độ C | Nhịp thị giác 3–6 s; cutaway bổ trợ 2–6 s, cutaway thay thế dài theo lời giảng (tới ~18 s) | `th:broll` cảnh báo (khoảng trống hình > 6 s) · **MẮT** | — |
| Chế độ C | Thứ tự lệnh: `th:project` xoá layer; có `videoClips` thì `th:cut`/`th:audio`/`th:intro`/`th:project --force` bị từ chối; `th:intro` trước `th:clips-init` | máy từ chối khi đã có clips · `SKILL.md` (22 bước) | — |
| Chế độ C | Vận hành editor: QA bằng click thật, Ctrl+F5 sau đổi server, không PUT thử vào cổng 4350, chỉ dừng đúng PID mình mở, `nvidia-smi` trước Whisper | quy trình — `docs/CHE-DO-C-SPEC.md` mục "Vận hành" | — |

**Thứ tự làm một video (thay chuỗi "Cổng QA scene-kit" cũ, vốn xếp bước soi cảnh sau một lần render):**

1. Chế độ A: `doc:outline` → viết `plan.json` → `plan:validate`. Chờ người dùng chốt cách tách nếu không vừa 3 phút.
2. Đọc `SKILL.md` "Visual Design Standard" (0, 0b, 0c) và chế độ nội dung. Viết lời đọc và **mô tả hình từng câu**. Trước khi vẽ, ghi trạng thái hình của từng nhịp trên lưới nhịp (hình nào hiện, hình nào đổi, hình nào rời đi).
3. Vẽ bộ cảnh: `beats` là danh sách mô tả đó, khai `rulesRead`. `node scripts/scene-kit/build.mjs <set>` → `scene:static` → `scene:rules`.
4. `script:validate` → `npm run pipeline:voice -- <script.json>` (giọng + `timeline.json` + `voice-preview.mp3`, **không render**).
5. `scene:qa` (ảnh ở đúng mốc câu thật) → soi **MẮT** từng cảnh theo các dòng MẮT của bảng trên, rồi soi `phone-sheet.png` (360 px) và chấm 7 tiêu chí vào `score.md`
6. Gửi người dùng `script-review.md` và `voice-preview.mp3`. **Dừng, chờ xác nhận.**
7. Sau khi người dùng xác nhận: `npm run approve -- <script.json> --confirmed-by "<tên>" --preview confirmed|waived` → `npm run pipeline` → `sync:check` → `video:qa`.

Khi **đổi khuôn hoặc đổi một cổng**: chạy `npm test`. Bộ cảnh cố ý vi phạm `scripts/scene-kit/fixtures/canary/` phải vẫn bị
bắt đủ (`src/render/rule-gates.canary.test.ts`). Thêm rule mới thì thêm một dòng vào bảng này và một vi phạm vào canary.

## Tự vấn 5 WHY — khuôn bắt buộc (người dùng chốt 09/10/2026)

Distill từ hai tài liệu nội bộ TVHs người dùng đưa ngày 09/10/2026 ("5 Why: hỏi vì sao để tìm đúng chỗ cần sửa" bản 1.0 và
"Mẫu đào 5 Why" bản 2.0, bản A). Tự vấn **không phải giải thích**: nghe xong thấy hiểu mà không chỉ được chỗ sửa là lời giải thích.
Viết ra đủ sáu mục, đúng thứ tự, không đào trong đầu:

1. **Bối cảnh bằng thực tế:** ai/ở đâu (file, lệnh, bộ cảnh cụ thể), lần xảy ra gần nhất (ngày), số lần lặp, ít nhất một con số đo được.
2. **Vấn đề một câu + câu why của phiên:** vấn đề là hiện tượng có số, chưa có chữ "vì"/"do". Câu why mở bằng "Tìm ra vì sao…" —
   không phải what (kết quả muốn có), không phải how (cách làm). Hỏi vào thứ mình có quyền (vd. "vì sao không phát hiện", không phải "vì sao người dùng khó").
3. **Định nghĩa từ mơ hồ** kèm số ("lỗi rule" = dòng ✖ của `rules_lint`; "báo sạch" = câu tôi viết cho người dùng).
4. **Chuỗi hỏi dạng bảng:** Câu hỏi · Trả lời · **Căn cứ** (dữ liệu/sự kiện thật; đang đoán thì ghi "giả thuyết, kiểm bằng…") · **Phép thử**.
   Câu 1 lấy đúng chữ của câu why; câu sau bám đúng câu trả lời ngay trước. Bốn phép thử cho mỗi câu trả lời:
   **100%** (A gây ra kết quả trong mọi trường hợp) · **Trừ** (bỏ A thì hết) · **Cơ chế** (không phải trạng thái, phẩm chất, thói quen, cảm xúc, hậu quả tương lai) · **Trong tầm**.
   Trượt thì hỏi lại cùng cấp. Cấm: câu nói ngược, câu luôn đúng ("vội", "quên", "ưu tiên tốc độ", "chủ quan"), đổ ra ngoài, **dừng ở người kể cả chính mình**
   ("tôi cẩu thả" chỉ là mô tả → hỏi tiếp cơ chế nào cho phép). Ghi các nhánh chưa đi; chọn nhánh bằng số liệu. Đọc ngược bằng "vì vậy" không được gãy.
5. **Điểm dừng:** chọn một câu làm thủ phạm chính; đủ ba điều kiện (chỉ ra việc cụ thể · trong tầm · làm xong thì khó tái diễn); gọi **tên cơ chế cụ thể**
   (file, hàm, bước quy trình), rồi hỏi "vì sao ta chưa làm cơ chế đó". Không đào quá sâu tới "bản chất".
6. **Hành động và kiểm chứng:** hành động bơm vào chỗ rỗng (không phải "sẽ cẩn thận hơn"); kiểm **cơ chế cũ đã có chưa, vì sao không chạy** trước khi xây mới;
   một việc làm ngay; phép đo kiểm lại và **ngày kiểm tái diễn** sau 2–4 tuần. Tự chấm 12 tiêu chí của mẫu trước khi gửi.
