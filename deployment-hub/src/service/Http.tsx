import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost",
  headers: {
    "Content-Type": "application/json",
  },
});