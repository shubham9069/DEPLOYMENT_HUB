const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();
const Redis = require("ioredis");

const publisher = new Redis(process.env.REDIS_SERVICE_URI);
const PROJECT_ID = process.env.PROJECT_ID;
const BLOB_CONTAINER_NAME = "bucket";
var blobServiceClient;
var containerClient;

function publishLog(log) {
  publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ log }));
}

function connect() {
  try {
    const AZURE_STORAGE_CONNECTION_STRING =process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!AZURE_STORAGE_CONNECTION_STRING) {
      throw Error("Azure Storage Connection string not found");
    }

    // Create the BlobServiceClient object with connection string
    blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    containerInstance();
  } catch (err) {
    console.log(err);
  }
}
async function containerInstance() {
  try {
    // Get a reference to a container
    containerClient = blobServiceClient.getContainerClient(BLOB_CONTAINER_NAME);
    console.log(`Container URL: ${containerClient.url}`);
    init();
  } catch (err) {
    console.log(err);
  }
}
async function uploadBlob(filePath, fileName) {
  try {
    const blobName = fileName;

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(
      `${PROJECT_ID}/${blobName}`
    );

    // Display blob name and url
    publishLog(
      `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );
    console.log(
      `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );

    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.uploadFile(filePath, {
      blobHTTPHeaders: { blobContentType: mime.lookup(filePath) },
    });
  } catch (err) {
    console.log(err);
  }
}

async function init() {
  console.log("Executing script.js");
  publishLog("Executing script.js");
  const outDirPath = path.join(__dirname, "output"); // path of project inside container - home/app/output
  console.log(outDirPath);

  const p = exec(`git clone ${process.env.GIT_REPOSITORY_URL} ${outDirPath} && cd ${outDirPath} && ${process.env.NODE_MODULE_CMD} && ${process.env.BUILD_CMD} `); // Terminal CMD

  p.stdout.on("data", function (data) {
    console.log(data.toString());
    publishLog(data.toString());
  });

  p.stdout.on("error", function (data) {
    console.log("Error", data.toString());
    publishLog(`ERRPOR:-${data.toString()}`);
  });

  p.on("close", async function () {
    console.log("Build Complete");
    publishLog("Build Complete");
    const distFolderPath = path.join(outDirPath, process.env.BUILD_FOLDER_NAME);
    const distFolderPathContents = fs.readdirSync(distFolderPath, {
      recursive: true,
    }); //give all the file and folder into /dist
    console.log(distFolderPathContents);

    // check distFolderPathContents doesn't contain a folder beacuse we are going to upload this file into s3 three so s3 will only take file path

    for (const file of distFolderPathContents) {
      const filePath = path.join(distFolderPath, file);
      if (fs.lstatSync(filePath).isDirectory()) continue;

      await uploadBlob(filePath, file);
    }
    console.log("upload successfully");
    publishLog("upload successfully");
    const status = await publisher.quit();
    if (status == "OK") {
      console.log("connection close ");
    }
  });
}
connect();
