import "../../src/integrations/runtime-environment.js";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { createReadStream, createWriteStream, existsSync, mkdirSync, readFileSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";
import { spawn } from "node:child_process";
import { runtimeStatus, listJobs } from "../../src/integrations/app-status.js";
import { runSkill } from "../../src/integrations/ffmpeg-skill.js";
import { safeDocumentFolderName, resolveDocumentWorkspace } from "../../src/training/document-workspace.js";
import { normalizeJobId } from "../../src/talking-head/jobs.js";

const ENGINE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ROOT = ENGINE_ROOT;
const WORKSPACE_ROOT = existsSync(join(ENGINE_ROOT, "..", "output")) ? resolve(ENGINE_ROOT, "..") : ENGINE_ROOT;
const OUTPUT = join(WORKSPACE_ROOT, "output");
const PUBLIC = join(ENGINE_ROOT, "scripts/app/public");
const node = process.execPath;
const noOpen = process.argv.includes("--no-open");
const tasks = new Map<string, any>();
let voiceProcess: ReturnType<typeof spawn> | null = null;
const editors = new Map<string, { url: string; process: ReturnType<typeof spawn> }>();
let cachedStatus: unknown;
const json = (res: ServerResponse, code: number, value: unknown) => { res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }); res.end(JSON.stringify(value)); };
async function body(req: IncomingMessage) {
  const chunks: Buffer[] = []; let size = 0;
  for await (const chunk of req) { size += chunk.length; if (size > 64 * 1024) throw new Error("Yêu cầu quá lớn."); chunks.push(chunk); }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
function safeFile(root: string, relative: string) {
  const path = resolve(root, relative);
  if (!path.startsWith(resolve(root) + sep) || !existsSync(path)) return null;
  const real = realpathSync(path);
  return real.startsWith(realpathSync(root) + sep) && statSync(real).isFile() ? real : null;
}
function file(req: IncomingMessage, res: ServerResponse, path: string) {
  const type: Record<string, string> = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".mp4": "video/mp4", ".webm": "video/webm", ".wav": "audio/wav", ".mp3": "audio/mpeg", ".png": "image/png", ".jpg": "image/jpeg", ".json": "application/json", ".md": "text/plain" };
  const size = statSync(path).size;
  const headers = { "Content-Type": (type[extname(path)] ?? "application/octet-stream") + (/[.](js|css|html|json|md)$/.test(path) ? "; charset=utf-8" : ""), "Accept-Ranges": "bytes", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
  const match = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range ?? "");
  if (match) {
    const start = Number(match[1]), end = Math.min(match[2] ? Number(match[2]) : size - 1, size - 1);
    if (start > end || start >= size) { res.writeHead(416, { "Content-Range": `bytes */${size}` }); return res.end(); }
    res.writeHead(206, { ...headers, "Content-Length": end - start + 1, "Content-Range": `bytes ${start}-${end}/${size}` }); createReadStream(path, { start, end }).pipe(res);
  } else { res.writeHead(200, { ...headers, "Content-Length": size }); if (req.method === "HEAD") res.end(); else createReadStream(path).pipe(res); }
}
function persist(task: any) {
  const directory = join(OUTPUT, "app-tasks"); mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, `${task.id}.json`), JSON.stringify(task, null, 2));
}
function startTask(name: string, run: (log: (text: string) => void) => Promise<unknown>) {
  if ([...tasks.values()].some((task) => task.state === "running")) throw new Error("Một tác vụ đang chạy. Chờ tác vụ đó xong để tránh tranh tài nguyên.");
  const task = { id: randomUUID(), name, state: "running", startedAt: new Date().toISOString(), log: "", result: null as unknown };
  tasks.set(task.id, task); persist(task);
  const log = (text: string) => { task.log = (task.log + text).slice(-100_000); };
  Promise.resolve().then(() => run(log)).then((result) => { task.state = "done"; task.result = result; }).catch((error) => { task.state = "error"; log(`\n${error.message}`); }).finally(() => { persist(task); cachedStatus = null; });
  return task;
}
function runNode(script: string, args: string[], log: (text: string) => void): Promise<void> {
  return new Promise((done, reject) => {
    const child = spawn(node, ["--import", "tsx", join(ROOT, script), ...args], { cwd: ROOT, windowsHide: true, env: process.env });
    child.stdout.on("data", (b) => log(b.toString())); child.stderr.on("data", (b) => log(b.toString()));
    child.on("error", reject); child.on("close", (code) => code === 0 ? done() : reject(new Error(`Tác vụ dừng, mã ${code}. Xem nhật ký ở trên.`)));
  });
}
async function skill(tool: string, args: string[], log: (text: string) => void, hardware?: boolean) {
  const result = await runSkill(tool, args, { onLog: log, hardware });
  if (result.code !== 0) throw new Error(result.stdout || result.stderr || `${tool} thất bại.`);
  return result.data;
}
function assetDirectory(id: unknown) {
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/.test(id)) throw new Error("Mã media không hợp lệ.");
  const directory = join(OUTPUT, "media", id);
  if (!existsSync(join(directory, "asset.json"))) throw new Error("Không tìm thấy media đã nhập.");
  return directory;
}
async function ensureVoice(log: (text: string) => void) {
  const endpoint = process.env.VIENEU_ENDPOINT ?? "http://127.0.0.1:8124";
  try { if ((await fetch(`${endpoint}/health`, { signal: AbortSignal.timeout(2000) })).ok) return; } catch { /* Khởi động bộ đọc giọng của ứng dụng. */ }
  const python = join(ROOT, ".venv-vieneu", "Scripts", "python.exe");
  if (!existsSync(python)) throw new Error("Chưa cài giọng đọc. Chạy npm run setup để cài VieNeu rồi tạo giọng lại.");
  if (!voiceProcess || voiceProcess.exitCode !== null) {
    voiceProcess = spawn(python, [join(ROOT, "scripts/vieneu-server.py")], { cwd: ROOT, windowsHide: true });
    voiceProcess.stdout?.on("data", (b) => log(b.toString())); voiceProcess.stderr?.on("data", (b) => log(b.toString()));
    voiceProcess.on("error", (e) => log(e.message));
  }
  for (let i=0;i<120;i++) {
    try { if ((await fetch(`${endpoint}/health`, { signal: AbortSignal.timeout(1000) })).ok) return; } catch { /* chờ model nạp */ }
    if (voiceProcess.exitCode !== null) throw new Error("Máy chủ giọng đọc đã dừng. Xem nhật ký để cài model/môi trường.");
    await new Promise((done) => setTimeout(done, 1000));
  }
  throw new Error("Giọng đọc chưa sẵn sàng sau 2 phút. Kiểm tra model trong nhật ký.");
}
async function releaseVoice() {
  if (!voiceProcess || voiceProcess.exitCode !== null) return;
  const child = voiceProcess; voiceProcess = null;
  await new Promise<void>((done) => { child.once("exit", () => done()); child.kill(); });
}
async function handle(req: IncomingMessage, res: ServerResponse) {
  if (!/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(String(req.headers.host ?? ""))) return json(res, 403, { error: "Máy chủ chỉ phục vụ địa chỉ localhost." });
  const url = new URL(req.url ?? "/", "http://localhost"), path = url.pathname;
  if (req.method !== "GET" && req.method !== "HEAD") {
    if (req.headers["x-app-request"] !== "1" || (req.headers.origin && req.headers.origin !== `http://${req.headers.host}`)) return json(res, 403, { error: "Yêu cầu phải xuất phát từ ứng dụng trên máy này." });
  }
  if (path === "/api/status" && req.method === "GET") return json(res, 200, cachedStatus ??= runtimeStatus(ROOT));
  if (path === "/api/jobs" && req.method === "GET") return json(res, 200, listJobs(WORKSPACE_ROOT));
  if (path === "/api/tasks" && req.method === "GET") return json(res, 200, [...tasks.values()].reverse());
  if (path === "/api/contract" && req.method === "GET") return json(res, 200, await skill("contract", ["--static"], () => {}));
  if (path === "/api/check" && req.method === "POST") {
    const { kind } = await body(req);
    const commands: Record<string, [string, string[]]> = {
      fixtures: ["scripts/gate-determinism.ts", ["--fixtures"]],
      motion: ["scripts/bake-motion-canvas.ts", ["fixtures/motion-canvas.json", "output/_fixtures/motion-canvas", "--check"]],
    };
    if (!(kind in commands)) return json(res, 400, { error: "Bài kiểm tra không hợp lệ." });
    return json(res, 202, startTask("Kiểm tra công cụ", async (log) => { await runNode(...commands[kind], log); return { ok: true }; }));
  }
  if (path === "/api/import-document" && req.method === "POST") {
    const name = decodeURIComponent(String(req.headers["x-file-name"] ?? ""));
    const extension = extname(name).toLowerCase();
    if (![".md", ".txt"].includes(extension)) throw new Error("Chọn tài liệu Markdown hoặc TXT.");
    const chunks: Buffer[] = []; let size = 0;
    for await (const chunk of req) { size += chunk.length; if (size > 2_000_000) throw new Error("Tài liệu vượt giới hạn 2 MB."); chunks.push(chunk); }
    const data = Buffer.concat(chunks).toString("utf8");
    const id = randomUUID(); const directory = join(ROOT, "workspace", "documents", id); mkdirSync(directory, { recursive: true });
    const original = `${safeDocumentFolderName(name.slice(0, -extension.length))}-${id.slice(0, 8)}${extension}`;
    const document = join(directory, original); writeFileSync(document, data);
    const workspace = resolveDocumentWorkspace(document, ROOT); mkdirSync(workspace.outputDir, { recursive: true });
    writeFileSync(join(workspace.outputDir, "source-reference.json"), JSON.stringify({ path: document }));
    return json(res, 202, startTask("Phân tích tài liệu", async (log) => {
      await runNode("src/training/outline-cli.ts", [document], log);
      return { outline: `/files/${encodeURIComponent(original.slice(0, -extension.length))}/outline.json`, next: "AI viết kịch bản và dựng cảnh sau khi người dùng chốt thời lượng, giọng và khổ hình." };
    }));
  }
  if (path === "/api/import" && req.method === "POST") {
    let name: string; try { name = decodeURIComponent(String(req.headers["x-file-name"] ?? "")); } catch { throw new Error("Tên file không hợp lệ."); }
    const extension = extname(name).toLowerCase();
    if (![".mp4", ".mov", ".mkv", ".webm", ".wav", ".mp3", ".m4a", ".flac"].includes(extension)) return json(res, 400, { error: "Chọn file video hoặc âm thanh được hỗ trợ." });
    const id = randomUUID(), directory = join(OUTPUT, "media", id); mkdirSync(directory, { recursive: true });
    let total = 0;
    const limit = new Transform({ transform(chunk, _encoding, callback) { total += chunk.length; callback(total > 512 * 1024 * 1024 ? new Error("File vượt giới hạn 512 MB của giao diện.") : null, chunk); } });
    const source = `source${extension}`;
    await pipeline(req, limit, createWriteStream(join(directory, source), { flags: "wx" }));
    writeFileSync(join(directory, "asset.json"), JSON.stringify({ id, name, source, bytes: total }));
    return json(res, 201, { id, name, source: `/files/media/${id}/${source}` });
  }
  if (path === "/api/media" && req.method === "POST") {
    const { id, operation, params = {} } = await body(req);
    const directory = assetDirectory(id);
    const asset = JSON.parse(readFileSync(join(directory, "asset.json"), "utf8"));
    const source = join(directory, asset.source);
    if (!["probe", "cut", "fit", "loudness"].includes(operation)) return json(res, 400, { error: "Thao tác không hợp lệ." });
    const outputName = `${operation}-${randomUUID()}${[".wav", ".mp3", ".m4a", ".flac"].includes(extname(source)) ? ".wav" : ".mp4"}`;
    const output = join(directory, outputName);
    const args = [source];
    if (operation === "cut") {
      const start = Number(params.start), end = Number(params.end);
      if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end <= start) throw new Error("Điểm cắt không hợp lệ.");
      args.push("--start", String(start), "--end", String(end));
    }
    if (operation === "fit") {
      if (!["16:9", "9:16", "4:5", "1:1"].includes(params.aspect) || !["pad", "crop", "blur"].includes(params.fit)) throw new Error("Chọn khổ hình và cách đặt khung.");
      args.push("--aspect", params.aspect, "--fit", params.fit);
    }
    if (operation === "loudness") args.push("-I", "-14", "--tp", "-1");
    if (operation !== "probe") args.push("-o", output);
    return json(res, 202, startTask(`Media: ${operation}`, async (log) => {
      const before = await skill("probe", [source], log);
      if (operation === "probe") return { probe: before };
      const plan = await skill(operation, [...args, "--dry-run"], log, true);
      writeFileSync(join(directory, `${outputName}.plan.json`), JSON.stringify(plan, null, 2));
      const result = await skill(operation, args, log, true);
      if (!existsSync(output)) throw new Error("Công cụ không tạo ra file đầu ra đã yêu cầu.");
      const verification = await skill("probe", [output], log);
      return { output: `/files/media/${id}/${outputName}`, result, verification };
    }));
  }
  if (path === "/api/job-source" && req.method === "POST") {
    const { id: rawId, source } = await body(req); const id = normalizeJobId(rawId);
    if (!listJobs(WORKSPACE_ROOT).some((job) => job.id === id && job.kind === "training") || typeof source !== "string") throw new Error("Chọn dự án và tài liệu nguồn hợp lệ.");
    const workspace = resolveDocumentWorkspace(source, ROOT);
    if (resolve(workspace.outputDir).toLowerCase() !== resolve(OUTPUT,id).toLowerCase()) throw new Error("Tài liệu này ánh xạ sang dự án khác. Chọn đúng tài liệu nguồn ban đầu của dự án.");
    writeFileSync(join(OUTPUT,id,"source-reference.json"),JSON.stringify({path:workspace.inputPath}));
    return json(res,200,{ok:true});
  }
  if (path === "/api/job-review" && req.method === "GET") {
    const id = normalizeJobId(url.searchParams.get("id") ?? "");
    const review = safeFile(OUTPUT, `${id}/script-review.md`);
    const stills = join(OUTPUT, id, "stills");
    const { readdirSync } = await import("node:fs");
    return json(res, 200, { text: review ? readFileSync(review, "utf8") : "Chưa có bảng duyệt kịch bản.", images: existsSync(stills) ? readdirSync(stills).filter((n) => /[.](png|jpg)$/i.test(n)).slice(0, 80).map((n) => `/files/${id.split("/").map(encodeURIComponent).join("/")}/stills/${encodeURIComponent(n)}`) : [] });
  }
  if (path === "/api/job-action" && req.method === "POST") {
    const { id: rawId, action, confirmed, by } = await body(req);
    const id = normalizeJobId(rawId);
    if (!listJobs(WORKSPACE_ROOT).some((job) => job.id === id && job.kind === "training")) throw new Error("Chọn job tài liệu có kịch bản.");
    const reference = join(OUTPUT, id, "source-reference.json");
    const input = existsSync(reference) ? JSON.parse(readFileSync(reference, "utf8")).path : id;
    const commands: Record<string, [string, string[]]> = { validate: ["src/training/script-validate-cli.ts", [input]], voice: ["src/audio/voice-cli.ts", [input]], stills: ["scripts/stills.ts", [input]], render: ["scripts/pipeline-runner.ts", [input]] };
    if (action === "approve-script" || action === "approve-visual") {
      if (confirmed !== true || typeof by !== "string" || !by.trim()) throw new Error("Cần người dùng xem và xác nhận tên người duyệt.");
      if (action === "approve-script" && !existsSync(join(OUTPUT, id, "script-review.md"))) throw new Error("Chưa có bảng duyệt kịch bản.");
      commands[action] = ["src/training/approve-cli.ts", [input, action === "approve-script" ? "script" : "visual", "--by", by.trim()]];
    }
    if (!(action in commands)) throw new Error("Bước không hợp lệ.");
    return json(res, 202, startTask(`Job: ${action}`, async (log) => { if (action === "voice") await ensureVoice(log); if (action === "render") await releaseVoice(); await runNode(...commands[action], log); return { ok: true }; }));
  }
  if (path === "/api/open-editor" && req.method === "POST") {
    const { id: rawId } = await body(req); const id = normalizeJobId(rawId);
    if (!listJobs(WORKSPACE_ROOT).some((job) => job.id === id && job.editor)) throw new Error("Job này chưa có project để mở Editor.");
    if (editors.has(id)) return json(res, 200, { url: editors.get(id)!.url });
    const child = spawn(node, ["--import", "tsx", join(ROOT, "scripts/editor/server.ts"), id, "--no-open"], { cwd: ROOT, windowsHide: true });
    const editorUrl = await new Promise<string>((done, reject) => {
      const timer = setTimeout(() => { child.kill(); reject(new Error("Editor chưa khởi động được.")); }, 30000);
      child.stdout.on("data", (b) => { const match = /http:\/\/localhost:\d+/.exec(b.toString()); if (match) { clearTimeout(timer); done(match[0]); } });
      child.on("error", (e) => { clearTimeout(timer); reject(e); }); child.on("exit", () => { clearTimeout(timer); editors.delete(id); reject(new Error("Editor đã dừng.")); });
      child.stderr.on("data", (b) => console.error(b.toString()));
    });
    editors.set(id, { url: editorUrl, process: child }); return json(res, 200, { url: editorUrl });
  }
  if (req.method !== "GET" && req.method !== "HEAD") return json(res, 404, { error: "Không có thao tác này." });
  const mapping: [string, string][] = [["/files/", OUTPUT], ["/public/", join(ROOT, "public")]];
  for (const [prefix, root] of mapping) if (path.startsWith(prefix)) {
    const relative = decodeURIComponent(path.slice(prefix.length));
    if (prefix === "/files/" && !/[.](mp4|webm|wav|mp3|png|jpg|json|md)$/i.test(relative)) return json(res, 403, { error: "Loại file không được phục vụ." });
    const target = safeFile(root, relative); return target ? file(req, res, target) : json(res, 404, { error: "Không tìm thấy file." });
  }
  const target = safeFile(PUBLIC, path === "/" ? "index.html" : decodeURIComponent(path.slice(1)));
  return target ? file(req, res, target) : json(res, 404, { error: "Không tìm thấy trang." });
}
const server = createServer((req, res) => { handle(req, res).catch((error) => { if (!res.headersSent) json(res, 400, { error: error.message }); else res.end(); }); });
function listen(port: number) {
  server.once("error", (error: NodeJS.ErrnoException) => { if (error.code === "EADDRINUSE" && port < 4350) listen(port + 1); else throw error; });
  server.listen(port, "127.0.0.1", () => {
    const address = server.address(); const actualPort = address && typeof address !== "string" ? address.port : port;
    const url = `http://localhost:${actualPort}`; console.log(`Ứng dụng chạy tại ${url}`);
    if (!noOpen && process.platform === "win32") spawn("cmd.exe", ["/c", "start", '""', url], { windowsHide: true, stdio: "ignore" }).unref();
  });
}
const pi = process.argv.indexOf("--port"); listen(pi >= 0 && Number.isInteger(Number(process.argv[pi + 1])) ? Number(process.argv[pi + 1]) : 4316);
const shutdown = () => { voiceProcess?.kill(); for (const editor of editors.values()) editor.process.kill(); server.close(() => process.exit(0)); };
process.on("SIGINT", shutdown); process.on("SIGTERM", shutdown);