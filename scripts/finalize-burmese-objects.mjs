import fs from "node:fs";

const path = "client/src/App.tsx";
let source = fs.readFileSync(path, "utf8");
const burmeseStart = source.indexOf("  const burmeseLessonContent");
const extendedStart = source.indexOf("  const extendedLessonContent");
const fallbackStart = source.indexOf("  const burmeseFallback");
if (burmeseStart < 0 || extendedStart < 0 || fallbackStart < 0) throw new Error("Lesson object boundaries not found");
const burmeseEnd = source.indexOf("\n  };", burmeseStart);
const extendedEnd = source.indexOf("\n  };", extendedStart);
if (burmeseEnd < 0 || extendedEnd < 0) throw new Error("Object closing boundaries not found");
let burmese = source.slice(burmeseStart, burmeseEnd);
let extended = source.slice(extendedStart, extendedEnd);
const duplicateStart = extended.indexOf("\n    classes:");
if (duplicateStart >= 0) {
  const block = extended.slice(duplicateStart).trim();
  extended = extended.slice(0, duplicateStart).trimEnd();
  if (!burmese.includes("    classes:")) burmese += "\n" + block;
}
source = source.slice(0, burmeseStart) + burmese + source.slice(burmeseEnd, extendedStart) + extended + source.slice(extendedEnd);
source = source.replace(" ?? englishReferenceContent[slug] ?? extendedLessonContent[slug]", " ?? extendedLessonContent[slug]");
fs.writeFileSync(path, source);
console.log("Moved remaining route-specific Burmese entries into the Burmese object and removed the missing reference.");
