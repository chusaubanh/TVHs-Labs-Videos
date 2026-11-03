# Graph Report - TVHs-Labs-Video  (2026-11-03)

## Corpus Check
- 203 files · ~220,273 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .bat 2)

## Summary
- 1964 nodes · 6190 edges · 79 communities (67 shown, 12 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 81 edges (avg confidence: 0.84)
- Token cost: 496,293 input · 0 output

## Community Hubs (Navigation)
- Cảnh video bài học
- Cảnh Trợ lý Pháp chế & Label
- ASR và server VieNeu (Python)
- Chế độ C: CLI & căn lời
- Chế độ C: API thư viện
- Gói Premiere quay màn hình
- Kế hoạch B-roll
- Chế độ C: lệnh dựng media
- QA Editor qua CDP
- Composition video đào tạo
- Cân âm lượng clip
- Screencast mix
- Bake vật lý & cổng
- Mix âm thanh Chế độ C
- Lệnh B-roll
- Xuất CapCut
- Screencast riêng
- Screencast v2
- Cấu hình & TTS studio
- Server Editor
- Screencast gốc
- Kiểm kịch bản
- Job Editor quay màn hình
- Intro & mã hoá GPU
- Đo hiệu năng Chrome
- Job & smoke test
- Render overlay
- Dàn ý tài liệu
- Cổng tất định
- Máy quay ảo
- Repo cũ: mô hình đa agent
- Tổ S1–S7 và luồng
- S4 tranh & công cụ
- Bài X: harness & loop
- Brand & lời đọc
- Repo cũ: đặc tả Chế độ C
- Kế hoạch cắt
- Kiểm parity Editor
- S5A chuyển động 2D
- S5B phim trường 3D
- Đóng gói bản công khai
- Repo cũ: chỉ số funnel
- Kiểm lõi clip Editor
- Timeline Premiere
- Công cụ audio studio
- Repo cũ: brief bài học
- Preset Chế độ C
- Quy tắc cứng & S6
- Repo cũ: hướng dẫn B-roll
- Repo cũ: cổng & quy tắc
- Tương phản preset
- Kế hoạch hợp nhất repo
- Repo cũ: Hook/Hold/CTR
- Repo cũ: sổ quyết định
- Repo cũ: luật thương hiệu
- Repo cũ: duyệt & canary
- Chuẩn hoá lời đọc tiếng Việt
- Label & phiếu duyệt
- Phần tử timeline XML
- Repo cũ: video chỉ số QC
- Repo cũ: quy trình quay màn hình
- Căn từ Editor
- Tối ưu SVG
- Repo cũ: 20 repo motion
- Repo cũ: SKILL & cài đặt
- Editor & lệnh th:*
- Chế độ B chuỗi AI
- Phân tích nội dung
- Căn giọng screencast
- Remotion bàn dựng chính
- Nối clip FFmpeg
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
8. `Tag()` - 52 edges
9. `Arrow()` - 52 edges
10. `Lines()` - 45 edges

## Surprising Connections (you probably didn't know these)
- `README TVHs-Labs-Videos` --references--> `Giấy phép Remotion`  [INFERRED]
  README.md → docs/NANG-CAP-NHAN-SU.md
- `JOB_DIR` --calls--> `jobDir()`  [EXTRACTED]
  scripts/editor/server.ts → src/talking-head/jobs.ts
- `S6 · Tổ kiểm định (QA)` --implements--> `Đánh giá công cụ từ mã nguồn; chưa chạy là 'Cần thử'`  [INFERRED]
  .claude/agents/s6-qa.md → AGENTS.md
- `S7 · Visual Critic` --implements--> `Cổng tắt chữ`  [EXTRACTED]
  .claude/agents/s7-visual-critic.md → docs/NANG-CAP-NHAN-SU.md
- `Copilot instructions` --references--> `AGENTS.md (chỉ dẫn chung cho agent)`  [EXTRACTED]
  .github/copilot-instructions.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Luồng S1→S7 làm video từ tài liệu** — _claude_agents_s1_content_architect, _claude_agents_s2_copywriter, _claude_agents_s3_audio, _claude_agents_s4_visual, _claude_agents_s5a_motion_2d, _claude_agents_s5b_stage_3d, _claude_agents_s6_qa, _claude_agents_s7_visual_critic [EXTRACTED 1.00]
- **Bảo đảm tất định khung hình** — agents_rule_frame_pure_function, docs_nang_cap_nhan_su_determinism_test, docs_quy_trinh_new_tool_procedure, scripts_gate_determinism, _claude_agents_s6_qa [INFERRED 0.85]
- **Kể bằng hình, không bằng chữ** — agents_rule_sentence_is_picture_action, docs_nang_cap_nhan_su_picture_before_text, docs_quy_chuan_hinh_keyword_only_text, docs_quy_chuan_chuoi_ai_anti_slide_rule, docs_nang_cap_nhan_su_label_off_gate [INFERRED 0.85]
- **Luồng B-roll Chế độ C: plan → th:broll → overlay dịch người nói → SFX** — docs_tham_khao_repo_cu_broll_guide_broll_plan_json, docs_tham_khao_repo_cu_broll_guide_th_broll, docs_tham_khao_repo_cu_broll_guide_overlay_dich_nguoi_noi_side, docs_tham_khao_repo_cu_broll_guide_moi_phan_tu_co_sfx, docs_tham_khao_repo_cu_che_do_c_spec_overlay_runtime_tat_dinh [INFERRED 0.85]
- **Motion design + harness + loop là một stack** — docs_tham_khao_repo_cu_how_to_turn_opus_5_5_into_a_studio__the_full_guide_to_motion_design__harnesses_and_loops___x_four_parts_of_a_studio, docs_tham_khao_repo_cu_how_to_turn_opus_5_5_into_a_studio__the_full_guide_to_motion_design__harnesses_and_loops___x_harness_engineering, docs_tham_khao_repo_cu_how_to_turn_opus_5_5_into_a_studio__the_full_guide_to_motion_design__harnesses_and_loops___x_loop_engineering, docs_tham_khao_repo_cu_how_to_turn_opus_5_5_into_a_studio__the_full_guide_to_motion_design__harnesses_and_loops___x_smoke_test_seam_check, docs_tham_khao_repo_cu_how_to_turn_opus_5_5_into_a_studio__the_full_guide_to_motion_design__harnesses_and_loops___x_house_rules [EXTRACTED 1.00]
- **Dây chuyền Master + 7 Specialist** — docs_tham_khao_repo_cu_multi_agent_model_master_agent, docs_tham_khao_repo_cu_multi_agent_model_specialist_1_content_architect, docs_tham_khao_repo_cu_multi_agent_model_specialist_2_copywriter, docs_tham_khao_repo_cu_multi_agent_model_specialist_3_audio, docs_tham_khao_repo_cu_multi_agent_model_specialist_4_svg_designer, docs_tham_khao_repo_cu_multi_agent_model_specialist_5_motion, docs_tham_khao_repo_cu_multi_agent_model_specialist_6_qa, docs_tham_khao_repo_cu_multi_agent_model_specialist_7_visual_critic [EXTRACTED 1.00]
- **Hệ cổng chặn rule trước render (máy + MẮT)** — docs_tham_khao_repo_cu_skill_bang_rule_cong, docs_tham_khao_repo_cu_skill_cong_truoc_render, docs_tham_khao_repo_cu_skill_canary_fixtures, docs_tham_khao_repo_cu_skill_approval_json, docs_tham_khao_repo_cu_skill_quality_gate [EXTRACTED 1.00]
- **Bộ rule hình 0 / 0b / 0c / 0d** — docs_tham_khao_repo_cu_skill_rule_0_hinh_minh_hoa, docs_tham_khao_repo_cu_skill_rule_0b_hinh_phai_ro, docs_tham_khao_repo_cu_skill_rule_0c_taste_rules, docs_tham_khao_repo_cu_skill_rule_0d_cam_template_generic [EXTRACTED 1.00]
- **Chẩn đoán quảng cáo bằng chỉ số phễu** — docs_tham_khao_repo_cu_brief_3_bai_hoc_ba_tang_pheu, docs_tham_khao_repo_cu_brief_3_bai_hoc_ma_tran_bat_benh, docs_tham_khao_repo_cu_brief_3_bai_hoc_quy_trinh_danh_gia_nguoc, docs_tham_khao_repo_cu_brief_3_bai_hoc_nguyen_tac_phan_dinh_loi [INFERRED 0.85]

## Communities (79 total, 12 thin omitted)

### Community 0 - "Cảnh video bài học"
Cohesion: 0.06
Nodes (250): AiLaBanAy(), Gear(), Hook(), Intern(), NguocDoi(), PhanXa(), Quarter(), Stairs() (+242 more)

### Community 1 - "Cảnh Trợ lý Pháp chế & Label"
Cohesion: 0.09
Nodes (82): Label(), SceneContext, SceneContextValue, useBeats(), useScene(), useSceneText(), SceneTiming, TrainingScene (+74 more)

### Community 2 - "ASR và server VieNeu (Python)"
Cohesion: 0.05
Nodes (31): Máy chủ VieNeu (cổng 8124), #17 VieNeu-TTS, free_vram(), setup_env(), main(), patch_torchaudio(), detect_cv2(), detect_mediapipe() (+23 more)

### Community 3 - "Chế độ C: CLI & căn lời"
Cohesion: 0.10
Nodes (62): alignEdits(), alignSegment(), lcsPairs(), normToken(), main(), clipsBuild(), clipsInit(), subject() (+54 more)

### Community 4 - "Chế độ C: API thư viện"
Cohesion: 0.05
Nodes (52): handleLibraryApi(), LibraryCtx, listTemplates(), readJsonBody(), ROUTES, sendJson(), templateAspect(), project (+44 more)

### Community 5 - "Gói Premiere quay màn hình"
Cohesion: 0.03
Nodes (56): all, args, AudioLayer, callouts, cfg, cfgPath, clean, clipGain (+48 more)

### Community 6 - "Kế hoạch B-roll"
Cohesion: 0.06
Nodes (46): AnyLayer, AssetInfo, assetSize(), Beat, BeatSchema, BrollContext, BrollPlan, BrollPlanSchema (+38 more)

### Community 7 - "Chế độ C: lệnh dựng media"
Cohesion: 0.08
Nodes (43): archiveIfExists(), audio(), Brand, buildProject(), flattenOutline(), geometry(), outlineLayers(), isKept() (+35 more)

### Community 8 - "QA Editor qua CDP"
Cohesion: 0.06
Nodes (28): openPage(), sleep(), R, [url = "http://localhost:4360/?theme=dark", out = "scripts/editor/public/design/screens"], clipRect(), drag(), E(), fails (+20 more)

### Community 9 - "Composition video đào tạo"
Cohesion: 0.09
Nodes (31): SceneProvider, calculateTrainingMetadata(), musicVolume(), TrainingVideoComposition(), TrainingVideoProps, GlobalFonts(), emptyProps, RemotionRoot() (+23 more)

### Community 10 - "Cân âm lượng clip"
Cohesion: 0.11
Nodes (33): Cache, cacheFile(), CLIP_TARGET_LUFS, ClipGain, computeClipGains(), GAIN_MAX, GAIN_MIN, integrated() (+25 more)

### Community 11 - "Screencast mix"
Cohesion: 0.08
Nodes (33): aenc, args, assFilterPath(), assTime(), blocks(), blurChain(), Box, boxesFor() (+25 more)

### Community 12 - "Bake vật lý & cổng"
Cohesion: 0.08
Nodes (27): bakePhysics(), clean(), PhysicsSpec, [specPath, outPath], [input, output, pan], panFilter(), args, aspect (+19 more)

### Community 13 - "Mix âm thanh Chế độ C"
Cohesion: 0.12
Nodes (26): resolveMediaBinary(), shortPathCache, buildMixGraph(), decodeMono(), duckParams(), ensureProjectMix(), f(), frameDb() (+18 more)

### Community 14 - "Lệnh B-roll"
Cohesion: 0.10
Nodes (31): broll(), convertFace(), Face, loadAssetManifest(), measuredTransform(), sameVt(), SfxPack, loadProject() (+23 more)

### Community 15 - "Xuất CapCut"
Cohesion: 0.07
Nodes (30): after, args, bake(), before, cli, clips, counted, created (+22 more)

### Community 16 - "Screencast riêng"
Cohesion: 0.09
Nodes (30): args, assFilterPath(), assTime(), blocks(), blurChain(), Box, boxesFor(), buildAss() (+22 more)

### Community 17 - "Screencast v2"
Cohesion: 0.09
Nodes (30): args, assFilterPath(), assTime(), blocks(), blurChain(), Box, boxesFor(), buildAss() (+22 more)

### Community 18 - "Cấu hình & TTS studio"
Cohesion: 0.08
Nodes (21): Config, intDefault(), loadConfig(), TtsProvider, SfxSpec, TemplateScene, TemplateSceneType, TemplateScript (+13 more)

### Community 19 - "Server Editor"
Cohesion: 0.10
Nodes (31): args, build, buildStatus(), editorProject(), getLibraryHandler(), getPeaks(), handle(), JOB_DIR (+23 more)

### Community 20 - "Screencast gốc"
Cohesion: 0.09
Nodes (29): args, assFilterPath(), assTime(), blocks(), blurChain(), Box, boxesFor(), buildAss() (+21 more)

### Community 21 - "Kiểm kịch bản"
Cohesion: 0.14
Nodes (27): loadScript(), musicKeyTimes(), cell(), checkAgainstSource(), checkLabels(), checkLength(), checkNarration(), checkScript() (+19 more)

### Community 22 - "Job Editor quay màn hình"
Cohesion: 0.07
Nodes (27): args, base, calloutLayers, calloutStyle, cfg, cfgPath, dir, doc (+19 more)

### Community 23 - "Intro & mã hoá GPU"
Cohesion: 0.14
Nodes (26): gpuEncodeAvailable(), videoCodecArgs(), addIntroToProject(), BACKUP_FILES, buildAudio(), buildIntroLayers(), clippedWordWarnings(), DEFAULT_INTRO_SFX (+18 more)

### Community 24 - "Đo hiệu năng Chrome"
Cohesion: 0.09
Nodes (18): chrome, proc, profile, normalizeLoudness(), args, errors, facts, finalPath (+10 more)

### Community 25 - "Job & smoke test"
Cohesion: 0.15
Nodes (20): Bảng file phụ trách theo tổ, [aspect = "16:9", voice = "Ngọc Huyền", doc = "fixtures/smoke/smoke.md"], job, script, applySpeed(), main(), probeDurationSec(), synthesize() (+12 more)

### Community 26 - "Render overlay"
Cohesion: 0.14
Nodes (23): log, toAsciiShortPath(), ./overlay-runtime.js, area(), backgroundFilter(), Box, composition(), dirSig() (+15 more)

### Community 27 - "Dàn ý tài liệu"
Cohesion: 0.13
Nodes (22): cleanHeading(), cleanInline(), CONTENT_TYPES, ContentHint, DocumentOutline, extractNumbers(), HINT_PATTERNS, inferContentHints() (+14 more)

### Community 28 - "Cổng tất định"
Cohesion: 0.11
Nodes (15): Master · Bàn dựng, FIXTURE_FRAMES, FIXTURE_IDS, report(), hashFile(), openStillSession(), StillSession, testDeterminism() (+7 more)

### Community 29 - "Máy quay ảo"
Cohesion: 0.19
Nodes (19): aiCameraOn(), clipTransformSpans(), effectiveMoves(), effectiveShifts(), hasClipTransforms(), staticCovers(), TransformSpan, VideoClipSchema (+11 more)

### Community 30 - "Repo cũ: mô hình đa agent"
Cohesion: 0.14
Nodes (16): Agent Workflow / Multi-Agent Operating Model, Anti-Slop Design & Speech-Synced Active Focus Glow, Video Aspect Ratio & Framing Gate, Company Brand Palette & Third-Party Brand Exception, Kiến trúc render đa worker trên máy người dùng, Master Agent (Executive Producer), Specialist 1 — Content Architect & Series Planner, Specialist 2 — AI Copywriter & Narration (+8 more)

### Community 31 - "Tổ S1–S7 và luồng"
Cohesion: 0.18
Nodes (16): S1 · Content Architect, S2 · Copywriter, S3 · Tổ âm thanh, S7 · Visual Critic, AGENTS.md (chỉ dẫn chung cho agent), Luồng S1→S7, 18 nhân sự theo tổ Specialist, #16 Remotion Audio + FFmpeg (+8 more)

### Community 32 - "S4 tranh & công cụ"
Cohesion: 0.13
Nodes (9): S4 · Tổ tranh, #08 dotLottie, #04 Satori, #03 SVGO, Cổng tắt chữ, Hợp đồng câu–hình (một câu = một voiceSegments = một nhịp hình), font(), loadFonts() (+1 more)

### Community 33 - "Bài X: harness & loop"
Cohesion: 0.16
Nodes (13): How to Turn Opus 5.5 Into a Studio (bài X), Addy Osmani — Loop Engineering, Harness Engineering: Anatomy, Architecture, and Evolution of Coding Agents (arXiv 2609.00006), Birgitta Böckeler — Harness engineering for coding agent users, Claude Opus 5.5, Bốn loại loop: agentic, goal, time, proactive, Bốn phần của studio (stage, renderer, encoder, checks), Guides (feedforward) và Sensors (feedback) (+5 more)

### Community 34 - "Brand & lời đọc"
Cohesion: 0.14
Nodes (15): tts(), buildIntro(), tts(), tts(), tts(), applyNarrationReplacements(), BrandConfig, BrandConfigSchema (+7 more)

### Community 35 - "Repo cũ: đặc tả Chế độ C"
Cohesion: 0.13
Nodes (15): Chế độ C — đặc tả kỹ thuật v1, Mix âm thanh: ducking + loudnorm master −16 LUFS, Chế độ C — Talking head từ clip quay thật, Job mẫu 02-khung-hinh-vang (set tcvbh2), Model ASR chạy lần lượt trên GPU (Whisper, wav2vec2, DeepFilterNet3), Overlay runtime tất định (mountOverlay/seek), Phát hiện từ đệm bằng VAD, project.json v1 (timeline nhiều layer) (+7 more)

### Community 36 - "Kế hoạch cắt"
Cohesion: 0.13
Nodes (13): Filler, fillerCandidates(), MERGE_GAP, PAUSE_COMMA, PAUSE_SENTENCE, renderCutsMd(), SILENCE_MIN, T() (+5 more)

### Community 37 - "Kiểm parity Editor"
Cohesion: 0.12
Nodes (11): args, dir, FFMPEG, job, out, probe, REPO, results (+3 more)

### Community 38 - "S5A chuyển động 2D"
Cohesion: 0.14
Nodes (10): S5A · Tổ chuyển động 2D, #06 Anime.js v4, #02 GSAP Skills, #05 GSAP Timeline, #10 Motion Canvas (hoãn), #01 Remotion Skills, #07 Remotion Spring, Watermark thương hiệu (+2 more)

### Community 39 - "S5B phim trường 3D"
Cohesion: 0.17
Nodes (11): S5B · Tổ phim trường 3D, #13 Drei, #15 Postprocessing, #12 R3F, #14 Rapier, #11 Three.js, Lộ trình đề xuất GĐ 0–5, Font 3D thiếu dấu tiếng Việt (+3 more)

### Community 40 - "Đóng gói bản công khai"
Cohesion: 0.13
Nodes (12): S6xEditer (bản công khai), Hai bản: nội bộ và công khai, ALLOW, guideline, pkg, problems, REPLACE, tar (+4 more)

### Community 41 - "Repo cũ: chỉ số funnel"
Cohesion: 0.21
Nodes (11): Ba tầng phễu chỉ số (Nhận biết → Cân nhắc → Hành động), CPA (chi phí trên mỗi chuyển đổi), CPC (chi phí mỗi lượt nhấp), CPM (chi phí / 1.000 lượt hiển thị), CTR (tỷ lệ nhấp chuột), Video 2.2. Đánh giá Video/Content từ góc nhìn MB, Video 3. Đọc chỉ số quảng cáo — Góc nhìn MB & MC, Media Buyer (MB) (+3 more)

### Community 42 - "Kiểm lõi clip Editor"
Cohesion: 0.13
Nodes (13): app, bf, clips, h, ins, L, mp, mv (+5 more)

### Community 43 - "Timeline Premiere"
Cohesion: 0.18
Nodes (13): assignLanes(), buildItems(), cut, ev, items, { lanes, count }, pieces, total (+5 more)

### Community 44 - "Công cụ audio studio"
Cohesion: 0.26
Nodes (12): sceneKitCuts(), concatWithSilence(), getDurationSec, mixSfxOntoVoice(), SfxMixSpec, getMediaDurationSec(), runMediaCommand(), concatVideos() (+4 more)

### Community 45 - "Repo cũ: brief bài học"
Cohesion: 0.20
Nodes (10): Brief đọc & phân đoạn 2 bài học Media (TVHS), Cấu trúc nhận thức cho người trưởng thành (Relevance, Chunking, Cognitive load, Signaling, Progressive disclosure), Chế độ A — Học liệu đào tạo, Khuôn thiết kế cảnh chuẩn (rút từ bộ modau3), Scene-Kit Workflow (Stage 1 SVG tĩnh → Stage 2 chuyển động), Kịch bản gửi duyệt script-review.md, Series Defaults (4:5, Trúc Ly cũ, tu_nhien, 1.1, ~3 phút), Tự kiểm tra 10 điểm trước khi gửi (+2 more)

### Community 46 - "Preset Chế độ C"
Cohesion: 0.15
Nodes (9): BASE, bigLay, coLay, file(), K(), ltLay, NS, pack() (+1 more)

### Community 47 - "Quy tắc cứng & S6"
Cohesion: 0.17
Nodes (4): S6 · Tổ kiểm định (QA), Copilot instructions, Cổng đối chiếu nguồn, Thêm công cụ hoặc hiệu ứng mới

### Community 48 - "Repo cũ: hướng dẫn B-roll"
Cohesion: 0.19
Nodes (7): Hướng dẫn viết broll-plan.json (Chế độ C), broll-plan.json (kế hoạch beat B-roll), Máy quay tự động zoom ở ranh giới câu (camera.auto), Cutaway (nền đặc) vs Overlay (nền trong suốt), Overlay dịch người nói sang phía đối diện (side → videoShifts), Quy đổi vùng mặt khi reframe (subject.json transform), Lệnh th:broll

### Community 49 - "Repo cũ: cổng & quy tắc"
Cohesion: 0.18
Nodes (8): Bảng RULE → CỔNG, CLAUDE.md cũ — hợp đồng vận hành (Pipeline Gates and Rules), Bảng RULE → CỔNG, Bộ cảnh canary cố ý vi phạm, Cổng xác nhận bắt buộc (giọng, khung, thời lượng, preview, script review), Khuôn thiết kế cảnh chuẩn (_tvhs_scene + _tvhs_art, rút từ modau3), Thứ tự đọc (CLAUDE.md → SKILL.md → AGENTS.md → CHE-DO-C-SPEC), Thứ tự làm một video (7 bước)

### Community 50 - "Tương phản preset"
Cohesion: 0.20
Nodes (8): BLACK, DIR, lin(), lum(), ratio(), REPO, rows, WHITE

### Community 51 - "Kế hoạch hợp nhất repo"
Cohesion: 0.18
Nodes (11): Chế độ C: dựng từ clip quay thật, Quay màn hình và Premiere, Kế hoạch hợp nhất pipeline cũ và đóng gói, Repo cũ TVHs-Lab-Video-AI, Giấy phép Remotion, requirements-asr.lock (môi trường phiên âm), DeepFilterNet 0.5.6, pyannote.audio 3.4.0 (+3 more)

### Community 52 - "Repo cũ: Hook/Hold/CTR"
Cohesion: 0.18
Nodes (11): Bộ ba thước đo cốt lõi (Hook Rate, Hold Rate, CTR), Bệnh đầu voi đuôi chuột (Hook cao, Hold & CTR thấp), Hold Rate (giữ chân thân bài), Hook Rate (tỷ lệ xem 3 giây đầu), Ma trận bắt bệnh video, Winning Creative, Chế độ B — Chuỗi bài AI, Copywriting & Narration Standards (16 nguyên tắc, 8–16 chỉ Chế độ B) (+3 more)

### Community 54 - "Repo cũ: luật thương hiệu"
Cohesion: 0.20
Nodes (7): Brand Palette Preservation & External Platform Exception, Brand watermark (góc trên phải, opacity 0.40), Quality Gate (điều kiện hoàn thành), Series identity (không slogan, sign-off Thành Vinh Holdings), taste-skill (design-taste-frontend), Visual Design Standard, Cổng nghiệm thu trực quan (Visual Inspection Gate)

### Community 55 - "Repo cũ: duyệt & canary"
Cohesion: 0.18
Nodes (7): approval.json (npm run approve sau xác nhận bằng lời), Bảng RULE → CỔNG (máy đo vs MẮT), Bộ cảnh canary cố ý vi phạm, Chế độ C — Talking head từ clip quay thật, Hình theo loại nội dung (bảng 11 loại), Phân tích trước khi viết (plan.json → analysis, contentType), Tự vấn 5 WHY — khuôn bắt buộc

### Community 56 - "Chuẩn hoá lời đọc tiếng Việt"
Cohesion: 0.31
Nodes (10): DIGITS, FILLER_PHRASES, integerToVietnamese(), NarrationIssue, normalizeVietnameseNarration(), numericTokenToVietnamese(), readThreeDigits(), readTwoDigits() (+2 more)

### Community 57 - "Label & phiếu duyệt"
Cohesion: 0.20
Nodes (9): Sửa script.json làm mất hiệu lực phiếu duyệt, <Label i={n} /> là đường duy nhất cho chữ trên màn hình, #18 FFmpeg (người duyệt cuối), 0b. Hình phải rõ, lengthDecision, Máy móc chặn những gì (các cổng), Cổng render (khổ, fps, codec, −14 LUFS), script:validate (+1 more)

### Community 58 - "Phần tử timeline XML"
Cohesion: 0.22
Nodes (10): clip(), esc(), fileEl(), fileUrl(), fr(), hashed(), shotOf(), shots (+2 more)

### Community 59 - "Repo cũ: video chỉ số QC"
Cohesion: 0.33
Nodes (9): Brief Doc 3 bài học (script tài liệu), Bản đồ chỉ số 3 tầng funnel (CPM, CTR, CPC, CPA, ROAS), Video Đọc chỉ số quảng cáo — Góc nhìn MB & MC, Khung đánh giá video 4 trục & rubric 1–4, Ngưỡng chỉ số theo BU — liên hệ BU mentor, Pattern lỗi video thường gặp, Quy trình đánh giá video 4 bước, Quy trình đánh giá của MB đi ngược funnel (+1 more)

### Community 60 - "Repo cũ: quy trình quay màn hình"
Cohesion: 0.25
Nodes (5): Quy trình video hướng dẫn quay màn hình → Premiere, Gói Premiere (timeline.xml, media/, srt), screencast.json (segments, sequence, maxSpeed), Ước độ dài lời đọc (19–22 ký tự/giây), Video hướng dẫn: quay màn hình + cảnh minh hoạ

### Community 62 - "Tối ưu SVG"
Cohesion: 0.33
Nodes (5): ASSETS_DIR, optimizeSvg(), OUTPUT_DIR, SKIP, walk()

### Community 63 - "Repo cũ: 20 repo motion"
Cohesion: 0.40
Nodes (6): 20 GitHub repos motion design cho Opus 5.5, Bộ skill motion design cho Opus 5.5 (claude-motion, motion-graphics-skills…), GSAP, HyperFrames (HTML → MP4), lottie-web, Remotion (video viết bằng React)

### Community 64 - "Repo cũ: SKILL & cài đặt"
Cohesion: 0.40
Nodes (5): HyperFrames renderer, Thanh Vinh Video Pipeline (SKILL.md repo cũ), Workspace Contract (input/<tên>/ → output/<tên>/), Refresh-Path(), Require-Tool()

### Community 65 - "Editor & lệnh th:*"
Cohesion: 0.40
Nodes (4): Editor (localhost:4317), HyperFrames (lớp phủ, npx), Cảnh báo thứ tự lệnh th:*, Lệnh th:* của Chế độ C

### Community 66 - "Chế độ B chuỗi AI"
Cohesion: 0.50
Nodes (4): Chế độ B · Chuỗi bài AI, Retention Curve, Một lời kêu gọi duy nhất (Lưu/Gửi), 3-Layer Hook

### Community 67 - "Phân tích nội dung"
Cohesion: 0.50
Nodes (4): Hình theo loại nội dung, Cấu trúc nhận thức cho người trưởng thành, Phân tích trước khi viết (analysis), Loại nội dung (contentType)

### Community 69 - "Căn giọng screencast"
Cohesion: 0.50
Nodes (4): alignVoice(), envelope(), pcm(), pearson()

## Ambiguous Edges - Review These
- `Rule 0c — Taste rules cho khung hình video` → `Phiên bản phổ quát (bỏ ngưỡng số liệu cứng)`  [AMBIGUOUS]
  docs/tham-khao-repo-cu/brief-3-bai-hoc.html · relation: conceptually_related_to

## Knowledge Gaps
- **81 isolated node(s):** `./overlay-runtime.js`, `Talking Head README`, `Sửa script.json làm mất hiệu lực phiếu duyệt`, `Máy chủ VieNeu (cổng 8124)`, `#09 Remotion · Bàn dựng chính` (+76 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 733 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Chế độ C — đặc tả kỹ thuật v1` connect `Repo cũ: đặc tả Chế độ C` to `Repo cũ: hướng dẫn B-roll`, `Repo cũ: cổng & quy tắc`, `Repo cũ: sổ quyết định`, `Repo cũ: duyệt & canary`, `Repo cũ: mô hình đa agent`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **What connects `./overlay-runtime.js`, `Talking Head README`, `Sửa script.json làm mất hiệu lực phiếu duyệt` to the rest of the system?**
  _81 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Cảnh video bài học` be split into smaller, more focused modules?**
  _Cohesion score 0.06080955540809555 - nodes in this community are weakly interconnected._
- **Why does `Mix âm thanh: ducking + loudnorm master −16 LUFS` connect `Repo cũ: đặc tả Chế độ C` to `Mix âm thanh Chế độ C`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Should `Cảnh Trợ lý Pháp chế & Label` be split into smaller, more focused modules?**
  _Cohesion score 0.0912280701754386 - nodes in this community are weakly interconnected._
- **Why does `Model ASR chạy lần lượt trên GPU (Whisper, wav2vec2, DeepFilterNet3)` connect `Repo cũ: đặc tả Chế độ C` to `Công cụ audio studio`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Rule 0c — Taste rules cho khung hình video` and `Phiên bản phổ quát (bỏ ngưỡng số liệu cứng)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._