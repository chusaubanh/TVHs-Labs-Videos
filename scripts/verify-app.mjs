import assert from "node:assert/strict";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
const base = process.argv[2] ?? "http://127.0.0.1:4316";
const post = async (path, value) => {
  const response = await fetch(base + path, { method: "POST", headers: { "Content-Type": "application/json", "X-App-Request": "1" }, body: JSON.stringify(value) });
  const data = await response.json(); assert.ok(response.ok, JSON.stringify(data)); return data;
};
const waitTask = async (id) => {
  for (let i=0;i<240;i++) {
    const tasks = await (await fetch(base + "/api/tasks")).json(); const task=tasks.find((t)=>t.id===id);
    if (task?.state === "error") throw new Error(task.log);
    if (task?.state === "done") return task.result;
    await new Promise((done)=>setTimeout(done,500));
  }
  throw new Error("Tác vụ chạy quá 2 phút.");
};
const status = await (await fetch(base + "/api/status")).json();
assert.ok(status.tools.every((tool)=>tool.available));
const contract = await (await fetch(base + "/api/contract")).json();assert.equal(contract.tools.length,42);
const denied=await fetch(base+"/api/check",{method:"POST",headers:{"Content-Type":"application/json"},body:'{"kind":"fixtures"}'});assert.equal(denied.status,403);
const escaped=await fetch(base+"/files/..%2f..%2f.env.local");assert.ok(escaped.status===403||escaped.status===404);
const source=readFileSync("public/fixtures/testsrc-60fps.mp4");const originalHash=createHash("sha256").update(source).digest("hex");
const upload=await fetch(base+"/api/import",{method:"POST",headers:{"X-App-Request":"1","X-File-Name":"kiem-thu.mp4","Content-Type":"application/octet-stream"},body:source});assert.equal(upload.status,201);const asset=await upload.json();
const measured=await waitTask((await post("/api/media",{id:asset.id,operation:"probe"})).id);
const cut=await waitTask((await post("/api/media",{id:asset.id,operation:"cut",params:{start:0.1,end:0.6}})).id);
const fit=await waitTask((await post("/api/media",{id:asset.id,operation:"fit",params:{aspect:"1:1",fit:"pad"}})).id);
for(const result of [cut,fit]){const response=await fetch(base+result.output);assert.equal(response.status,200);assert.equal(response.headers.get("content-type"),"video/mp4");assert.ok(Number(response.headers.get("content-length"))>1000);}
assert.equal(createHash("sha256").update(readFileSync("public/fixtures/testsrc-60fps.mp4")).digest("hex"),originalHash);
const report={at:new Date().toISOString(),contractTools:contract.tools.length,csrf:"passed",pathBoundary:"passed",originalPreserved:true,probe:measured,cut,fit};
mkdirSync("output/_verification",{recursive:true});writeFileSync("output/_verification/app.json",JSON.stringify(report,null,2));
console.log("ĐẠT ứng dụng: 42 công cụ, chặn yêu cầu sai nguồn/thoát đường dẫn, nhập bản sao, probe, cắt và đổi khổ thành MP4 thật; giữ nguyên nguồn.");