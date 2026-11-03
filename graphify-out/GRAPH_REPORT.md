# Graph Report - TVHs-Labs-Video  (2026-11-03)

## Corpus Check
- 192 files · ~185,380 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1743 nodes · 5756 edges · 68 communities (58 shown, 10 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 65 edges (avg confidence: 0.83)
- Token cost: 91,445 input · 0 output

## Community Hubs (Navigation)
- Cảnh video bài học
- Cảnh Trợ lý Pháp chế & Label
- Chế độ C: API thư viện
- Chế độ C: căn lời & B-roll
- Kế hoạch B-roll
- Bake vật lý, cổng & chạy CPU
- Chế độ C: CLI & thứ tự lệnh
- Chế độ C: lệnh dựng media
- QA Editor qua CDP
- Repo cũ: cổng & luật hình
- Repo cũ: sổ quyết định
- Lệnh npm (scripts)
- Composition video đào tạo
- Cổng tất định & QA
- Xuất CapCut
- Server Editor
- Cân âm lượng clip
- Kiểm kịch bản
- package.json
- Mix âm thanh Chế độ C
- Brand & lời đọc
- Render overlay & máy quay
- Job & smoke test
- Lệnh project Chế độ C
- Intro Chế độ C
- Dàn ý tài liệu
- AGENTS.md & quy tắc cứng
- Máy quay ảo
- Kiểm lõi clip Editor
- videoClips & cảnh báo thứ tự
- Thư viện phụ thuộc
- Cấu hình & TTS studio
- ASR: gỡ băng
- Server VieNeu
- S4 tranh & S7 soi hình
- Đặc tả Chế độ C
- Kiểm parity Editor
- S1, S2 & quy chuẩn kịch bản
- S5A chuyển động 2D
- S5B phim trường 3D
- ASR: kiểm môi trường
- Đóng gói bản công khai
- Công cụ audio studio
- Preset Chế độ C
- Kế hoạch hợp nhất & 18 nhân sự
- ASR: chủ thể & bản tổng quan
- Tương phản preset
- Repo cũ: hướng dẫn B-roll
- Chuẩn hoá lời đọc tiếng Việt
- Thư viện dev
- README & các chế độ
- Phân tích nhạc
- Tối ưu SVG
- Đo hiệu năng Chrome
- S3 âm thanh
- Repo cũ: bản đồ source
- Repo cũ: Chế độ B
- Chế độ B chuỗi AI
- Remotion bàn dựng chính
- Hợp đồng câu–hình
- Repo cũ: cổng khung hình
- Repo cũ: cache giọng

## God Nodes (most connected - your core abstractions)
1. `G()` - 186 edges
2. `Box()` - 136 edges
3. `useT()` - 135 edges
4. `lerp()` - 95 edges
5. `Stage()` - 79 edges
6. `Tag()` - 79 edges
7. `Stage()` - 53 edges
8. `Arrow()` - 52 edges
9. `Tag()` - 52 edges
10. `Lines()` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Khung hình 16:9 / 4:5 và crop từ bụng trở lên` --semantically_similar_to--> `Người dùng chọn tỷ lệ khung mỗi video (16:9, 9:16, 4:5, 1:1)`  [INFERRED] [semantically similar]
  docs/tham-khao-repo-cu/CHE-DO-C-SPEC.md → AGENTS.md
- `Overlay runtime dùng chung editor + render (seek tất định)` --semantically_similar_to--> `Khung hình là hàm thuần của useCurrentFrame() + kiểm tất định`  [INFERRED] [semantically similar]
  docs/tham-khao-repo-cu/CHE-DO-C-SPEC.md → AGENTS.md
- `JOB_DIR` --calls--> `jobDir()`  [EXTRACTED]
  scripts/editor/server.ts → src/talking-head/jobs.ts
- `README TVHs-Labs-Videos` --references--> `Giấy phép Remotion`  [INFERRED]
  README.md → docs/NANG-CAP-NHAN-SU.md
- `README TVHs-Labs-Videos` --references--> `S6xEditer (bản công khai)`  [EXTRACTED]
  README.md → docs/KE-HOACH-HOP-NHAT-VA-DONG-GOI.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Hệ cổng chặn rule trước render (máy + MẮT)** — docs_tham_khao_repo_cu_skill_bang_rule_cong, docs_tham_khao_repo_cu_skill_cong_truoc_render, docs_tham_khao_repo_cu_skill_canary_fixtures, docs_tham_khao_repo_cu_skill_approval_json, docs_tham_khao_repo_cu_skill_quality_gate [EXTRACTED 1.00]
- **Bộ rule hình 0 / 0b / 0c / 0d** — docs_tham_khao_repo_cu_skill_rule_0_hinh_minh_hoa, docs_tham_khao_repo_cu_skill_rule_0b_hinh_phai_ro, docs_tham_khao_repo_cu_skill_rule_0c_taste_rules, docs_tham_khao_repo_cu_skill_rule_0d_cam_template_generic [EXTRACTED 1.00]
- **Dây chuyền Master + 7 Specialist** — docs_tham_khao_repo_cu_multi_agent_model_master_agent, docs_tham_khao_repo_cu_multi_agent_model_specialist_1_content_architect, docs_tham_khao_repo_cu_multi_agent_model_specialist_2_copywriter, docs_tham_khao_repo_cu_multi_agent_model_specialist_3_audio, docs_tham_khao_repo_cu_multi_agent_model_specialist_4_svg_designer, docs_tham_khao_repo_cu_multi_agent_model_specialist_5_motion, docs_tham_khao_repo_cu_multi_agent_model_specialist_6_qa, docs_tham_khao_repo_cu_multi_agent_model_specialist_7_visual_critic [EXTRACTED 1.00]
- **Luồng B-roll Chế độ C: plan → th:broll → overlay dịch người nói → SFX** — docs_tham_khao_repo_cu_broll_guide_broll_plan_json, docs_tham_khao_repo_cu_broll_guide_th_broll, docs_tham_khao_repo_cu_broll_guide_overlay_dich_nguoi_noi_side, docs_tham_khao_repo_cu_broll_guide_moi_phan_tu_co_sfx [INFERRED 0.85]
- **Bảo đảm tất định khung hình** — docs_nang_cap_nhan_su_determinism_test, docs_quy_trinh_new_tool_procedure, scripts_gate_determinism, _claude_agents_s6_qa [INFERRED 0.85]
- **Kể bằng hình, không bằng chữ** — docs_nang_cap_nhan_su_picture_before_text, docs_quy_chuan_hinh_keyword_only_text, docs_quy_chuan_chuoi_ai_anti_slide_rule, docs_nang_cap_nhan_su_label_off_gate [INFERRED 0.85]
- **Công thức khung video dùng chung editor/render (videoTransform + videoMoves + videoShifts)** — docs_tham_khao_repo_cu_che_do_c_spec_video_shifts, docs_tham_khao_repo_cu_che_do_c_spec_reframe_camera, docs_tham_khao_repo_cu_che_do_c_spec_video_moves, src_talking_head_video_moves [EXTRACTED 1.00]
- **videoClips là nguồn sự thật: chặn th:cut/audio/intro/project --force** — docs_tham_khao_repo_cu_che_do_c_spec_video_clips, docs_che_do_c_canh_bao_thu_tu, src_talking_head_cli, src_talking_head_render_cli [EXTRACTED 1.00]

## Communities (68 total, 10 thin omitted)

### Community 0 - "Cảnh video bài học"
Cohesion: 0.06
Nodes (250): AiLaBanAy(), Gear(), Hook(), Intern(), NguocDoi(), PhanXa(), Quarter(), Stairs() (+242 more)

### Community 1 - "Cảnh Trợ lý Pháp chế & Label"
Cohesion: 0.09
Nodes (84): react, remotion, Label(), SceneContext, SceneContextValue, useBeats(), useScene(), useSceneText() (+76 more)

### Community 2 - "Chế độ C: API thư viện"
Cohesion: 0.06
Nodes (53): handleLibraryApi(), LibraryCtx, listTemplates(), readJsonBody(), ROUTES, sendJson(), templateAspect(), inferMood() (+45 more)

### Community 3 - "Chế độ C: căn lời & B-roll"
Cohesion: 0.05
Nodes (51): alignEdits(), alignSegment(), lcsPairs(), normToken(), BrollContext, Filler, fillerCandidates(), MERGE_GAP (+43 more)

### Community 4 - "Kế hoạch B-roll"
Cohesion: 0.06
Nodes (44): AnyLayer, AssetInfo, assetSize(), Beat, BeatSchema, BrollPlan, BrollPlanSchema, BrollResult (+36 more)

### Community 5 - "Bake vật lý, cổng & chạy CPU"
Cohesion: 0.06
Nodes (39): typescript, bakePhysics(), clean(), PhysicsSpec, [specPath, outPath], normalizeLoudness(), [input, output, pan], panFilter() (+31 more)

### Community 6 - "Chế độ C: CLI & thứ tự lệnh"
Cohesion: 0.15
Nodes (44): Cổng duyệt th:approve (outline, cut), Thứ tự chạy chuẩn 22 bước, main(), clipsBuild(), subject(), cut(), alignEditsCmd(), approve() (+36 more)

### Community 7 - "Chế độ C: lệnh dựng media"
Cohesion: 0.09
Nodes (34): vitest, ENCODE(), fitClipToDuration(), gpuEncodeAvailable(), muxAudioOntoVideo(), MuxWatermarkOptions, videoCodecArgs(), project (+26 more)

### Community 8 - "QA Editor qua CDP"
Cohesion: 0.06
Nodes (28): openPage(), sleep(), R, [url = "http://localhost:4360/?theme=dark", out = "scripts/editor/public/design/screens"], clipRect(), drag(), E(), fails (+20 more)

### Community 9 - "Repo cũ: cổng & luật hình"
Cohesion: 0.05
Nodes (28): approval.json (npm run approve sau xác nhận bằng lời), Bảng RULE → CỔNG (máy đo vs MẮT), Brand Palette Preservation & External Platform Exception, Brand watermark (góc trên phải, opacity 0.40), Bộ cảnh canary cố ý vi phạm, Cấu trúc nhận thức cho người trưởng thành (Relevance, Chunking, Cognitive load, Signaling, Progressive disclosure), Chế độ A — Học liệu đào tạo, Chế độ C — Talking head từ clip quay thật (+20 more)

### Community 10 - "Repo cũ: sổ quyết định"
Cohesion: 0.06
Nodes (26): DECISIONS.md — sổ quyết định kiến trúc, Agent Workflow / Multi-Agent Operating Model, Anti-Slop Design & Speech-Synced Active Focus Glow, Video Aspect Ratio & Framing Gate, Bảng RULE → CỔNG, Company Brand Palette & Third-Party Brand Exception, Kiến trúc render đa worker trên máy người dùng, Master Agent (Executive Producer) (+18 more)

### Community 11 - "Lệnh npm (scripts)"
Cohesion: 0.05
Nodes (41): scripts, approve, assets:optimize, audio:pan, capcut:export, doc:outline, doctor, editor (+33 more)

### Community 12 - "Composition video đào tạo"
Cohesion: 0.09
Nodes (31): SceneProvider, calculateTrainingMetadata(), musicVolume(), TrainingVideoComposition(), TrainingVideoProps, GlobalFonts(), emptyProps, RemotionRoot() (+23 more)

### Community 13 - "Cổng tất định & QA"
Cohesion: 0.07
Nodes (26): S6 · Tổ kiểm định (QA), #18 FFmpeg (người duyệt cuối), Master · Bàn dựng, Cổng đối chiếu nguồn, Thêm công cụ hoặc hiệu ứng mới, Cổng render (khổ, fps, codec, −14 LUFS), @remotion/bundler, @remotion/renderer (+18 more)

### Community 14 - "Xuất CapCut"
Cohesion: 0.07
Nodes (30): after, args, bake(), before, cli, clips, counted, created (+22 more)

### Community 15 - "Server Editor"
Cohesion: 0.10
Nodes (31): args, build, buildStatus(), editorProject(), getLibraryHandler(), getPeaks(), handle(), JOB_DIR (+23 more)

### Community 16 - "Cân âm lượng clip"
Cohesion: 0.10
Nodes (26): Cache, cacheFile(), CLIP_TARGET_LUFS, ClipGain, GAIN_MAX, GAIN_MIN, integrated(), levelProxyAudio() (+18 more)

### Community 17 - "Kiểm kịch bản"
Cohesion: 0.14
Nodes (27): loadScript(), musicKeyTimes(), cell(), checkAgainstSource(), checkLabels(), checkLength(), checkNarration(), checkScript() (+19 more)

### Community 18 - "package.json"
Cohesion: 0.07
Nodes (25): author, description, keywords, license, main, name, private, type (+17 more)

### Community 19 - "Mix âm thanh Chế độ C"
Cohesion: 0.15
Nodes (21): buildMixGraph(), decodeMono(), duckParams(), ensureProjectMix(), f(), frameDb(), Loudness, measureLoudness() (+13 more)

### Community 20 - "Brand & lời đọc"
Cohesion: 0.09
Nodes (21): zod, applyNarrationReplacements(), BrandConfig, BrandConfigSchema, BrandPersona, DEFAULT_GUIDELINE_PATH, escapeRegExp(), getPersona() (+13 more)

### Community 21 - "Render overlay & máy quay"
Cohesion: 0.13
Nodes (25): log, toAsciiShortPath(), hasClipTransforms(), staticCovers(), ./overlay-runtime.js, area(), backgroundFilter(), Box (+17 more)

### Community 22 - "Job & smoke test"
Cohesion: 0.15
Nodes (20): Bảng file phụ trách theo tổ, [aspect = "16:9", voice = "Ngọc Huyền", doc = "fixtures/smoke/smoke.md"], job, script, applySpeed(), main(), probeDurationSec(), synthesize() (+12 more)

### Community 23 - "Lệnh project Chế độ C"
Cohesion: 0.16
Nodes (22): archiveIfExists(), audio(), Brand, buildProject(), flattenOutline(), geometry(), outlineLayers(), isKept() (+14 more)

### Community 24 - "Intro Chế độ C"
Cohesion: 0.16
Nodes (22): addIntroToProject(), BACKUP_FILES, buildAudio(), buildIntroLayers(), clippedWordWarnings(), DEFAULT_INTRO_SFX, intro(), introAudioFilter() (+14 more)

### Community 25 - "Dàn ý tài liệu"
Cohesion: 0.13
Nodes (22): cleanHeading(), cleanInline(), CONTENT_TYPES, ContentHint, DocumentOutline, extractNumbers(), HINT_PATTERNS, inferContentHints() (+14 more)

### Community 26 - "AGENTS.md & quy tắc cứng"
Cohesion: 0.11
Nodes (12): Copilot instructions, AGENTS.md — hướng dẫn chung cho mọi agent, npm run gate:determinism, Luồng S1→S7 (phân tích → kịch bản → giọng → dựng → QA → soi mắt → render), Làm mới bản đồ mã (npm run graph / /graphify --update), Thẻ vai trong .claude/agents/, Đăng ký cảnh trong src/videos/registry.ts, VieNeu TTS server (port 8124) (+4 more)

### Community 27 - "Máy quay ảo"
Cohesion: 0.19
Nodes (19): aiCameraOn(), clipTransformSpans(), effectiveMoves(), effectiveShifts(), TransformSpan, Project, VideoClipSchema, VideoMove (+11 more)

### Community 28 - "Kiểm lõi clip Editor"
Cohesion: 0.09
Nodes (14): app, bf, clips, h, ins, L, mp, mv (+6 more)

### Community 29 - "videoClips & cảnh báo thứ tự"
Cohesion: 0.16
Nodes (18): videoClips — video gốc chỉnh được, nguồn sự thật duy nhất, buildClipsFromCutMap(), clipsInit(), clipFrames, broll(), convertFace(), Face, loadAssetManifest() (+10 more)

### Community 30 - "Thư viện phụ thuộc"
Cohesion: 0.10
Nodes (21): dependencies, animejs, axios, dotenv, gsap, @lottiefiles/dotlottie-web, react, react-dom (+13 more)

### Community 31 - "Cấu hình & TTS studio"
Cohesion: 0.13
Nodes (13): axios, dotenv, Config, intDefault(), loadConfig(), TtsProvider, TemplateScript, createTtsClient() (+5 more)

### Community 32 - "ASR: gỡ băng"
Cohesion: 0.19
Nodes (11): build_transcript(), detect_fillers(), fill_word_times(), is_oom(), load_audio(), log(), main(), norm() (+3 more)

### Community 33 - "Server VieNeu"
Cohesion: 0.15
Nodes (8): default_device(), json_bytes(), load_legacy_voices(), main(), do_GET(), do_POST(), send_json(), parse_args()

### Community 34 - "S4 tranh & S7 soi hình"
Cohesion: 0.16
Nodes (12): S4 · Tổ tranh, S7 · Visual Critic, #08 dotLottie, #04 Satori, #03 SVGO, Cổng tắt chữ, Quy chuẩn hình và hợp đồng câu–hình, @lottiefiles/dotlottie-web (+4 more)

### Community 35 - "Đặc tả Chế độ C"
Cohesion: 0.17
Nodes (11): Đặc tả kỹ thuật Chế độ C v1, Âm thanh trong project.json (sfx, music ducking, master loudnorm), Minh hoạ động / B-roll (broll-plan.json, th:broll), Cutaway và overlay (cảnh minh hoạ), Phát hiện từ đệm bằng VAD + danh sách, Model ASR/âm thanh (Whisper large-v3, wav2vec2 vi, Silero VAD, DeepFilterNet3), Preset th-presets (subtitle, lowerThird, callout, sfx-packs), Reframe tự do + máy quay (clip transform, camera.aiEnabled) (+3 more)

### Community 36 - "Kiểm parity Editor"
Cohesion: 0.12
Nodes (11): args, dir, FFMPEG, job, out, probe, REPO, results (+3 more)

### Community 37 - "S1, S2 & quy chuẩn kịch bản"
Cohesion: 0.13
Nodes (13): S1 · Content Architect, S2 · Copywriter, 0b. Hình phải rõ, Hình theo loại nội dung, Cấu trúc nhận thức cho người trưởng thành, Phân tích trước khi viết (analysis), Loại nội dung (contentType), lengthDecision (+5 more)

### Community 38 - "S5A chuyển động 2D"
Cohesion: 0.14
Nodes (11): S5A · Tổ chuyển động 2D, #06 Anime.js v4, #02 GSAP Skills, #05 GSAP Timeline, #10 Motion Canvas (hoãn), #01 Remotion Skills, #07 Remotion Spring, Watermark thương hiệu (+3 more)

### Community 39 - "S5B phim trường 3D"
Cohesion: 0.17
Nodes (11): S5B · Tổ phim trường 3D, #13 Drei, #15 Postprocessing, #12 R3F, #14 Rapier, #11 Three.js, Lộ trình đề xuất GĐ 0–5, Font 3D thiếu dấu tiếng Việt (+3 more)

### Community 40 - "ASR: kiểm môi trường"
Cohesion: 0.21
Nodes (4): free_vram(), setup_env(), main(), patch_torchaudio()

### Community 41 - "Đóng gói bản công khai"
Cohesion: 0.13
Nodes (12): S6xEditer (bản công khai), Hai bản: nội bộ và công khai, ALLOW, guideline, pkg, problems, REPLACE, tar (+4 more)

### Community 42 - "Công cụ audio studio"
Cohesion: 0.24
Nodes (10): concatWithSilence(), getDurationSec, mixSfxOntoVoice(), SfxMixSpec, getMediaDurationSec(), runMediaCommand(), concatVideos(), resolveMediaBinary() (+2 more)

### Community 43 - "Preset Chế độ C"
Cohesion: 0.15
Nodes (8): BASE, bigLay, coLay, K(), ltLay, NS, pack(), subLay

### Community 44 - "Kế hoạch hợp nhất & 18 nhân sự"
Cohesion: 0.22
Nodes (13): 18 nhân sự theo tổ Specialist, Kế hoạch hợp nhất pipeline cũ và đóng gói, Nghiên cứu nâng cấp 18 nhân sự, Giấy phép Remotion, Quy chuẩn lời đọc chuỗi Bài viết về AI (Chế độ B), Quy chuẩn kịch bản học liệu (Chế độ A), Quy trình làm một video, README TVHs-Labs-Videos (+5 more)

### Community 45 - "ASR: chủ thể & bản tổng quan"
Cohesion: 0.24
Nodes (3): detect_cv2(), detect_mediapipe(), main()

### Community 46 - "Tương phản preset"
Cohesion: 0.20
Nodes (8): BLACK, DIR, lin(), lum(), ratio(), REPO, rows, WHITE

### Community 47 - "Repo cũ: hướng dẫn B-roll"
Cohesion: 0.24
Nodes (7): Hướng dẫn viết broll-plan.json (Chế độ C), broll-plan.json (kế hoạch beat B-roll), Máy quay tự động zoom ở ranh giới câu (camera.auto), Cutaway (nền đặc) vs Overlay (nền trong suốt), Overlay dịch người nói sang phía đối diện (side → videoShifts), Quy đổi vùng mặt khi reframe (subject.json transform), Lệnh th:broll

### Community 48 - "Chuẩn hoá lời đọc tiếng Việt"
Cohesion: 0.31
Nodes (10): DIGITS, FILLER_PHRASES, integerToVietnamese(), NarrationIssue, normalizeVietnameseNarration(), numericTokenToVietnamese(), readThreeDigits(), readTwoDigits() (+2 more)

### Community 49 - "Thư viện dev"
Cohesion: 0.20
Nodes (10): devDependencies, capcut-cli, svgo, tsx, @types/node, @types/react, @types/react-dom, @types/three (+2 more)

### Community 50 - "README & các chế độ"
Cohesion: 0.28
Nodes (8): TVHs-Labs-Video (tài liệu đào tạo → video Remotion), Chế độ C: dựng từ clip quay thật, Editor localhost:4317 (npm run editor), th:render qua hyperframes@0.6.94 (npx), Quy trình các bước th:* (intake → render), th:setup (requirements-asr.lock.txt, NVIDIA driver ≥550), Repo cũ TVHs-Lab-Video-AI, Talking Head README

### Community 51 - "Phân tích nhạc"
Cohesion: 0.36
Nodes (3): kw(), main(), peaks_of()

### Community 52 - "Tối ưu SVG"
Cohesion: 0.33
Nodes (6): svgo, ASSETS_DIR, optimizeSvg(), OUTPUT_DIR, SKIP, walk()

### Community 53 - "Đo hiệu năng Chrome"
Cohesion: 0.33
Nodes (3): chrome, proc, profile

### Community 54 - "S3 âm thanh"
Cohesion: 0.40
Nodes (3): S3 · Tổ âm thanh, #16 Remotion Audio + FFmpeg, #17 VieNeu-TTS

### Community 55 - "Repo cũ: bản đồ source"
Cohesion: 0.40
Nodes (5): project.json v1 (tracks, layers), Bản đồ đọc source, Ba phần chính: Document Video, Talking Head, Studio, Lệnh Studio (studio:package, studio:editor, studio:export), Contract Studio (output/<job>/studio/)

### Community 56 - "Repo cũ: Chế độ B"
Cohesion: 0.40
Nodes (5): Chế độ B — Chuỗi bài AI, Copywriting & Narration Standards (16 nguyên tắc, 8–16 chỉ Chế độ B), Một lời kêu gọi duy nhất (Lưu/Gửi), cấm engagement bait, Retention Curve (Hook → Escalation → Payoff → CTA), 3-Layer Hook chuẩn Viral (Visual, Verbal, Text Overlay)

### Community 57 - "Chế độ B chuỗi AI"
Cohesion: 0.50
Nodes (4): Chế độ B · Chuỗi bài AI, Retention Curve, Một lời kêu gọi duy nhất (Lưu/Gửi), 3-Layer Hook

## Knowledge Gaps
- **78 isolated node(s):** `./overlay-runtime.js`, `Anti-Slop Design & Speech-Synced Active Focus Glow`, `Video Aspect Ratio & Framing Gate`, `Company Brand Palette & Third-Party Brand Exception`, `Kiến trúc render đa worker trên máy người dùng` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 621 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Cảnh Trợ lý Pháp chế & Label` to `Cảnh video bài học`, `S4 tranh & S7 soi hình`, `Bake vật lý, cổng & chạy CPU`, `S5A chuyển động 2D`, `Composition video đào tạo`, `package.json`?**
  _High betweenness centrality (0.223) - this node is a cross-community bridge._
- **What connects `./overlay-runtime.js`, `Anti-Slop Design & Speech-Synced Active Focus Glow`, `Video Aspect Ratio & Framing Gate` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cảnh video bài học` be split into smaller, more focused modules?**
  _Cohesion score 0.06069356434319938 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `Brand & lời đọc` to `Chế độ C: căn lời & B-roll`, `Kế hoạch B-roll`, `Chế độ C: CLI & thứ tự lệnh`, `Composition video đào tạo`, `package.json`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `Cảnh Trợ lý Pháp chế & Label` be split into smaller, more focused modules?**
  _Cohesion score 0.09320175438596491 - nodes in this community are weakly interconnected._
- **Why does `AGENTS.md — hướng dẫn chung cho mọi agent` connect `AGENTS.md & quy tắc cứng` to `S4 tranh & S7 soi hình`, `S1, S2 & quy chuẩn kịch bản`, `S5A chuyển động 2D`, `S5B phim trường 3D`, `Cổng tất định & QA`, `README & các chế độ`, `S3 âm thanh`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **Should `Chế độ C: API thư viện` be split into smaller, more focused modules?**
  _Cohesion score 0.06448087431693988 - nodes in this community are weakly interconnected._