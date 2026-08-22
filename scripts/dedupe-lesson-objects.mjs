import fs from "node:fs";

const path = "client/src/App.tsx";
let source = fs.readFileSync(path, "utf8");
const names = ["burmeseLessonContent", "extendedLessonContent"];
for (let i = 0; i < names.length; i++) {
  const start = source.indexOf(`  const ${names[i]}`);
  const nextName = names[i + 1];
  const end = nextName ? source.indexOf(`  const ${nextName}`, start) : source.indexOf("  const burmeseFallback", start);
  if (start < 0 || end < 0) throw new Error(`Could not locate ${names[i]}`);
  const segment = source.slice(start, end);
  const seen = new Set();
  const lines = segment.split("\n");
  const filtered = lines.filter((line, index) => {
    if (index === 0 || !/^\s+(?:"[^"]+"|[a-z0-9-]+):/.test(line)) return true;
    const key = line.trim().split(":", 1)[0];
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  source = source.slice(0, start) + filtered.join("\n") + source.slice(end);
}
fs.writeFileSync(path, source);
console.log("Removed duplicate lesson keys while preserving the first definition in each object.");
