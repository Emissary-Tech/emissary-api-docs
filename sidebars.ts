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
          label: 'Quickstart',
          collapsed: false,
          items: [
              'quickstart/llm-as-judge',
              'quickstart/router',
          ],
      },
      {
        type: 'category',
        label: 'Model Routing',
        items: [
            'routing/why-route',
            'routing/get-started',
            {
              type: 'category',
              label: 'How routing works',
              items: [
                  'routing/how-routing-works/decision',
                  'routing/how-routing-works/what-the-router-sees',
                  'routing/how-routing-works/design-space',
                  'routing/how-routing-works/routers-and-gateways',
              ],
            },
            {
              type: 'category',
              label: 'Guides',
              items: [
                  'routing/guides/choose-your-models',
                  'routing/guides/confidence-threshold',
                  'routing/guides/pricing',
                  'routing/guides/migrate-to-new-models',
                  'routing/guides/connect',
                  'routing/guides/monitor-and-debug',
              ],
            },
            'routing/insights',
            {
              type: 'category',
              label: 'Evaluate Emissary',
              items: [
                  'routing/evaluate/emissary-vs-router-com',
                  'routing/evaluate/emissary-vs-litellm',
                  'routing/evaluate/emissary-vs-notdiamond',
                  'routing/evaluate/emissary-vs-openrouter',
                  'routing/evaluate/run-a-trial',
                  'routing/evaluate/selection-checklist',
              ],
            },
            'routing/faq',
        ],
      },
      {
        type: 'category',
        label: 'Post Training',
        items: [
            'fine-tuning/quickstart',
            'fine-tuning/concept',
            'fine-tuning/datasets',
            'fine-tuning/parameters'
        ],
      },
      {
        type: 'category',
        label: 'Inference',
        items: [
            'inference/concept',
            'inference/deployments',
            'inference/autoscaling'
            // {
            //   type: 'category',
            //   label: 'Integration',
            //   items: [
            //       'inference/integration/classification'
            //   ]
            // }
        ]
      },
      {
        type: 'category',
        label: 'Playground',
        items: [
            'playground/experiments'
        ]
      },
      // {
      //   type: 'category',
      //   label: 'Guides',
      //   items: [
      //       'guides/emissary-classification',
      //       'guides/emissary-regression',
      //       'guides/text-generation',
      //       'guides/ner',
      //       'guides/clip-classification',
      //       'guides/clip-embedding',
      //   ]
      // }
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