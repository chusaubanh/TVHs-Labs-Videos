# Graph Report - TVHs-Labs-Video  (2026-11-06)

## Corpus Check
- 217 files · ~257,774 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .bat 2)

## Summary
- 2072 nodes · 8579 edges · 66 communities (54 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 53 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f9b321c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Box
- Cảnh Trợ lý Pháp chế & Label
- sfx-plan.ts
- pipeline-runner.ts
- broll-plan.ts
- training-contract.ts
- G
- ref_node_path
- QA Editor qua CDP
- Repo cũ: cổng & luật hình
- CLAUDE.md cũ — hợp đồng vận hành (Pipeline Gates and Rules)
- Lệnh npm (scripts)
- Composition video đào tạo
- stills.ts
- Xuất CapCut
- Server Editor
- transcribe.py
- Kiểm kịch bản
- package.json
- runCapture
- commands-text.ts
- Agent Workflow / Multi-Agent Operating Model
- Job & smoke test
- parity-check.ts
- project-schema.ts
- Dàn ý tài liệu
- AGENTS.md & quy tắc cứng
- vieneu-server.py
- clips-core.check.mjs
- scenes.ts
- Thư viện phụ thuộc
- commands-media.ts
- ref_node_fs
- vieneu-client.ts
- template-script-schema.ts
- Đặc tả Chế độ C
- Project
- useT
- brand-config.ts
- S5B phim trường 3D
- music-analyze.py
- Đóng gói bản công khai
- build-presets.mjs
- preset-contrast.mjs
- Kế hoạch hợp nhất & 18 nhân sự
- argparse
- words-align.test.mjs
- Repo cũ: hướng dẫn B-roll
- Chuẩn hoá lời đọc tiếng Việt
- Thư viện dev
- subject.py
- gates.test.ts
- revision.ts
- Repo cũ: Chế độ B
- Chế độ B chuỗi AI
- Remotion bàn dựng chính
- Hợp đồng câu–hình
- Repo cũ: cổng khung hình
- Repo cũ: cache giọng
- S3 · Tổ âm thanh

## God Nodes (most connected - your core abstractions)
1. `G()` - 373 edges
2. `Box()` - 278 edges
3. `useT()` - 213 edges
4. `lerp()` - 173 edges
5. `Lines()` - 122 edges
6. `Stage()` - 117 edges
7. `Tag()` - 117 edges
8. `Floor()` - 117 edges
9. `Arrow()` - 83 edges
10. `Person()` - 74 edges

## Surprising Connections (you probably didn't know these)
- `Overlay runtime dùng chung editor + render (seek tất định)` --semantically_similar_to--> `Khung hình là hàm thuần của useCurrentFrame() + kiểm tất định`  [INFERRED] [semantically similar]
  docs/tham-khao-repo-cu/CHE-DO-C-SPEC.md → AGENTS.md
- `Khung hình 16:9 / 4:5 và crop từ bụng trở lên` --semantically_similar_to--> `Người dùng chọn tỷ lệ khung mỗi video (16:9, 9:16, 4:5, 1:1)`  [INFERRED] [semantically similar]
  docs/tham-khao-repo-cu/CHE-DO-C-SPEC.md → AGENTS.md
- `JOB_DIR` --calls--> `jobDir()`  [EXTRACTED]
  scripts/editor/server.ts → src/talking-head/jobs.ts
- `S6 · Tổ kiểm định (QA)` --implements--> `Đánh giá công cụ từ mã nguồn; chưa chạy là Cần thử`  [INFERRED]
  .claude/agents/s6-qa.md → AGENTS.md
- `S6 · Tổ kiểm định (QA)` --implements--> `Bài thử tất định`  [EXTRACTED]
  .claude/agents/s6-qa.md → docs/NANG-CAP-NHAN-SU.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **videoClips là nguồn sự thật: chặn th:cut/audio/intro/project --force** — docs_tham_khao_repo_cu_che_do_c_spec_video_clips, docs_che_do_c_canh_bao_thu_tu, src_talking_head_cli, src_talking_head_render_cli [EXTRACTED 1.00]
- **Công thức khung video dùng chung editor/render (videoTransform + videoMoves + videoShifts)** — docs_tham_khao_repo_cu_che_do_c_spec_video_shifts, docs_tham_khao_repo_cu_che_do_c_spec_reframe_camera, docs_tham_khao_repo_cu_che_do_c_spec_video_moves, src_talking_head_video_moves [EXTRACTED 1.00]
- **Hệ cổng chặn rule trước render (máy + MẮT)** — docs_tham_khao_repo_cu_skill_bang_rule_cong, docs_tham_khao_repo_cu_skill_cong_truoc_render, docs_tham_khao_repo_cu_skill_canary_fixtures, docs_tham_khao_repo_cu_skill_approval_json, docs_tham_khao_repo_cu_skill_quality_gate [EXTRACTED 1.00]
- **Bộ rule hình 0 / 0b / 0c / 0d** — docs_tham_khao_repo_cu_skill_rule_0_hinh_minh_hoa, docs_tham_khao_repo_cu_skill_rule_0b_hinh_phai_ro, docs_tham_khao_repo_cu_skill_rule_0c_taste_rules, docs_tham_khao_repo_cu_skill_rule_0d_cam_template_generic [EXTRACTED 1.00]
- **Dây chuyền Master + 7 Specialist** — docs_tham_khao_repo_cu_multi_agent_model_master_agent, docs_tham_khao_repo_cu_multi_agent_model_specialist_1_content_architect, docs_tham_khao_repo_cu_multi_agent_model_specialist_2_copywriter, docs_tham_khao_repo_cu_multi_agent_model_specialist_3_audio, docs_tham_khao_repo_cu_multi_agent_model_specialist_4_svg_designer, docs_tham_khao_repo_cu_multi_agent_model_specialist_5_motion, docs_tham_khao_repo_cu_multi_agent_model_specialist_6_qa, docs_tham_khao_repo_cu_multi_agent_model_specialist_7_visual_critic [EXTRACTED 1.00]
- **Luồng B-roll Chế độ C: plan → th:broll → overlay dịch người nói → SFX** — docs_tham_khao_repo_cu_broll_guide_broll_plan_json, docs_tham_khao_repo_cu_broll_guide_th_broll, docs_tham_khao_repo_cu_broll_guide_overlay_dich_nguoi_noi_side, docs_tham_khao_repo_cu_broll_guide_moi_phan_tu_co_sfx [INFERRED 0.85]
- **Bảo đảm tất định khung hình** — docs_nang_cap_nhan_su_determinism_test, docs_quy_trinh_new_tool_procedure, scripts_gate_determinism, _claude_agents_s6_qa [INFERRED 0.85]
- **Kể bằng hình, không bằng chữ** — docs_nang_cap_nhan_su_picture_before_text, docs_quy_chuan_hinh_keyword_only_text, docs_quy_chuan_chuoi_ai_anti_slide_rule, docs_nang_cap_nhan_su_label_off_gate [INFERRED 0.85]

## Communities (66 total, 12 thin omitted)

### Community 0 - "Box"
Cohesion: 0.06
Nodes (265): Calendar(), clamp01(), Cursor(), Disk(), FileIcon(), Intern(), Laptop(), Loop() (+257 more)

### Community 1 - "Cảnh Trợ lý Pháp chế & Label"
Cohesion: 0.06
Nodes (107): S4 · Tổ tranh, S5A · Tổ chuyển động 2D, S7 · Visual Critic, #06 Anime.js v4, #08 dotLottie, #02 GSAP Skills, #05 GSAP Timeline, #10 Motion Canvas (hoãn) (+99 more)

### Community 2 - "sfx-plan.ts"
Cohesion: 0.05
Nodes (59): vitest, handleLibraryApi(), LibraryCtx, listTemplates(), readJsonBody(), ROUTES, sendJson(), templateAspect() (+51 more)

### Community 3 - "pipeline-runner.ts"
Cohesion: 0.12
Nodes (12): normalizeLoudness(), LOCAL_TMP, args, errors, facts, finalPath, job, maxStillIndex (+4 more)

### Community 4 - "broll-plan.ts"
Cohesion: 0.06
Nodes (49): AnyLayer, AssetInfo, assetSize(), Beat, BeatSchema, BrollContext, BrollPlan, BrollPlanSchema (+41 more)

### Community 5 - "training-contract.ts"
Cohesion: 0.06
Nodes (37): S6 · Tổ kiểm định (QA), Cổng đối chiếu nguồn, args, aspect, duration, errors, facts, lufs (+29 more)

### Community 6 - "G"
Cohesion: 0.08
Nodes (114): Heart(), Mirror(), Shield(), Star(), Badge(), Ban(), Battery(), Belt() (+106 more)

### Community 7 - "ref_node_path"
Cohesion: 0.06
Nodes (58): concatWithSilence(), getDurationSec, mixSfxOntoVoice(), SfxMixSpec, getMediaDurationSec(), runMediaCommand(), concatVideos(), ENCODE() (+50 more)

### Community 8 - "QA Editor qua CDP"
Cohesion: 0.06
Nodes (28): openPage(), sleep(), R, [url = "http://localhost:4360/?theme=dark", out = "scripts/editor/public/design/screens"], clipRect(), drag(), E(), fails (+20 more)

### Community 9 - "Repo cũ: cổng & luật hình"
Cohesion: 0.05
Nodes (28): approval.json (npm run approve sau xác nhận bằng lời), Bảng RULE → CỔNG (máy đo vs MẮT), Brand Palette Preservation & External Platform Exception, Brand watermark (góc trên phải, opacity 0.40), Bộ cảnh canary cố ý vi phạm, Cấu trúc nhận thức cho người trưởng thành (Relevance, Chunking, Cognitive load, Signaling, Progressive disclosure), Chế độ A — Học liệu đào tạo, Chế độ C — Talking head từ clip quay thật (+20 more)

### Community 10 - "CLAUDE.md cũ — hợp đồng vận hành (Pipeline Gates and Rules)"
Cohesion: 0.12
Nodes (10): DECISIONS.md — sổ quyết định kiến trúc, Bảng RULE → CỔNG, CLAUDE.md cũ — hợp đồng vận hành (Pipeline Gates and Rules), Ba chế độ nội dung A/B/C, Bảng RULE → CỔNG, Bộ cảnh canary cố ý vi phạm, Cổng xác nhận bắt buộc (giọng, khung, thời lượng, preview, script review), Khuôn thiết kế cảnh chuẩn (_tvhs_scene + _tvhs_art, rút từ modau3) (+2 more)

### Community 11 - "Lệnh npm (scripts)"
Cohesion: 0.04
Nodes (45): scripts, approve, assets:optimize, audio:pan, capcut:export, clean:tmp, doc:outline, doctor (+37 more)

### Community 12 - "Composition video đào tạo"
Cohesion: 0.13
Nodes (22): SceneProvider, calculateTrainingMetadata(), musicVolume(), TrainingVideoComposition(), TrainingVideoProps, GlobalFonts(), emptyProps, RemotionRoot() (+14 more)

### Community 13 - "stills.ts"
Cohesion: 0.17
Nodes (11): Master · Bàn dựng, Thêm công cụ hoặc hiệu ứng mới, @remotion/bundler, @remotion/renderer, FIXTURE_FRAMES, FIXTURE_IDS, report(), hashFile() (+3 more)

### Community 14 - "Xuất CapCut"
Cohesion: 0.06
Nodes (34): after, args, bake(), before, cli, clips, counted, created (+26 more)

### Community 15 - "Server Editor"
Cohesion: 0.11
Nodes (29): args, build, buildStatus(), editorProject(), getLibraryHandler(), getPeaks(), handle(), JOB_DIR (+21 more)

### Community 16 - "transcribe.py"
Cohesion: 0.17
Nodes (12): build_transcript(), detect_fillers(), fill_word_times(), is_oom(), load_audio(), log(), main(), norm() (+4 more)

### Community 17 - "Kiểm kịch bản"
Cohesion: 0.16
Nodes (24): cell(), checkAgainstSource(), checkLabels(), checkLength(), checkNarration(), checkScript(), checkSpokenNumbers(), COUNT_UNITS (+16 more)

### Community 18 - "package.json"
Cohesion: 0.07
Nodes (25): author, description, keywords, license, main, name, private, type (+17 more)

### Community 19 - "runCapture"
Cohesion: 0.11
Nodes (27): resolveMediaBinary(), shortPathCache, buildMixGraph(), decodeMono(), duckParams(), ensureProjectMix(), f(), frameDb() (+19 more)

### Community 20 - "commands-text.ts"
Cohesion: 0.10
Nodes (62): Cổng duyệt th:approve (outline, cut), Thứ tự chạy chuẩn 22 bước, videoClips — video gốc chỉnh được, nguồn sự thật duy nhất, main(), buildClipsFromCutMap(), clipsBuild(), clipsInit(), broll() (+54 more)

### Community 21 - "Agent Workflow / Multi-Agent Operating Model"
Cohesion: 0.13
Nodes (16): Agent Workflow / Multi-Agent Operating Model, Anti-Slop Design & Speech-Synced Active Focus Glow, Video Aspect Ratio & Framing Gate, Company Brand Palette & Third-Party Brand Exception, Kiến trúc render đa worker trên máy người dùng, Master Agent (Executive Producer), Specialist 1 — Content Architect & Series Planner, Specialist 2 — AI Copywriter & Narration (+8 more)

### Community 22 - "Job & smoke test"
Cohesion: 0.15
Nodes (21): Bảng file phụ trách theo tổ, [aspect = "16:9", voice = "Ngọc Huyền", doc = "fixtures/smoke/smoke.md"], job, script, applySpeed(), main(), probeDurationSec(), synthesize() (+13 more)

### Community 23 - "parity-check.ts"
Cohesion: 0.12
Nodes (11): args, dir, FFMPEG, job, out, probe, REPO, results (+3 more)

### Community 24 - "project-schema.ts"
Cohesion: 0.06
Nodes (29): AnimInSchema, AnimLoopSchema, AnimOutSchema, Approval, ApprovalSchema, CutRangeSchema, Cuts, Outline (+21 more)

### Community 25 - "Dàn ý tài liệu"
Cohesion: 0.13
Nodes (22): cleanHeading(), cleanInline(), CONTENT_TYPES, ContentHint, DocumentOutline, extractNumbers(), HINT_PATTERNS, inferContentHints() (+14 more)

### Community 26 - "AGENTS.md & quy tắc cứng"
Cohesion: 0.09
Nodes (20): Copilot instructions, AGENTS.md — hướng dẫn chung cho mọi agent, npm run gate:determinism, Luồng S1→S7 (phân tích → kịch bản → giọng → dựng → QA → soi mắt → render), Làm mới bản đồ mã (npm run graph / /graphify --update), Thẻ vai trong .claude/agents/, TVHs-Labs-Video (tài liệu đào tạo → video Remotion), Đăng ký cảnh trong src/videos/registry.ts (+12 more)

### Community 27 - "vieneu-server.py"
Cohesion: 0.12
Nodes (10): S3 · Tổ âm thanh, #16 Remotion Audio + FFmpeg, #17 VieNeu-TTS, default_device(), json_bytes(), main(), do_GET(), do_POST() (+2 more)

### Community 28 - "clips-core.check.mjs"
Cohesion: 0.13
Nodes (13): app, bf, clips, h, ins, L, mp, mv (+5 more)

### Community 29 - "scenes.ts"
Cohesion: 0.16
Nodes (23): CatalogScene, customSceneHtml(), editableRegion(), EDITONNY_ROOTS, EDITONNY_VISUALS, fileForWeight(), findAsset(), loadCatalog() (+15 more)

### Community 30 - "Thư viện phụ thuộc"
Cohesion: 0.10
Nodes (21): dependencies, animejs, axios, dotenv, gsap, @lottiefiles/dotlottie-web, react, react-dom (+13 more)

### Community 31 - "commands-media.ts"
Cohesion: 0.08
Nodes (49): alignEdits(), alignSegment(), lcsPairs(), Brand, fitChars(), flattenOutline(), geometry(), outlineLayers() (+41 more)

### Community 32 - "ref_node_fs"
Cohesion: 0.08
Nodes (52): normToken(), cutPlan(), loadBestTranscript(), loadMedia(), MediaJson, pollVram(), transcribe(), Filler (+44 more)

### Community 33 - "vieneu-client.ts"
Cohesion: 0.14
Nodes (12): axios, dotenv, Config, intDefault(), loadConfig(), TtsProvider, createTtsClient(), TtsClient (+4 more)

### Community 34 - "template-script-schema.ts"
Cohesion: 0.15
Nodes (12): zod, SfxSpec, TemplateScene, TemplateSceneType, TemplateScript, TemplateScriptSchema, TplSfxSpecType, VIENEU_STYLES (+4 more)

### Community 35 - "Đặc tả Chế độ C"
Cohesion: 0.12
Nodes (16): Đặc tả kỹ thuật Chế độ C v1, Âm thanh trong project.json (sfx, music ducking, master loudnorm), Minh hoạ động / B-roll (broll-plan.json, th:broll), Cutaway và overlay (cảnh minh hoạ), Phát hiện từ đệm bằng VAD + danh sách, Model ASR/âm thanh (Whisper large-v3, wav2vec2 vi, Silero VAD, DeepFilterNet3), Preset th-presets (subtitle, lowerThird, callout, sfx-packs), project.json v1 (tracks, layers) (+8 more)

### Community 36 - "Project"
Cohesion: 0.09
Nodes (42): log, toAsciiShortPath(), aiCameraOn(), clipTransformSpans(), effectiveMoves(), effectiveShifts(), hasClipTransforms(), staticCovers() (+34 more)

### Community 37 - "useT"
Cohesion: 0.10
Nodes (102): Bolt(), Bottle(), Calendar(), Coupon(), Gauge(), Gift(), Heart(), Leaf() (+94 more)

### Community 38 - "brand-config.ts"
Cohesion: 0.18
Nodes (10): applyNarrationReplacements(), BrandConfig, BrandConfigSchema, BrandPersona, DEFAULT_GUIDELINE_PATH, escapeRegExp(), getPersona(), listPersonaIds() (+2 more)

### Community 39 - "S5B phim trường 3D"
Cohesion: 0.17
Nodes (10): S5B · Tổ phim trường 3D, #13 Drei, #15 Postprocessing, #12 R3F, #14 Rapier, #11 Three.js, Lộ trình đề xuất GĐ 0–5, Font 3D thiếu dấu tiếng Việt (+2 more)

### Community 40 - "music-analyze.py"
Cohesion: 0.16
Nodes (4): main(), kw(), peaks_of(), load_legacy_voices()

### Community 41 - "Đóng gói bản công khai"
Cohesion: 0.13
Nodes (12): S6xEditer (bản công khai), Hai bản: nội bộ và công khai, ALLOW, guideline, pkg, problems, REPLACE, tar (+4 more)

### Community 42 - "build-presets.mjs"
Cohesion: 0.15
Nodes (9): BASE, bigLay, coLay, file(), K(), ltLay, NS, pack() (+1 more)

### Community 43 - "preset-contrast.mjs"
Cohesion: 0.20
Nodes (8): BLACK, DIR, lin(), lum(), ratio(), REPO, rows, WHITE

### Community 44 - "Kế hoạch hợp nhất & 18 nhân sự"
Cohesion: 0.12
Nodes (21): S1 · Content Architect, S2 · Copywriter, 18 nhân sự theo tổ Specialist, Kế hoạch hợp nhất pipeline cũ và đóng gói, Nghiên cứu nâng cấp 18 nhân sự, Giấy phép Remotion, Quy chuẩn lời đọc chuỗi Bài viết về AI (Chế độ B), Hình theo loại nội dung (+13 more)

### Community 45 - "argparse"
Cohesion: 0.21
Nodes (4): free_vram(), setup_env(), main(), patch_torchaudio()

### Community 47 - "Repo cũ: hướng dẫn B-roll"
Cohesion: 0.24
Nodes (7): Hướng dẫn viết broll-plan.json (Chế độ C), broll-plan.json (kế hoạch beat B-roll), Máy quay tự động zoom ở ranh giới câu (camera.auto), Cutaway (nền đặc) vs Overlay (nền trong suốt), Overlay dịch người nói sang phía đối diện (side → videoShifts), Quy đổi vùng mặt khi reframe (subject.json transform), Lệnh th:broll

### Community 48 - "Chuẩn hoá lời đọc tiếng Việt"
Cohesion: 0.31
Nodes (10): DIGITS, FILLER_PHRASES, integerToVietnamese(), NarrationIssue, normalizeVietnameseNarration(), numericTokenToVietnamese(), readThreeDigits(), readTwoDigits() (+2 more)

### Community 49 - "Thư viện dev"
Cohesion: 0.20
Nodes (10): devDependencies, capcut-cli, svgo, tsx, @types/node, @types/react, @types/react-dom, @types/three (+2 more)

### Community 50 - "subject.py"
Cohesion: 0.48
Nodes (4): detect_cv2(), detect_mediapipe(), detect_yunet(), main()

### Community 52 - "gates.test.ts"
Cohesion: 0.12
Nodes (17): svgo, typescript, bakePhysics(), clean(), PhysicsSpec, [specPath, outPath], ASSETS_DIR, optimizeSvg() (+9 more)

### Community 56 - "Repo cũ: Chế độ B"
Cohesion: 0.40
Nodes (5): Chế độ B — Chuỗi bài AI, Copywriting & Narration Standards (16 nguyên tắc, 8–16 chỉ Chế độ B), Một lời kêu gọi duy nhất (Lưu/Gửi), cấm engagement bait, Retention Curve (Hook → Escalation → Payoff → CTA), 3-Layer Hook chuẩn Viral (Visual, Verbal, Text Overlay)

### Community 57 - "Chế độ B chuỗi AI"
Cohesion: 0.50
Nodes (4): Chế độ B · Chuỗi bài AI, Retention Curve, Một lời kêu gọi duy nhất (Lưu/Gửi), 3-Layer Hook

### Community 69 - "S3 · Tổ âm thanh"
Cohesion: 0.22
Nodes (7): #18 FFmpeg (người duyệt cuối), 0b. Hình phải rõ, lengthDecision, Máy móc chặn những gì (các cổng), Cổng render (khổ, fps, codec, −14 LUFS), script:validate, Cổng stills (độ phủ ≥ 62%)

## Knowledge Gaps
- **78 isolated node(s):** `@react-three/drei`, `@react-three/fiber`, `@react-three/postprocessing`, `@react-three/rapier`, `@remotion/three` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 648 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Cảnh Trợ lý Pháp chế & Label` to `Box`, `useT`, `G`, `Composition video đào tạo`, `package.json`, `gates.test.ts`?**
  _High betweenness centrality (0.295) - this node is a cross-community bridge._
- **What connects `@react-three/drei`, `@react-three/fiber`, `@react-three/postprocessing` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Box` be split into smaller, more focused modules?**
  _Cohesion score 0.06328019075225583 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `sfx-plan.ts` to `ref_node_fs`, `broll-plan.ts`, `Project`, `ref_node_path`, `Kiểm kịch bản`, `package.json`, `runCapture`, `commands-text.ts`, `gates.test.ts`, `Job & smoke test`, `project-schema.ts`, `scenes.ts`, `commands-media.ts`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **Should `Cảnh Trợ lý Pháp chế & Label` be split into smaller, more focused modules?**
  _Cohesion score 0.05672342924251321 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `template-script-schema.ts` to `broll-plan.ts`, `training-contract.ts`, `brand-config.ts`, `package.json`, `commands-text.ts`, `project-schema.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `sfx-plan.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05297334244702666 - nodes in this community are weakly interconnected._