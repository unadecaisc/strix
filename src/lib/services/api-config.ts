import axios from "axios";

function getToken() {
  const token = localStorage.getItem("token");

  console.log("◉ ▶ getToken ▶ token:", token);
  if (!token) {
    return undefined;
  }
  return `Bearer ${token}`;
}
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
api.defaults.withCredentials = true;

export default api;
