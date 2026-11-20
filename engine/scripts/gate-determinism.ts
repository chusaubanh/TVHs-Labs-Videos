/**
 * Bài thử tất định.
 * tsx scripts/gate-determinism.ts --fixtures
 * tsx scripts/gate-determinism.ts "<tài liệu>"
 */
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolveJob } from "../src/training/job";
import { openStillSession, testDeterminism } from "./render-tools";

const FIXTURE_IDS = ["fixture-motion-canvas", "fixture-av", "fixture-drei", "fixture-react-rapier", "fixture-gsap", "fixture-anime", "fixture-spring", "fixture-dotlottie", "fixture-bloom", "fixture-rapier", "fixture-offthread-clip"];
const FIXTURE_FRAMES = [0, 10, 25, 45, 70, 89];

const input = process.argv[2];
if (!input) {
  console.error('Sử dụng: gate-determinism --fixtures | "<tài liệu>"');
  process.exit(2);
}

const session = await openStillSession();
let failedAny = false;
const results: { id: string; passed: boolean; failedFrames?: number[]; error?: string }[] = [];
const report = async (id: string, frames: number[], props: Record<string, unknown>) => {
  try {
    const failed = await testDeterminism(session, id, frames, props);
    console.log(`${failed.length ? "KHÔNG ĐẠT" : "ĐẠT"} ${id}${failed.length ? `: khung ${failed.join(", ")}` : ""}`);
    results.push({ id, passed: failed.length === 0, failedFrames: failed });
    if (failed.length) failedAny = true;
  } catch (error) {
    results.push({ id, passed: false, error: String((error as Error).message) });
    console.log(`LỖI ${id}: ${(error as Error).message.split("\n")[0]}`);
    failedAny = true;
  }
};

try {
  if (input === "--fixtures") {
    for (const id of FIXTURE_IDS) await report(id, FIXTURE_FRAMES, {});
    // Cổng phải biết bắt lỗi: cảnh chạy theo đồng hồ thật mà đạt thì chính cổng hỏng.
    const caught = (await testDeterminism(session, "fixture-bad-clock", FIXTURE_FRAMES)).length > 0;
    console.log(`${caught ? "ĐẠT" : "KHÔNG ĐẠT"} cổng bắt được cảnh cố ý sai`);
    results.push({ id: "negative-control-clock", passed: caught });
    if (!caught) failedAny = true;
    // Lưu ảnh để soi bằng mắt.
    for (const id of FIXTURE_IDS) await session.shoot(id, 45, {}, `output/_fixtures/${id}.png`);
  } else {
    const props = JSON.parse(readFileSync(resolveJob(input).propsPath, "utf8")) as { timeline: { totalSec: number } };
    const last = Math.floor(props.timeline.totalSec * 30) - 1;
    const frames = Array.from({ length: 8 }, (_, i) => Math.round((last * i) / 7));
    await report("TrainingVideo", frames, props as unknown as Record<string, unknown>);
  }
} finally {
  await session.close();
  mkdirSync("output/_fixtures", { recursive: true });
  writeFileSync("output/_fixtures/determinism.json", JSON.stringify({ generatedAt: new Date().toISOString(), passed: !failedAny, results }, null, 2));
}
process.exit(failedAny ? 1 : 0);
