import axios from "axios";

const api = axios.create({
  baseURL: "https://alunos-ads-api-production.up.railway.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;

    config.headers["x-access-token"] = token;
    config.headers["x-token"] = token;
    config.headers.token = token;
  }

  return config;
});

export default api;