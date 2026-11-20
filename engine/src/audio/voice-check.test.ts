import { describe, expect, it } from "vitest";
import { compareSyllables, syllables } from "./voice-check";

describe("voice:check — so âm tiết", () => {
  it("bỏ dấu câu, chữ thường, giữ dấu tiếng Việt", () => {
    expect(syllables("Tông giọng, NGÔN ngữ cơ thể!")).toEqual(["tông", "giọng", "ngôn", "ngữ", "cơ", "thể"]);
  });
  it("đọc đúng: không có chỗ lệch", () => {
    expect(compareSyllables("Lạm phát tăng nhanh.", "lạm phát tăng nhanh")).toEqual({ errorRate: 0, hunks: [] });
  });
  it("đọc sai một âm tiết: báo đúng chỗ, loại lỗi chữ", () => {
    const r = compareSyllables("thứ nhất là tông giọng", "thứ nhất là tôn giọng");
    expect(r.hunks).toEqual([{ expected: "tông", heard: "tôn", kind: "loi" }]);
    expect(r.errorRate).toBeCloseTo(0.2);
  });
  it("khác cách viết số: xếp loại số để nghe lại", () => {
    const r = compareSyllables("có 3 bước", "có ba bước");
    expect(r.hunks).toEqual([{ expected: "3", heard: "ba", kind: "so" }]);
  });
  it("đọc thiếu chữ cuối", () => {
    expect(compareSyllables("học viên hỏi tiếp", "học viên hỏi").hunks).toEqual([{ expected: "tiếp", heard: "", kind: "loi" }]);
  });
});

describe("voice:check — giảm báo nhầm", () => {
  it("chỉ khác dấu cách (ChatGPT / chat gpt) không tính", () => {
    expect(compareSyllables("mở ChatGPT ra", "mở chat gpt ra").hunks).toEqual([]);
  });
  it("tên riêng nghe sai xếp loại ten, không lẫn vào lỗi đọc", () => {
    const r = compareSyllables("Bạn mở Claude trên máy", "bạn mở clout trên máy");
    expect(r.hunks).toEqual([{ expected: "claude", heard: "clout", kind: "ten" }]);
  });
});
