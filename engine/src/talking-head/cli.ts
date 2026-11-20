import { parseArgs } from "./jobs.js";
import { alignEditsCmd, approve, cutPlan, intake, transcribe } from "./commands-text.js";
import { audio, buildProject, cut } from "./commands-media.js";
import { broll, subject } from "./commands-broll.js";
import { intro } from "./intro.js";
import { proxy, sourceAudio } from "./source-media.js";
import { clipsBuild, clipsInit } from "./clips.js";
import { matteCmd, type MatteModel } from "./behind.js";
import type { Density } from "./sfx-plan.js";
import { retranscribeCmd, verifyCutCmd } from "./verify-cut.js";
import { newCustomScene, printCatalog, useScene } from "./scenes.js";

const USAGE = `Chế độ C — talking head. Dùng: npm run th:<lệnh> -- <đối số>
  th:intake -- "<clip>" [--doc "<tên tài liệu>"] [--name <slug video>]   (tạo output/<doc>/<slug>/ và input/<doc>/raw/)
  th:transcribe -- <job> [--model large-v3|phowhisper-large]
  th:align-edits -- <job>
  th:approve -- <job> --stage outline|cut [--note "<ghi chú>"]
  th:cut-plan -- <job>
  th:cut -- <job> --aspect 16:9|4:5|9:16|keep [--crop-y 0..1] [--cpu]   (crop-y: vị trí khung dọc, 0 trên – 0.5 giữa; clip dọc toàn thân đặt thấp hơn 0.5)
  th:verify-cut -- <job> [--dead-air 0.7]   (soát cut.mp4: cắt giữa tiếng/giữa từ, câu lặp, lặng chết; chỉ báo)
  th:retranscribe -- <job>   (phiên âm lại đoạn nghi Whisper bịa trong suspects.json, gợi ý cho bước 3)
  th:audio -- <job>
  th:project -- <job> [--force]
  th:subject -- <job> [--face x,y,w,h]   (vùng mặt người nói, % canvas)
  th:intro -- <job> --from <s> --to <e> [--gap 0.6] [--intro-sfx <id>] [--redo]   (cold open từ chính video, dời mọi thứ thêm D)
  th:source-audio -- <job> [--force]   (audio cả video gốc, DeepFilterNet3 một lần)
  th:proxy -- <job> [--force]           (proxy editor + thumbs + source-peaks.json)
  th:clips-init -- <job>                (migration cut-map → videoClips)
  th:clips-build -- <job> [--force] [--cpu]   (dựng cut.mp4/audio.wav/transcript.cut.json từ videoClips)
  th:broll -- <job> [--dry] [--pack <gói SFX>] [--density low|mid|high]
  th:scene -- <job> --list [--find <từ khoá>]   (kho cảnh editonny, cần clone ở .research/repos/editonny)
  th:scene -- <job> --use <id> --start <s> --end <s>   (chép cảnh vào job, thêm layer track t-editonny)
  th:scene -- <job> --new <tên> [--kind overlay|cutaway] [--side left|right]   (khung cảnh RIÊNG của job, dùng trong broll-plan: templateId "job:<tên>")
  th:matte -- <job> [--layer <id>[,<id>]] [--model birefnet|rvm] [--ema 0.4] [--force]   (chữ sau người nói: đưa layer ra sau, tách người trong khoảng đó)`;

async function main(): Promise<void> {
  const [cmd, ...rest] = process.argv.slice(2);
  const { pos, flags } = parseArgs(rest);
  const str = (k: string) => (typeof flags[k] === "string" ? (flags[k] as string) : undefined);
  const job = pos[0];
  if (cmd !== "intake" && !job) throw new Error(`Thiếu tên job.\n${USAGE}`);
  switch (cmd) {
    case "intake":
      if (!job) throw new Error(`Thiếu đường dẫn clip.\n${USAGE}`);
      await intake(job, str("name"), str("doc"));
      return;
    case "transcribe": return transcribe(job, str("model"));
    case "align-edits": return alignEditsCmd(job);
    case "approve": return approve(job, str("stage") ?? "", str("note"));
    case "cut-plan": return cutPlan(job);
    case "cut": return cut(job, str("aspect"), flags.cpu === true, str("crop-y") !== undefined ? Number(str("crop-y")) : undefined);
    case "verify-cut": return verifyCutCmd(job, str("dead-air") ? Number(str("dead-air")) : undefined);
    case "retranscribe": return retranscribeCmd(job);
    case "audio": return audio(job);
    case "project": return buildProject(job, flags.force === true);
    case "intro": {
      const from = Number(str("from"));
      const to = Number(str("to"));
      if (!Number.isFinite(from) || !Number.isFinite(to)) throw new Error("Thiếu --from/--to (giây trên timeline đã cắt).");
      return intro(job, { from, to, gap: str("gap") ? Number(str("gap")) : undefined, introSfx: str("intro-sfx"), redo: flags.redo === true });
    }
    case "source-audio": await sourceAudio(job, flags.force === true); return;
    case "proxy": return proxy(job, flags.force === true);
    case "clips-init": return clipsInit(job);
    case "clips-build": return clipsBuild(job, flags.force === true, flags.cpu === true);
    case "subject": return subject(job, str("face"));
    case "broll": return broll(job, { dry: flags.dry === true, pack: str("pack"), density: str("density") as Density | undefined });
    case "scene": {
      if (flags.list === true) return printCatalog(str("find"));
      if (str("new")) return newCustomScene(job, str("new")!, str("kind") === "cutaway" ? "cutaway" : "overlay", str("side") === "right" ? "right" : "left");
      const id = str("use");
      const start = Number(str("start")), end = Number(str("end"));
      if (!id || !Number.isFinite(start) || !Number.isFinite(end)) throw new Error("Cần --use <id> --start <s> --end <s> (giây trên timeline đã cắt), hoặc --list.");
      return useScene(job, id, start, end);
    }
    case "matte": {
      const model = str("model");
      if (model && !["birefnet", "rvm", "luma"].includes(model)) throw new Error("--model chỉ nhận birefnet | rvm (luma: chỉ để kiểm thử)");
      return matteCmd(job, { layers: str("layer")?.split(",").map((x) => x.trim()).filter(Boolean), model: model as MatteModel | undefined, ema: str("ema") !== undefined ? Number(str("ema")) : undefined, force: flags.force === true });
    }
    default: throw new Error(`Lệnh không rõ: ${cmd}\n${USAGE}`);
  }
}

main().then(
  () => process.exit(0),
  (e) => {
    console.error(`LỖI: ${(e as Error).message}`);
    process.exit(1);
  },
);
