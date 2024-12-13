// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import type * as Plugin from "@docusaurus/types/src/plugin";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";

const config: Config = {
  title: "Emissary Docs",
  tagline: "Start your first Fine-Tuning project with Emissary",
  url: "https://docs2.withemissary.com",
  baseUrl: "/",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/emissary.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Emissary", // Usually your GitHub org/user name.
  projectName: "emissary-api-docs", // Usually your repo name.
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          docItemComponent: "@theme/ApiItem", // Derived from docusaurus-theme-openapi
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig:
    {
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: "Emissary",
        logo: {
          alt: "emissary-logo",
          src: "img/emissary.svg",
          srcDark: "img/emissary-white.svg"
        },
        items: [
          {
            type: "doc",
            docId: "home-doc",
            position: "left",
            label: "Docs",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            label: "API",
            position: "left",
            to: "/api",
          },
          {
            href: "https://www.withemissary.com/app",
            label: "Dashboard",
            position: "right",
          },
          {
            href: "https://github.com/Emissary-Tech/emissary-api-docs",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
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
