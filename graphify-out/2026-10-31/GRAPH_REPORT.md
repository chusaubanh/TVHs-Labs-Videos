# Graph Report - TVHs-Labs-Video  (2026-10-31)

## Corpus Check
- Corpus is ~22,247 words - fits in a single context window. You may not need a graph.

## Summary
- 415 nodes · 683 edges · 19 communities (14 shown, 5 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.9)
- Token cost: 121,260 input · 0 output

## Community Hubs (Navigation)
- Tổ Specialist và quy trình
- Cảnh thử và bộ dựng
- Vật lý, âm thanh, thu giọng
- Công cụ SVG, Satori, kiểm thử
- Khai báo gói phát triển
- Server giọng VieNeu
- Kiểm kịch bản
- Bài thử tất định và ảnh duyệt
- Thư viện phụ thuộc
- Lệnh npm
- Mục lục tài liệu
- Cấu hình TypeScript
- Tổ phim trường 3D
- Chuẩn hoá lời đọc tiếng Việt
- Phát lại vật lý
- Cổng độ rõ của hình
- Nhãn trên màn hình

## God Nodes (most connected - your core abstractions)
1. `scripts` - 17 edges
2. `compilerOptions` - 15 edges
3. `resolveJob()` - 13 edges
4. `CLAUDE.md project rules` - 13 edges
5. `S5A Motion 2D` - 12 edges
6. `S5B Stage 3D` - 11 edges
7. `react` - 10 edges
8. `parseDocumentOutline()` - 9 edges
9. `S4 Visual` - 9 edges
10. `remotion` - 8 edges

## Surprising Connections (you probably didn't know these)
- `S3 Audio` --shares_data_with--> `timeline.json va props.json`  [INFERRED]
  .claude/agents/s3-audio.md → docs/QUY-TRINH.md
- `S4 Visual` --implements--> `Aspect chosen per video`  [INFERRED]
  .claude/agents/s4-visual.md → CLAUDE.md
- `S5A Motion 2D` --implements--> `Chuyen dong phai co ly do`  [INFERRED]
  .claude/agents/s5a-motion-2d.md → docs/QUY-CHUAN-HINH.md
- `S6 QA` --implements--> `Return errors to owning team`  [INFERRED]
  .claude/agents/s6-qa.md → CLAUDE.md
- `S6 QA` --implements--> `Cong doi chieu nguon`  [INFERRED]
  .claude/agents/s6-qa.md → docs/NANG-CAP-NHAN-SU.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Specialist production chain S1 through S7** — _claude_agents_s1_content_architect, _claude_agents_s2_copywriter, _claude_agents_s3_audio, _claude_agents_s4_visual, _claude_agents_s5a_motion_2d, _claude_agents_s5b_stage_3d, _claude_agents_s6_qa, _claude_agents_s7_visual_critic [EXTRACTED 1.00]
- **Determinism enforcement** — claude_pure_frame_rule, docs_nang_cap_nhan_su_determinism_test, docs_quy_trinh_gate_determinism, docs_quy_trinh_add_tool_procedure [INFERRED 0.95]
- **3D stage tool cluster** — docs_18_nhan_su_three_js, docs_18_nhan_su_r3f, docs_18_nhan_su_drei, docs_18_nhan_su_rapier, docs_18_nhan_su_postprocessing [EXTRACTED 1.00]

## Communities (19 total, 5 thin omitted)

### Community 0 - "Tổ Specialist và quy trình"
Cohesion: 0.05
Nodes (48): S1 Content Architect, S2 Copywriter, S3 Audio, S4 Visual, S5A Motion 2D, S6 QA, S7 Visual Critic, CLAUDE.md project rules (+40 more)

### Community 1 - "Cảnh thử và bộ dựng"
Cohesion: 0.07
Nodes (32): animejs, @lottiefiles/dotlottie-web, react, remotion, Label(), SceneContext, SceneContextValue, SceneProvider (+24 more)

### Community 2 - "Vật lý, âm thanh, thu giọng"
Cohesion: 0.06
Nodes (38): bakePhysics(), clean(), PhysicsSpec, [specPath, outPath], [input, output], normalizeLoudness(), [input, output, pan], panFilter() (+30 more)

