import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "emissary-api/emissary-openapi-3-1",
    },
    {
      type: "category",
      label: "Base Model",
      link: {
        type: "doc",
        id: "emissary-api/base-model",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/list-base-models",
          label: "List of Base Models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-base-model-by-name",
          label: "Retrieve a base model",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Project",
      link: {
        type: "doc",
        id: "emissary-api/project",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/create-project",
          label: "Create a new project",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-projects",
          label: "List of Projects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-project-by-id",
          label: "Retrieve a project by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-project-by-id",
          label: "Delete a project by ID",
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
          label: "Create a new Dataset",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-datasets",
          label: "List of Datasets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-dataset-by-id",
          label: "Retrieve a dataset by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-dataset-by-id",
          label: "Delete a dataset by ID",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Training Job",
      link: {
        type: "doc",
        id: "emissary-api/training-job",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/create-training-job",
          label: "Create a new Training Job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-training-jobs",
          label: "List of Training Jobs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-training-job-by-id",
          label: "Retrieve a training job by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-training-job-by-id",
          label: "Delete a training job by ID",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "emissary-api/cancel-training-job-by-id",
          label: "Cancel a training job by ID",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-checkpoints",
          label: "List of Checkpoints",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Deployment",
      link: {
        type: "doc",
        id: "emissary-api/deployment",
      },
      items: [
        {
          type: "doc",
          id: "emissary-api/create-deployment",
          label: "Create a new Deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/list-deployments",
          label: "List of Deployments",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/retrieve-deployment-by-id",
          label: "Retrieve a deployment by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "emissary-api/delete-deployment-by-id",
          label: "Delete a deployment by ID",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "emissary-api/cancel-deployment-by-id",
          label: "Cancel a deployment by ID",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-completions-from-deployment",
          label: "Get Completions from a Deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-chat-completions-from-deployment",
          label: "Get Chat Completions from a Deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-embeddings-from-deployment",
          label: "Get Embeddings from a Deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "emissary-api/get-classification-from-deployment",
          label: "Get Classification from a Deployment",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
