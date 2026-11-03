# S6xEditer

Shared instructions for every coding agent (Claude Code, Codex, Gemini CLI, Cursor, Copilot, Windsurf…). `CLAUDE.md` and `GEMINI.md` point here.

- Purpose: turn Vietnamese training documents and real footage into videos.
- Language: all user-facing output in Vietnamese.

## Read first
- Steps and commands: `docs/QUY-TRINH.md`
- Real footage: `docs/CHE-DO-C.md`
- Script rules: `docs/QUY-CHUAN-KICH-BAN.md`
- Picture rules: `docs/QUY-CHUAN-HINH.md`

## Hard rules
Rules 2 and 3 apply to the document flow. Chế độ C follows `docs/CHE-DO-C.md` and its spec.

1. Only information in the source document, in narration and on screen. No invented examples, figures or benefits.
2. Every sentence is an action of the picture; with labels hidden the picture still conveys the sentence. No fixed scene templates.
3. A frame is a pure function of `useCurrentFrame()`. No timers, no unseeded randomness. A new tool enters only after the determinism test.
4. The user chooses the aspect per video: 16:9, 9:16, 4:5, 1:1. No hard-coded canvas size.
5. Stop for the user at: length decision, voice and aspect confirmation, `script-review.md` approval, visual approval before a full render.
6. Do not edit `input/`.
7. Use the GPU when the machine has one; `npm run doctor` shows the mode. Report a CPU run as a CPU run.
8. Anything not run is "Cần thử". Report gates skipped as skipped, not passed.

## Flow
Analysis → length gate → script and picture per sentence → user approves → voice and timings → build scenes → gates → user approves → render.

## Gotchas
- A job can use a document outside `input/`: pass its full path to `script:validate`, `approve`, `voice`, `stills`, `gate:determinism` and `render`, and pass the same path every time.
- Any edit to `output/<doc>/script.json` voids both approvals (`script` and `visual`); `voice` and `render` refuse to run until the user approves again.
- On-screen text goes only through `<Label i={n} />` from `src/kit/scene-context.tsx`; raw text in `src/videos/` fails `npm test` and `render`.
- Scenes live in `src/videos/<video>/` and are registered in `src/videos/registry.ts`.
- `voice` needs the VieNeu server (`npm run tts:server`, port 8124). Stop it before `render` so it frees VRAM.
- Commit or push only when the user asks.
