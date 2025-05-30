import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/emissary-api",
    },
    {
      type: "category",
      label: "Projects",
      items: [
        {
          type: "doc",
          id: "api/create-project",
          label: "Create project",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-projects",
          label: "List projects",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/retrieve-project-by-id",
          label: "Retrieve project",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-project-by-id",
          label: "Delete project",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Datasets",
      items: [
        {
          type: "doc",
          id: "api/create-dataset",
          label: "Upload dataset",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-datasets",
          label: "List datasets",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/retrieve-dataset-by-id",
          label: "Retrieve dataset",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-dataset-by-id",
          label: "Delete dataset",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Training Jobs",
      items: [
        {
          type: "doc",
          id: "api/create-training-job",
          label: "Create SFT training job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/create-grpo-training-job",
          label: "Create GRPO training job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-training-jobs",
          label: "List training jobs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/retrieve-training-job-by-id",
          label: "Retrieve training job",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-training-job-by-id",
          label: "Delete training job",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/cancel-training-job-by-id",
          label: "Cancel training job",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-checkpoints",
          label: "List checkpoints",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Deployments",
      items: [
        {
          type: "doc",
          id: "api/create-deployment",
          label: "Create deployment",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-deployments",
          label: "List deployments",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/retrieve-deployment-by-id",
          label: "Retrieve deployment",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/delete-deployment-by-id",
          label: "Delete deployment",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/cancel-deployment-by-id",
          label: "Cancel deployment",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Inference",
      items: [
        {
          type: "doc",
          id: "api/get-completions-from-deployment",
          label: "Completions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-chat-completions",
          label: "Chat Completions",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-embeddings-from-deployment",
          label: "Embeddings",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/get-classification-from-deployment",
          label: "Classification",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Base Models",
      items: [
        {
          type: "doc",
          id: "api/list-base-models",
          label: "List base models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/retrieve-base-model-by-name",
          label: "Retrieve base model",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Testing Functions",
      items: [
        {
          type: "doc",
          id: "api/list-test-functions",
          label: "List Testing Functions",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/schemas/completionobject",
          label: "CompletionObject",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/chatcompletionobject",
          label: "ChatCompletionObject",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/basemodelsummary",
          label: "BaseModelSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/projectsummary",
          label: "ProjectSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/projectdetail",
          label: "ProjectDetail",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/datasetsummary",
          label: "DatasetSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/datasetdetail",
          label: "DatasetDetail",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/testingfunctionsummary",
          label: "TestingFunctionSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/trainingjobsummary",
          label: "TrainingJobSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/trainingjobdetail",
          label: "TrainingJobDetail",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/trainingjobcheckpoint",
          label: "TrainingJobCheckpoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/deploymentsummary",
          label: "DeploymentSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/deploymentdetail",
          label: "DeploymentDetail",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/apiresponse",
          label: "ApiResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/apierrorinvalidinput",
          label: "ApiErrorInvalidInput",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/apierrornotfound",
          label: "ApiErrorNotFound",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/schemas/apierrorunauthorized",
          label: "ApiErrorUnauthorized",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
