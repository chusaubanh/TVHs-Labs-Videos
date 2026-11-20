import { afterEach, describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { RESEARCH_CONFIG, researchRepo, researchRoots } from "./research-paths.js";

const temporary: string[] = [];
const makeRoot = () => { const root = mkdtempSync(join(tmpdir(), "research-paths-")); temporary.push(root); return root; };
afterEach(() => { for (const root of temporary.splice(0)) rmSync(root, { recursive: true, force: true }); });

describe("kho nguồn chỉ đọc", () => {
  it("ưu tiên biến môi trường rồi cấu hình; repo thiếu thì tìm bản cục bộ", () => {
    const root = makeRoot();
    const external = makeRoot();
    const override = makeRoot();
    writeFileSync(join(root, RESEARCH_CONFIG), JSON.stringify({ root: external }));
    mkdirSync(join(external, "anime"));
    mkdirSync(join(override, "anime"));
    mkdirSync(join(root, ".research", "repos", "gsap"), { recursive: true });
    expect(researchRepo("anime", root, {})).toBe(join(external, "anime"));
    expect(researchRepo("anime", root, { TVHS_RESEARCH_ROOT: override })).toBe(join(override, "anime"));
    expect(researchRepo("gsap", root, {})).toBe(join(root, ".research", "repos", "gsap"));
    expect(researchRepo("missing", root, {})).toBe(join(external, "missing"));
  });
  it("hỗ trợ cấu hình tương đối và từ chối thoát đường dẫn", () => {
    const root = makeRoot();
    writeFileSync(join(root, RESEARCH_CONFIG), JSON.stringify({ root: "nguon" }));
    expect(researchRoots(root, {})[0]).toBe(join(root, "nguon"));
    for (const name of ["../secret", "..", ".", "x/y", "x\\y", "C:repo", ""]) expect(() => researchRepo(name, root, {})).toThrow();
  });
  it("báo lỗi cấu hình thay vì âm thầm dùng sai nguồn", () => {
    const root = makeRoot();
    writeFileSync(join(root, RESEARCH_CONFIG), JSON.stringify({ root: 3 }));
    expect(() => researchRoots(root, {})).toThrow("root phải");
  });
});