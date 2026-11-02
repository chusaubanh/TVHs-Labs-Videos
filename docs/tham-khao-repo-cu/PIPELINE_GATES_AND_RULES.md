# CLAUDE.md — Hợp đồng vận hành ThanhVinhStudio Video Pipeline

Đây là repo độc lập của Thanh Vinh Holdings: biến tài liệu tiếng Việt trong `input/` thành
video có nhận diện thương hiệu TVHS, dùng VieNeu-TTS, HyperFrames và FFmpeg, chạy local trên
máy người dùng. File này là hợp đồng vận hành giữa Claude và repo — đọc **đầu tiên**, trước khi
đọc `SKILL.md` hay `AGENTS.md`, mỗi khi bắt đầu một phiên làm việc mới trong thư mục này **và mỗi khi bắt
đầu dựng một bộ cảnh** (kể cả giữa phiên, kể cả sau khi hội thoại bị tóm tắt): xem mục "Bảng RULE → CỔNG"
ở cuối file rồi đọc lại `SKILL.md` "Visual Design Standard". `build.mjs` chặn bộ cảnh mới chưa khai `rulesRead`.

Coi repo root là skill hoàn chỉnh. Không tạo project lồng, không nhân bản source code,
template, model hay brand asset ra chỗ khác.

## 1. Thứ tự đọc

1. **`CLAUDE.md`** (file này) — quy tắc vận hành, kiến trúc thư mục, việc không được làm.
2. **`.claude/skills/thanhvinh-video-pipeline/SKILL.md`** — adapter discovery cho Claude Code,
   trỏ sang root `SKILL.md`.
3. **`SKILL.md`** (root) — quy trình 15 bước đầy đủ, "Ba Chế Độ Nội Dung", Visual Design
   Standard, Scene-Kit Workflow, Quality Gate. Đây là nguồn sự thật cho **cách làm**.
4. **`AGENTS.md`** — mô hình Multi-Agent (1 Master + 7 Specialist, ba tầng model ở mục 2b), ai sở hữu phần nào của
   `script.json`, hàng đợi bàn giao. Đây là nguồn sự thật cho **ai làm việc gì**.

   Trong Claude Code: **Opus (phiên chính) nhận thông tin, giao việc và kiểm định**; **Sonnet** (`tvhs-specialist`) nhận
   lệnh và lên kế hoạch thành các phiếu việc nhỏ; **Haiku** (`tvhs-executor`) là thực tập sinh, đọc phiếu và làm đúng như
   được dặn, nhiều phiếu chạy song song một lượt. Opus giao xong thì đứng chờ; Sonnet tự gọi Haiku, tự duyệt, chỉ nộp lên khi
   mọi phiếu đạt — xem `AGENTS.md` mục 2b (chốt 13/10, sửa 15/10/2026). Chỉ Opus hỏi người
   dùng và soi **MẮT**.
5. **`docs/CHE-DO-C-SPEC.md`** — đặc tả Chế độ C (talking head từ clip quay thật): lệnh `th:*`, `project.json`, model ASR.
   Đọc **thêm** file này mỗi khi làm talking head; đây là nguồn chuẩn cho mọi code và tài liệu của Chế độ C.

Khi `SKILL.md` và `AGENTS.md` mâu thuẫn nhau, `SKILL.md` thắng — `AGENTS.md` chỉ phân vai,
không định nghĩa lại luật.

## 2. Kiến trúc thư mục

Cấu trúc xem bằng `ls`; chỉ những điều code không tự nói:

