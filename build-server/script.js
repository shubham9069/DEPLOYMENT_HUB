const {exec} = require('child_process');
const path = require('path');
const fs = require('fs');

async function init(){
  console.log("Executing script.js");
  const outDirPath = path.join(__dirname, "output"); // path of project inside container - home/app/output

  const p = exec(` cd ${outDirPath} && npm install && npm run build `); // Terminal CMD

  p.stdout.on('data', function(data){
    console.log(data.toString());

  })

  p.stdout.on('error', function(data){
    console.log("Error",data.toString());

  })

  p.on('close', function(){
    console.log("Build Complete");
    const distFolderPath = path.join(__dirname, "output", "dist");
    const distFolderPathContents = fs.readFileSync(distFolderPath, {
      recursive: true,
    }); //give all the file and folder into /dist

    // check distFolderPathContents doesn't contain a folder beacuse we are going to upload this file into s3 three so s3 will only take file path 

    for (const filePath of distFolderPathContents){
        if(fs.lstatSync(filePath).isDirectory()) continue;
    }
  })
}

