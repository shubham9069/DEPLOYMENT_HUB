import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:80",
  headers: {
    "Content-Type": "application/json",
  },
});