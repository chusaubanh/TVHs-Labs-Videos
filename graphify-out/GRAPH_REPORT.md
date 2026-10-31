# Graph Report - TVHs-Labs-Video  (2026-10-31)

## Corpus Check
- 64 files · ~37,392 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .bat 1)

## Summary
- 427 nodes · 1293 edges · 26 communities (19 shown, 7 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 40 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `75574137`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Tổ Specialist và quy trình
- ref_remotion
- pipeline-runner.ts
- job.ts
- gates.test.ts
- Server giọng VieNeu
- Kiểm kịch bản
- Bài thử tất định và ảnh duyệt
- art.tsx
- Mục lục tài liệu
- qc.ts
- Tổ phim trường 3D
- ref_node_fs
- Phát lại vật lý
- Cổng độ rõ của hình
- Nhãn trên màn hình
- TrainingVideoComposition.tsx
- training-contract.ts
- scene-context.tsx
- qc-ffmpeg.ts
- optimize-svg.mjs
- document-workspace.ts
- Quy chuẩn lời đọc chuỗi Bài viết về AI (Chế độ B)

## God Nodes (most connected - your core abstractions)
1. `G()` - 47 edges
2. `Box()` - 42 edges
3. `useT()` - 37 edges
4. `Stage()` - 36 edges
5. `Tag()` - 35 edges
6. `lerp()` - 33 edges
7. `AI()` - 24 edges
8. `Lines()` - 21 edges
9. `ChotVongLap()` - 19 edges
10. `Doc()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `S1 to render pipeline flow` --conceptually_related_to--> `Quy trinh lam mot video`  [INFERRED]
  CLAUDE.md → docs/QUY-TRINH.md
- `S6 QA` --implements--> `Cong doi chieu nguon`  [INFERRED]
  .claude/agents/s6-qa.md → docs/NANG-CAP-NHAN-SU.md
- `S3 Audio` --shares_data_with--> `timeline.json va props.json`  [INFERRED]
  .claude/agents/s3-audio.md → docs/QUY-TRINH.md
- `S4 Visual` --implements--> `Aspect chosen per video`  [INFERRED]
  .claude/agents/s4-visual.md → CLAUDE.md
- `S5A Motion 2D` --implements--> `Chuyen dong phai co ly do`  [INFERRED]
  .claude/agents/s5a-motion-2d.md → docs/QUY-CHUAN-HINH.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Specialist production chain S1 through S7** — _claude_agents_s1_content_architect, _claude_agents_s2_copywriter, _claude_agents_s3_audio, _claude_agents_s4_visual, _claude_agents_s5a_motion_2d, _claude_agents_s5b_stage_3d, _claude_agents_s6_qa, _claude_agents_s7_visual_critic [EXTRACTED 1.00]
- **3D stage tool cluster** — docs_18_nhan_su_three_js, docs_18_nhan_su_r3f, docs_18_nhan_su_drei, docs_18_nhan_su_rapier, docs_18_nhan_su_postprocessing [EXTRACTED 1.00]
- **Determinism enforcement** — claude_pure_frame_rule, docs_nang_cap_nhan_su_determinism_test, docs_quy_trinh_gate_determinism, docs_quy_trinh_add_tool_procedure [INFERRED 0.95]

## Communities (26 total, 7 thin omitted)

### Community 0 - "Tổ Specialist và quy trình"
Cohesion: 0.05
Nodes (48): S1 Content Architect, S2 Copywriter, S3 Audio, S4 Visual, S5A Motion 2D, S6 QA, S7 Visual Critic, CLAUDE.md project rules (+40 more)

### Community 1 - "ref_remotion"
Cohesion: 0.16
Nodes (3): AnimeBuildContext, emptyProps, RemotionRoot()

### Community 2 - "pipeline-runner.ts"
Cohesion: 0.15
Nodes (12): [input, output], normalizeLoudness(), args, errors, facts, finalPath, job, maxStillIndex (+4 more)

### Community 3 - "job.ts"
Cohesion: 0.21
Nodes (15): applySpeed(), main(), probeDurationSec(), synthesize(), [input, step, flag, by], Approvals, ApprovalStep, approve() (+7 more)

### Community 4 - "gates.test.ts"
Cohesion: 0.18
Nodes (8): [input, output, pan], panFilter(), font(), loadFonts(), renderCardSvg(), findRawJsxText(), scanVideoScenes(), good

### Community 5 - "Server giọng VieNeu"
Cohesion: 0.12
Nodes (7): json_bytes(), load_legacy_voices(), main(), do_GET(), do_POST(), send_json(), parse_args()

### Community 6 - "Kiểm kịch bản"
Cohesion: 0.10
Nodes (36): loadScript(), cell(), checkAgainstSource(), checkLabels(), checkLength(), checkNarration(), checkScript(), checkSpokenNumbers() (+28 more)

### Community 7 - "Bài thử tất định và ảnh duyệt"
Cohesion: 0.13
Nodes (13): FIXTURE_FRAMES, FIXTURE_IDS, report(), hashFile(), openStillSession(), StillSession, testDeterminism(), auditFrame() (+5 more)

### Community 9 - "art.tsx"
Cohesion: 0.17
Nodes (78): Label(), AiLaBanAy(), Gear(), Hook(), Intern(), NguocDoi(), PhanXa(), Quarter() (+70 more)

### Community 10 - "Mục lục tài liệu"
Cohesion: 0.16
Nodes (16): cleanHeading(), cleanInline(), CONTENT_TYPES, ContentHint, DocumentOutline, extractNumbers(), HINT_PATTERNS, inferContentHints() (+8 more)

### Community 11 - "qc.ts"
Cohesion: 0.22
Nodes (12): DURATION_TOLERANCE_SEC, evaluateQc(), findFrozenIntervals(), LUFS_TOLERANCE, MediaFacts, parseFreezeLog(), parseIntegratedLufs(), probeMedia() (+4 more)

### Community 12 - "Tổ phim trường 3D"
Cohesion: 0.25
Nodes (7): S5B Stage 3D, #13 Drei, #15 Postprocessing, #12 R3F, #14 Rapier, #11 Three.js, Font 3D thieu dau tieng Viet

### Community 13 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): bakePhysics(), clean(), PhysicsSpec, [specPath, outPath], [aspect = "16:9", voice = "Ngọc Huyền", doc = "fixtures/smoke/smoke.md"], job, script, TrainingScriptSchema

### Community 19 - "TrainingVideoComposition.tsx"
Cohesion: 0.26
Nodes (10): SceneProvider, musicVolume(), TrainingVideoComposition(), TrainingVideoProps, GlobalFonts(), ASPECTS, Timeline, TimelineSchema (+2 more)

### Community 20 - "training-contract.ts"
Cohesion: 0.18
Nodes (8): AnalysisSchema, ContentGroupSchema, LengthDecisionSchema, MusicSchema, SceneTimingSchema, SentenceTimingSchema, SfxCueSchema, TrainingSceneSchema

### Community 21 - "scene-context.tsx"
Cohesion: 0.29
Nodes (8): SceneContext, SceneContextValue, useBeats(), useScene(), calculateTrainingMetadata(), SceneTiming, secToFrames(), TrainingScene

### Community 22 - "qc-ffmpeg.ts"
Cohesion: 0.22
Nodes (7): args, aspect, duration, errors, facts, lufs, ASPECT_NAMES

### Community 23 - "optimize-svg.mjs"
Cohesion: 0.33
Nodes (5): ASSETS_DIR, optimizeSvg(), OUTPUT_DIR, SKIP, walk()

### Community 24 - "document-workspace.ts"
Cohesion: 0.48
Nodes (6): DocumentWorkspace, findDocumentInDirectory(), isSupportedFile(), resolveDocumentWorkspace(), safeDocumentFolderName(), SUPPORTED_EXTENSIONS

## Ambiguous Edges - Review These
- `#05 GSAP Timeline` → `Taste rules cho khung hinh (0c)`  [AMBIGUOUS]
  docs/QUY-CHUAN-HINH.md · relation: conceptually_related_to
- `#09 Remotion` → `renderer hyperframes (van ban chep tu repo cu)`  [AMBIGUOUS]
  docs/QUY-CHUAN-HINH.md · relation: conceptually_related_to

## Knowledge Gaps
- **18 isolated node(s):** `S1 to render pipeline flow`, `#06 Anime.js v4`, `#08 dotLottie`, `#02 GSAP Skills`, `#10 Motion Canvas (hoan)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 140 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TrainingScript` connect `TrainingVideoComposition.tsx` to `job.ts`, `training-contract.ts`, `Kiểm kịch bản`, `Bài thử tất định và ảnh duyệt`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `S1 to render pipeline flow`, `#06 Anime.js v4`, `#08 dotLottie` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tổ Specialist và quy trình` be split into smaller, more focused modules?**
  _Cohesion score 0.05084745762711865 - nodes in this community are weakly interconnected._
- **Why does `CLAUDE.md project rules` connect `Tổ Specialist và quy trình` to `Tổ phim trường 3D`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Should `Server giọng VieNeu` be split into smaller, more focused modules?**
  _Cohesion score 0.12318840579710146 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `#05 GSAP Timeline` and `Taste rules cho khung hinh (0c)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `#09 Remotion` and `renderer hyperframes (van ban chep tu repo cu)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._