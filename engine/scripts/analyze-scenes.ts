import fs from "fs";

function analyze(folder: string) {
  console.log(`=== ANALYZING ${folder} ===`);
  const files = fs.readdirSync(folder).filter(f => f.startsWith("scenes-") && f.endsWith(".tsx"));
  for (const f of files) {
    const text = fs.readFileSync(`${folder}/${f}`, "utf8");
    const lines = text.split("\n");
    let currentComment = "";
    let currentComp = "";
    let cues: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("/** Cảnh")) {
        currentComment = line.trim();
      }
      const matchComp = line.match(/export const (\w+): React\.FC/);
      if (matchComp) {
        currentComp = matchComp[1];
        cues = [];
      }
      const pMatches = [...line.matchAll(/p\((\d+),\s*([0-9.]+)\)/g)];
      for (const m of pMatches) cues.push(`p(${m[1]},${m[2]})`);
      const lMatches = [...line.matchAll(/l\((\d+),\s*([0-9.]+)/g)];
      for (const m of lMatches) cues.push(`l(${m[1]},${m[2]})`);

      if (line.includes("</Stage>") && currentComp) {
        console.log(`[${currentComp}] ${currentComment}`);
        console.log(`  Cues: ${Array.from(new Set(cues)).join(" ")}`);
        currentComp = "";
        currentComment = "";
      }
    }
  }
}

analyze("src/videos/bai-1-moi");
analyze("src/videos/bai-2-moi");
analyze("src/videos/bai-3-moi");
