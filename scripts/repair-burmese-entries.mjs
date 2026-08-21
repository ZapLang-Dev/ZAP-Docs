import fs from "node:fs";

const path = "client/src/App.tsx";
let source = fs.readFileSync(path, "utf8");
const englishStart = source.indexOf("    classes: {");
const burmeseStartBefore = source.indexOf("  const burmeseLessonContent");
const englishEnd = source.indexOf("\n  };\n  const burmeseLessonContent", englishStart);
if (englishStart < 0 || englishEnd < 0 || englishStart > burmeseStartBefore) {
  throw new Error("Could not locate misplaced Burmese entry block");
}
const block = source.slice(englishStart, englishEnd).trim();
source = source.slice(0, englishStart) + source.slice(englishEnd);
const burmeseStart = source.indexOf("  const burmeseLessonContent");
const burmeseEnd = source.indexOf("\n  };", burmeseStart);
if (burmeseStart < 0 || burmeseEnd < 0) {
  throw new Error("Could not locate Burmese lesson object closing boundary");
}
if (!source.includes("    classes: {", burmeseStart)) {
  source = source.slice(0, burmeseEnd) + "\n" + block + source.slice(burmeseEnd);
}
fs.writeFileSync(path, source);
console.log("Moved route-specific Burmese entries into burmeseLessonContent.");
