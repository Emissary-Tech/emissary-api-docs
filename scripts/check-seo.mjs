// Fails the build on SEO/AEO regressions that are cheap to catch before publishing:
// missing or duplicated titles and descriptions, and FAQ markup that has drifted from the page.
import fs from "node:fs";
import path from "node:path";
import { loadDocs, ROOT } from "./lib/docs.mjs";

const errors = [];
const warnings = [];

const docs = loadDocs().filter((d) => !d.noindex);
const seen = { title: new Map(), description: new Map() };

for (const d of docs) {
  const { title, description } = d.fm;
  if (!title) errors.push(`${d.rel}: missing title`);
  // API pages are generated from api/openapi.yaml, so a missing description is a warning there.
  if (!description) (d.isApi ? warnings : errors).push(`${d.rel}: missing description`);

  if (!d.isApi) {
    // Titles get " | Emissary" appended; Google truncates around 60 characters.
    if (title && title.length > 58) warnings.push(`${d.rel}: title is ${title.length} chars (aim for 58 or fewer)`);
    if (description && (description.length < 70 || description.length > 160)) {
      warnings.push(`${d.rel}: description is ${description.length} chars (aim for 70-160)`);
    }
    for (const key of ["title", "description"]) {
      const v = d.fm[key];
      if (!v) continue;
      if (seen[key].has(v)) errors.push(`${d.rel}: duplicate ${key}, also used by ${seen[key].get(v)}`);
      else seen[key].set(v, d.rel);
    }
  }

  // Images need real alt text, not file names.
  for (const m of d.body.matchAll(/!\[([^\]]*)\]\(/g)) {
    if (!m[1].trim() || /^[a-z0-9_-]+$/.test(m[1].trim())) {
      warnings.push(`${d.rel}: image alt text "${m[1]}" looks like a file name`);
    }
  }
}

// FAQ markup must list exactly the questions shown on the page.
const faq = docs.find((d) => d.rel === "routing/faq.mdx");
if (faq) {
  const shown = [...faq.body.matchAll(/^### (.+)$/gm)].map((m) => m[1].trim());
  const marked = [...faq.body.matchAll(/"question":\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => JSON.parse(`"${m[1]}"`));
  const plain = (s) => s.replace(/[`*]/g, "").replace(/\s+/g, " ").trim();
  for (const q of shown) {
    if (!marked.includes(plain(q))) errors.push(`routing/faq.mdx: question "${q}" is missing from the FaqSchema block`);
  }
  for (const q of marked) {
    if (!shown.map(plain).includes(q)) errors.push(`routing/faq.mdx: FaqSchema has "${q}" but the page does not`);
  }
}

// The canonical host is built from `url` in the config. A wrong host silently breaks indexing.
const config = fs.readFileSync(path.join(ROOT, "docusaurus.config.ts"), "utf8");
const url = config.match(/^\s*url:\s*"([^"]+)"/m)?.[1];
if (url !== "https://docs.withemissary.com") {
  errors.push(`docusaurus.config.ts: url is ${url}, expected https://docs.withemissary.com`);
}
for (const f of ["static/robots.txt", "static/img/emissary-og.png"]) {
  if (!fs.existsSync(path.join(ROOT, f))) errors.push(`${f} is missing`);
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`error ${e}`);
console.log(`SEO check: ${docs.length} indexable docs, ${errors.length} errors, ${warnings.length} warnings`);
process.exit(errors.length ? 1 : 0);
