const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const mime = require("mime-types");
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();



const PROJECT_ID = process.env.PROJECT_ID;
const BLOB_CONTAINER_NAME = "bucket";
var blobServiceClient;
var containerClient;

function connect() {
  try {
    const AZURE_STORAGE_CONNECTION_STRING =
      process.env.AZURE_STORAGE_CONNECTION_STRING;

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
    console.log(
      `Container URL: ${containerClient.url}`
    );
    init()
  } catch (err) {
    console.log(err);
  }
}
async function uploadBlob(filePath,fileName){
  try{
    const blobName = fileName

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(`${PROJECT_ID}/${blobName}`);

    // Display blob name and url
    console.log(
      `\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
    );

    // Upload data to the blob
    const uploadBlobResponse = await blockBlobClient.uploadFile(filePath, {
      blobHTTPHeaders: { blobContentType: mime.lookup(filePath) },
    });
 

  }catch(err){
    console.log(err);
  }

}

async function init() {
  console.log("Executing script.js");
  const outDirPath = path.join(__dirname,"output"); // path of project inside container - home/app/output
  console.log(outDirPath)

  const p = exec(` cd ${outDirPath} && npm install && npm run build `); // Terminal CMD

  p.stdout.on("data", function (data) {
    console.log(data.toString());
  });

  p.stdout.on("error", function (data) {
    console.log("Error", data.toString());
  });

  p.on("close", async function () {
    console.log("Build Complete");
    const distFolderPath = path.join(outDirPath, "build");
    const distFolderPathContents = fs.readdirSync(distFolderPath, {
      recursive: true,
    }); //give all the file and folder into /dist
    console.log(distFolderPathContents)

    // check distFolderPathContents doesn't contain a folder beacuse we are going to upload this file into s3 three so s3 will only take file path

    for (const file of distFolderPathContents) {
      const filePath = path.join(distFolderPath,file)
      if (fs.lstatSync(filePath).isDirectory()) continue;

      await uploadBlob(filePath,file)
    }
    console.log('upload successfully')
  });
}
connect();
