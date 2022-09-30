import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7777",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "sd_token"
  )}`;
  return config;
});
export default instance;
