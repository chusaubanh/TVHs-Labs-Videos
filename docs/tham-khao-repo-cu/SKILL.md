---
name: thanhvinh-video-pipeline
description: Create, revise, validate, and render branded Vietnamese videos from documents in input/ with VieNeu-TTS, HyperFrames, FFmpeg, and TVHS brand assets. Use for document-to-video requests, voice selection and preview, script generation, scene regeneration, Vietnamese typography fixes, output quality checks, complete project setup on a new Windows machine, and talking-head videos built from real recorded clips (dựng talking head từ clip quay thật, Chế độ C).
---

# Thanh Vinh Video Pipeline

Treat this repository root as the complete skill package. Use the existing source code,
templates, assets, setup scripts, and lockfiles in place. Do not create a nested copy of the
project.

## Workspace Contract

Keep each source document and its artifacts under the same human-readable name:

```text
input/<document-name>/<document-name>.md
output/<document-name>/outline.json      # parsed structure of the source
output/<document-name>/plan.json         # series plan (may split into videos)
output/<document-name>/<video-slug>/     # one folder per planned video
```

The input may also be `.txt`. Each video folder contains `script.json`, `script.txt`
(plain narration for CapCut), `script-review.md` (the reviewer's table),
`voice-preview.mp3`, `voice.mp3`, `video.mp4`, `timeline.json` (when each sentence
starts in the video), `sync-check.md` + `sync-check/` (frames per sentence), `voice/`,
and `clips/`. A single-video
plan may write straight into `output/<document-name>/`.

## Required Workflow

The AI is the author; the code is the gatekeeper. Never ship narration produced by
mechanical sentence extraction.

1. Run `npm run doctor` or `powershell -File scripts/doctor.ps1` before first use.
2. Resolve the source from `input/<name>/`.
3. Read `assets/brand/tvhs-guideline.json` (identity + personas). **Do not look
   for a template catalog — there isn't one** (xoá 08/10/2026). A scene's real
   slots and display limits live only in `templates/<templateId>/slots.json`,
   written by `node scripts/scene-kit/build.mjs`; read that file when you need
   them, never a hand-written doc.
4. Run `npm run doc:outline -- "<name>"` and read the whole document plus the
   generated `outline.json`: section structure, real numbers, duration estimates and
   `contentHints` (a first guess at each section's content type).
5. Write `output/<name>/plan.json`. **Analyse before planning** — for training
   material `analysis` is required (see **Chế độ A → Phân tích**): content groups and
   types, must-keep ideas, droppable details, source examples that must survive, how
   each type is spoken vs shown, the learning logic and principles, and whether one
   ~3-minute video is enough (`fitsOneVideo`, `lossIfForced`). Then plan the videos
   (each about 180 seconds, ≤ 195), pick one persona per video, and assign every
   outline section to a video or skip it with a written reason.
6. Run `npm run plan:validate -- "<name>"` and fix every error.
   **Length gate:** if one video is not enough, stop here and present the proposal
   (see **Chế độ A → Cổng thời lượng**). Write no script until the user chooses;
   record the choice in `lengthDecision`. `plan:validate` blocks a multi-video plan,
   or `fitsOneVideo: false`, without a confirmed decision.
7. Run `npm run voice:list -- --json`. If voice and tone are unresolved, ask the
   user (three fitting presets, one recommendation) and wait. One voice for the
   whole series.
8. For each planned video, write `script.json` yourself following the persona's
   `voiceGuide`, `hookGuide`, and `ctaGuide`. **Chế độ A (học liệu đào tạo): follow
   every rule in "Chế độ A" below (chốt 30/09/2026)** — source information only,
   meaning unchanged, spoken language, structure chosen per content type; fill
   `section` (the source heading) and `visual` (what appears on screen) on every scene.
   Chế độ B (`input/Bài viết về AI/`): narration is rewritten prose, never sentences
   copied from the source. Display copy is keywords only (Visual Design Standard rule 0)
   and must fit template limits without "…" truncation.
9. Design the video's scenes with the scene-kit (see **Visual Design Standard**
   and **Scene-Kit Workflow**): one scene set per video; every spoken sentence
   has a fitting illustration on screen while it is spoken. Build it and check the
   end state of every scene with `scripts/scene-kit/preview.ts` before rendering.
10. Run `npm run script:validate -- "<path>/script.json"` and fix every error. It
    writes `script-review.md`; run the self-check (Chế độ A → Tự kiểm tra) and send
    that table for review before the full render.
11. Run `npm run voice:preview -- "<path>/script.json"` and present the audio.
12. Wait for confirmation unless preview was explicitly waived. A voice and tone
    already confirmed for the series count as confirmed for its later videos.
13. Run `npm run pipeline -- "<path>/script.json"` per video.
14. Run `npm run sync:check -- "<path>/script.json"` and look through
    `sync-check.md`: at the start of every sentence its picture is showing, and at
    its end the next sentence's picture is not in yet. Inspect representative
    frames across the whole timeline, verify media metadata, and run tests after
    code changes.
15. Report absolute paths to the final videos, voice tracks, and caption text.

If an agent runtime does not expose `npm` in `PATH`, use
`scripts/invoke-pipeline.ps1` with actions `voices`, `generate`, `preview`, `render`,
`test`, `doctor`, `outline`, `plan-validate`, or `script-validate`.

### Nhánh Chế độ C — Talking head từ clip quay thật

15 bước ở trên chỉ dành cho Chế độ A/B. Khi nguồn là **clip quay thật** (không phải tài liệu), đi nhánh riêng theo
`docs/CHE-DO-C-SPEC.md` (nguồn chuẩn; mục "Thứ tự chạy chuẩn" phải giống danh sách dưới): giọng là audio gốc, không qua TTS VieNeu,
không qua `npm run pipeline`/`approval.json`, không render thẳng video cuối — mọi bước ghi vào `output/<job>/project.json`, người dùng
chỉnh trong editor rồi mới xuất. Cài một lần: `npm run th:setup` (cần GPU NVIDIA). Chạy đúng thứ tự, ✋ là cổng người dùng:

1. `npm run th:intake -- "<clip>" [--doc "<tên tài liệu gốc>"] [--name <slug video>]` — sao chép clip vào `input/<tài liệu>/raw/`, tạo job `output/<tài liệu>/<slug>/` (job id = `"<tài liệu>/<slug>"`), sinh `media.json`, `run.json`.
2. `npm run th:transcribe -- <job>` — chạy `nvidia-smi` trước (GPU dùng chung, VRAM phải còn trống).
3. AI hiệu đính: viết `transcript.edited.txt` (đúng số dòng = số segment) + `questions.md` (chỗ không chắc: đoạn không phải lời giảng, thuật ngữ, con số, tên/chức danh người nói). ✋ **Hỏi người dùng** các câu trong `questions.md`.
4. `npm run th:align-edits -- <job>`.
5. AI viết `outline.json` (và trình bày tóm tắt + dàn ý lớn→nhỏ). ✋ **Người dùng xác nhận** dàn ý, nêu yêu cầu cắt (chuỗi video / 1 video / tóm tắt / chạy thử 1 phần) và chọn khung **16:9 hoặc 4:5**.
6. `npm run th:approve -- <job> --stage outline --note "<yêu cầu cắt>"`.
7. `npm run th:cut-plan -- <job>` (AI thêm khoảng cắt manual vào `cuts.json` theo yêu cầu của người dùng).
8. ✋ Người dùng duyệt danh sách cắt → `npm run th:approve -- <job> --stage cut`.
9. `npm run th:cut -- <job> --aspect 16:9|4:5`.
10. `npm run th:audio -- <job>`.
11. `npm run th:project -- <job>`.
12. Crop từ bụng trở lên bằng `videoTransform` (lấy mẫu ~20 khung để chọn) + `npm run th:subject -- <job> --face x,y,w,h`.
13. AI phân tích bài giảng → `broll-storyboard.md`: từng đoạn ghi cắt cảnh toàn màn hình hay overlay, vai trò thay thế/bổ trợ, minh hoạ gì, chuyển động gì, SFX gì.
14. Viết set scene-kit RIÊNG cho bài (cutaway nền đặc + overlay nền trong suốt có gradient đáy; nhịp khớp từng từ theo `transcript.cut.json`) → `node scripts/scene-kit/build.mjs <set>` + cổng QA scene-kit.
15. AI viết `broll-plan.json` (`side` cho overlay, zoom nhấn bằng anchor, camera auto) — xem `docs/BROLL-GUIDE.md`.
16. `npm run th:broll -- <job>` (planSfx, pack `corporate`).
17. `npm run th:intro -- <job> --from <s> --to <s>` (cold open bằng câu "chốt", lead-in 0,6 s, `whoosh-long-electro-01`).
18. `npm run th:source-audio -- <job>`.
19. `npm run th:proxy -- <job>`.
20. `npm run th:clips-init -- <job>`.
21. `npm run editor -- <job>` → http://localhost:4317. ✋ **Người dùng xem/chỉnh** (không có cổng duyệt storyboard riêng).
22. `npm run th:render -- <job>` — CHỈ khi người dùng nói "xuất".

**CẢNH BÁO THỨ TỰ:**

- `th:project` XOÁ mọi layer — không chạy lại sau bước 11.
- Khi project đã có `videoClips`: `th:cut`, `th:audio`, `th:intro` (kể cả `--redo`) và `th:project --force` bị từ chối.
- `th:intro` phải chạy TRƯỚC `th:clips-init` (bước 17 trước bước 20).
- **CHƯA KIỂM:** chạy lại `th:broll` sau khi đã có clips; thêm intro sau khi đã có clips (chỉ làm được qua tab Nguồn của editor).

Phiên âm/giảm ồn chạy **lần lượt** trên GPU (RTX 3050 8 GB), nhả VRAM giữa các bước. Một việc thất bại 2 lần thì dừng và báo
người dùng. Quy tắc cứng (khung, crop, overlay, SFX, màu, nhịp…) và mục "Vận hành" nằm trong spec và `docs/BROLL-GUIDE.md`. Cảnh scene-kit
chèn vào talking head khai `che-do-C` trong `rulesRead` của bộ cảnh.

## Voice Gate

Never choose a voice silently. Show three relevant local VieNeu presets with gender, region,
and speaking character. Mark one recommendation and allow the complete catalog to be shown.
Ask for exactly one tone:

- `tin_tuc`: professional and firm;
- `tu_nhien`: conversational and warm;
- `doc_truyen`: slower and expressive.

Write one preset and one tone at series level. Never change either between scenes or
between videos of the same series.

Keep `voiceText` free of emoji, URLs, and symbolic number notation. Spell numbers naturally
in Vietnamese. Keep display text under `inputs` separate; it may retain compact numbers and
restrained icons. Written brand forms listed in the guideline's `narration.replacements`
(e.g. `TVHs`) must be spoken as their full form (`Thành Vinh Holdings`) in every
`voiceText`; `script:validate` rejects violations.

## Video Aspect Ratio & Framing Gate

Before creating `script.json` or starting video render, the agent must ask the user to confirm their target video aspect ratio (`aspect`) unless explicitly stated in the initial prompt:

- `9:16` (Vertical / Khung dọc - Mobile, Shorts, TikTok, Reels, Mobile Training) — *Recommended default*
- `16:9` (Landscape / Khung ngang - Desktop, YouTube, Web, TV)
- `4:5` (Social Feed / Khung 4:5 - Facebook Feed, Instagram, Social Post)

Always write the selected value to `script.json` under `"aspect"`.

## Script And Scene Rules

- Use `renderer: "hyperframes"` and one aspect for the whole series.
- **Video Persona**: Differentiate between short social media clips and **Long-form Technical Training Videos (Video Đào Tạo, 3-5 minutes)**. The pacing and the hook escalate differently; the scene language is bespoke either way.
- **Scenes are designed per video, never picked from a shelf.** Each video gets
  its own scene set in `scripts/scene-kit/sets/`, drawn for its narration.
  There is no shelf left to pick from, and no catalog to browse: every generic
  template was deleted (§0d) and `templates/CATALOG.md` went with it. The only
  machine-readable description of a scene is its own `slots.json`.
- **Sentence contract** (chốt 30/09/2026 — hình nhảy theo đúng câu nói):
  **one sentence = one `voiceSegments` entry = one visual beat.** A scene with more
  than one sentence must split it into `voiceSegments`, one sentence each (at most 8
  per scene; more sentences → another scene). The pipeline synthesizes each sentence
  separately and turns its measured start time into `inputs.delays`; the template's
  `beatTimes(N, …)` has N equal to the sentence count, and beat i changes the picture
  for sentence i at `t[i]`. A beat may bring in a new picture, or add to, animate or
  change the one already on screen — but it happens at the sentence's start, never
  on a guessed time. `script:validate` rejects a segment with two sentences, a
  multi-sentence scene without segments, and a template whose beat count differs
  from its sentence count.
- **Taste-Skill Anti-Slop Standard (`.agents/skills/design-taste-frontend/`)**:
  `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 8`, `VISUAL_DENSITY: 4`.
- Written brand forms listed in the guideline's `narration.replacements` must be spoken as their full form (`Thành Vinh Holdings`) in every `voiceText`.

## Visual Design Standard

Approved by the user on 2026-09-24; **on-screen text rule tightened 30/09/2026**
(see rule 0). The reference for frame, scale and motion is
`scripts/scene-kit/sets/cdkh1.mjs` ("Chân dung khách hàng · Phần 1") — read it
before designing a new set, but do **not** copy its text density: its definition
paragraphs and sub-lines break rule 0.

### 0. Hình minh họa cho lời đọc — không chép chữ lên màn hình *(chốt 30/09/2026)*

Hình ảnh giờ làm việc giống lời đọc ở trên: **bám sát nội dung, thể hiện rõ, nhưng bằng
hình và chuyển động chứ không bằng chữ.** Lời đọc giải thích; màn hình cho người xem
*thấy* điều đang được nói.

- **Không hiện lại nguyên văn, không ghi đầy đủ lên màn hình.** Không chép câu lời đọc,
  không chép câu tài liệu, không có đoạn định nghĩa hay câu phụ đề dưới tiêu đề.
- **Chữ chỉ còn là từ khóa:** nhãn ngắn, con số, số thứ tự bước, tên riêng — mỗi khối
  **≤ 8 từ**, cả cảnh **≤ 25 từ** khi đã hiện hết (cảnh trên 3 câu được thêm 5 từ mỗi câu,
  vì mỗi câu mang một hình có nhãn riêng). `script:validate` báo lỗi khi một khối
  chữ quá 8 từ hoặc trùng từ 5 từ liên tiếp trở lên với lời đọc, và cảnh báo khi cả cảnh
  quá 25 từ.
- **Câu nói nào cũng có hình minh họa phù hợp trong khung đang hiện.** Không đếm máy móc
  "một đoạn lời một hình": một hình lớn có thể đứng suốt nhiều câu cùng ý, hoặc được thêm
  chi tiết, đổi trạng thái, nối thêm hình khi câu mới nói ý mới. Điều bắt buộc là lúc nào
  câu đang đọc cũng có trên màn hình một hình đúng ý với chính câu đó, và **hình nhảy
  đúng lúc câu nói bắt đầu** — không sớm hơn, không trễ hơn (Sentence contract ở
  "Script And Scene Rules"). Ghi `visual` dạng danh sách, mỗi câu một mô tả hình. Hình phải nói được ý kể cả khi tắt tiếng: người
  xem nhìn là hiểu đang nói về cái gì và quan hệ giữa các ý (nguyên nhân → kết quả,
  trước → sau, bước này → bước kia).
- **Bám nguồn như lời đọc:** chỉ vẽ thứ có trong tài liệu — không thêm số liệu, ví dụ,
  nhân vật hay ẩn dụ làm lệch nghĩa. Con số trên màn hình phải có trong tài liệu.
- **Ghi ý đồ hình vào `visual`** của mỗi cảnh trong `script.json` (thiếu thì
  `script:validate` cảnh báo): hình gì, chuyển động gì, cho đoạn lời nào. Cột này xuất
  hiện trong `script-review.md` để người duyệt đọc cùng lời đọc.
- **Hình theo loại nội dung** (cùng cách phân loại trong `analysis`):

  | Loại nội dung | Màn hình thể hiện |
  |---|---|
  | Khái niệm | Một hình ẩn dụ/hình mẫu của chính khái niệm (vd. đám đông → một người được khoanh ra), tên khái niệm làm nhãn |
  | Nguyên tắc | Biểu tượng cho từng nguyên tắc lần lượt bật sáng; nhãn 2–4 từ |
  | Quy trình | Đường đi có số bước; icon từng bước hiện và nối dây theo đúng bước đang đọc |
  | Danh sách | Icon/hình từng ý xuất hiện lần lượt, ý đang đọc sáng lên |
  | Phân loại | Các nhóm tách thành cột/khung, vật thể rơi vào đúng nhóm |
  | So sánh | Khung chia đôi, hai bên đối xứng; điểm khác biệt đổi màu/nhấp nháy |
  | Hướng dẫn | Mô phỏng thao tác (màn hình, con trỏ bấm, tay làm) theo từng bước |
  | Điều kiện / Lưu ý | Biển báo, con dấu, ngã rẽ đúng/sai |
  | Ví dụ / Tình huống | Vẽ chính tình huống trong tài liệu: nhân vật, bối cảnh, việc xảy ra |
  | Số liệu | Số lớn đếm lên, thanh mọc, biểu đồ vẽ dần — chỉ số có trong nguồn |
  | Kết luận / Điểm cần nhớ | Các icon của cả video gom về một khung, từng cái sáng lại |

The earlier dark-card style was rejected: every scene was a dark canvas, a
top-left headline and rounded translucent cards, and varying only how the cards
were arranged made every scene read as the same slide on a phone. What makes a
viewer register "new scene" is the frame, the scale, the picture and the
motion — so those are what must vary.

### 0b. Hình phải rõ — soát độ rõ, không chỉ soát đúng nhịp *(chốt 01/10/2026)*

Hai video OKRs đầu tiên đúng nhịp từng câu nhưng bị trả về vì **nhìn không rõ**. Soát
khớp theo câu chỉ trả lời "hình có lên đúng lúc không"; mục này trả lời "người xem có
hiểu hình không". Mọi cảnh phải qua đủ các điểm sau trước khi render:

1. **Lấp đầy khung.** Ở trạng thái cuối, nội dung phủ ≥ 62% chiều cao vùng dùng được và
   không có dải trống nào cao hơn 260 px. Đo bằng
   `python scripts/scene-kit/audit_frame.py <ảnh cuối cảnh>`. Cảnh ít nội dung thì phóng to
   hình, không để nửa khung trống.
2. **Chữ đọc được trên điện thoại.** Nhãn ≥ 28 px (canvas 1080), nhãn chính ≥ 34 px.
   `build.mjs` in cảnh báo `! chữ nhỏ hơn 28px` — không được còn cảnh báo.
3. **Biểu tượng nào cũng có nghĩa ngay.** Hình ẩn dụ (tên lửa, bóng đèn, ống nghiệm, bệ
   phóng, cán cân…) phải kèm nhãn 1–3 từ nói nó là gì. Không để biểu tượng đứng một mình
   mà người xem phải đoán.
4. **Tương phản.** Không vẽ mực trên nền mực, vàng trên nền vàng. Kiểm từng biểu tượng
   trên đúng màu nền của cảnh (lỗi đã gặp: cọc mốc đen trên nền đen chỉ còn đĩa tròn lơ
   lửng; kính lúp, bánh răng biến mất).
5. **Trạng thái đúng nghĩa.** Dấu tích, thanh đầy, "100%" chỉ hiện khi lời đọc nói việc
   đó đã xong/đạt. Cột mốc chưa tới thì là cột mốc trống, không phải dấu tích.
6. **Không bóng mờ chồng lớp.** Nội dung của câu trước hoặc ở nguyên chỗ và vẫn rõ, hoặc
   biến mất hẳn (hay thu nhỏ về một góc). Không làm mờ rồi vẽ nội dung mới đè lên.
7. **Không nét thừa.** Đường nối phải đi từ một vật tới một vật; không có đường chéo cắt
   ngang hình, "tia" trang trí trông như vết xước.
8. **Hình gắn liền nhau.** Phần của cùng một vật (tên lửa và lửa đẩy, cọc và biển) phải
   dính nhau; hàng thẻ phải cân giữa khung, không lệch sát mép.
9. **Nhìn ảnh cỡ thật.** Người vẽ và QA mở ảnh cuối cảnh ở 1080×1350 (không phải ảnh
   ghép thu nhỏ) và tự hỏi: tắt tiếng, người mới xem có nói được cảnh này đang nói gì không?
10. **Đọc được ở 360 px (chốt 15/10/2026).** Chữ 28 px ở khung 1080 chỉ còn ~9 px trên điện thoại. `scene:qa` xuất `phone-sheet.png` — mọi cảnh ở 360 px trong một ảnh; người soi phải đọc được nhãn chính trên ảnh đó, nếu không thì phóng nhãn hoặc bớt chữ. Máy không đo được "đọc được", nên đây là mắt người.

### 0c. Taste rules cho khung hình video *(từ taste-skill, chọn lọc 01/10/2026)*

`.agents/skills/design-taste-frontend/` (taste-skill của Leonxlnx, đã cài, bản mới nhất) viết cho
trang web. Người vẽ cảnh đọc mục 4.2, 4.4, 4.7, 4.9 và 9 của nó; các điểm dưới đây là phần áp
được cho khung hình 1080×1350 và là bắt buộc:

1. **Một hệ bo góc cho cả video** (shape consistency lock): thẻ lớn 28–34 px, chip/nhãn bo tròn
   hẳn, ô nhỏ 16–20 px. Không trộn góc vuông với góc tròn tuỳ hứng.
2. **Khoá màu nhấn** (color consistency lock): chỉ vàng thương hiệu làm màu nhấn. Màu thứ hai
   (đỏ san hô) chỉ dùng cho đúng một nghĩa trong cả video — "sai / chưa đạt" — không dùng trang trí.
3. **Không lặp một kiểu bố cục quá hai cảnh liền nhau** (section-layout-repetition ban): lưới thẻ,
   hàng ngang, chia đôi, một hình khổng lồ… phải xen kẽ. Tránh mặc định "ba thẻ bằng nhau xếp hàng".
4. **Thẻ chỉ dùng khi cần nhóm nội dung.** Không bọc mọi thứ trong thẻ; để hình lớn đứng thẳng
   trên nền khi nó là nhân vật chính.
5. **Bóng đổ nhuốm màu nền**, không dùng bóng đen thuần trên nền sáng; không viền phát sáng neon.
6. **Khoảng cách đều và có chủ ý:** lề 60 px, khoảng giữa các khối theo bội số 20 px; không có
   phần tử lơ lửng với khe hở lẻ.
7. **Phân cấp bằng độ đậm và màu trước, cỡ chữ sau:** mỗi cảnh một điểm nhấn lớn nhất, các nhãn
   cùng cấp cùng cỡ.
8. **Không số liệu "trông cho chuyên nghiệp"** (fake-precise numbers): con số trên hình phải có
   trong tài liệu; cột, thanh minh hoạ thì để trống nhãn.
9. **Tự soát chữ trước khi giao** (copy self-audit): đọc lại mọi nhãn trên khung; nhãn nào tối
   nghĩa, cụt, hay "nghe cho hay" thì viết lại cho rõ.

**Chuyển động** (taste-skill §5–§7, high-end-visual-design §5–§6) — video của ta là trang web
được chụp từng khung, nên áp trực tiếp. Đã đóng gói thành bộ chuyển động dùng chung
`scripts/scene-kit/motion.mjs` (`${MOTION}`: `enter`, `leave`, `stagger`, `spread`, `draw`, `grow`,
`wipe`, `travel`, `turn`, `idle`, `at`); cảnh mới dùng bộ này, không tự viết hàm riêng:

10. **Chuyển động phải có lý do:** thể hiện thứ tự, nguyên nhân → kết quả, đổi trạng thái, hoặc
    chỉ chỗ cần nhìn. Không trả lời được "nó nói lên điều gì" thì bỏ.
11. **Có khối lượng, có đàn hồi:** easing lấy từ `EASE` (`out`, `heavy`, `spring`, `inOut`, `slam`),
    thời lượng lấy từ `DUR`; cấm `linear`, `ease-in-out` và thời lượng tự đặt.
12. **Chỉ animate `transform`, `opacity`** (thêm `clip-path`, `stroke-dashoffset`, blur ngắn lúc
    vào); không animate `top/left/width/height`.
13. **Tối đa ba thứ vào cùng lúc**, còn lại so le 0,14 giây.
14. **Mỗi cảnh tối đa một chuyển động lặp** (trôi nhẹ); hình thông tin thì đứng yên.
15. **Một phần tử một animation** — bộ chuyển động tự hiện băng đỏ "LỖI: … có 2 animation" lên
    khung hình nếu vi phạm.
16. **Kiểu chuyển động theo loại nội dung:** quy trình thì *đi* từ bước này sang bước kia
    (`travel`, `draw`); so sánh thì *quét* vào từ hai phía (`wipe`); số liệu thì *mọc* (`grow`);
    kết luận/đánh giá thì *đóng dấu* (`stamp`); hình chính vào *nặng, mềm* (`soft`); nhãn nhỏ *bật* (`pop`).

Phần của taste-skill **không áp** ở đây: đổi phông, đổi bảng màu sang hệ khác (bảng màu TVHS là
cố định), thư viện icon/React/Tailwind/GSAP/Framer Motion (trình dựng cần keyframe CSS tua được),
hiệu ứng theo cuộn trang và di chuột, dark mode, `prefers-reduced-motion`, và lệnh cấm SVG tự vẽ (kho minh
hoạ `illus.mjs` là SVG phẳng theo nhận diện thương hiệu).

### 0d. Cấm tuyệt đối template catalog generic và phôi stub (chốt 03/10/2026, hoàn tất 08/10/2026)

Sự cố 03/10/2026: Một số video bị render bằng các template generic đóng sẵn (`frame-flow-steps`, `frame-feature-grid`, `frame-aicoding-list`...) biến video đào tạo thành slide hộp chữ tối thô kệch; và một số video bị render phôi giữ chỗ (`<div>hook</div>`, `<div>err1</div>`...) thành màn hình đen. Từ nay áp dụng các lệnh cấm tuyệt đối:

1. **Đã xoá bỏ và cấm hoàn toàn template catalog generic khỏi pipeline (chốt 03/10/2026, hoàn tất 08/10/2026):** Toàn bộ **17** template catalog generic đã bị **xoá vĩnh viễn** khỏi `templates/`:
   `frame-flow-steps`, `frame-feature-grid`, `frame-aicoding-list`, `frame-bold-poster`, `frame-glitch-title`, `frame-aicoding-comparison`, `frame-code-terminal`, `frame-table-permission`, `frame-title-section`, `frame-doc-callout`, `frame-build-minimal`, `frame-vignelli`, `frame-pentagram-stat`, `frame-statement-outro`, `frame-liquid-bg-hero`, `frame-creative-voltage`, `frame-logo-outro`.
   Kèm theo đó, các thành phần phụ thuộc chúng cũng đã bị gỡ khỏi codebase:
   - `src/script/script-generator.ts` + `src/script/generate-script-cli.ts` + lệnh `npm run script:generate` — **xoá**, vì sinh script máy móc bằng template generic. Từ nay AI là tác giả narration, scene-kit dựng hình, `script:validate` gác cổng.
   - bảng hardcoded `TEMPLATE_INPUT_LIMITS` trong `src/render/template-input-limits.ts` — **xoá sạch**; giới hạn hiển thị chỉ còn đọc từ `templates/<id>/slots.json` do `build.mjs` sinh.
   - các nhánh SFX theo template generic trong `src/render/template-pipeline.ts` — **xoá**; outro giờ nhận diện bằng `scene.type === "outro"`.
   - `templates/CATALOG.md` — **xoá hẳn** (08/10/2026). Không còn tài liệu mô tả template viết tay nào để đọc sai; thông tin slot của một cảnh chỉ nằm ở `templates/<id>/slots.json` do `build.mjs` sinh ra.
   Lệnh `npm run script:validate` tự động chặn và báo LỖI chí mạng nếu bất kỳ kịch bản nào gán một trong 17 id trên. Bắt buộc 100% video phải có bộ Scene-Kit độc bản riêng trong `scripts/scene-kit/sets/`, **kể cả cảnh outro** (`frame-<set>-outro`).
2. **Cấm nạp template phôi stub vào render:** Không được phép đưa bất kỳ template nào còn chứa phôi giữ chỗ thô (`<div>hook</div>`, `<div>err1</div>`, `<div>zones</div>`...) vào file kịch bản. `build.mjs` sẽ gắn cờ cảnh báo và `script:validate` sẽ báo lỗi từ chối ngay lập tức.
3. **Cổng nghiệm thu trực quan (Visual Inspection Gate) bắt buộc:** Script validate đạt `0 errors` chỉ là điều kiện cần về kỹ thuật cú pháp. Điều kiện đủ để ký duyệt render là Master Agent và QA phải xuất ảnh tĩnh cỡ thật (1080×1350) bằng `preview.ts`, mở ảnh kiểm tra trực tiếp bằng mắt: phải có hình vẽ SVG độc bản, chữ là từ khóa ngắn gọn, độ phủ ≥ 62%, không có cảnh nào toàn chữ hay màn hình đen.


1. **Brand Palette Preservation & External Platform Exception** *(Chốt theo chỉ đạo trực tiếp của người dùng)*:
   - **Màu thương hiệu công ty (TVHS):** Bắt buộc giữ nguyên hệ màu nhận diện thương hiệu công ty xuyên suốt mọi video (Nền Obsidian / Deep Charcoal `#080A0E` / `#0A0C10` / `#0C0C0C`, Gold hoàng gia `#C5A059` / `#E0C286`, Chữ trắng `#FFFFFF` và xám `#EDEDED`, glow tiêu điểm vàng `#C5A059`). Tuyệt đối cấm dùng các màu nền ngẫu nhiên như giấy kem (cream paper), tím mận, hay xanh lá phủ toàn khung cho nội dung của công ty. Sự biến thiên giữa các cảnh đến từ bố cục (layout scale), hình minh họa độc bản, và chuyển động mang nghĩa.
   - **Ngoại lệ duy nhất cho các cá thể bên ngoài:** Chỉ các nền tảng, thương hiệu thứ ba được nhắc đến trong nội dung (ví dụ: Google `#4285F4`, Facebook `#1877F2`, TikTok `#FE2C55` / `#25F4EE`, YouTube `#FF0000`, Shopee `#EE4D2D`) mới được sử dụng màu nhận diện thương hiệu của họ trên thẻ, badge, mockup điện thoại hay điểm nhấn trực quan. Còn lại tất cả các cảnh và nội dung của công ty phải giữ nguyên màu thương hiệu TVHS.
2. **Scale and layout.** No fixed header skeleton. Vary where the headline sits
   and how large it is, or let the picture be the headline. Each video has at
   least one scene built around a giant element (a huge word, number or split).
   Poster scenes are absolutely positioned (`CANVAS` in `poster.mjs`).
3. **An illustration for every sentence.** Each spoken beat shows a drawn
   picture of what is being said — a person, a product, an object, an icon from
   `scripts/scene-kit/illus.mjs` — entering when that beat starts. The picture
   carries the idea; text beside it is a keyword at most (rule 0). A scene that
   is only text, or a picture next to a sentence, is not acceptable. Add missing pieces to `illus.mjs` in the same
   style: flat fills, brand palette, no gradients or ids, faceless people. Use
   photographs only when the user supplies them; the repository has no stock
   source.
4. **Motion that means something.** The motion acts out the narration's
   relationship — cause to effect, before to after, step to step. Beyond
   fade-and-rise: bars grow, lines draw themselves, panels wipe across, a stamp
   slams down, calendar dots fill in, an arrow travels from one icon to the next.
   Illustrations float gently after they land. Build all motion with
   `beatAnimations`, `timeAnim`, `drift` and `bobble` from `base.mjs` — they are
   seek-safe; never use `setTimeout` or `requestAnimationFrame`.
5. **Reveal.** Anything not yet spoken is fully hidden (opacity 0) but keeps its
   layout slot, so revealing it never shifts its neighbours.
6. **Focus.** On dark card scenes the card being spoken scales to `1.03` with the
   gold glow (`box-shadow: 0 0 35px rgba(197,160,89,0.45)`) via `beatAnimations`.
   On gold or paper frames, where a gold glow is invisible, the entrance motion
   carries the focus instead.
7. **Headlines** are keywords (≤ 8 words), at most two lines with no orphan word:
   write the break with `<br>`; `fitLines` is only the safety net. No subtitle
   sentence under the headline.
8. **Watermark and footer.** Keep the top-right 150 × 150 px clear. The footer
   (bottom 88 px) must read in every state of the scene: pick `FOOT("ink")` or
   `FOOT()` for the colour behind it, and stop a band or panel that wipes in
   above the footer (or reveal it with `clip-path`, not `translateY(100%)`, which
   leaves a strip showing under the footer before it arrives).
9. **Series identity.** The outro tagline and the spoken sign-off belong to the
   series. **No company slogan for now** *(chị Duyên 30/09/2026: bỏ "Kiến tạo giá trị
   thật" vì chưa chắc đúng tầm nhìn, định hướng của Sếp về TVHs)*: the outro shows the
   logo, "Thành Vinh Holdings", the next-part line and the URL, and the spoken sign-off
   is "Thành Vinh Holdings." `identity.tagline` stays empty until leadership confirms a
   slogan; the pulled line is in `identity.retiredTaglines` and `script:validate`
   rejects it anywhere in narration or inputs. "Thực chiến ứng dụng AI trong
   doanh nghiệp" belongs only to the AI article series. Never carry a slogan from
   one series into another.

## Scene-Kit Workflow

1. Write the narration beats (`voiceSegments`) first with explicit `visual[i]` descriptions for each sentence; the scene follows them.
2. **Stage 1 — Tranh vẽ SVG & Bố cục tĩnh (Specialist 4 · SVG & Visual Asset Designer):**
   - Vẽ kho tranh minh họa vector SVG độc bản cho video trong `scripts/scene-kit/sets/_<set>_illus.mjs` (hoặc mở rộng `illus.mjs`) bám sát mô tả `visual[i]`.
   - Thiết lập khung bố cục tĩnh: tranh lớn phủ ≥ 62% khung hình, chữ chỉ là từ khóa (nhãn ≤ 8 từ/khối, toàn cảnh ≤ 25 từ, cỡ chữ ≥ 28px).
   - Kiểm tra ảnh tĩnh bằng mắt và chạy `python scripts/scene-kit/audit_frame.py <static-frame>` đạt chuẩn trước khi chuyển sang làm chuyển động.
3. **Stage 2 — Hoạt họa Kinetic & Hoàn thiện bộ cảnh (Specialist 5 · Kinetic Motion & Animation Engineer):**
   - Tiếp nhận các component SVG và layout tĩnh đã duyệt, lắp ráp vào `scripts/scene-kit/sets/<set>.mjs` (default export `{ name, label, style: "poster", scenes }`). Template ids dạng `frame-<set>-<scene>`.
   - Gắn chuyển động kinetic với `${MOTION}` từ `motion.mjs` (`enter`, `leave`, `stagger`, `draw`, `grow`, `wipe`, `travel`...).
   - Triển khai `beatTimes(N, inputs, duration)` với $N = \text{số câu}$ khớp đúng mốc `delays` thực tế từ Specialist 3 (Audio).
   - Triển khai Speech-Synced Active Focus Glow (scale 1.03, viền sáng vàng `#C5A059` cho card/khối đang được đọc).
4. Run `node scripts/scene-kit/build.mjs <set>`. It writes each template's
   `index.html`, `compositions/feed.html` and `slots.json` (the display limits
   `script:validate` reads) — no hand edit of `template-input-limits.ts`.
5. Run `npx tsx scripts/scene-kit/preview.ts <templateId> 6 "0,0,0,0"` for every
   scene and put the end states side by side. Check that adjacent scenes differ
   in frame colour, every beat has a picture, the pictures alone tell what the
   narration says, no text block is a sentence, and nothing overflows or strands
   a word. Then `script:validate` checks the screen text against the narration. The preview takes its copy from the real `script.json` under `output/`.
6. For a new visual direction, build it on one video first and show the user an
   old-versus-new comparison before rolling it out.

`scripts/scene-kit/README.md` documents the helper API and the illustration
catalogue.

## Series Defaults

Confirmed with the user; apply to every new video unless told otherwise.

- Aspect `4:5`; voice `Trúc Ly cũ`, tone `tu_nhien`, speed `1.1` (chốt 16/10/2026: từ VieNeu 3.8.3, preset
  `Trúc Ly` là một giọng khác cùng tên; giọng của series là bản 3.3.0, nạp dưới tên `Trúc Ly cũ`).
- About three minutes per video, ±10–15 seconds (≤ 3:15). A longer document is
  split into parts **only after the user chooses** (length gate); never speed the
  voice up to fit, and never compress until the content turns generic.
- One sentence per `voiceSegments` entry, at most 45 words (the validator enforces
  both); write long sentences as two shorter ones rather than one long segment.
- Spoken forms for English terms: "AI Agent" → "AI Ây-giần", `AGENTS.md` →
  "Ây-giần chấm em đi", `.md` → "chấm em đi". "OKRs" → "ô ca rờ ét" and "KR" → "ca rờ" — written lower-case exactly like this, the form the reviewer confirmed by ear (chốt 01/10/2026; listed in the guideline's `narration.replacements`, so `scriptlib.spoken()` converts them and `script:validate` rejects the written form in narration). "USP" → "iu-ét-pi" (card shows USP;
  first used 30/09/2026 — confirm with the reviewer after the first listen). Metric abbreviations (CTR, CVR,
  CPC) are spoken by their Vietnamese names while the card shows the
  abbreviation.
- **Two content modes — pick by input folder, see "Ba Chế Độ Nội Dung" below.**
  Training material (every folder in `input/` except `Bài viết về AI/`) → Chế độ A:
  faithful to the source, spoken language, analysis and length gate first.
  `input/Bài viết về AI/` (AI series) → narration may be written fresh in the
  persona's voice.

## Ba Chế Độ Nội Dung

> Áp dụng TRƯỚC mọi nguyên tắc copywriting bên dưới. Khi mâu thuẫn, mục này thắng.

### Chế độ A — Học liệu đào tạo (mọi thư mục trong `input/` ngoài `Bài viết về AI/`)

Chị Duyên chốt ngày 30/09/2026, thay quy tắc "giữ nguyên văn từng câu" của ngày 28/09.
Việc không phải tóm tắt tài liệu thành lời đọc, mà là: **phân tích nội dung → xác định ưu
tiên → thiết kế cấu trúc nhận thức → chọn cách diễn đạt → viết lời đọc dễ tiếp thu khi người
học vừa nghe vừa nhìn.** Thứ tự ưu tiên: trung thành với nguồn → hiểu đúng → đủ cụ thể để áp
dụng → dễ tiếp thu với người trưởng thành → tối ưu thời lượng.

#### 1. Nguồn nội dung — nguyên tắc quan trọng nhất

- **Chỉ dùng thông tin có trong tài liệu.** Không thêm kiến thức ngoài (dù đúng), không suy
  đoán, không tự tạo ví dụ, tình huống, số liệu, giải thích hay lợi ích; không đổi nghĩa.
- **Được đổi cách diễn đạt:** rút gọn câu, sắp xếp lại thứ tự, chuyển văn viết thành văn
  nói, gộp ý trùng, lược chi tiết ít quan trọng, nói dễ nghe hơn — miễn giữ nguyên nghĩa.
- **Đổi cách nói, không đổi nghĩa.** Bài học 28/09 vẫn giữ: gốc *"khi kết quả không như mong
  đợi khi làm việc với người khác"* bị đổi thành *"khi thất bại"* là **sai nghĩa** ("không như
  mong đợi" gồm cả trễ tiến độ, không đúng kỳ vọng). Thuật ngữ chuyên môn và từ người biên
  soạn đã chọn kỹ thì giữ nguyên; chỉ đơn giản hoá phần diễn đạt quanh nó.
- **Ưu tiên khi chọn lọc:** mục lớn → ý chính → mục nhỏ → chi tiết → ví dụ. Không giữ chi
  tiết nhỏ mà bỏ mất ý chính của một mục lớn.
- **Tóm tắt không phải lược quá mức.** Nếu rút gọn làm nội dung chung chung, thiếu giải
  thích, mất quy trình, mất điều kiện áp dụng, mất ví dụ thực tế hoặc người học khó hình
  dung cách áp dụng → **dừng rút gọn, đi qua cổng thời lượng** (mục 3).

#### 2. Phân tích trước khi viết (`plan.json` → `analysis`)

- Đọc toàn bộ tài liệu. Chia thành nhóm nội dung và gán loại (`contentType`) theo bản chất
  thực tế: `khai-niem`, `nguyen-tac`, `quy-trinh`, `danh-sach`, `phan-loai`, `so-sanh`,
  `huong-dan`, `dieu-kien`, `luu-y`, `vi-du`, `so-lieu`, `tinh-huong`, `ket-luan`.
  `outline.json → contentHints` chỉ là gợi ý; người viết tự quyết.
- Với mỗi nhóm (`contentGroups[]`): người học cần hiểu gì; ý bắt buộc giữ (`mustKeep`); ý
  lược được (`canDrop`); ví dụ phải giữ để dễ hình dung (`examples`); chi tiết nào cần giải
  thích, phần nào để hình/chữ trên màn hình gánh, phần nào lời đọc gánh (`delivery`).
- Ghi logic tiếp nhận (`learningLogic`: cấu trúc chọn, thứ tự, lý do) và nguyên lý áp dụng
  (`principles`).
- **Mỗi loại nội dung một cách trình bày:**
  - Khái niệm → nêu bản chất → giải thích ngắn → ví dụ nếu tài liệu có.
  - Quy trình → giới thiệu toàn quy trình → nói số bước → lần lượt từng bước.
  - Danh sách → khái quát nhóm → lần lượt các ý quan trọng.
  - So sánh → tiêu chí/điểm khác biệt chính → rồi mới đến từng bên.
  - Ví dụ → đặt ngay sau khái niệm/nguyên tắc mà nó minh họa.
  - Hướng dẫn → mục tiêu/kết quả cần đạt → cách làm → lưu ý nếu tài liệu có.
  - Số liệu → chỉ đọc số cần để hiểu; số đã hiện trên màn hình thì không cần đọc lại.

#### 3. Cổng thời lượng — 3 phút hay tách video

- Mục tiêu **khoảng 3 phút, dao động 10–15 giây** (`targetDurationSec` ≤ 195). Không hy sinh
  độ đầy đủ và khả năng hiểu để ép vào 3 phút.
- Trước khi viết, tự hỏi: gói vào 3 phút thì người học có hiểu ý chính, hiểu cách áp dụng,
  đủ giải thích, còn ví dụ quan trọng, không bị quá tải, không thành bản tóm tắt chung chung?
  Ghi kết quả vào `analysis.fitsOneVideo`.
- **Đủ (`fitsOneVideo: true`)** → một video khoảng 3 phút, viết script bình thường.
- **Không đủ** → **không tự ép, không tự tách, không viết script.** Trình người dùng:
  1. tóm tắt phân tích & phân loại, tóm tắt logic tiếp nhận;
  2. nếu ép 3 phút sẽ phải bỏ gì, mất gì, vì sao ảnh hưởng hiểu/áp dụng — chỉ rõ ví dụ,
     quy trình, chi tiết thực tế có nguy cơ bị cắt (ghi vào `analysis.lossIfForced`);
  3. bảng đề xuất tách: Phần · Tên video · Nội dung chính · Nội dung quan trọng cần giữ ·
     Ví dụ/minh họa · Thời lượng dự kiến · Lý do tách. Cách chia bám cấu trúc thật của tài
     liệu; lý do dựa trên nội dung thật (nhiều nhóm độc lập, quy trình nhiều bước, ví dụ
     quan trọng, mật độ quá cao, độ phức tạp khác nhau…);
  4. phương án A (một video ~3 phút → hệ quả về độ đầy đủ) và phương án B (tách → lợi ích
     về giải thích, minh họa). Phân tích trade-off, không mặc định chọn phương án ngắn hơn.

  Dùng `AskUserQuestion`, ghi `lengthDecision: { status: "pending" }` khi đang chờ, và
  `{ status: "single" | "split", confirmedBy: "<ai> <ngày>" }` khi đã chốt.

#### 4. Cấu trúc nhận thức cho người trưởng thành

Các nguyên lý dưới đây chỉ để sắp xếp và truyền đạt nội dung đã có, không để thêm kiến thức.

1. **Relevance** — nội dung là gì, vì sao cần biết, liên quan gì đến công việc; chỉ nói khi
   tài liệu có cơ sở.
2. **Prior knowledge** — khi tài liệu nối các khái niệm với nhau: điều đã biết → nội dung
   mới → cách hiểu mới. Không đoán kiến thức nền của người học.
3. **Cụ thể trước khái quát khi phù hợp** — khái quát → giải thích → ví dụ, hoặc tình
   huống/ví dụ → rút ra nguyên tắc; chọn theo nội dung, không áp máy móc.
4. **Chunking** — gom ý liên quan thành cụm nhỏ; không dồn nhiều ý mới liên tiếp trong một
   đoạn lời.
5. **Cognitive load** — xác định ý nào cần nói, cần hiện, cần cả hai, hay bỏ khỏi lời đọc;
   lời và hình không cùng lúc đổ nhiều thông tin mới.
6. **Signaling** — câu chuyển ý, từ khóa, cấu trúc câu báo đâu là ý chính, điểm cần nhớ,
   bước tiếp theo; không lạm dụng câu dẫn.
7. **Progressive disclosure** — tổng quan → ý chính → chi tiết → ví dụ.
8. **Củng cố** — cuối video dùng điểm cần nhớ, checklist, kết luận, câu hỏi **có sẵn trong
   tài liệu**; không tự tạo.

#### 5. Lời đọc và hình

- **Lời đọc không đọc lại màn hình.** Thứ đã rõ trên thẻ, bảng, sơ đồ, quy trình thì lời đọc
  giải thích, dẫn dắt, nhấn mạnh, nối ý. Nội dung khó thể hiện bằng hình thì lời đọc gánh.
- Cột `visual` của mỗi cảnh chỉ đề xuất thứ có trong tài liệu, không tạo thông tin mới.
- **Văn nói:** tự nhiên khi đọc to, câu ngắn, ít mệnh đề, không giọng hành chính, không
  cường điệu, không ngôn ngữ quảng cáo nếu tài liệu không có, không thuật ngữ thừa, không
  ví dụ ngoài tài liệu. Không dùng "như chúng ta đã biết", "tiếp theo chúng ta sẽ…",
  "hãy cùng tìm hiểu…" (`script:validate` báo lỗi `filler-phrase`).
- Nguyên tắc 8–16 bên dưới (chống màu hồng, chuyện lần mình sai, trước/sau bằng số…)
  **không áp** cho chế độ này. Đọc số thành chữ và phát âm tên tiếng Anh theo bảng vẫn áp.

#### 6. Kịch bản gửi duyệt (`script-review.md`)

`script:validate` xuất bảng: **STT · Mục/Phần** (`section`, bám mục lục tài liệu) **· Nội dung
lồng tiếng** (`voiceText`) **· Nội dung trực quan nên xuất hiện** (`visual`) **· Thời lượng ước
tính**, cuối bảng ghi *Tổng thời lượng ước tính: X phút Y giây*. Gửi kèm tóm tắt phân tích và
logic tiếp nhận (lấy từ `analysis`).

#### 7. Tự kiểm tra trước khi gửi

1. Nguồn — có thông tin nào không nằm trong tài liệu?
2. Độ phủ — các mục lớn quan trọng đã có đủ?
3. Ưu tiên — đúng thứ tự mục lớn → ý chính → chi tiết → ví dụ?
4. Người trưởng thành — cách trình bày hợp nguyên lý ở mục 4?
5. Tải nhận thức — vừa nghe vừa nhìn có theo kịp?
6. Áp dụng được — rút gọn có làm mất ví dụ, chi tiết, hướng dẫn cần thiết?
7. Văn nói — đọc to có tự nhiên?
8. Lời/hình — lời đọc có đang đọc lại toàn bộ màn hình?
9. Thời lượng — trong 3 phút ±15 giây?
10. Tách — nếu 3 phút không đủ, đã đề xuất tách thay vì tiếp tục rút gọn?

Phát hiện vấn đề thì tự sửa trước khi gửi. Nguyên tắc cuối: **hiểu đúng → hiểu đủ → hiểu dễ →
hình dung được → nhớ được**, thay vì càng ngắn càng tốt.

#### 8. Voice-over người duyệt gửi

Khi người duyệt gửi file voice-over đã duyệt (vd. `input/2026-09-30_script-video-chan-dung-khach-hang.xlsx`,
chân dung khách hàng tách thành 3 video), dùng nguyên văn làm `voiceText`, chỉ chuẩn hoá
cách đọc số và tên tiếng Anh. Phương án tách trong file đó coi như đã được chốt.

### Chế độ B — Chuỗi bài AI (`input/Bài viết về AI/`)

1. Được viết lời đọc mới theo giọng "mình – bạn"; áp đủ nguyên tắc 1–16 và các ràng buộc 3–12 dưới đây. *(Các ràng buộc 3–12 đã distill từ bộ skill viral bên ngoài vào thẳng file này ngày 08/10/2026 — đọc ở đây, không đọc lại bản vendor.)*
2. **Khoảng 3 phút.** Giọng TTS hiện tại đọc khoảng **215 từ/phút** (đo trên 3 video ngày 25/09) → lời đọc khoảng **600–680 từ**.
3. **Ràng buộc 3-Layer Hook chuẩn Viral (`viral-hooks`):**
   - Mọi video bắt buộc đồng bộ 3 lớp trong 3 giây đầu tiên:
     * **Visual Hook (Lớp hình):** Tranh vẽ SVG mang tính ngắt nhịp chú ý (Pattern Interrupt — tình huống kịch tính, sự cố, mâu thuẫn đối lập). Cấm mở đầu bằng khung hình tĩnh hay chuyển cảnh chậm.
     * **Verbal Hook (Lớp lời đọc):** Câu thoại mở đầu $\le 3$ giây (dưới 15 từ), chạm ngay vào nỗi đau hoặc tuyên bố đảo ngược niềm tin. **CẤM TUYỆT ĐỐI câu hỏi khởi động chậm (throat-clearing)** như: *"Có bạn nào từng..."*, *"Chào các bạn hôm nay..."*, *"Bạn có bao giờ tự hỏi..."*.
     * **Text Overlay (Lớp chữ tiêu đề):** 3 đến 7 từ giật điểm chú ý (`MẤT TRẮNG BUỔI SÁNG`, `AI BỊA SỐ`), tuyệt đối không chép lại câu thoại.
   - **Khai báo Hook Archetype:** Chọn 1 trong các Archetypes đã được kiểm chứng: `Contrarian` (Đảo ngược niềm tin), `Investigator` (Bóc trần sự thật ngầm hiểu), `Teacher` (Kết quả cụ thể bất ngờ), `Experimenter` (Thử nghiệm thực tế).
4. **Ràng buộc cấu trúc giữ chân người xem (`viral-short-form`):**
   - **Retention Curve:** Hook (0–3s) $\rightarrow$ Escalation (3–30s: leo thang kịch tính, đào sâu mâu thuẫn) $\rightarrow$ Payoff (30–150s: cách giải quyết mới, 3 việc thật cụ thể) $\rightarrow$ Actionable CTA (150–180s: kêu gọi bình luận/hành động cụ thể, gắn liền với bài tiếp theo).
5. Gọi tên công cụ là **"ChatGPT trả phí"** và **"Claude trả phí"**, không viết "ChatGPT công ty cấp". Nhắc cả hai song hành.
6. **Không mượn trải nghiệm của video tham khảo** (`input/Cách Mình Dùng Claude Cowork…`). Video đó của người khác: chỉ học cách hành văn, không nêu tên, không chép câu chuyện hay con số của họ (*"không xuất phát từ ngành IT"*, *"thề luôn ngán paperwork"*, *"15–30 phút xuống 10 phút"*, *"thuê designer 2 triệu"*). Trải nghiệm thật đã xác nhận của người kể: dùng AI lên kế hoạch ngày; dùng AI viết SOP; không dùng AI để viết, chỉ để phản biện — **chưa có số phút thật, không tự điền**. Cần chuyện khác thì dùng tình huống giả định nói rõ là "tưởng tượng".
7. Phần text đăng dưới video **không kể lại video** — chỉ trả lời: bắt đầu từ đâu · thao tác thế nào · thao tác ở đâu.
8. **Chữ trên màn hình là bản kể cho người xem tắt tiếng (distill 08/10/2026).** Khoảng 85% người xem video xã hội ở chế độ im lặng, nên nếu tắt tiếng mà không hiểu video nói gì thì coi như video không tồn tại. Chữ khoá trên khung hình phải tự kể được mạch chính — vẫn giữ luật ≤ 8 từ/khối và không bao giờ chép nguyên văn lời đọc (mục 0). Chữ phải nằm trong vùng an toàn: tránh 180px trên và 320px dưới của khung 1080×1350 (chỗ UI nền tảng che).
9. **Một lời kêu gọi duy nhất mỗi video, nhắm vào Lưu hoặc Gửi.** Lưu (nội dung hướng dẫn, danh sách, quy trình) và Gửi cho đồng nghiệp (câu chuyện, tình huống nhận ra mình) là hai hành động được thuật toán tính nặng nhất; Thích và Theo dõi gần như không mua được phân phối. Chồng nhiều lời kêu gọi làm loãng tất cả — chọn **một** hành động khớp với dạng nội dung, đặt quanh mốc 70% thời lượng.
   - **CẤM mồi tương tác (engagement bait)** — bị tính là vi phạm và bị trừ phân phối: *"comment CÓ để nhận link"*, *"tag một người bạn"*, *"like để ra phần 2"*, *"theo dõi để xem thêm"*, *"lưu lại đi kẻo mất"*. Thay bằng lý do thật: *"Lưu lại để lúc làm thì mở ra làm theo từng bước"*.
10. **Text đăng dưới video là mặt SEO, hashtag thì không.** Nền tảng đọc text đăng để phân loại và cho tìm kiếm trong app; hashtag không còn là đòn phân phối. Câu đầu phải tự đứng được (nó hiện trước nút "xem thêm") và chứa từ khoá chính một lần, sớm. Tối đa **3–5 hashtag đúng ngách** — không tường 20–30 tag, không `#fyp`, `#xuhuong` vô nghĩa. Thông tin dài (link wiki, tên công cụ, các bước) để ở bình luận ghim, không nhồi vào text đăng.
11. **Chốt giữ chân theo độ dài (completion rate).** Tỷ lệ xem hết là cổng quyết định phân phối, nặng hơn mọi lượt thích. Mốc làm việc: **~70%** cho clip 15–30s · **~50%** cho 30–60s · **~40%** cho 60s+. Video 3 phút của chuỗi này nằm ở bậc khó nhất, nên:
    - Giữ được **≥ 85% người xem qua giây thứ 3** là điều kiện sống còn — đó là lý do luật 3-Layer Hook ở mục 3 nghiêm ngặt đến vậy.
    - Thiết kế cảnh cuối **mời quay lại cảnh đầu** (vòng lặp): câu kết nối lại hình ảnh của hook. Vòng lặp được tính là xem lại.
    - Mỗi câu phải có một nhịp hình mới lắp thêm vào cảnh (mục "CHUẨN CẢNH THEO VIDEO WIKI") — giữ chân bằng việc khung dày lên liên tục, không bằng việc cắt cảnh liên tục.
12. **Ý tưởng là một hệ thống, không phải cảm hứng.** Bí ý tưởng gần như luôn là thiếu **góc tiếp cận**, không phải thiếu **chủ đề**: một chủ đề có hàng trăm góc. Khi lên danh sách video cho chuỗi, mỗi dòng phải ghi rõ *chủ đề + góc + hành động mong muốn (Lưu/Gửi)*, không ghi mỗi chủ đề. Trang giấy trắng không sinh ra ý tưởng — ràng buộc mới sinh ra ý tưởng (một ngách, một dạng nội dung, một nỗi đau cụ thể của dân Back Office).

- **CẤM BỐ CỤC SLIDE THUYẾT TRÌNH (Anti-Slide Rut Rule — Chốt 07/10/2026):** Tuyệt đối cấm cấu trúc rập khuôn `Tiêu đề H1 lớn cố định ở trên + Khối tranh 1 bên + Cột thẻ chips 1 bên + Thanh hộp bar ở đáy`. Cấm lặp lại cùng một wireframe bố cục cho nhiều cảnh. Video phải mang ngôn ngữ điện ảnh chuyển động, không phải slide thuyết trình bấm Next.
- **Story-Driven Freestyle Canvas:** Toàn bộ khung hình 1080×1350 là một sân khấu thị giác tự do (Visual Stage) dựng từ con số 0. Câu thoại nói về điều gì thì vẽ đúng bối cảnh đó (màn hình rung tin nhắn, tệp Excel bay vào bàn, luồng dữ liệu SVG kết nối, máy quét chuẩn hóa, bục phát biểu chịu trách nhiệm...).
- **CHUẨN CẢNH THEO VIDEO WIKI (chốt 08/10/2026 — thay luật Phân rã Cảnh Ngắn 07/10):**
  Đo trên 5 video Wiki đã nghiệm thu (`aibasic`, `now2`, `integ1`, `dauthau2`, `cdkh1b`)
  so với bản 29 cảnh ngắn bị trả lại vì "đơn giản, trống trải":

  | | Wiki (TB 5 video) | bản 29 cảnh bị trả |
  | --- | ---: | ---: |
  | số cảnh / video ~2,5 phút | **9** | 29 |
  | độ dài một cảnh | **10–17 giây** | 5,1 giây |
  | câu / cảnh | **2–4** | 2,1 |
  | **hình vẽ / cảnh** (rect·circle·path) | **23–54** | 9 |
  | lệnh chuyển động / cảnh | 20–28 | 31 |

  Rút ra: vấn đề KHÔNG phải thiếu chuyển động (bản bị trả còn nhiều lệnh động hơn
  Wiki) mà là **vẽ quá ít** và **cắt cảnh quá nhanh nên mỗi cảnh không kịp dày lên**.

  Luật áp cho mọi video từ nay:
  1. **8–14 cảnh cho một video 2,5–3 phút**, mỗi cảnh **10–17 giây**, gom **2–4 câu**
     cùng một ý vào một cảnh. Không cắt cảnh theo từng câu.
  2. **Tối thiểu 25 hình vẽ mỗi cảnh.** Vẽ cả bối cảnh (người ngồi bàn, màn hình có
     nội dung, tệp bay, thư mục mở, trục có nút trượt, bảng có dòng số), không phải
     một biểu tượng đặt trong vòng tròn rồi gắn nhãn chữ.
  3. **Cấm hộp viền rỗng ruột.** Thẻ cao mà bên trong trống 60% là lỗi — cổng
     `audit_frame.py` tính viền thẻ là "đã lấp đầy" nên KHÔNG bắt được, phải tự soi mắt.
  4. **Cảnh lắp dần suốt chiều dài của nó**: khung mở ra gần như trống rồi mỗi câu
     lắp thêm một lớp, mỗi mảnh kèm nhãn của nó — xem `_cdkh1b_w2.mjs` làm mẫu.
  5. Hợp đồng một câu = một nhịp hình vẫn giữ nguyên: `beatTimes(N)` với N = số câu
     của cảnh, nhịp i đổi hình đúng lúc câu i bắt đầu.
- **Hình và chữ phải hiện đúng lúc lời đọc nhắc tới nó** *(chị Duyên nhắc 30/09/2026: "voice chưa
  khớp thời điểm text xuất hiện", coi nặng như lỗi chính tả)*. Mỗi câu là một
  `voiceSegments` riêng và một nhịp hình riêng; hình/chữ của câu hiện đúng lúc câu bắt đầu.
  Sau render, `npm run sync:check` trích ảnh ở đầu và cuối từng câu: đầu câu hình của câu đã
  hiện, cuối câu hình của câu sau chưa hiện.
- **Không để lỗi chính tả tới tay người duyệt.** Trước khi render: soát chính tả toàn bộ `voiceText` và chữ trên thẻ, và **so khớp lại với tài liệu gốc**. Người duyệt chỉ nên phải góp ý bố cục, thiết kế.
- **Duyệt kịch bản trước khi dựng.** Gửi `script-review.md` (bảng) cho người duyệt đọc trước khi render full — sửa trên kịch bản rẻ hơn sửa trên video đã dựng. `script.txt` chỉ là lời đọc thô cho CapCut.
- **Nhịp gửi duyệt:** mỗi video có ngày dự kiến gửi duyệt; trong lúc chờ feedback video trước thì làm video sau (lịch gối đầu).

### Chế độ C — Talking head từ clip quay thật (`docs/CHE-DO-C-SPEC.md`, chốt 22/10/2026)

Nguồn nội dung là **lời nói trong clip quay thật** của người dùng, không phải tài liệu và không phải narration do AI viết. Giọng là
audio gốc (không qua TTS). AI chỉ làm ba việc: **hiệu đính** transcript, lập **dàn ý** và đề xuất **cắt/đồ hoạ**; người dùng quyết định.

- **Hiệu đính** được sửa chính tả và ngữ nghĩa cho đúng điều người nói định nói, **không bịa nội dung** (không thêm ý, số liệu,
  tên riêng người nói không nói). Chỗ không chắc → ghi vào `questions.md` kèm mốc thời gian và **hỏi người dùng**.
- **Cổng:** người dùng xác nhận dàn ý + nêu yêu cầu cắt → duyệt danh sách cắt → chỉnh trong editor → xuất. Không có cổng giọng/TTS,
  không có `script-review.md`/`voice-preview.mp3`, không dùng `approval.json` (cổng của C là `th-approval.json`).
- **Cắt:** `th:cut-plan` chỉ gợi ý (từ đệm, lặng > 0,6 s, câu lặp); AI thêm cắt theo yêu cầu của người dùng, theo id mục dàn ý.
- **Đồ hoạ:** màu/font theo TVHS (vàng `#C5A059` là màu nhấn duy nhất; đỏ chỉ nghĩa "sai"); chuyển động dùng đúng preset của
  `scripts/scene-kit/motion.mjs`; cảnh `scene` chèn vào talking head là cảnh scene-kit thường, qua cổng của chế độ A/B (rule 0, 0b, 0c).
- **Quy tắc cứng (người dùng đặt 22–23/10/2026):** crop từ bụng lên; không vẽ/khoanh/mũi tên lên cơ thể người nói; overlay dịch người nói sang
  phía đối diện và chừa dải phụ đề (y 68–88%); mọi phần tử xuất hiện có SFX pop; màu minh hoạ khớp lời nói, không con số người nói không nói;
  minh hoạ vẽ riêng từng bài; không có cổng duyệt storyboard (duyệt trong editor); nhịp thị giác 3–6 s. Đủ danh sách: spec mục "Quy tắc cứng".
- **Vận hành:** QA editor bằng click thật, Ctrl+F5 sau đổi server, không PUT thử vào cổng 4350 của người dùng, chỉ dừng đúng PID mình mở,
  `nvidia-smi` trước Whisper. Đủ danh sách: spec mục "Vận hành".
- **Kỷ luật:** chỉ sao chép clip nguồn, không sửa/di chuyển bản gốc; không ghi đè output cũ; không render mp4 cuối khi chưa qua
  editor; thất bại 2 lần thì dừng.


## Copywriting & Narration Standards

Apply these core copywriting & humanizer principles (from `.agents/skills/ai-copywriter/`) to every generated `script.json` narration:

1. **Humanizer Anti-AI Slop Rules (`ai-copywriter`)**:
   - Ban overused AI jargon, inflated symbolism, and superficial `-ing` analyses (*pivotal, crucial, delve, tapestry, testament, underscore, showcase, vibrant, fostering*).
   - Spell out all numbers in Vietnamese (`tám bước`, `hai ba không không hai bảy`).
   - Keep prose human, direct, concise, and grounded in concrete facts.
2. **Concrete Reader-First Hook (`ai-copywriter`)**:
   - Never start with generic cliché metaphors like *"Viên domino đầu tiên..."* or vague intros.
   - Open immediately with the sharpest concrete detail, real-world pain point, or desired outcome the reader cares about (*"Bạn muốn AI tự động truy xuất Lark Wiki và gửi tin thay bạn?..."*).
3. **Root vs. Symptoms ("Học 1 Được 10")**:
   - Never just list isolated technical steps or buttons. Always explain the **underlying root concept** first (e.g. *"Scope OAuth không phải thủ tục hành chính — nó là tấm thẻ ra vào định danh AI chỉ được làm việc ở những phòng bạn duyệt"*).
4. **Conversational "Mình - Bạn" Experience-Sharing Tone**:
   - Write narrations as a trusted, warm, experienced mentor (`mình - bạn`) sharing battle-tested insights rather than an academic textbook reader.
5. **Conversational Lead-In Questions & Smooth Transitions**:
   - Start scenes with natural, curiosity-driven lead-in questions (*"MCP là gì? Dễ hiểu MCP giống như...", "Liệu kết nối này có an toàn không? Bạn cứ yên tâm...", "Bí quyết thực chiến của mình là..."*).
6. **Vivid Real-Life Metaphors & Counter-Examples**:
   - Use relatable real-life analogies to make complex technical rules memorable (e.g. comparing app approval rejection to missing a department ID on an official ID card).
7. **Immediate Action Loop (Thúc đẩy thực hành)**:
   - End training modules with energetic calls to action encouraging viewers to pause, open their console, and execute step 1 immediately.
8. **Chống Màu Hồng — Đặt Kỳ Vọng Thật Trước Khi Vào Bài**:
   - Trong vài câu đầu, chỉ thẳng ra người ta hay tô hồng AI thế nào và giới hạn thật của nó, trước khi liệt kê lợi ích (*"Nội dung về AI ngoài kia phần nhiều tô hồng... giao ẩu thì tốn công sửa hơn tự làm từ đầu"*). Thừa nhận giới hạn trước khi bán lợi ích khiến phần lợi ích sau đó đáng tin hơn.
9. **Một Câu Chuyện Thật Về Lần Mình Sai (uy tín qua thất bại)**:
   - Cài ít nhất một khoảnh khắc thừa nhận cụ thể: đã giao sai việc, mất bao lâu, rút ra bài học gì. Một câu chuyện thật về lần chính người kể sai luôn thuyết phục hơn một lời cảnh báo chung chung.
   - ⚠️ **Chỉ dùng chuyện THẬT đã được người kể xác nhận.** Chưa có thì hỏi, hoặc dùng tình huống giả định nói rõ là "tưởng tượng" — không bịa, không mượn chuyện của video tham khảo.
10. **Nêu Lộ Trình Ngay Sau Hook, Đánh Số Rõ**:
    - Ngay sau câu mở, nói luôn nội dung sẽ đi qua mấy phần theo thứ tự nào ("thứ nhất... thứ hai... cuối cùng") — người xem cam kết theo dõi vì biết trước phần thưởng cụ thể đang chờ ở đâu.
11. **Đối Chiếu Trước/Sau Bằng Số Cụ Thể**:
    - Mỗi lợi ích nên neo bằng một cặp số thật — trước mất bao lâu, sau còn bao lâu — đọc thành lời tự nhiên, không chỉ nói chung chung "tiết kiệm thời gian".
    - ⚠️ Số phải là **số thật của người kể** hoặc số đo được trong dự án. Câu mẫu cũ *"15 đến 30 phút… 10 phút"* là số của video tham khảo — **không dùng**.
12. **Nêu Rõ Ranh Giới — Việc Nào Tuyệt Đối Không Giao AI**:
    - Nói thẳng loại việc nào không bao giờ nên giao cho AI và vì sao, không chỉ liệt kê AI giỏi gì. Một giới hạn được tuyên bố rõ ràng làm người nghe tin nội dung hơn là chỉ khoe năng lực.
13. **"Rất Là" Chứ Không "Rất" (cường điệu kiểu nói)**:
    - Dùng cường điệu khẩu ngữ ("rất là nhiều", "rất là lâu", "cực kỳ tốn thời gian") thay vì cường điệu văn viết ("rất nhiều", "rất lâu"). Đây là khác biệt rõ nhất giữa văn nói thật và văn viết-đọc-lên.
14. **Mở Câu Bằng Từ Nối Khẩu Ngữ**:
    - Bắt đầu câu hoặc cảnh bằng "Nên là", "Vậy nên", "Thì", "Bởi vì", "Tại vì" thay vì mở thẳng bằng chủ ngữ trang trọng. Từ nối kiểu này không mang nghĩa ngữ pháp bắt buộc, nhưng là thứ phân biệt câu người ta *nói* với câu người ta *viết*.
15. **Tiểu Từ Cuối Câu Tạo Sự Gần Gũi**:
    - Thêm "á", "đó", "luôn", "mà" ở cuối câu đúng chỗ để tạo cảm giác thân mật, tự nhiên (*"mình dùng nhiều nhất luôn á"*). Chỉ dùng 1–2 lần mỗi video ở chỗ đắt nhất — lạm dụng sẽ thành giả tạo.
16. **Phản Ứng Thật Nằm Trong Luồng Câu, Không Phải Nhãn Dán Đầu Câu**:
    - "Mình phải thật sự wow" mạnh hơn "Wow, mình...". Đặt từ cảm thán vào giữa mạch câu như một người đang kể chuyện sống, không phải một tiêu đề gắn trước phát biểu.

Rules 8–16 were distilled from analyzing a real high-retention AI-content script
(case study kept at `input/Cách Mình Dùng Claude Cowork Tự Động Hóa 80% Công Việc
(Full Guide 2026)/`) — reread it when a narration feels flat to re-derive more patterns.
That video belongs to **another creator**: learn the phrasing only — never name them,
never reuse their stories or numbers as the narrator's own. Rules 8–16 apply to
**Chế độ B only**.

The executable schema is `src/render/template-script-schema.ts`. Display limits live in
`src/render/template-input-limits.ts` — update both when adding a template.

## Brand And Typography

Use `assets/brand/tvhs-logo.png` and the palette in
`assets/brand/tvhs-guideline.json`. Primary display accents are `#C5A059` and `#E0C286`;
the main canvas is `#0C0C0C`.

All rendered videos must feature the faint brand watermark (`assets/brand/watermark.png`, source: `D:\TVH\New folder\TVHS\logo\Asset 1.png`) in the top-right corner (`top: 44px, right: 44px`, `width: 84px`, `opacity: 0.40`). The pipeline applies this automatically during final audio-video muxing (`muxAudioOntoVideo`).

Apply these Vietnamese typography safeguards:

1. Normalize dynamic text with `normalize("NFC")`.
2. Use solid text colors.
3. Never use `background-clip: text`, transparent text fill, or transparent display text.
   Chromium clips stacked Vietnamese marks with this technique.
4. Wait for `document.fonts.ready` before measuring.
5. Use safe vertical padding and a line height that contains stacked marks.
6. Prevent browser-selected hero wrapping. Balance at most two lines, then fit
   deterministically after fonts load.
7. Keep large Vietnamese display text at zero letter spacing.

Run `src/render/typography-safety.test.ts` after template edits.

## Cache Invalidation

The pipeline reuses generated scene files, and decides for itself when they are
stale:

- Voice: `voice/scene-<id>.mp3` is reused while its `.cache-key` (narration text
  plus voice identity) matches. Changing narration, voice or tone re-synthesizes
  only the affected scenes.
- Clips: `clips/scene-<id>.mp4` is reused only while `clips/scene-<id>.clip-key`
  matches a hash of the template's composition source, every input (including
  `sceneDuration` and `delays`), the aspect and the frame rate. A redesigned
  template, new copy, new timing, or clips left behind by an older build are
  re-rendered automatically; a stale clip is logged as such.
- When a video is rebuilt from scratch, move the old output folder to
  `_archive-<date>-<note>` beside it instead of deleting it. Archived folders are
  ignored by the preview tool.

## Quality Gate

A request is complete only when:

- `plan.json` passes `plan:validate` — every source section assigned or skipped
  with a reason;
- training material: `plan.json` has an `analysis`, and any split was chosen by the
  user (`lengthDecision`);
- every `script.json` passes `script:validate` — schema, narration lint (including
  stock lead-ins), brand spoken forms, display limits, no fabricated statistics,
  duration ≤ 3:15 — and `script-review.md` was reviewed before the full render;
- one sentence per `voiceSegments` entry, one visual beat per sentence, and
  `sync-check.md` shows each picture arriving as its sentence starts;
- **scene-kit gates (locked 09/10/2026, all must pass before delivering):**
  `node scripts/scene-kit/build.mjs <set>` with no `❌`/`!` lines (new sets must declare
  `rulesRead` and pass `beats` as a list of per-sentence picture descriptions) →
  `npm run scene:static -- frame-<set>-` (no label shown before its sentence) →
  `npm run scene:rules -- <script.json>` (0 errors) → `script:validate` →
  `npm run pipeline:voice -- <script.json>` (voice, `timeline.json`, `voice-preview.mp3`; no render) →
  `npm run scene:qa -- frame-<set>-` (stills at the real beat times; no red
  "LỖI CHỮ TRÀN KHUNG"/"2 animation" banner; frame fill) → eye review of the
  full-size final still of EVERY scene against every **MẮT** row of the "Bảng RULE → CỔNG" →
  user confirms `script-review.md` and `voice-preview.mp3` → `npm run approve` →
  `npm run pipeline` → `sync:check` → `npm run video:qa -- "output/<group>/<name>"`
  (no red banner in any sync-check frame). A gate that was skipped is reported as
  skipped, never as passed. Passing the machine gates does not mean the rules are met:
  the table marks which rules no machine measures.
- the selected voice is confirmed or preview was explicitly waived;
- the final file is H.264 at the requested aspect and expected frame rate;
- stacked marks such as `Ề`, `Ố`, `Ỡ`, and `Ự` are intact;
- headlines do not have orphan words or arbitrary extra lines;
- visual text does not overlap;
- every scene passes the clarity checks of rule 0b (frame filled, text ≥ 28 px, every
  icon labelled, contrast, no ghost layers or stray lines) — checked on full-size stills;
- every scene shows an illustration and motion tied to its spoken beats, on-screen
  text is keywords only (no copied narration, no block over 8 words), and no two
  adjacent scenes share a frame colour;
- phone-size check and 7-criteria score (locked 15/10/2026): `phone-sheet.png` read at 360 px with no key label lost, and `scratch/qa-<set>/score.md` shows every criterion ≥ 8 before the full render. Both are judged by eye and must be reported as eye-checked, never as passed by a machine.
- the outro tagline and spoken sign-off match the series (see **Series
  identity**);
- tests and typecheck pass after code changes;
- no Git commit or push was made unless the user explicitly requested it.

## Machine Setup

For a new Windows machine, follow the root `README.md` and run:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\setup-windows.ps1
powershell -ExecutionPolicy Bypass -File scripts\doctor.ps1 -RunTests
npm run tts:server
```

Wait for `http://127.0.0.1:8124/health` to report `status: ready` before preview or render.
The first TTS and HyperFrames run may populate model, browser, and font caches.

Chế độ C (talking head) cần thêm môi trường ASR riêng:

```powershell
npm run th:setup
```

`th:setup` (`scripts/setup-asr.ps1`) tạo `.venv-asr/` và tải model (Whisper large-v3, wav2vec2 tiếng Việt, Silero VAD,
DeepFilterNet3; khoảng 6 GB). Yêu cầu **GPU NVIDIA** (khuyến nghị ≥ 8 GB VRAM, driver có CUDA); không có GPU thì phiên âm rất chậm
và không được hỗ trợ. Không đụng `.venv-vieneu`. Chi tiết: `docs/CHE-DO-C-SPEC.md`.

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
