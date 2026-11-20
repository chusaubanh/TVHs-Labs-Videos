import { runSkill } from "../src/integrations/ffmpeg-skill.js";
const [tool, ...args] = process.argv.slice(2);
if (!tool) throw new Error("Cú pháp: npm run media -- <probe|cut|fit|...|contract> <tham số>; xem danh sách bằng contract --static.");
const result = await runSkill(tool, args);
process.stdout.write(result.stdout); process.stderr.write(result.stderr); process.exitCode = result.code;