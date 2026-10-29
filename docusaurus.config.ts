// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "Emissary",
  tagline: "LLM model routing, post-training and inference",
  // Must be the host the docs are actually served from: canonical URLs,
  // og:url and the sitemap are all built from it.
  url: "https://docs.withemissary.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  favicon: "img/emissary.svg",

  headTags: [
    {
      tagName: "script",
      attributes: { type: "application/ld+json" },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Emissary",
        url: "https://www.withemissary.com",
        logo: "https://docs.withemissary.com/img/emissary.svg",
        description:
          "Emissary is a platform for LLM model routing, post-training and inference.",
        sameAs: [
          "https://x.com/withemissary",
          "https://www.linkedin.com/company/withemissary/",
        ],
      }),
    },
    {
      tagName: "script",
      attributes: { type: "application/ld+json" },
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Emissary Docs",
        url: "https://docs.withemissary.com",
        inLanguage: "en",
        publisher: { "@type": "Organization", name: "Emissary" },
      }),
    },
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Emissary", // Usually your GitHub org/user name.
  projectName: "emissary-api-docs", // Usually your repo name.
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          routeBasePath: "/",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
          // Shows "Last updated" on each page and feeds dateModified / sitemap lastmod.
          // Needs full git history at build time (no shallow clone).
          showLastUpdateTime: true,
        },
        blog: false,
        sitemap: {
          lastmod: "date",
          changefreq: null,
          priority: null,
          // Pages marked noindex are dropped automatically. These unreviewed pages are listed as
          // well; remove their entries here when you restore the pages and drop their noindex tag.
          ignorePatterns: ["/tags/**", "/guides/**", "/fine-tuning/testing"],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig:
    {
      // Default social card for pages that don't set their own `image`.
      image: "img/emissary-og.png",
      metadata: [
        { name: "twitter:card", content: "summary_large_image" },
        // Allow full snippets and large previews in search and AI answers.
        {
          name: "robots",
          content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
        },
      ],
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      navbar: {
        title: "Emissary",
        logo: {
          alt: "Emissary logo",
          src: "img/emissary.svg",
          srcDark: "img/emissary-white.svg"
        },
        items: [
          {
            type: "doc",
            docId: "home-doc",
            position: "left",
            label: "Documentation",
          },
          {
            type: "doc",
            docId: "routing/what-is-model-routing",
            position: "left",
            label: "Model Routing",
          },
          {
            type: "doc",
            docId: "fine-tuning/what-is-post-training",
            position: "left",
            label: "Post-training",
          },
          {
            type: "doc",
            docId: "inference/what-is-llm-inference",
            position: "left",
            label: "Inference",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            label: "API Reference",
            position: "left",
            to: "/api",
          },
          {
            href: "https://www.withemissary.com/app",
            label: "Dashboard",
            position: "right",
          },
          // {
          //   href: "https://github.com/Emissary-Tech/emissary-api-docs",
          //   label: "GitHub",
          //   position: "right",
          // },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              { label: "Model routing", to: "/routing/what-is-model-routing" },
              { label: "Post-training", to: "/fine-tuning/what-is-post-training" },
              { label: "Inference", to: "/inference/what-is-llm-inference" },
              { label: "API reference", to: "/api" },
              { label: "Glossary", to: "/glossary" },
              { label: "llms.txt", href: "https://docs.withemissary.com/llms.txt" },
            ],
          },
          {
            title: "Follow Us",
            items: [
              {
                label: "Twitter",
                href: "https://x.com/withemissary",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/withemissary/",
              }
            ]
          },
          {
            title: "Company",
            items: [
              {
                label: "About",
                href: "https://www.withemissary.com/about-us",
              },
              {
                label: "Careers",
                href: "https://www.withemissary.com/careers",
              }
            ]
          },
          {
            title: "Resources",
            items: [
              {
                label: "Product",
                href: "https://www.withemissary.com/#infrastructure",
              },
              {
                label: "Resources",
                href: "https://www.withemissary.com/resources",
              },
              {
                label: "Documentation",
                to: "/"
              }
            ]
          },
          {
            title: "Legal",
            items: [
              {
                label: "Privacy Policy",
                href: "https://www.withemissary.com/privacy-policy",
              },
              {
                label: "Terms of Service",
                href: "https://www.withemissary.com/terms-of-service",
              }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Emissary, Inc. Built with Docusaurus.`,
      },
      languageTabs: [
        {
          highlight: "python",
          language: "python",
          logoClass: "python",
        },
        {
          highlight: "bash",
          language: "curl",
          logoClass: "curl",
        },
        // {
        //   highlight: "csharp",
        //   language: "csharp",
        //   logoClass: "csharp",
        // },
        {
          highlight: "go",
          language: "go",
          logoClass: "go",
        },
        {
          highlight: "javascript",
          language: "nodejs",
          logoClass: "nodejs",
        },
        {
          highlight: "ruby",
          language: "ruby",
          logoClass: "ruby",
        },
        // {
        //   highlight: "php",
        //   language: "php",
        //   logoClass: "php",
        // },
        {
          highlight: "java",
          language: "java",
          logoClass: "java",
          variant: "unirest",
        },
        {
          highlight: "powershell",
          language: "powershell",
          logoClass: "powershell",
        },
      ],
    } satisfies Preset.ThemeConfig,

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          emissary: {
            specPath: "api/openapi.yaml",
            outputDir: "docs/api",
            hideSendButton: true,
            downloadUrl:
              "https://raw.githubusercontent.com/Emissary-Tech/emissary-api-docs/refs/heads/main/api/openapi.yaml",
            sidebarOptions: {
              groupPathsBy: "tag",
            },
            showSchemas: true,
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
  ],
  themes: ["docusaurus-theme-openapi-docs"],
};

export default async function createConfig() {
  return config;
}
