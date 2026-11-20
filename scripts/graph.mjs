import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const toolDir = spawnSync("uv", ["tool", "dir"], { encoding: "utf8" });
const windows = process.platform === "win32";
const uvPython = toolDir.status === 0 && toolDir.stdout.trim()
  ? join(toolDir.stdout.trim(), "graphifyy", windows ? "Scripts" : "bin", windows ? "python.exe" : "python")
  : undefined;
const candidates = [...(uvPython && existsSync(uvPython) ? [uvPython] : []), ...(windows ? ["python"] : ["python3", "python"])];
const python = candidates.find(
  (candidate) => spawnSync(candidate, ["-c", "import graphify.export; import networkx"], { stdio: "ignore" }).status === 0,
);

if (!python) {
  console.error("Chưa tìm thấy môi trường Graphify. Cài bằng: uv tool install graphifyy");
  process.exit(1);
}

for (const args of [["-m", "graphify", "update", "."], ["scripts/graph-overview.py"]]) {
  const result = spawnSync(python, args, { stdio: "inherit" });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) process.exit(result.status ?? 1);
}
