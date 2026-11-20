import { reveal, inspectMedia, mountMediaInspector } from "/public/vendor/integrations/media-tools.js";
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
let selectedFile = null, imported = null, fileSeq = 0, reviewing = null, taskTimer = null;
const errors = (e) => { $("error").hidden = false; $("error").textContent = e.message || String(e); };
async function api(path, value) {
  const response = await fetch(path, value === undefined ? {} : { method: "POST", headers: { "Content-Type": "application/json", "X-App-Request": "1" }, body: JSON.stringify(value) });
  const result = await response.json(); if (!response.ok) throw new Error(result.error || `HTTP ${response.status}`); return result;
}
function tab(id) {
  document.querySelectorAll(".pane").forEach((pane) => pane.hidden = pane.id !== id);
  document.querySelectorAll("nav button").forEach((button) => button.setAttribute("aria-selected", button.dataset.tab === id));
  reveal($(id)); $("error").hidden = true;
}
for (const button of document.querySelectorAll("nav button")) button.onclick = () => tab(button.dataset.tab);
mountMediaInspector($("inspect"));
$("importDocument").onclick = () => { $("documentFile").value = ""; $("documentFile").click(); };
$("documentFile").onchange = async () => {
  const file = $("documentFile").files?.[0]; if (!file) return;
  try {
    const response = await fetch("/api/import-document", { method: "POST", headers: { "X-App-Request": "1", "X-File-Name": encodeURIComponent(file.name), "Content-Type": "application/octet-stream" }, body: file });
    const result = await response.json(); if (!response.ok) throw new Error(result.error);
    tab("tasks"); await loadTasks(); await loadJobs();
  } catch (error) { errors(error); }
};
async function task(path, value) {
  const result = await api(path, value); tab("tasks"); await loadTasks(); return result;
}
async function loadJobs() {
  const jobs = await api("/api/jobs");
  $("jobList").innerHTML = jobs.length ? "" : '<div class="empty">Chưa có dự án. Có thể dùng tab Xử lý media ngay, hoặc chuẩn bị kịch bản bằng AI theo tài liệu hướng dẫn.</div>';
  for (const job of jobs) {
    const row = document.createElement("article"); row.className = "job";
    row.innerHTML = `<div><h3>${esc(job.title)}</h3><div class="subtle">${job.kind === "training" ? "Từ tài liệu" : "Có project Editor"} · ${esc(job.id)}</div></div><div class="actions"></div>`;
    const actions = row.querySelector(".actions");
    const add = (label, onclick) => { const b = document.createElement("button"); b.textContent = label; b.onclick = () => Promise.resolve(onclick()).catch(errors); actions.append(b); };
    if (job.editor) add("Mở Editor", async () => { const result = await api("/api/open-editor", { id: job.id }); location.assign(result.url); });
    if (job.kind === "training" && job.script) {
      add("Kịch bản / duyệt hình", () => openReview(job));
      add("Tạo giọng", () => task("/api/job-action", { id: job.id, action: "voice" }));
      add("Ảnh duyệt", () => task("/api/job-action", { id: job.id, action: "stills" }));
      add("Xuất video", () => task("/api/job-action", { id: job.id, action: "render" }));
    }
    if (job.video) { const a = document.createElement("a"); a.textContent = "Xem MP4"; a.href = `/files/${job.id.split("/").map(encodeURIComponent).join("/")}/video.mp4`; a.target = "_blank"; actions.append(a); }
    $("jobList").append(row);
  }
}
async function openReview(job) {
  const review = await api(`/api/job-review?id=${encodeURIComponent(job.id)}`); reviewing = job;
  $("reviewText").textContent = review.text; $("reviewImages").replaceChildren();
  for (const url of review.images) { const image = document.createElement("img"); image.src = url; image.alt = "Ảnh duyệt dự án"; image.loading = "lazy"; $("reviewImages").append(image); }
  $("approveVisual").disabled = review.images.length === 0;
  $("approveScript").disabled = !job.review;
  $("review").showModal();
}
$("linkSource").onclick = async () => { try { await api("/api/job-source", { id: reviewing.id, source: $("jobSource").value.trim() }); $("sourceStatus").textContent = "Đã liên kết nguồn. Kiểm tra kịch bản trước khi đi tiếp."; } catch (e) { $("sourceStatus").textContent = e.message; } };
$("closeReview").onclick = () => $("review").close();
for (const [button, action] of [["validateScript", "validate"], ["approveScript", "approve-script"], ["approveVisual", "approve-visual"]]) $(button).onclick = async () => {
  try {
    const by = $("reviewBy").value.trim();
    if (action.startsWith("approve") && !by) throw new Error("Nhập tên người duyệt trước khi xác nhận.");
    await task("/api/job-action", { id: reviewing.id, action, confirmed: true, by }); $("review").close();
  } catch (e) { alert(e.message); }
};
async function loadStatus() {
  const status = await api("/api/status");
  $("machine").textContent = status.gpu || "Chạy bằng CPU";
  $("environment").innerHTML = [...status.tools.map((tool) => `<div class="env ${tool.available ? "" : "bad"}">${esc(tool.name)} · ${tool.available ? "Sẵn có" : "Chưa cài"}</div>`), `<div class="env ${status.python.available ? "" : "bad"}">Python · ${status.python.available ? esc(status.python.version) : "Chưa cài"}</div>`, `<div class="env">Node ${esc(status.node)}</div>`].join("");
  const lane = { render: "Dựng theo frame", prepare: "Chuẩn bị tài nguyên", preview: "Xem thử trong giao diện", guide: "Hướng dẫn agent" };
  $("capabilities").innerHTML = status.capabilities.map((item) => `<article class="capability"><strong>${esc(item.repo)}</strong><p>${esc(item.purpose)}</p><span class="badge">${esc(lane[item.lane])}</span><p>${item.adapter ? "Có bộ tích hợp" : "Chưa có bộ tích hợp"}</p></article>`).join("");
}
async function loadContract() {
  const contract = await api("/api/contract");
  $("skillTools").replaceChildren();
  for (const item of contract.tools || []) { const code = document.createElement("code"); code.textContent = item.name; $("skillTools").append(code); }
}
$("mediaFile").onchange = async () => {
  const mine = ++fileSeq; selectedFile = $("mediaFile").files?.[0] ?? null; imported = null; $("import").disabled = true; $("runMedia").disabled = true; $("poster").hidden = true;
  if (!selectedFile) return;
  $("fileInfo").textContent = "Đang đọc media trên trình duyệt…";
  try {
    const meta = await inspectMedia(selectedFile); if (mine !== fileSeq) return;
    $("fileInfo").textContent = `${meta.name} · ${meta.duration.toFixed(2)} giây · ${(meta.bytes / 1048576).toFixed(1)} MB` + (meta.video ? ` · ${meta.video.width} × ${meta.video.height}` : "");
    $("cutEnd").value = meta.duration.toFixed(3); $("import").disabled = false;
    if (meta.poster) { $("poster").src = meta.poster; $("poster").hidden = false; }
  } catch (e) { if (mine === fileSeq) { $("fileInfo").textContent = "Trình duyệt chưa đọc được codec này. Vẫn có thể nhập bản sao để FFmpeg kiểm tra."; $("import").disabled = false; } }
};
$("import").onclick = async () => {
  try {
    const file = selectedFile; if (!file) return;
    $("import").disabled = true; $("mediaStatus").textContent = "Đang nhập bản sao…";
    const response = await fetch("/api/import", { method: "POST", headers: { "X-App-Request": "1", "X-File-Name": encodeURIComponent(file.name), "Content-Type": "application/octet-stream" }, body: file });
    const result = await response.json(); if (!response.ok) throw new Error(result.error);
    imported = result; $("runMedia").disabled = false; $("mediaStatus").textContent = `Đã nhập ${file.name}. Chọn thao tác rồi chạy.`;
  } catch (e) { errors(e); $("import").disabled = false; }
};
$("operation").onchange = () => { $("cutFields").hidden = $("operation").value !== "cut"; $("fitFields").hidden = $("operation").value !== "fit"; };
$("mediaForm").onsubmit = async (event) => {
  event.preventDefault();
  try {
    if (!imported) throw new Error("Nhập bản sao trước khi chạy.");
    await task("/api/media", { id: imported.id, operation: $("operation").value, params: { start: $("cutStart").value, end: $("cutEnd").value, aspect: $("aspect").value, fit: $("fit").value } });
  } catch (e) { errors(e); }
};
async function loadTasks() {
  const tasks = await api("/api/tasks"); const running = tasks.filter((item) => item.state === "running").length;
  $("runningCount").textContent = running ? `(${running})` : "";
  $("taskList").replaceChildren();
  if (!tasks.length) $("taskList").innerHTML = '<div class="empty">Chưa có tác vụ trong phiên làm việc này.</div>';
  for (const item of tasks) {
    const row = document.createElement("article"); row.className = "task";
    const state = { running: "Đang chạy", done: "Hoàn thành", error: "Cần xử lý lỗi" }[item.state];
    row.innerHTML = `<h3>${esc(item.name)} <span class="badge">${state}</span></h3><div class="subtle">${new Date(item.startedAt).toLocaleString("vi-VN")}</div>`;
    if (item.result?.outline) { const link = document.createElement("a"); link.href = item.result.outline; link.textContent = "Xem dàn ý phân tích"; link.target = "_blank"; row.append(link); }
    if (item.result?.output) {
      const media = document.createElement(/[.](wav|mp3)$/.test(item.result.output) ? "audio" : "video"); media.controls = true; media.src = item.result.output; row.append(media);
      const download = document.createElement("a"); download.href = item.result.output; download.download = ""; download.textContent = "Tải kết quả"; row.append(download);
    }
    const details = document.createElement("details"), summary = document.createElement("summary"), pre = document.createElement("pre");
    summary.textContent = "Nhật ký và kết quả kiểm tra"; pre.textContent = item.log + (item.result ? "\n" + JSON.stringify(item.result, null, 2) : ""); details.append(summary, pre); row.append(details); $("taskList").append(row);
  }
  clearTimeout(taskTimer); if (running) taskTimer = setTimeout(() => loadTasks().catch(errors), 1200);
}
$("checkFrames").onclick = () => task("/api/check", { kind: "fixtures" }).catch(errors);
$("checkMotion").onclick = () => task("/api/check", { kind: "motion" }).catch(errors);
async function refresh() { await Promise.all([loadJobs(), loadStatus(), loadTasks()]); }
$("refresh").onclick = () => refresh().catch(errors);
refresh().catch(errors); loadContract().catch(errors);