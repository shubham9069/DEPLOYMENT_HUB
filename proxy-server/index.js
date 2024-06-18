const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const PORT = 80;

const BLOB_CONTAINER_NAME = "bucket";
const BASE_PATH = `https://blobdeployment.blob.core.windows.net/${BLOB_CONTAINER_NAME}`;

const proxy = httpProxy.createProxy();


app.use((req, res) => {
  const hostname = req.hostname;
  const subdomain = hostname.split(".")[0];

  // Custom Domain - DB Query

  const resolvesTo = `${BASE_PATH}/${subdomain}`;

  return proxy.web(req, res, { target: resolvesTo, changeOrigin: true });
});

proxy.on("proxyReq", (proxyReq, req, res) => {
  const url = req.url;

  if (url === "/") proxyReq.path += "index.html";
    console.log(proxyReq.path);
});


app.listen(PORT, () => console.log(`Reverse Proxy Running..${PORT}`));
