# Graph Report - TVHs-Labs-Video  (2026-10-31)

## Corpus Check
- 54 files · ~22,683 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .bat 1)

## Summary
- 336 nodes · 611 edges · 16 communities (10 shown, 6 thin omitted)
- Extraction: 95% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Tổ Specialist và quy trình
- Cảnh thử và bộ dựng
- Vật lý, âm thanh, thu giọng
- Công cụ SVG, Satori, kiểm thử
- gates.test.ts
- Server giọng VieNeu
- Kiểm kịch bản
- Bài thử tất định và ảnh duyệt
- Mục lục tài liệu
- Tổ phim trường 3D
- Phát lại vật lý
- Cổng độ rõ của hình
- Nhãn trên màn hình

## God Nodes (most connected - your core abstractions)
1. `resolveJob()` - 13 edges
2. `CLAUDE.md project rules` - 13 edges
3. `S5A Motion 2D` - 12 edges
4. `S5B Stage 3D` - 11 edges
5. `parseDocumentOutline()` - 9 edges
6. `checkScript()` - 9 edges
7. `S4 Visual` - 9 edges
8. `main()` - 8 edges
9. `main()` - 8 edges
10. `resolveDocumentWorkspace()` - 8 edges

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

## Communities (16 total, 6 thin omitted)

### Community 0 - "Tổ Specialist và quy trình"
Cohesion: 0.05
Nodes (48): S1 Content Architect, S2 Copywriter, S3 Audio, S4 Visual, S5A Motion 2D, S6 QA, S7 Visual Critic, CLAUDE.md project rules (+40 more)

### Community 1 - "Cảnh thử và bộ dựng"
Cohesion: 0.09
Nodes (19): Label(), SceneContext, SceneContextValue, SceneProvider, useBeats(), useScene(), AnimeBuildContext, calculateTrainingMetadata() (+11 more)

### Community 2 - "Vật lý, âm thanh, thu giọng"
Cohesion: 0.06
Nodes (41): [input, output], normalizeLoudness(), args, errors, facts, finalPath, job, maxStillIndex (+33 more)

### Community 3 - "Công cụ SVG, Satori, kiểm thử"
Cohesion: 0.11
Nodes (28): [aspect = "16:9", voice = "Ngọc Huyền", doc = "fixtures/smoke/smoke.md"], job, script, applySpeed(), main(), probeDurationSec(), synthesize(), [input, step, flag, by] (+20 more)

### Community 4 - "gates.test.ts"
Cohesion: 0.10
Nodes (17): bakePhysics(), clean(), PhysicsSpec, [specPath, outPath], ASSETS_DIR, optimizeSvg(), OUTPUT_DIR, SKIP (+9 more)

### Community 5 - "Server giọng VieNeu"
Cohesion: 0.12
Nodes (7): json_bytes(), load_legacy_voices(), main(), do_GET(), do_POST(), send_json(), parse_args()

### Community 6 - "Kiểm kịch bản"
Cohesion: 0.11
Nodes (33): cell(), checkAgainstSource(), checkLabels(), checkLength(), checkNarration(), checkScript(), checkSpokenNumbers(), COUNT_UNITS (+25 more)

### Community 7 - "Bài thử tất định và ảnh duyệt"
Cohesion: 0.14
Nodes (13): FIXTURE_FRAMES, FIXTURE_IDS, report(), hashFile(), openStillSession(), StillSession, testDeterminism(), auditFrame() (+5 more)

### Community 10 - "Mục lục tài liệu"
Cohesion: 0.17
Nodes (15): cleanHeading(), cleanInline(), CONTENT_TYPES, ContentHint, DocumentOutline, extractNumbers(), HINT_PATTERNS, inferContentHints() (+7 more)

### Community 12 - "Tổ phim trường 3D"
Cohesion: 0.25
Nodes (7): S5B Stage 3D, #13 Drei, #15 Postprocessing, #12 R3F, #14 Rapier, #11 Three.js, Font 3D thieu dau tieng Viet

## Ambiguous Edges - Review These
- `#05 GSAP Timeline` → `Taste rules cho khung hinh (0c)`  [AMBIGUOUS]
  docs/QUY-CHUAN-HINH.md · relation: conceptually_related_to
- `#09 Remotion` → `renderer hyperframes (van ban chep tu repo cu)`  [AMBIGUOUS]
  docs/QUY-CHUAN-HINH.md · relation: conceptually_related_to

## Knowledge Gaps
- **18 isolated node(s):** `S1 to render pipeline flow`, `#06 Anime.js v4`, `#08 dotLottie`, `#02 GSAP Skills`, `#10 Motion Canvas (hoan)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 135 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CLAUDE.md project rules` connect `Tổ Specialist và quy trình` to `Tổ phim trường 3D`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `S5A Motion 2D` (e.g. with `S3 Audio` and `Chuyen dong phai co ly do`) actually correct?**
  _`S5A Motion 2D` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `S1 to render pipeline flow`, `#06 Anime.js v4`, `#08 dotLottie` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Tổ Specialist và quy trình` be split into smaller, more focused modules?**
  _Cohesion score 0.05084745762711865 - nodes in this community are weakly interconnected._
- **Why does `TrainingScript` connect `Cảnh thử và bộ dựng` to `Vật lý, âm thanh, thu giọng`, `Công cụ SVG, Satori, kiểm thử`, `Kiểm kịch bản`, `Bài thử tất định và ảnh duyệt`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `#05 GSAP Timeline` and `Taste rules cho khung hinh (0c)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `#09 Remotion` and `renderer hyperframes (van ban chep tu repo cu)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._