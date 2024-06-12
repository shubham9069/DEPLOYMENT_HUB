const axios = require("axios");

const CONTAINER_JOB_NAME = "builder-server-job";
const RESOURCE_GROUPS = "Azure-machine1_group";
const IMAGE_NAME = "deploymentcr.azurecr.io/builder-server:latest";
const CONTAINER_NAME = "builder-server-container";


async function containerBuilderServerJob(gitURL, projectSlug) {
  try {
    const res = await axios.post(
      ` https://management.azure.com/subscriptions/${process.env.AZURE_SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUPS}/providers/Microsoft.App/jobs/${CONTAINER_JOB_NAME}/start?api-version=2023-05-01`,
      {
        containers: [
          {
            command: [],
            env: [
              {
                name: "AZURE_STORAGE_CONNECTION_STRING",
                value: process.env.AZURE_STORAGE_CONNECTION_STRING,
              },
              {
                name: "PROJECT_ID",
                value: projectSlug,
              },
              {
                name: "GIT_REPOSITORY_URL",
                value: gitURL,
              },
              {
                name: "REDIS_SERVICE_URI",
                value: process.env.REDIS_SERVICE_URI,
              },
            ],
            image: IMAGE_NAME,
            name: CONTAINER_NAME,
            probes: [],
            resources: {
              cpu: 2,
              memory: "4Gi",
            },
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err.response.data)
    throw new Error(err);
  }
}

async function genrateAccessToken(){

}

module.exports = { containerBuilderServerJob };
