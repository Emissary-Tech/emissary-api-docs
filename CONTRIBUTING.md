# How to contribute

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

It's people like you that make security open source such a force in preventing
successful cyber-attacks. Following these guidelines helps keep the project
maintainable, easy to contribute to, and more secure. Thank you for taking the
time to follow this guide.

## Where to start

There are many ways to contribute. You can fix a bug, improve the documentation,
submit bug reports and feature requests, or take a first shot at a feature you
need for yourself.

Pull requests are necessary for all contributions of code or documentation.

## New to open source?

If you're **new to open source** and not sure what a pull request is, welcome!!
We're glad to have you! All of us once had a contribution to make and didn't
know where to start.

Even if you don't write code for your job, don't worry, the skills you learn
during your first contribution to open source can be applied in so many ways,
you'll wonder what you ever did before you had this knowledge. It's worth
learning.

[Learn how to make a pull request](https://github.com/PaloAltoNetworks/.github/blob/master/Learn-GitHub.md#learn-how-to-make-a-pull-request)

## Fixing a typo, or a one or two line fix

Many fixes require little effort or review, such as:

> - Spelling / grammar, typos, white space and formatting changes
> - Comment clean up
> - Change logging messages or debugging output

These small changes can be made directly in GitHub if you like.

Click the pencil icon in GitHub above the file to edit the file directly in
GitHub. This will automatically create a fork and pull request with the change.
See:
[Make a small change with a Pull Request](https://www.freecodecamp.org/news/how-to-make-your-first-pull-request-on-github/)

## Bug fixes and features

For something that is bigger than a one or two line fix, go through the process
of making a fork and pull request yourself:

> 1. Create your own fork of the code
> 2. Clone the fork locally
> 3. Make the changes in your local clone
> 4. Push the changes from local to your fork
> 5. Create a pull request to pull the changes from your fork back into the
>    upstream repository

Please use clear commit messages so we can understand what each commit does.
We'll review every PR and might offer feedback or request changes before
merging.

## Writing docs for search and AI answers

The docs are read by people, search engines and AI assistants (ChatGPT, Claude, Perplexity, Google AI
Overviews). The same habits help all three. `npm run build` runs `npm run check:seo` first and fails on
the mistakes below.

**Every page**

- Set a `title` of 58 characters or fewer that says what the page is about, not just where it sits
  ("Confidence threshold: quality vs cost in routing", not "Settings"). Use `sidebar_label` for the
  short name shown in the sidebar.
- Set a `description` of 70 to 160 characters that stands on its own as the search snippet. Every title
  and description must be unique.
- Open with the answer. The first one or two sentences should define the thing or state the
  conclusion, so they can be quoted without the rest of the page.
- Phrase headings as the questions people ask ("How does model routing work?") where that reads
  naturally. If you rename a heading that other pages link to, keep the old anchor with `{#old-id}`.
- Keep one idea per section, with short paragraphs, lists and tables. A section should make sense
  when read on its own.
- Use the terms people search for: "model routing" and "LLM router", "post-training" and
  "fine-tuning", "LLM inference". Define a term the first time you use it, and link to the
  [glossary](docs/glossary.mdx).
- Write alt text that describes the screenshot, never a file name.
- Link to related pages in the body with descriptive link text, not "click here".
- State numbers with their conditions, and say when a figure is typical rather than guaranteed.

**FAQ markup.** `routing/faq.mdx`, the home page and the "What is ..." pages emit FAQPage structured
data through `<FaqSchema items={[...]} />`. The questions and answers there must match what the page
shows. `check:seo` verifies this for the FAQ.

**New pages.** Add the page to `sidebars.ts` and to `SECTIONS` in `scripts/generate-llms.mjs`, which
builds `llms.txt` and `llms-full.txt`. The build tells you if a page is missing from either.

**Pages that aren't ready.** Add `<Head><meta name="robots" content="noindex" /></Head>` (with
`import Head from '@docusaurus/Head'`) and an entry in `sitemap.ignorePatterns` in
`docusaurus.config.ts`. The task guides in `docs/guides` and `docs/fine-tuning/testing.mdx` are
hidden this way until they are reviewed against the current product.

**Hosting.** `url` in `docusaurus.config.ts` must be the host the docs are served from, because
canonical URLs, `og:url` and the sitemap are built from it. "Last updated" dates and sitemap `lastmod`
come from git history, so build with full history (no shallow clone).
