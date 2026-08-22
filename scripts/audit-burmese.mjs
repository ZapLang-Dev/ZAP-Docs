import fs from "node:fs";

const source = fs.readFileSync("client/src/App.tsx", "utf8");
const sectionsPart = source.slice(source.indexOf("const sections"), source.indexOf("const allDocs"));
const allSlugs = [...sectionsPart.matchAll(/\[\s*["'`]([^"'`]+)["'`]\s*,\s*["'`]([^"'`]+)["'`]\s*\]/g)].map((match) => match[2]);
const burmesePart = source.slice(source.indexOf("const burmeseLessonContent"), source.indexOf("const burmeseFallback"));
const burmeseSlugs = [...burmesePart.matchAll(/^\s*(?:["']([^"']+)["']|([a-z0-9-]+))\s*:/gm)].map((match) => match[1] ?? match[2]);
const missing = allSlugs.filter((slug) => !burmeseSlugs.includes(slug));
const extra = burmeseSlugs.filter((slug) => !allSlugs.includes(slug));
const report = [
  "# Burmese translation gap audit",
  "",
  `- All lesson routes: ${allSlugs.length}`,
  `- Burmese-specific lesson entries: ${burmeseSlugs.length}`,
  `- Routes using Burmese fallback: ${missing.length}`,
  `- Orphan Burmese entries: ${extra.length}`,
  "",
  "## Missing Burmese-specific entries",
  ...(missing.length ? missing.map((slug) => `- ${slug}`) : ["- None"]),
  "",
  "## Orphan Burmese entries",
  ...(extra.length ? extra.map((slug) => `- ${slug}`) : ["- None"]),
  "",
  "## Interpretation",
  "Routes listed as missing are not necessarily broken: they use the generic Burmese fallback. They are the priority candidates for replacing generic content with official, route-specific Burmese explanations, examples, exercises, and quizzes."
].join("\n");
fs.writeFileSync("burmese-translation-audit.md", report + "\n");
console.log(report);
