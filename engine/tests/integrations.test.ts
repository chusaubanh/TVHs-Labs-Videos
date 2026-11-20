import { afterAll, describe, expect, it } from "vitest";
import { existsSync, mkdirSync, mkdtempSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { inspectMedia } from "../scripts/app/client/media-tools.js";
import { runSkill } from "../src/integrations/ffmpeg-skill.js";
import { assertReleaseDestination } from "../src/integrations/release-policy.mjs";

const root = mkdtempSync(join(tmpdir(), "release-boundary-"));
afterAll(() => rmSync(root, { recursive: true, force: true }));
describe("biên đóng gói và bộ nối media", () => {
  it("Mediabunny đọc File thật bằng API async, không cần gửi lên server", async () => {
    const bytes = readFileSync("public/fixtures/testsrc-60fps.mp4");
    const file = new File([new Uint8Array(bytes)], "technical.mp4", { type: "video/mp4" });
    const result = await inspectMedia(file, { thumbnail: false });
    expect(result.name).toBe("technical.mp4"); expect(result.bytes).toBe(bytes.length);
    expect(result.duration).toBeGreaterThan(0); expect(result.video?.width).toBeGreaterThan(0); expect(result.video?.height).toBeGreaterThan(0); expect(result.poster).toBeNull();
  });
  it("không cho đích trỏ về nguồn, ra ngoài releases hoặc ghi đè bản cũ", () => {
    for (const target of [root, join(root,"input"), join(root,"output","releases"), join(root,"output","releases","..","outside")]) expect(() => assertReleaseDestination(target,root)).toThrow();
    const fresh = join(root,"output","releases","new"); expect(assertReleaseDestination(fresh,root)).toBe(fresh);
    mkdirSync(fresh,{recursive:true});expect(() => assertReleaseDestination(fresh,root)).toThrow("đã tồn tại");
  });
  it("không thực thi tên tool có đường dẫn hoặc tool không tồn tại", async () => {
    await expect(runSkill("../private",[])).rejects.toThrow("không hợp lệ");
    await expect(runSkill("not_a_real_tool",[])).rejects.toThrow("không có công cụ");
  });
  it("hợp đồng lấy từ các script upstream thực tế, đủ 42 tool và schema cắt", async () => {
    const result = await runSkill("contract",["--static"]);
    expect(result.code).toBe(0);
    const contract = result.data as {tools:{name:string;input_schema:unknown}[]};
    expect(contract.tools).toHaveLength(42);expect(contract.tools.find((tool)=>tool.name==="cut")?.input_schema).toBeTruthy();
  },30000);
});