- `.agents/skills/understand*/` — KHÔNG dùng trong pipeline này (chưa distill, chưa track git). Các skill còn lại trong `.agents/skills/` đã distill vào `SKILL.md`/`AGENTS.md`.
- `scripts/scene-kit/` là NGUỒN THẬT của mọi scene; `templates/frame-<set>-<scene>/` 100% sinh từ đó (mục 3), `slots.json` là nguồn duy nhất về slot/giới hạn.
- `input/<tên-tài-liệu>/` → `output/<tên-tài-liệu>/` (outline, plan, script, video…), cùng tên thư mục.
- Chế độ C (talking head, xem `docs/CHE-DO-C-SPEC.md`): `src/talking-head/` (TypeScript: tiếp nhận, cắt, dựng `project.json`, render), `scripts/asr/` (Python: phiên âm, VAD, giảm ồn), `scripts/editor/` (editor web localhost, HTML/CSS/JS thuần), `.venv-asr/` (môi trường Python riêng, không đụng `.venv-vieneu`), `input/<tài liệu>/raw/` (bản sao clip quay thật, dùng chung cho mọi video của tài liệu đó). Kết quả ghi ở `output/<tài liệu>/<slug>/` (bản thử ở `_test/`, demo editor ở `output/_dev-tests/`) (`project.json`, `run.json`, `cut.mp4`, `video.mp4`…).

## 3. `templates/` — Bắt buộc 100% Scene-Kit độc bản (chốt 03/10/2026, hoàn tất 08/10/2026)

- **Cấm tuyệt đối Template Generic:** Toàn bộ 17 template catalog generic đã bị **xoá bỏ vĩnh viễn** khỏi codebase và bị `script:validate` chặn theo tên: `frame-bold-poster`, `frame-glitch-title`, `frame-flow-steps`, `frame-feature-grid`, `frame-aicoding-list`, `frame-aicoding-comparison`, `frame-code-terminal`, `frame-table-permission`, `frame-title-section`, `frame-doc-callout`, `frame-build-minimal`, `frame-vignelli`, `frame-pentagram-stat`, `frame-statement-outro`, `frame-liquid-bg-hero`, `frame-creative-voltage`, `frame-logo-outro`. Outro cũng phải là cảnh riêng của bộ (`frame-<set>-outro`).
- **Không còn lệnh sinh script tự động:** `npm run script:generate` và `src/script/script-generator.ts` đã bị xoá (08/10/2026) vì chúng chỉ biết gán template generic và trích câu máy móc từ nguồn — đúng cái mục 6 cấm. AI viết narration, scene-kit dựng hình, `script:validate` gác cổng.
- **`slots.json` là nguồn giới hạn hiển thị duy nhất:** bảng hardcoded trong `src/render/template-input-limits.ts` đã bị xoá sạch; mỗi template lấy giới hạn từ `templates/<id>/slots.json` do `build.mjs` sinh ra.
- **Sinh ra từ scene-kit (`frame-<set>-<scene>`):** Mỗi video bắt buộc có bộ cảnh riêng viết trong `scripts/scene-kit/sets/<set>.mjs`, build bằng `node scripts/scene-kit/build.mjs <set>` → ghi `templates/frame-<set>-<scene>/`. Regenerate được bất cứ lúc nào từ `.mjs` nguồn — **không sửa tay HTML trong `templates/` của bộ này**, sửa file `.mjs` rồi build lại. Trước khi render bắt buộc phải qua cổng Visual Inspection Gate (kiểm tra ảnh tĩnh 1080×1350 từ `preview.ts`).

## 4. Cổng xác nhận bắt buộc (không được tự chọn thay người dùng)

- **Giọng & tone** — `npm run voice:list -- --json`, 3 gợi ý + 1 khuyến nghị, chọn qua
  `AskUserQuestion`. Một giọng cho cả series.
- **Tỷ lệ khung hình** (`9:16` / `16:9` / `4:5`) — hỏi trước khi viết `script.json`.
- **Cổng thời lượng** (chỉ học liệu đào tạo) — nếu tài liệu không gói vừa ~3 phút
  (`analysis.fitsOneVideo: false`), trình phương án tách và **dừng**, chờ người dùng chốt
  (`lengthDecision`). Không tự ép, không tự tách.
- **Preview** — gửi `voice-preview.mp3`, chờ xác nhận trước khi render full, trừ khi người
  dùng nói rõ bỏ qua preview.
- **Script review** — gửi `script-review.md` (bảng do `script:validate` xuất) trước khi render
  full. Sửa trên kịch bản rẻ hơn sửa trên video đã dựng.
