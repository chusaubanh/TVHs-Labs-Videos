# TVHs-Labs-Video

Read `AGENTS.md` at the repo root before any task; it holds the purpose, read-first docs, flow, team roles and gotchas. All user-facing output is in Vietnamese.

The hard rules, repeated here so they are never missed:
1. Only information in the source document, in narration and on screen. No invented examples, figures or benefits.
2. Every sentence is an action of the picture; with labels hidden the picture still conveys the sentence. No fixed scene templates.
3. A frame is a pure function of `useCurrentFrame()`. No timers, no unseeded randomness. A new tool enters only after the determinism test.
4. The user chooses the aspect per video: 16:9, 9:16, 4:5, 1:1. No hard-coded canvas size.
5. Stop for the user at: length decision, voice and aspect confirmation, `script-review.md` approval, visual approval before a full render.
6. Do not edit `input/`, `assets/brand/` or `.research/`.
7. Rendering and voice run on the GPU (Chromium `--gl=angle`, NVENC, VieNeu on CUDA).
8. Anything not run is "Cần thử". Report gates skipped as skipped, not passed.
