const axios = require("axios");

const CONTAINER_JOB_NAME = "builder-server-job";
const RESOURCE_GROUPS = "Azure-machine1_group";
const IMAGE_NAME = "deploymentcr.azurecr.io/builder-server:latest";
const CONTAINER_NAME = "builder-server-container";

async function containerBuilderServerJob(gitURL, projectSlug,ACCESS_TOKEN) {
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
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    return res;
  } catch (err){
    if (err.response.data.error.code == "ExpiredAuthenticationToken")return { message: "ExpiredAuthenticationToken" };
    throw new Error(err) 
  }
}

async function genrateAccessToken() {
  
  try{
  const res = await axios.post(
    `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
    {
      client_id: process.env.AZURE_CLIENT_ID,
      grant_type: "client_credentials",
      AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET,
      scope: "https://management.azure.com/.default",
    },

    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  
  return res
}catch(err){
console.log(err.response.data);
throw new Error(err);
}
}

module.exports = { containerBuilderServerJob, genrateAccessToken };