- **Chế độ C — Talking head** (cổng riêng, theo thứ tự; dãy 22 bước đầy đủ ở `SKILL.md` "Nhánh Chế độ C"): hiệu đính transcript + `questions.md` (chỗ không chắc: đoạn không phải lời giảng, thuật ngữ, con số, tên/chức danh — hỏi người dùng, không tự đoán) → dàn ý → người dùng xác nhận dàn ý, nêu yêu cầu cắt và **chọn khung 16:9 hoặc 4:5** (`npm run th:approve -- <job> --stage outline --note "…"`) → người dùng duyệt danh sách cắt (`--stage cut`) → dựng project, B-roll, intro → chỉnh trong editor (`npm run editor -- <job>`, người dùng xem/chỉnh; **không có cổng duyệt storyboard riêng**) → xuất `th:render` **chỉ khi người dùng nói "xuất"**. Chế độ C **không** dùng cổng giọng/TTS (giọng là audio gốc), **không** đi qua `npm run pipeline` và **không** dùng `approval.json` — cổng của nó là `th-approval.json`. Chi tiết: `docs/CHE-DO-C-SPEC.md`.

Chi tiết đầy đủ từng cổng nằm ở `SKILL.md`; đây chỉ là danh sách để không bỏ sót.

## 5. Ba Chế Độ Nội Dung — đọc trước khi viết bất kỳ narration nào

*(chốt 30/09/2026 trong `SKILL.md`, mục "Ba Chế Độ Nội Dung" — áp TRƯỚC mọi quy tắc
copywriting khác.)*

- **Chế độ A — học liệu đào tạo** (mọi thư mục trong `input/` ngoài `Bài viết về AI/`): nguồn
  thông tin duy nhất là tài liệu, giữ nguyên nghĩa, văn nói tự nhiên. Phân tích và phân loại
  nội dung vào `plan.json → analysis` **trước khi viết script**. Không đủ 3 phút → đề xuất
  tách, chờ người dùng chọn, không tự viết script khi đang chờ.
- **Chế độ B — `input/Bài viết về AI/`**: được viết narration mới, hook đa dạng, không mượn
  chuyện hay số liệu của video tham khảo.
- **Chế độ C — talking head từ clip quay thật** (`docs/CHE-DO-C-SPEC.md`): nguồn nội dung là **lời nói trong clip**. Hiệu đính
  được sửa chính tả và ngữ nghĩa cho đúng điều người nói định nói, **không bịa nội dung** (không thêm ý, số liệu, tên riêng
  người nói không nói). Chỗ không chắc phải ghi vào `questions.md` kèm mốc thời gian và **hỏi người dùng**, không tự quyết.

Trên màn hình: mỗi câu nói có một hình minh hoạ đúng nghĩa đang hiện; chữ chỉ là từ khoá
(≤ 8 từ/khối), không bao giờ là nguyên văn lời đọc hay tài liệu; hình/chữ đổi đúng lúc câu bắt
đầu (một câu = một `voiceSegments` = một nhịp hình — kiểm bằng `npm run sync:check`). Soát
chính tả và đối chiếu lại nguồn trước khi render.

## 6. Việc Claude KHÔNG được làm

- Không tạo project lồng, không copy source/template/model/brand asset ra ngoài repo này.
- Không tự chọn giọng, tone, tỷ lệ khung hình hay phương án tách video thay người dùng.
- Không render full khi preview hoặc script-review chưa được xác nhận (trừ khi người dùng nói
  rõ bỏ qua).
- Không ship narration sinh ra bằng cách trích câu máy móc từ nguồn — AI phải là tác giả, code
  chỉ gác cổng.
- Không dùng GSAP/React/Framer Motion cho scene — trình dựng cần keyframe CSS tua được; dùng
  `scripts/scene-kit/motion.mjs`.
- Không thêm skill ngoài (`.agents/skills/<tên>`) làm **tham chiếu sống**. Khi áp dụng một
  prompt/skill bên ngoài, **distill nó vào `SKILL.md`/`AGENTS.md`/validator trực tiếp** (ghi rõ
  ngày chốt) rồi xoá bản vendor nếu không còn gì khác phụ thuộc — đừng để nó nằm lại như một
  file tham khảo không ai đọc.
- Không xoá `templates/frame-*` chỉ vì không thấy `.mjs` nguồn khớp tên — xem mục 3, có thể là
  bản sống không-thể-regenerate. Kiểm `grep -r "templateId" output/**/script.json` trước khi
  xoá bất kỳ template nào.
