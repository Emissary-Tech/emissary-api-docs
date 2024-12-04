import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "emissary-api/emissary-openapi-3-1",
    },
    {
      type: "category",
      label: "Base Models",
      link: {
        type: "doc",
        id: "emissary-api/base-models",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/list-base-models",
          label: "List base models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-base-model-by-name",
          label: "Retrieve base model",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Projects",
      link: {
        type: "doc",
        id: "emissary-api/projects",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/create-project",
          label: "Create project",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-projects",
          label: "List projects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-project-by-id",
          label: "Retrieve project",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-project-by-id",
          label: "Delete project",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Dataset",
      link: {
        type: "doc",
        id: "emissary-api/dataset",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/create-dataset",
          label: "Upload dataset",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-datasets",
          label: "List datasets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-dataset-by-id",
          label: "Retrieve dataset",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-dataset-by-id",
          label: "Delete dataset",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Training Jobs",
      link: {
        type: "doc",
        id: "emissary-api/training-jobs",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/create-training-job",
          label: "Create training job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-training-jobs",
          label: "List training jobs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-training-job-by-id",
          label: "Retrieve training job",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-training-job-by-id",
          label: "Delete training job",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "emissary-api/cancel-training-job-by-id",
          label: "Cancel training job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-checkpoints",
          label: "List checkpoints",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Deployments",
      link: {
        type: "doc",
        id: "emissary-api/deployments",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/create-deployment",
          label: "Create deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-deployments",
          label: "List deployments",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-deployment-by-id",
          label: "Retrieve deployment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-deployment-by-id",
          label: "Delete deployment",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "emissary-api/cancel-deployment-by-id",
          label: "Cancel deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-completions-from-deployment",
          label: "Completions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-chat-completions-from-deployment",
          label: "Chat Completion",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-embeddings-from-deployment",
          label: "Embeddings",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-classification-from-deployment",
          label: "Classification",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
