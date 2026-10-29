// Generates static/llms.txt (an index) and static/llms-full.txt (all prose docs in one file)
// from the docs themselves, so they never drift. Runs automatically before `npm run build`.
import fs from "node:fs";
import path from "node:path";
import { loadDocs, routeFor, urlFor, ROOT, SITE_URL } from "./lib/docs.mjs";

// Reading order for the index. Every indexable non-API doc must appear in exactly one section.
const SECTIONS = [
  ["Overview", ["introduction.mdx", "glossary.mdx"]],
  ["Quickstarts", ["quickstart/router.mdx", "quickstart/llm-as-judge.mdx", "playground/experiments.mdx"]],
  [
    "Model routing",
    [
      "routing/what-is-model-routing.mdx",
      "routing/why-route.mdx",
      "routing/reduce-llm-costs.mdx",
      "routing/get-started.mdx",
      "routing/how-routing-works/decision.mdx",
      "routing/how-routing-works/what-the-router-sees.mdx",
      "routing/how-routing-works/design-space.mdx",
      "routing/how-routing-works/routers-and-gateways.mdx",
      "routing/guides/choose-your-models.mdx",
      "routing/guides/confidence-threshold.mdx",
      "routing/guides/pricing.mdx",
      "routing/guides/migrate-to-new-models.mdx",
      "routing/guides/connect.mdx",
      "routing/guides/monitor-and-debug.mdx",
      "routing/insights.mdx",
      "routing/faq.mdx",
    ],
  ],
  [
    "Comparing and evaluating LLM routers",
    [
      "routing/evaluate/llm-router-comparison.mdx",
      "routing/evaluate/emissary-vs-openrouter.mdx",
      "routing/evaluate/emissary-vs-litellm.mdx",
      "routing/evaluate/emissary-vs-notdiamond.mdx",
      "routing/evaluate/emissary-vs-router-com.mdx",
      "routing/evaluate/run-a-trial.mdx",
      "routing/evaluate/selection-checklist.mdx",
    ],
  ],
  [
    "Post-training",
    [
      "fine-tuning/what-is-post-training.mdx",
      "fine-tuning/quickstart.mdx",
      "fine-tuning/concept.mdx",
      "fine-tuning/datasets.mdx",
      "fine-tuning/parameters.mdx",
    ],
  ],
  [
    "Inference",
    [
      "inference/what-is-llm-inference.mdx",
      "inference/concept.mdx",
      "inference/deployments.mdx",
      "inference/autoscaling.mdx",
    ],
  ],
];

const docs = loadDocs().filter((d) => !d.noindex);
const byRel = new Map(docs.map((d) => [d.rel, d]));
const prose = docs.filter((d) => !d.isApi);

// Guard: fail loudly if a doc was added or removed without updating the index.
const listed = SECTIONS.flatMap(([, rels]) => rels);
for (const rel of listed) {
  if (!byRel.has(rel)) throw new Error(`generate-llms: ${rel} is listed in SECTIONS but is missing or noindex`);
}
for (const d of prose) {
  if (!listed.includes(d.rel)) throw new Error(`generate-llms: ${d.rel} is not listed in SECTIONS in scripts/generate-llms.mjs`);
}

const link = (d) => `- [${d.fm.title}](${urlFor(d)}): ${d.fm.description}`;

const index = [
  "# Emissary Docs",
  "",
  "> Emissary is a platform for LLM model routing, post-training and inference. Route each request to the model best suited to handle it, post-train models of your own, and serve base and fine-tuned models on managed GPU infrastructure.",
  "",
  "Emissary's model router is reached through one gateway URL that is compatible with the OpenAI and Anthropic APIs. Pages are plain prose with short answers first. A single-file version of every page below is at " +
    `${SITE_URL}/llms-full.txt.`,
  "",
  ...SECTIONS.flatMap(([name, rels]) => [`## ${name}`, "", ...rels.map((r) => link(byRel.get(r))), ""]),
  "## API reference",
  "",
  `- [Emissary API reference](${SITE_URL}/api): REST endpoints for projects, datasets, training jobs, inference engines and deployments.`,
  "- [OpenAPI specification](https://raw.githubusercontent.com/Emissary-Tech/emissary-api-docs/refs/heads/main/api/openapi.yaml): machine-readable API definition.",
  "",
  "## Optional",
  "",
  ...docs
    .filter((d) => d.isApi && d.fm.title)
    .sort((a, b) => a.fm.title.localeCompare(b.fm.title))
    .map((d) => `- [${d.fm.title}](${urlFor(d)}): ${d.fm.description || ""}`.trimEnd()),
  "",
].join("\n");

// ---- llms-full.txt: cleaned markdown of every prose page ----

const routeToUrl = new Map(prose.map((d) => [routeFor(d), urlFor(d)]));

function resolveLink(from, href) {
  if (/^(https?:|mailto:|#)/.test(href)) return href;
  const [target, hash] = href.split("#");
  let route;
  if (target.startsWith("/")) {
    route = target.replace(/\/$/, "");
  } else {
    const abs = path.posix.normalize(path.posix.join(path.posix.dirname(from.rel), target));
    const doc = prose.find((p) => p.rel.replace(/\.mdx?$/, "") === abs.replace(/\.mdx?$/, ""));
    route = doc ? routeFor(doc) : "/" + abs;
  }
  return (routeToUrl.get(route) ?? SITE_URL + route) + (hash ? "#" + hash : "");
}

function clean(d) {
  let t = d.body;
  t = t.replace(/^import .*$/gm, "");
  t = t.replace(/<FaqSchema[\s\S]*?\/>\s*$/m, ""); // multi-line JSON-LD block
  t = t.replace(/<FaqSchema[\s\S]*?\} \/>/g, "");
  t = t.replace(/<Head>[\s\S]*?<\/Head>/g, "");
  t = t.replace(/<RunnableCurl[^>]*\/>/g, "");
  t = t.replace(/\{\/\*[\s\S]*?\*\/\}/g, "");
  t = t.replace(/<\/?(div|Tabs|TabItem|details|summary)[^>]*>/g, "");
  t = t.replace(/^:::\w*.*$/gm, "").replace(/^:::$/gm, "");
  t = t.replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/<img [^>]*>/g, "");
  t = t.replace(/\s*\{#[\w-]+\}\s*$/gm, "");
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text, href) => `[${text}](${resolveLink(d, href)})`);
  return t.replace(/^[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}

const full = [
  "# Emissary Docs (full text)",
  "",
  "> The prose documentation for Emissary, a platform for LLM model routing, post-training and inference. See " +
    `${SITE_URL}/llms.txt for the index.`,
  "",
  ...SECTIONS.flatMap(([, rels]) =>
    rels.map((r) => {
      const d = byRel.get(r);
      return `\n---\n\n# ${d.fm.title}\n\nSource: ${urlFor(d)}\n\n${clean(d)}\n`;
    }),
  ),
].join("\n");

fs.writeFileSync(path.join(ROOT, "static/llms.txt"), index);
fs.writeFileSync(path.join(ROOT, "static/llms-full.txt"), full);
console.log(
  `llms.txt: ${prose.length} pages + ${docs.length - prose.length} API pages. llms-full.txt: ${(full.length / 1024).toFixed(0)} KB`,
);
