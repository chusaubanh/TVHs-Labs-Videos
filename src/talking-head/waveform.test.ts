import { describe, expect, it } from "vitest";
import { isVfr, standardFps } from "./cut-render.js";
import type { CutRange } from "./project-schema.js";
import { verifyCut } from "./verify-cut.js";
import { envelope, protectEdges, silentRuns } from "./waveform.js";

const SR = 16000;
/** Tín hiệu giả: các khoảng [a,b] có âm (sin 0,5), còn lại ồn rất nhỏ. */
function signal(dur: number, loud: [number, number][]): Float32Array {
  const x = new Float32Array(Math.round(dur * SR));
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    x[i] = loud.some(([a, b]) => t >= a && t < b) ? 0.5 * Math.sin(2 * Math.PI * 220 * t) : 1e-3 * Math.sin(i * 1.7); // ồn phòng ≈ -63 dB (dưới -80 dB bị coi là im lặng số)
  }
  return x;
}
const silence = (start: number, end: number): CutRange => ({ start, end, reason: "lặng", source: "auto", kind: "silence", confidence: 0.9, approved: true });

describe("waveform", () => {
  const env = envelope(signal(4, [[0.2, 1.05], [2.5, 3.5]]), SR);

  it("protectEdges nới biên cắt khỏi đuôi âm, tối đa 0,12 s", () => {
    // WhisperX báo từ kết thúc 1,0 nhưng âm thật kéo tới 1,05
    const [r] = protectEdges([silence(1.0, 2.4)], env);
    expect(r.start).toBeCloseTo(1.05, 2);
    expect(r.end).toBe(2.4);
    expect(r.reason).toContain("nới");
    // đoạn auto khác loại và đoạn người dùng không bị đụng
    const manual = { ...silence(1.0, 2.4), source: "user" as const };
    expect(protectEdges([manual], env)[0]).toBe(manual);
  });

  it("protectEdges bỏ đề xuất khi cả đoạn là âm", () => {
    expect(protectEdges([silence(0.4, 0.5)], env)).toHaveLength(0);
  });

  it("silentRuns tìm khoảng lặng", () => {
    const runs = silentRuns(env, 0.7);
    expect(runs.some(([a, b]) => a <= 1.06 && b >= 2.49)).toBe(true);
  });
});

describe("VFR", () => {
  it("isVfr nhận khung không đều, bỏ qua khung đều", () => {
    const cfr = Array.from({ length: 60 }, (_, i) => i / 30);
    expect(isVfr(cfr)).toBe(false);
    const vfr = cfr.map((t, i) => (i % 7 === 0 ? t + 0.012 : t));
    expect(isVfr(vfr)).toBe(true);
  });
  it("standardFps về fps chuẩn gần nhất", () => {
    expect(standardFps(29.87)).toBe(29.97);
    expect(standardFps(59.2)).toBe(59.94);
    expect(standardFps(24.4)).toBe(24);
  });
});

describe("verifyCut", () => {
  const w = (text: string, start: number, end: number) => ({ text, start, end });
  it("bắt cắt giữa từ, cắt giữa tiếng và lặng chết", () => {
    const src = envelope(signal(4, [[0.2, 1.05], [2.5, 3.5]]), SR);
    const cut = envelope(signal(3, [[0, 0.5], [1.5, 2.5]]), SR);
    const r = verifyCut({
      keeps: [{ start: 0, end: 0.6 }, { start: 3.0, end: 4 }],
      srcDuration: 4, src, srcWords: [w("một", 0.2, 1.0), w("hai", 2.5, 3.5)],
      cutSegments: [], cut, cutDuration: 3,
    });
    const codes = r.flags.map((f) => f.code);
    expect(codes).toContain("EDGE-IN-WORD"); // 0,6 nằm giữa "một"
    expect(codes).toContain("EDGE-IN-SPEECH"); // 3,0 nằm giữa âm 2,5–3,5
    expect(codes).toContain("DEAD-AIR"); // lặng 0,5–1,5 trong bản cắt
  });
});

describe("safeZoneWarnings", () => {
  it("gộp layer chữ ra ngoài vùng an toàn theo loại", async () => {
    const { ProjectSchema } = await import("./project-schema.js");
    const { safeZoneWarnings } = await import("./render-checks.js");
    const lay = (id: string, x: number, w: number) => ({ id, type: "subtitle", start: 0, duration: 1, x, y: 66, w, h: 10 });
    const p = ProjectSchema.parse({
      version: 1, job: "t", width: 1080, height: 1920, aspect: "9:16", duration: 10, source: { video: "cut.mp4" },
      tracks: [{ id: "t-sub", kind: "subtitle", name: "Phụ đề", layers: [lay("a", 6, 88), lay("b", 6, 88), lay("c", 15, 70)] }],
    });
    const w = safeZoneWarnings(p);
    expect(w).toHaveLength(1);
    expect(w[0]).toContain("subtitle: 2 layer");
  });
});

