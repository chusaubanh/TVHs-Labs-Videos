# TVHs-Labs-Video

Shared instructions for every coding agent (Claude Code, Codex, Gemini CLI, Cursor, Copilot, Windsurf…). `CLAUDE.md` imports this file and adds only Claude-specific notes.

- Purpose: turn Vietnamese training documents into picture-led videos, rendered straight to MP4 with Remotion. Also edits real footage (Chế độ C): `docs/CHE-DO-C.md`.
- Language: all user-facing output in Vietnamese.

## Read first
- Teams, tools and which team owns which files: `docs/18-NHAN-SU.md`
- Script rules: `docs/QUY-CHUAN-KICH-BAN.md`; `input/Bài viết về AI/` uses `docs/QUY-CHUAN-CHUOI-AI.md` (Chế độ B)
- Picture rules: `docs/QUY-CHUAN-HINH.md`
- Steps, commands and the gates that block: `docs/QUY-TRINH.md`
- Decisions, evidence, roadmap: `docs/NANG-CAP-NHAN-SU.md`
- Footage mode: `docs/CHE-DO-C.md`; the old repo's docs are frozen in `docs/tham-khao-repo-cu/`
- Code map: `graphify-out/GRAPH_REPORT.md`; refresh after code changes with `npm run graph` (also rebuilds the light view `graphify-out/graph-overview.html`); after doc changes run `/graphify --update`, which costs tokens

## Hard rules
Rules 2 and 3 apply to the document flow. Chế độ C follows `docs/CHE-DO-C.md` and its spec.
1. Only information in the source document, in narration and on screen. No invented examples, figures or benefits.
2. Every sentence is an action of the picture; with labels hidden the picture still conveys the sentence. No fixed scene templates.
3. A frame is a pure function of `useCurrentFrame()`. No `useFrame` driven by time, no timers, no unseeded randomness. A new tool enters only after the determinism test (same frame, twice and out of order, same hash).
4. The user chooses the aspect per video: 16:9, 9:16, 4:5, 1:1. No hard-coded canvas size; landscape and portrait get their own layout.
5. Stop for the user at: length decision, voice and aspect confirmation, `script-review.md` approval, visual approval before a full render.
6. Do not edit `input/`, `assets/brand/` or `.research/`. `.research/repos/` is read-only source evidence; the user does the cloning.
7. Rendering and voice run on the GPU: Chromium with `--gl=angle`, encoding with `--hardware-acceleration=required` (NVENC), VieNeu with the PyTorch CUDA backend. Audio filters in FFmpeg have no GPU path.
8. Judge a tool from its source, with file paths. Anything not run is "Cần thử". Report gates skipped as skipped, not passed.

## Flow
S1 analysis → length gate → S2 + S4 script and picture per sentence → user approves → S3 voice and timings → S4 + S5 build → S6 gates → S7 eyes → user approves → render.
A team returns errors to the owning team; it does not fix another team's work.

## Teams are stages, not separate programs
S1–S7 are roles. An agent that cannot spawn subagents plays them one after another, in the order of the flow above.
- Each role card is plain Markdown in `.claude/agents/` (`s1-content-architect.md` … `s7-visual-critic.md`). Read the card before acting in that role. Its `model:` and `tools:` frontmatter is for Claude Code only.
- S6 (QA) and S7 (visual critic) only review; they never edit. "Return errors to the owning team" means: switch to the stage that owns the file (`docs/18-NHAN-SU.md`) and fix it there.
- `.claude/skills/*/SKILL.md` are readable guides (Remotion, GSAP, captions). The `viral-*` skills apply only to Chế độ B.

## Commands
Every step and its command is in `docs/QUY-TRINH.md`; check with `npm run typecheck`, `npm test`, `npm run gate:determinism -- --fixtures`. Footage mode commands start with `th:` and are listed in `docs/CHE-DO-C.md`.

## Gotchas
- A job can use a document outside `input/`: pass its full path to `script:validate`, `approve`, `voice`, `stills`, `gate:determinism` and `render`, and pass the same path every time.
- Any edit to `output/<doc>/script.json` voids both approvals (`script` and `visual`); `voice` and `render` refuse to run until the user approves again.
- On-screen text goes only through `<Label i={n} />` from `src/kit/scene-context.tsx`; raw text in `src/videos/` fails `npm test` and `render`.
- Scenes live in `src/videos/<video>/` and are registered in `src/videos/registry.ts`. Do not edit another video's scenes; wrap or copy them.
- `<Img>` and `<OffthreadVideo>` go in a `Stage`'s `overlay`, never inside its `<svg>` children (an `<img>` inside SVG breaks rendering).
- `voice` needs the VieNeu server (`npm run tts:server`, port 8124). Stop it before `render` so it frees VRAM for NVENC. It defaults to `HF_HUB_OFFLINE=1`; on a new machine set `HF_HUB_OFFLINE=0` once to download the model.
- Media under `public/jobs/` is gitignored; do not commit footage, voice files or third-party logos.
- Commit or push only when the user asks.
