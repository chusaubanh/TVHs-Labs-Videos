# TVHs-Labs-Video

- Purpose: turn Vietnamese training documents into picture-led videos, rendered straight to MP4 with Remotion. Separate project from TVHs-Lab-Video-AI: copy what is needed, never link to it.
- Language: all user-facing output in Vietnamese.

## Read first
- Teams and tools: `docs/18-NHAN-SU.md`
- Script rules: `docs/QUY-CHUAN-KICH-BAN.md`; `input/Bài viết về AI/` uses `docs/QUY-CHUAN-CHUOI-AI.md`
- Picture rules: `docs/QUY-CHUAN-HINH.md`
- Steps and commands: `docs/QUY-TRINH.md`
- Decisions, evidence, roadmap: `docs/NANG-CAP-NHAN-SU.md`
- Code map: `graphify-out/GRAPH_REPORT.md`; refresh after changes with `/graphify . --update`

## Hard rules
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
