# SEO and AEO changes (branch `aeo`)

This file is for people working on the docs repo. It is excluded from the published site, the
sitemap and `llms.txt`. Delete it once the branch has merged and the notes are no longer useful.

Goal: make the docs surface in search engines (SEO) and in AI answer engines such as ChatGPT, Claude,
Perplexity and Google AI Overviews (AEO), especially for questions about model routing,
post-training and inference.

## Problems found

- **Wrong canonical host.** The config used `docs2.withemissary.com`, which does not resolve. The docs
  are served from `docs.withemissary.com`, but every canonical URL, `og:url` and sitemap entry pointed
  at the dead host.
- **No `robots.txt` or `llms.txt`, no social image, no sitemap `lastmod`.** The sitemap also listed the
  Docusaurus tutorial pages, `/markdown-page` and a `test` tag page.
- **Generic titles and descriptions.** Titles like "FAQ", "Get started" and "Concepts", and 16 pages
  with no description, so some fell back to text like "Overview" or "1. Objective".
- **No answer-first pages.** Nothing defined "model routing", "post-training" or "LLM inference" up
  front, and few headings were phrased as questions.
- **Thin keyword coverage and inconsistent terms.** "Post Training" in the sidebar, `/fine-tuning/` in
  URLs, and no mention of "LLM router" at all.
- **Unreviewed pages indexed.** Ten task guides and a testing page were hidden from the sidebar but
  still published and in the sitemap.

## What changed

### Crawlability and metadata

- `url` in `docusaurus.config.ts` is now `https://docs.withemissary.com`. `check:seo` fails the build
  if it changes.
- Added `static/robots.txt` with a sitemap line and explicit allows for the main AI crawlers.
- Added `static/llms.txt` (index) and `static/llms-full.txt` (all prose pages), both generated from the
  docs on every build.
- Added a 1200x630 social image (`static/img/emissary-og.png`), `twitter:card`, and a robots meta that
  allows full snippets and large image previews.
- Turned on `showLastUpdateTime`: pages show "Last updated", and `dateModified` and sitemap `lastmod`
  come from git history. This needs full git history at build time, so no shallow clones.
- Removed the Docusaurus template pages (tutorials, `intro`, `markdown-page`) and their images.
- Site title is now "Emissary" so the title suffix is short, and the tagline names routing.
- Fixed `sidebars.js` to `sidebars.ts` in the config.

### Titles and descriptions

Rewrote `title`, `sidebar_label` and `description` on all 37 indexable non-API pages. Titles are 58
characters or fewer, descriptions are 70 to 160, and every one is unique.

### New content

| Page | Purpose |
| --- | --- |
| `routing/what-is-model-routing` | Definition-first pillar page, with FAQ markup |
| `routing/reduce-llm-costs` | Where LLM cost comes from and how routing lowers it |
| `routing/evaluate/llm-router-comparison` | Emissary vs OpenRouter, LiteLLM, Not Diamond and Router.com |
| `fine-tuning/what-is-post-training` | Post-training, SFT, GRPO and LoRA explained |
| `inference/what-is-llm-inference` | Engines, deployments and autoscaling explained |
| `glossary` | One-page glossary of routing, post-training and inference terms |

The home page was rewritten around the three product areas. The routing FAQ is now visible question
headings (it was collapsed `<details>`) with six new basics questions. Key headings are phrased as
questions, with `{#old-id}` anchors kept so existing links still work. Concept pages link to routing,
and the four comparison pages link to the new hub.

### Structured data

- Organization and WebSite JSON-LD on every page.
- FAQPage markup through `src/components/FaqSchema`, on the FAQ, home and "What is" pages.
- TechArticle markup on every doc through `src/theme/DocItem/Metadata`.
- Breadcrumbs are unchanged.

### Navigation and links

- Sidebar: "Post-training" (was "Post Training"), new pages added, and a "Compare and evaluate"
  section. The Model Routing, Post-training and Inference category labels link to their "What is"
  pages.
- Navbar and footer link to the three product areas, the API reference, the glossary and `llms.txt`.
- Fixed two broken internal links (`inference/deployments`, and four guides).
- Descriptive alt text on the quickstart and router screenshots, and a fix for one malformed image tag.

### Pages hidden until reviewed

`docs/guides/*` and `docs/fine-tuning/testing.mdx` are `noindex` and listed in `sitemap.ignorePatterns`.
They looked out of date and haven't been checked against the current product. To bring one back, add it
to `sidebars.ts`, remove its `noindex` tag, and remove its `ignorePatterns` entry.

### Tooling

- `scripts/check-seo.mjs` runs before every build. It fails on missing or duplicate titles and
  descriptions, FAQ markup that no longer matches the page, and a wrong site `url`. It warns on length
  and on file-name alt text.
- `scripts/generate-llms.mjs` runs before every build and fails if a page is missing from its
  `SECTIONS` list.
- `CONTRIBUTING.md` has an authoring checklist for search and AI answers.

## Not done

- **API operation descriptions are still thin** (for example "Returns a list of projects."). They come
  from `api/openapi.yaml`. `gen-api-docs` ran without writing any files here, so the YAML was left
  unchanged. Eight generated schema pages have no description at all.
- **FAQ answers are duplicated by hand** in the `FaqSchema` blocks. `check:seo` verifies the questions
  match the page but not the answer text.
- **Off-site work.** Link `docs.withemissary.com` from `www.withemissary.com`, and submit the sitemap
  in Google Search Console and Bing Webmaster Tools.
- **`decision_lm` docs are not on this branch.** Add them to `SECTIONS` in `scripts/generate-llms.mjs`
  and to `sidebars.ts` when they merge.
- **Content claims** (30-50% savings, ~60% deflection, ~100 ms) come from the existing `why-route`
  page. Review the new pages for tone and accuracy before publishing.
