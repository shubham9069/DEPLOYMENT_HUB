import axios from "axios";

export const http = axios.create({
  baseURL: "https://localhost:80",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",

  },
});