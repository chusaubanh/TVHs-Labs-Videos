import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
const python = join(process.cwd(), ".venv-asr", "Scripts", "python.exe");
if (!existsSync(python)) throw new Error("Cài môi trường model bằng npm run th:setup trước.");
const result = spawnSync(python, ["-B", "scripts/setup-models.py", ...process.argv.slice(2)], { stdio: "inherit", windowsHide: true, env: { ...process.env, PYTHONIOENCODING: "utf-8" } });
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;