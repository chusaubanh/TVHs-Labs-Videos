import { ReadOnlyTimeEvents } from "@motion-canvas/core/lib/scenes/timeEvents/ReadOnlyTimeEvents";
import { PlaybackManager, PlaybackStatus, PlaybackState, SharedWebGLContext, Logger, Stage, Vector2, ValueDispatcher, waitFor, all } from "@motion-canvas/core";
import { Circle, Rect, makeScene2D } from "@motion-canvas/2d";

let playback, stage, spec, logger, context;
export async function configure(next) {
  context?.dispose(); stage?.finalBuffer.remove();
  spec = next; logger = new Logger(); playback = new PlaybackManager();
  playback.fps = spec.fps; playback.state = PlaybackState.Rendering;
  const status = new PlaybackStatus(playback);
  context = new SharedWebGLContext(logger);
  const description = makeScene2D(function* (view) {
    const tasks = [];
    for (const shape of spec.shapes) {
      const Node = shape.kind === "circle" ? Circle : Rect;
      const node = new Node({ size: shape.size, fill: shape.fill, position: shape.from, ...(shape.kind === "rect" ? { radius: 16 } : {}) });
      view.add(node); tasks.push(node.position(shape.to, (spec.frames - 1) / spec.fps));
    }
    yield* all(...tasks); yield* waitFor(1 / spec.fps);
  });
  description.meta.seed.set(spec.seed);
  const scene = new description.klass({ ...description, name: "job-scene", onReplaced: new ValueDispatcher(description), logger, playback: status, size: new Vector2(spec.width, spec.height), resolutionScale: 1, timeEventsClass: ReadOnlyTimeEvents, sharedWebGLContext: context, experimentalFeatures: false });
  playback.setup([scene]);
  stage = new Stage(); stage.configure({ size: new Vector2(spec.width, spec.height), resolutionScale: 1, colorSpace: "srgb", background: spec.background });
  document.body.append(stage.finalBuffer); stage.finalBuffer.style.maxWidth = "100%";
  await playback.recalculate();
  assertNoErrors();
}
function assertNoErrors() {
  const errors = logger.history.filter((entry) => entry.level === "error");
  if (errors.length) throw new Error(errors.map((entry) => entry.message + " " + (entry.stack || "")).join("\n"));
}
export async function frame(index) {
  if (!playback) throw new Error("Chưa cấu hình cảnh.");
  if (!Number.isInteger(index) || index < 0 || index >= spec.frames) throw new Error("Frame ngoài phạm vi.");
  if (index <= playback.frame) await playback.reset();
  await playback.seek(index);
  await stage.render(playback.currentScene, playback.previousScene);
  assertNoErrors();
  return stage.finalBuffer.toDataURL("image/png");
}
window.motionCanvasWorker = { configure, frame, debug: () => ({ duration: playback.duration, frame: playback.frame, state: playback.currentScene?.state, view: { size: playback.currentScene?.getView().size(), opacity: playback.currentScene?.getView().opacity(), children: playback.currentScene?.getView().children().map(n => ({ size: n.size(), position: n.position(), opacity: n.opacity(), fill: n.fill()?.serialize() })) }, logs: logger.history }) };