# DEPLOYMENT HUB 

Developing a new project similar to Vercel that enables one-click deployment of applications. This platform stands out by allowing users to deploy both Python and Node.js and React.js projects effortlessly.eliminates the need for setting up and building new machines. With this platform, developers can deploy their code into production with just one click, simplifying the deployment process and accelerating the time to market.

  ### Prerequisite
- Node.JS
- Redis
- Docker:
- AZURE ACR,ACI,ACA,BLOB STORAGE,
-   AZURE_SUBSCRIPTION_ID,
    AZURE_TENANT_ID,
    ACCESS_TOKEN,(microsoft)
    AZURE_STORAGE_CONNECTION_STRING,
    REDIS_SERVICE_URI,
    AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET,
    MONGOO_URI,
    GIT_CLIENT_ID,(github oAuth 2.0)
    GIT_CLIENT_SECRET (github oAuth 2.0)


  ## Working Architecture:-
![Working-flow-architecture](https://github.com/shubham9069/DEPLOYMENT_HUB/assets/101730475/48bac3d1-4fe3-4757-9a65-0a1b87bb2763)


  ## Deployment Architecture:-
![Deployment-architecture](https://github.com/shubham9069/DEPLOYMENT_HUB/assets/101730475/e950ddab-61d9-4b59-973c-5407c09d390d)

  ### Setup Guide

This Project contains following services and folders:

- `api-server`: HTTP API Server for REST API's
- `build-server`: Docker Image code which clones, builds and pushes the build to BLOB storge
- `reverse-proxy`: Reverse Proxy the subdomains and domains to Blob bucket static assets


  ### Local Setup

1. Run `npm install` in all the 3 services i.e. `api-server`, and `reverse-proxy`
3. Setup the `api-server` by providing all the required config and ENV.
4. Run `node index.js` in `api-server` and `reverse-proxy`

At this point following services would be up and running:

| S.No | Service            | PORT    |
| ---- | ------------------ | ------- |
| 1    | `api-server`       | `:80` |
| 2    | `socket.io-server` | `:9002` |
| 3    | `s3-reverse-proxy` | `:8000` |

### Demo
