import { describe, expect, it } from "vitest";
import { referencedAssets, sampleTextsLeft, standaloneScene, unsupportedReason } from "./scenes.js";

const SCENE = `<!doctype html><html><head></head><body>
<template id="x-template">
<style>@font-face{font-family:"Inter";src:url("assets/visuals/fonts/inter-var-latin.woff2")}@font-face{font-family:"Anton";src:url("assets/visuals/fonts/a.ttf")}</style>
<div id="root" data-composition-id="x" data-width="1080" data-height="1920"><video data-start="0" src="assets/visuals/video/dark-grid.mp4"></video><b>Monthly revenue</b></div>
<script>(function(){var C=(window.__scenes||{})["x"];var P = {
  items: "Take 1|Take 2", // x
};window.__timelines={x:gsap.timeline({paused:true})};})();</script>
</template></body></html>`;

describe("editonny scenes", () => {
  it("standaloneScene gỡ template, tiêm __scenes, gsap và font Việt", () => {
    const h = standaloneScene(SCENE, "x", { duration: 4, start: 10, words: [{ text: "một", t: 0.2, end: 0.5 }] });
    expect(h).not.toContain("<template");
    expect(h).toContain('<script src="gsap.min.js"></script>');
    expect(h).toContain('window.__scenes["x"]=c');
    expect(h).toContain("V.sceneDuration");
    // Inter: bỏ mặt gốc, thay bằng Be Vietnam Pro; Anton: mặt vá sinh đôi cùng độ đậm, đặt SAU mặt gốc
    expect(h).not.toContain("inter-var-latin.woff2");
    expect(h).toMatch(/font-family:"Inter";src:url\("vn-fonts\/BeVietnamPro-Regular\.ttf"\);font-weight:100 450;font-display:block\}/);
    expect(h).toMatch(/font-family:"Anton";src:url\("vn-fonts\/BeVietnamPro-Regular\.ttf"\);font-weight:400;font-display:block;unicode-range:U\+0102/);
    expect(h.indexOf('src:url("assets/visuals/fonts/a.ttf")')).toBeLessThan(h.indexOf('font-family:"Anton";src:url("vn-fonts'));
  });
  it("referencedAssets và sampleTextsLeft", () => {
    expect(referencedAssets(SCENE).sort()).toEqual(["assets/visuals/fonts/a.ttf", "assets/visuals/fonts/inter-var-latin.woff2", "assets/visuals/video/dark-grid.mp4"]);
    expect(sampleTextsLeft(SCENE, ["Monthly revenue", "Take 1", "revenue-x", "R"])).toEqual(["Monthly revenue", "Take 1"]);
    expect(sampleTextsLeft(SCENE.replace("Monthly revenue", "Doanh thu"), ["Monthly revenue"])).toEqual([]);
  });
  it("unsupportedReason bắt hàm runtime editonny còn thiếu", () => {
    expect(unsupportedReason(SCENE)).toBeNull();
    expect(unsupportedReason(SCENE.replace("var P =", "countNumber(a,1,2);var P ="))).toContain("countNumber");
  });
});

describe("sceneLayer", () => {
  it("qua được LayerSchema và giữ meta", async () => {
    const { sceneLayer } = await import("./scenes.js");
    const { LayerSchema } = await import("./project-schema.js");
    const l = sceneLayer("x-1", "x", 2, 5.5, "overlay");
    expect(LayerSchema.parse(l)).toMatchObject({ type: "scene", templateId: "job:x-1", duration: 3.5, meta: { overlay: true, presetId: "x", source: "user" } });
  });
});

describe("pDefaults số mẫu", () => {
  it("bắt số mẫu trong var P, bỏ số 0 và khoá bố cục", async () => {
    const { pDefaults, sampleTextsLeft } = await import("./scenes.js");
    const h = `<script>var P = {\n  title: "Apartment", // x\n  value: 690000, // price\n  floors: 0, // hide\n  y: 230, // px\n};</script>`;
    const d = pDefaults(h);
    expect(d).toEqual(["Apartment", "P.value=690000"]);
    expect(sampleTextsLeft(h, d)).toEqual(d);
    expect(sampleTextsLeft(h.replace("690000", "1250000000").replace("Apartment", "Căn hộ"), d)).toEqual([]);
  });
});