describe("geometry mặc định nằm trong vùng an toàn", () => {
  it.each(["9:16", "16:9", "4:5", "1:1"])("%s", async (aspect) => {
    const { geometry } = await import("./commands-media.js");
    const { SAFE_ZONE } = await import("./render-checks.js");
    const z = SAFE_ZONE[aspect];
    const g = geometry(aspect);
    for (const b of [g.sub, g.lower, g.callout]) {
      expect(b.x).toBeGreaterThanOrEqual(z[0] - 0.01);
      expect(b.y).toBeGreaterThanOrEqual(z[1] - 0.01);
      expect(b.x + b.w).toBeLessThanOrEqual(z[2] + 0.01);
      expect(b.y + b.h).toBeLessThanOrEqual(z[3] + 0.01);
    }
  });
});

describe("editor PIPELINE_ZONES khớp SAFE_ZONE", () => {
  it("cùng số", async () => {
    const { readFileSync } = await import("node:fs");
    const { SAFE_ZONE } = await import("./render-checks.js");
    const js = readFileSync(new URL("../../scripts/editor/public/editor.js", import.meta.url), "utf8");
    const block = js.match(/const PIPELINE_ZONES = (\{[\s\S]*?\});/)![1];
    const z = JSON.parse(block.replace(/,\s*\}/, "}")) as Record<string, number[]>;
    for (const [k, v] of Object.entries(SAFE_ZONE)) z[k].forEach((n, i) => expect(n).toBeCloseTo(v[i], 1));
  });
});

describe("envelope bỏ qua im lặng số", () => {
  it("nền không bị đoạn tắt tiếng kéo xuống", () => {
    const x = signal(4, [[2.5, 3.5]]);
    x.fill(0, 0, SR); // 1 s đầu tắt tiếng hẳn
    const e = envelope(x, SR);
    expect(e.floor).toBeGreaterThan(-75);
  });
});

describe("mergeNearby không làm mất cắt đã duyệt", () => {
  it("câu lặp chưa duyệt (tin cậy cao) không nuốt khoảng lặng đã duyệt bên trong", async () => {
    const { mergeNearby } = await import("./cut-plan.js");
    const m = mergeNearby([
      { start: 10, end: 20, reason: "lặp", source: "auto", approved: false, kind: "retake", confidence: 0.95 },
      { start: 12, end: 13, reason: "lặng", source: "auto", approved: true, kind: "silence", confidence: 0.9 },
    ]);
    expect(m.filter((r) => r.approved)).toHaveLength(1);
    expect(m.find((r) => r.kind === "retake")?.approved).toBe(false);
  });
});

describe("demoteLoudSilences", () => {
  it("khoảng 'lặng' mà to (lời WhisperX bỏ sót) thành chưa duyệt, khoảng lặng thật giữ nguyên", async () => {
    const { demoteLoudSilences } = await import("./waveform.js");
    const env = envelope(signal(6, [[0.2, 1.0], [1.2, 2.2], [4.0, 5.0]]), SR);
    const [loud, quiet] = demoteLoudSilences([silence(1.0, 2.0), silence(2.4, 3.8)], env);
    expect(loud).toMatchObject({ kind: "filler-vad", approved: false });
    expect(quiet).toMatchObject({ kind: "silence", approved: true });
  });
});

describe("suspectSegments / holdSuspects", () => {
  const seg = (text: string, start: number, end: number, words?: { text: string; start: number; end: number }[]) =>
    ({ start, end, text, words: words ?? text.split(" ").map((t, i, a) => ({ text: t, start: start + ((end - start) * i) / a.length, end: start + ((end - start) * (i + 0.8)) / a.length })) });
  it("bắt outro YouTube và câu trùng hệt, không bắt câu thường", async () => {
    const { suspectSegments } = await import("./cut-plan.js");
    const s = suspectSegments([
      seg("Lắng nghe chủ động là nghe để hiểu.", 0, 3),
      seg("Hãy subscribe cho kênh lalaschool", 3, 6),
      seg("Xin chào các bạn, hôm nay mình chia sẻ.", 6, 9),
      seg("Xin chào các bạn hôm nay mình chia sẻ", 9, 12),
    ] as never);
    expect(s.map((x) => x.start)).toEqual([3, 6, 9]);
  });
  it("cắt auto đè lên đoạn nghi thành chưa duyệt, cắt của AI giữ nguyên", async () => {
    const { holdSuspects } = await import("./cut-plan.js");
    const out = holdSuspects([silence(4, 5), { ...silence(4, 5), source: "ai" as const }, silence(20, 21)], [{ start: 3, end: 6, reason: "x", text: "" }]);
    expect(out.map((r) => r.approved)).toEqual([false, true, true]);
  });
});

