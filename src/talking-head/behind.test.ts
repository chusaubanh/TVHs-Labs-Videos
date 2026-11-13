import { describe, expect, it } from "vitest";
import { behindRanges, canvasMatteFilter, maskedOverlayChain, moveLayersBehind, rangesCovered } from "./behind.js";
import { ProjectSchema, type Project } from "./project-schema.js";
import { runCapture } from "./ffmpeg-util.js";
import { frameKey, trackIn } from "../../scripts/editor/public/overlay-runtime.js";

const layer = (id: string, start: number, duration: number, type = "text") => ({ id, type, start, duration, x: 10, y: 10, w: 80, h: 20, text: id });
const base = (tracks: unknown[]): Project =>
  ProjectSchema.parse({ version: 1, job: "a/b", fps: 30, width: 1080, height: 1350, aspect: "4:5", duration: 60, source: { video: "cut.mp4" }, tracks });

describe("chữ sau người nói", () => {
  it("track.behindSubject được schema giữ lại", () => {
    const p = base([{ id: "t", kind: "graphics", name: "x", behindSubject: true, layers: [] }]);
    expect(p.tracks[0].behindSubject).toBe(true);
  });

  it("behindRanges: nới 0,1 s, gộp khoảng sát nhau, bỏ track ẩn", () => {
    const p = base([
      { id: "b", kind: "graphics", name: "b", behindSubject: true, layers: [layer("a", 10, 2), layer("c", 12.3, 1), layer("d", 30, 2)] },
      { id: "h", kind: "graphics", name: "h", behindSubject: true, hidden: true, layers: [layer("e", 50, 2)] },
      { id: "f", kind: "graphics", name: "f", layers: [layer("g", 40, 2)] },
    ]);
    expect(behindRanges(p)).toEqual([[9.9, 13.4], [29.9, 32.1]]);
  });

  it("rangesCovered: matte cũ rộng hơn vẫn dùng được, layer dời ra ngoài thì không", () => {
    expect(rangesCovered([[10, 12]], [[9, 13]])).toBe(true);
    expect(rangesCovered([[10, 14]], [[9, 13]])).toBe(false);
  });

  it("moveLayersBehind tạo track t-behind, chuyển layer, từ chối phụ đề", () => {
    const p = base([{ id: "g", kind: "graphics", name: "g", layers: [layer("a", 1, 2)] }, { id: "s", kind: "subtitle", name: "s", layers: [layer("sub", 1, 2, "subtitle")] }]);
    const r = moveLayersBehind(p, ["a", "zz"]);
    expect(r).toEqual({ moved: ["a"], missing: ["zz"] });
    const tb = p.tracks.find((t) => t.behindSubject)!;
    expect(tb.id).toBe("t-behind");
    expect(tb.layers.map((l) => l.id)).toEqual(["a"]);
    expect(p.tracks[0].layers).toHaveLength(0);
    expect(() => moveLayersBehind(p, ["sub"])).toThrow(/subtitle/);
  });

  it("trackIn/frameKey: lượt behind chỉ có track behindSubject, front là phần còn lại", () => {
    const p = base([{ id: "b", kind: "graphics", name: "b", behindSubject: true, layers: [layer("a", 0, 5)] }, { id: "f", kind: "graphics", name: "f", layers: [layer("c", 0, 5)] }]);
    expect(trackIn(p.tracks[0], "behind")).toBe(true);
    expect(trackIn(p.tracks[1], "behind")).toBe(false);
    expect(trackIn(p.tracks[0], "front")).toBe(false);
    expect(trackIn(p.tracks[1], "front")).toBe(true);
    expect(frameKey(p, 1, 30, "behind")).toContain('"a"');
    expect(frameKey(p, 1, 30, "behind")).not.toContain('"c"');
    expect(frameKey(p, 1, 30, "front")).toContain('"c"');
  });

  it("canvasMatteFilter: cùng chuỗi đặt khung với video, nền đen, ra xám", () => {
    const f = canvasMatteFilter(base([]), { w: 1080, h: 1350 });
    expect(f).toContain("color=c=black");
    expect(f).not.toContain("0x0C0C0C");
    expect(f.endsWith(",format=gray[m]")).toBe(true);
  });

  it("maskedOverlayChain: alpha của overlay bị nhân (1 − matte) — đo bằng ffmpeg thật", async () => {
    // overlay đỏ đặc 8x4; matte: nửa trái trắng (có người), nửa phải đen. Kỳ vọng alpha trái 0, phải 255.
    const chain = maskedOverlayChain(0, "mt", [0, 0, 8, 4], 30, "out");
    const fc = `color=c=black:s=8x4:r=30:d=0.1,drawbox=x=0:y=0:w=4:h=4:color=white:t=fill,format=gray[mt];${chain};[out]alphaextract,format=gray[o]`;
    const r = await runCapture("ffmpeg", ["-v", "error", "-f", "lavfi", "-i", "color=c=red:s=8x4:r=30:d=0.1,format=rgba", "-filter_complex", fc, "-map", "[o]", "-frames:v", "1", "-f", "rawvideo", "-"], { binary: true });
    const a = [...r.stdoutBuf!];
    expect(a).toHaveLength(32);
    for (let y = 0; y < 4; y++) {
      expect(a.slice(y * 8, y * 8 + 4).every((v) => v < 8)).toBe(true);
      expect(a.slice(y * 8 + 4, y * 8 + 8).every((v) => v > 247)).toBe(true);
    }
  });
});

describe("chữ sau người nói — điểm cắt và model mặc định", () => {
  it("clipCutPoints: chỉ đánh dấu chỗ nhảy nguồn và clip hold, bỏ chỗ nối liền", async () => {
    const { clipCutPoints } = await import("./behind.js");
    const clips = [
      { id: "1", kind: "hold" as const, srcIn: 10, dur: 0.5 },
      { id: "2", kind: "source" as const, srcIn: 10, srcOut: 12 },
      { id: "3", kind: "source" as const, srcIn: 12, srcOut: 13 }, // liền clip 2: không cắt
      { id: "4", kind: "source" as const, srcIn: 20, srcOut: 21 }, // nhảy nguồn: cắt ở 3.5
    ];
    expect(clipCutPoints(clips, 30)).toEqual([0.5, 3.5]);
  });

  it("defaultMatteModel: có bộ nạp RVM + bản clone thì rvm, thiếu một trong hai (bản công khai) thì birefnet", async () => {
    const { defaultMatteModel } = await import("./behind.js");
    const { mkdtempSync, mkdirSync, writeFileSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const root = mkdtempSync(join(tmpdir(), "matte-default-"));
    expect(defaultMatteModel(root)).toBe("birefnet");
    mkdirSync(join(root, "scripts", "asr"), { recursive: true });
    writeFileSync(join(root, "scripts", "asr", "matte_rvm.py"), "");
    expect(defaultMatteModel(root)).toBe("birefnet");
    mkdirSync(join(root, ".research", "repos", "RobustVideoMatting"), { recursive: true });
    writeFileSync(join(root, ".research", "repos", "RobustVideoMatting", "hubconf.py"), "");
    expect(defaultMatteModel(root)).toBe("rvm");
  });
});
