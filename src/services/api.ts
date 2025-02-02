import axios from "axios";

const baseURL = "http://localhost:3000/api";

const api = axios.create({
  baseURL, 
});

// auto dodawanie tokena
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
