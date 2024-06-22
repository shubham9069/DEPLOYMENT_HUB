import axios from "axios";

export const http = axios.create({
  baseURL: "http://deploymenthub.australiacentral.azurecontainer.io",
  headers: {
    "Content-Type": "application/json",
  },
});