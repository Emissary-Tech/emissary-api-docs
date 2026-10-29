// Shared helpers for the SEO scripts: walk the docs, parse front matter, resolve URLs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const DOCS_DIR = path.join(ROOT, "docs");
export const SITE_URL = "https://docs.withemissary.com";

export function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return /\.mdx?$/.test(e.name) ? [p] : [];
  });
}

function unquote(v) {
  v = v.trim();
  if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
  if (v.startsWith('"') && v.endsWith('"')) return v.slice(1, -1).replace(/\\"/g, '"');
  return v;
}

/** Parse the flat `key: value` front matter we use. Lists and nested keys are kept as raw text. */
export function parseDoc(file) {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  const fm = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
      if (kv) fm[kv[1]] = unquote(kv[2]);
    }
  }
  const body = m ? raw.slice(m[0].length) : raw;
  const rel = path.relative(DOCS_DIR, file).split(path.sep).join("/");
  return {
    file,
    rel,
    fm,
    body,
    isApi: rel.startsWith("api/"),
    noindex: /<meta\s+name="robots"\s+content="noindex/.test(body),
  };
}

/** The route Docusaurus serves a doc at, without a trailing slash ("" is the site root). */
export function routeFor(doc) {
  const { fm, rel } = doc;
  if (fm.slug) {
    if (fm.slug.startsWith("/")) return fm.slug.replace(/\/$/, "");
    const dir = path.posix.dirname(rel);
    return (dir === "." ? "" : "/" + dir) + "/" + fm.slug;
  }
  const dir = path.posix.dirname(rel);
  const name = fm.id || path.posix.basename(rel).replace(/\.mdx?$/, "").replace(/\.api$/, "");
  return (dir === "." ? "" : "/" + dir) + "/" + name;
}

export function urlFor(doc) {
  return SITE_URL + routeFor(doc);
}

export function loadDocs() {
  return walk(DOCS_DIR).map(parseDoc);
}
