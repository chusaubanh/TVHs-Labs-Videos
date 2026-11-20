/**
 * Dựng kịch bản kiểm thử máy móc từ fixtures/smoke, không phải nội dung đào tạo.
 * tsx scripts/smoke.ts <aspect> <voice> [tài liệu]
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { resolveJob } from "../src/training/job";
import { TrainingScriptSchema } from "../src/training/training-contract";

const [aspect = "16:9", voice = "Ngọc Huyền", doc = "fixtures/smoke/smoke.md"] = process.argv.slice(2);
const job = resolveJob(doc);
mkdirSync(job.outputDir, { recursive: true });
const script = TrainingScriptSchema.parse({
  version: "4.0",
  documentName: "smoke",
  title: "Kiểm thử hệ thống",
  aspect,
  voice: { id: voice, tone: "tu_nhien" },
  targetAudience: "Kiểm thử",
  analysis: {
    contentGroups: [{ title: "Kiểm thử", contentType: "danh-sach", learnerNeeds: "Không có", mustKeep: ["hai câu"], canDrop: [], examples: [], delivery: "Lời và hình" }],
    learningLogic: "Kiểm thử máy móc.",
    principles: ["Chunking"],
    fitsOneVideo: true,
  },
  lengthDecision: { status: "single", confirmedBy: "kiểm thử máy" },
  scenes: [
    {
      id: "kiem-thu",
      section: "Kiểm thử",
      contentType: "danh-sach",
      component: "fixture/smoke",
      voiceSegments: ["Câu thứ nhất kiểm tra giọng đọc.", "Câu thứ hai kiểm tra nhịp hình."],
      visual: ["Khối thứ nhất bật ra.", "Khối thứ hai bật ra."],
      labels: ["giọng đọc", "nhịp hình"],
    },
  ],
});
writeFileSync(job.scriptPath, `${JSON.stringify(script, null, 2)}\n`);
console.log(job.scriptPath);