### Community 3 - "Công cụ SVG, Satori, kiểm thử"
Cohesion: 0.08
Nodes (36): satori, svgo, ASSETS_DIR, optimizeSvg(), OUTPUT_DIR, SKIP, walk(), [aspect = "16:9", voice = "Ngọc Huyền", doc = "fixtures/smoke/smoke.md"] (+28 more)

### Community 4 - "Khai báo gói phát triển"
Cohesion: 0.05
Nodes (37): author, description, devDependencies, svgo, tsx, @types/node, @types/react, @types/react-dom (+29 more)

### Community 5 - "Server giọng VieNeu"
Cohesion: 0.12
Nodes (7): json_bytes(), load_legacy_voices(), main(), do_GET(), do_POST(), send_json(), parse_args()

### Community 6 - "Kiểm kịch bản"
Cohesion: 0.20
Nodes (18): cell(), checkAgainstSource(), checkLabels(), checkLength(), checkNarration(), checkScript(), digits(), ESTIMATE_WORDS_PER_SEC (+10 more)

### Community 7 - "Bài thử tất định và ảnh duyệt"
Cohesion: 0.13
Nodes (15): @remotion/bundler, @remotion/renderer, FIXTURE_FRAMES, FIXTURE_IDS, report(), hashFile(), openStillSession(), StillSession (+7 more)

### Community 8 - "Thư viện phụ thuộc"
Cohesion: 0.10
Nodes (20): dependencies, animejs, dotenv, gsap, @lottiefiles/dotlottie-web, react, react-dom, @react-three/drei (+12 more)

### Community 9 - "Lệnh npm"
Cohesion: 0.12
Nodes (17): scripts, approve, assets:optimize, audio:pan, doc:outline, gate:determinism, physics:bake, qc:check (+9 more)

### Community 10 - "Mục lục tài liệu"
Cohesion: 0.16
Nodes (16): cleanHeading(), cleanInline(), CONTENT_TYPES, ContentHint, DocumentOutline, extractNumbers(), HINT_PATTERNS, inferContentHints() (+8 more)

### Community 11 - "Cấu hình TypeScript"
Cohesion: 0.12
Nodes (16): compilerOptions, allowJs, allowSyntheticDefaultImports, baseUrl, esModuleInterop, forceConsistentCasingInFileNames, jsx, lib (+8 more)

### Community 12 - "Tổ phim trường 3D"
Cohesion: 0.25
Nodes (7): S5B Stage 3D, #13 Drei, #15 Postprocessing, #12 R3F, #14 Rapier, #11 Three.js, Font 3D thieu dau tieng Viet

### Community 13 - "Chuẩn hoá lời đọc tiếng Việt"
Cohesion: 0.31
Nodes (10): DIGITS, FILLER_PHRASES, integerToVietnamese(), NarrationIssue, normalizeVietnameseNarration(), numericTokenToVietnamese(), readThreeDigits(), readTwoDigits() (+2 more)

## Ambiguous Edges - Review These
- `#05 GSAP Timeline` → `Taste rules cho khung hinh (0c)`  [AMBIGUOUS]
  docs/QUY-CHUAN-HINH.md · relation: conceptually_related_to
- `#09 Remotion` → `renderer hyperframes (van ban chep tu repo cu)`  [AMBIGUOUS]
  docs/QUY-CHUAN-HINH.md · relation: conceptually_related_to

## Knowledge Gaps
- **34 isolated node(s):** `@react-three/drei`, `@react-three/fiber`, `@react-three/postprocessing`, `@react-three/rapier`, `@remotion/gsap` (+29 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 206 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `zod` connect `Khai báo gói phát triển` to `Cảnh thử và bộ dựng`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `@react-three/drei`, `@react-three/fiber`, `@react-three/postprocessing` to the rest of the system?**
  _34 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tổ Specialist và quy trình` be split into smaller, more focused modules?**
  _Cohesion score 0.05084745762711865 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Thư viện phụ thuộc` to `Khai báo gói phát triển`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Should `Cảnh thử và bộ dựng` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `#05 GSAP Timeline` and `Taste rules cho khung hinh (0c)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `#09 Remotion` and `renderer hyperframes (van ban chep tu repo cu)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._