- Không di chuyển/archive video output bằng cách ghi đè — khi dựng lại một video, đổi tên folder
  cũ thành `_archive-<ngày>-<ghi chú>` bên cạnh, không xoá.
- Không commit, không push, không chạy git destructive (`reset --hard`, `clean -f`, force-push)
  trừ khi được yêu cầu rõ ràng.
- **Chế độ C:** không render mp4 cuối khi chưa qua editor (mọi bước ghi vào `output/<tài liệu>/<slug>/project.json`, người dùng chỉnh rồi mới xuất); không di chuyển, đổi tên hay sửa clip gốc (chỉ sao chép vào `input/<tài liệu>/raw/`); không ghi đè output cũ (đổi tên `_archive-<ngày>`).
- **Thất bại 2 lần thì dừng:** một việc (lệnh, model, bước dựng) thất bại 2 lần liên tiếp thì dừng và báo người dùng kèm lỗi, không thử lần ba. Áp dụng cho Chế độ C và mọi việc khác.
- Editor web của Chế độ C (`scripts/editor/`) là **UI công cụ**, viết HTML/CSS/JS thuần, không thuộc "scene" của scene-kit — nhưng vẫn **không dùng React/GSAP/Framer Motion**. Overlay chạy chung với `th:render` qua `scripts/editor/public/overlay-runtime.js` (tất định, tua được); chuyển động dùng đúng tên preset của `scripts/scene-kit/motion.mjs`.
- **Chế độ C — quy tắc cứng và vận hành:** crop từ bụng lên; không vẽ/khoanh/mũi tên lên cơ thể người nói; overlay dịch người nói sang phía đối diện; mọi phần tử xuất hiện có SFX pop; minh hoạ vẽ riêng từng bài; không chạy lại `th:project` sau khi đã dựng layer (nó xoá mọi layer). Danh sách đủ ở `docs/CHE-DO-C-SPEC.md` mục "Quy tắc cứng" và "Vận hành" (QA bằng click thật, Ctrl+F5, không PUT thử vào cổng 4350 của người dùng, chỉ dừng đúng PID mình mở, `nvidia-smi` trước Whisper).

## 7. Dọn dẹp & đóng gói (áp dụng mỗi khi coi lại vệ sinh repo)

- `scratch/`, `tmp/`, `voice-preview/` là workspace nháp (QA stills, log render, file test
  giọng) — đã gitignore, không commit, có thể xoá tay bất cứ lúc nào mà không ảnh hưởng pipeline.
- Trước khi coi một file/script/template là "không còn dùng": grep tên nó trong
  `package.json`, `*.md`, `*.bat`, `*.ps1`, và — với template — trong `output/**/script.json`
  (kể cả `_archive-*`). Không có nguồn regenerate không tự động nghĩa là "chết"; có thể là bản
  sống duy nhất (xem mục 3).
- Script một lần cho một video cụ thể (tên kiểu `build-script-<tên tài liệu>.ts`,
  `rebuild-N-videos.mjs`) không thuộc pipeline chung — pipeline chung luôn chạy qua
  `npm run doc:outline` → scene-kit → `npm run script:validate/pipeline` theo `SKILL.md`. Sau khi việc một lần đó xong,
  xoá script thay vì giữ lại "phòng khi cần".

## 8. Tích hợp CLI khác

- Codex / Gemini CLI: `AGENTS.md` + `.agents/skills/thanhvinh-video-pipeline/`.
- Claude Code: file này + `.claude/skills/thanhvinh-video-pipeline/`.
- Gemini CLI riêng: `GEMINI.md`.

Giữ cả bốn file đồng bộ về nội dung quy tắc; khác nhau ở định dạng discovery cho từng CLI.

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

Khi người dùng yêu cầu 5 Why / tự vấn: dùng skill `tu-van-5-why` (`.claude/skills/tu-van-5-why/SKILL.md`) — đủ sáu mục, đúng thứ tự,
viết ra chứ không đào trong đầu; tự vấn **không phải giải thích**. Chuyển từ file này sang skill ngày 16/10/2026 (/doctor), nội dung không đổi.
