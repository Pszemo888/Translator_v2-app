// src/services/api.ts
import axios from "axios";

// Podstawowy URL do Twojego API (Angular: 'http://localhost:3000/api/users' itp.)
const baseURL = "http://localhost:3000/api";

// Tworzymy instancję axios:
const api = axios.create({
  baseURL, 
  // Możesz dodać np. timeout, inne ustawienia
});

// Interceptor do automatycznego dodawania tokena (o ile istnieje):
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
