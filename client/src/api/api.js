import axios from "axios";

console.log("API URL =>", import.meta.env.VITE_API_BASE_URL);
console.log(import.meta.env);

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