describe("lớp gradient dưới minh hoạ", () => {
  it("gộp minh hoạ liền nhau cùng phía thành một lớp; tắt được; không có tiếng", async () => {
    const { buildScrims, scrimBackground } = await import("./broll-plan.js");
    const items = [
      { start: 2, end: 5, side: "left" as const, beatId: "b1" },
      { start: 5.5, end: 8, side: "left" as const, beatId: "b2" },
      { start: 12, end: 15, side: "right" as const, beatId: "b3" },
    ];
    const s = buildScrims(items, [], { mode: "side", strength: 0.8 }, 30);
    expect(s).toHaveLength(2);
    expect(s[0]).toMatchObject({ type: "shape", start: 1.7, meta: { role: "scrim", beatId: "b1+b2" } });
    expect((s[0] as unknown as { style: { background: string } }).style.background).toContain("to right");
    expect(scrimBackground("side", "right", 0.8)).toContain("to left");
    expect(scrimBackground("bottom", "left", 0.8)).toContain("to top");
    expect(buildScrims(items, [], false, 30)).toEqual([]);
  });
});

describe("fillerCandidates theo transcript hiện tại", () => {
  it("bỏ vùng VAD 'không chữ' đã có lời sau hiệu đính", async () => {
    const { fillerCandidates } = await import("./cut-plan.js");
    const segs = [{ start: 0, end: 3, text: "a b", words: [{ text: "a", start: 0, end: 1 }, { text: "b", start: 1.2, end: 2 }] }] as never;
    const f = [
      { start: 1.1, end: 1.9, text: "(tiếng đệm)", source: "vad-gap", voicedRatio: 0.9, f0Median: 150 },
      { start: 2.2, end: 2.8, text: "(tiếng đệm)", source: "vad-gap", voicedRatio: 0.9, f0Median: 150 },
    ];
    expect(fillerCandidates(f, segs).map((r) => r.start)).toEqual([2.2]);
  });
});

describe("cues tìm trong khoảng của cảnh", () => {
  it("cụm từ có ở đầu bài vẫn khớp lần nói trong cảnh, theo thứ tự", async () => {
    const { sceneInputs, BrollPlanSchema } = await import("./broll-plan.js");
    const words = [
      { text: "giao", start: 1, end: 1.2 }, { text: "tiếp", start: 1.2, end: 1.4 },
      { text: "về", start: 50, end: 50.2 }, { text: "giao", start: 50.3, end: 50.5 }, { text: "tiếp", start: 50.5, end: 50.7 },
      { text: "đàm", start: 52, end: 52.2 }, { text: "phán", start: 52.2, end: 52.4 },
    ];
    const b = BrollPlanSchema.parse({ version: 1, beats: [{ id: "x", start: 49, end: 55, kind: "overlay", templateId: "job:x", side: "left", cues: [{ phrase: "giao tiếp" }, { phrase: "đàm phán" }] }] }).beats[0];
    expect(sceneInputs(b, { start: 49, end: 55 }, words).delays).toEqual([1.3, 3]);
  });
});

describe("crop dọc khi cắt khung", () => {
  it("aspectFilter và cuvid đặt cửa sổ theo cropY", async () => {
    const { aspectFilter, cuvidArgs } = await import("./cut-render.js");
    expect(aspectFilter("4:5")).toContain("(ih-oh)*0.5");
    expect(aspectFilter("4:5", 0.15)).toContain("(ih-oh)*0.15");
    // 1080×1920 → 4:5: cao 1350, dư 570 px; 0,15 → cắt 84 px trên (làm tròn xuống số chẵn), 486 px dưới
    expect(cuvidArgs("h264", 1080, 1920, "4:5", 0.15)).toContain("84x486x0x0");
    expect(cuvidArgs("h264", 1080, 1920, "4:5")).toContain("284x286x0x0");
  });
});
