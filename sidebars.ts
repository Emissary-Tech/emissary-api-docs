/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check
import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
  docs: [
      'home-doc',
      {
        type: 'category',
        label: 'Fine-Tuning',
        items: [
            'fine-tuning/datasets',
            'fine-tuning/parameters',
            'fine-tuning/testing',
            'fine-tuning/deployment',
        ],
      },
      {
        type: 'category',
        label: 'Guides',
        items: [
            'guides/data-extraction',
            'guides/classification',
            'guides/embeddings',
            'guides/emissary-classification',
            'guides/finetuning-pdf-docs'
        ]
      }
  ],
  openApiSidebar: [
    {
      type: "category",
      label: "Emissary API",
      link: {
        type: "generated-index",
        title: "Emissary API Specification",
        description:
            "The Emissary API is a RESTful API that provides endpoints for interacting with the Emissary platform.",
        slug: "/api"
      },
      items: require("./docs/api/sidebar.ts")
    }
  ]
};

export default sidebars;