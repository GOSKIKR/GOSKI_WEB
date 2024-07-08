import axios, { AxiosInstance } from "axios";

const apiClient = (isFormData?: boolean): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": !isFormData ? "application/json;charset=utf-8" : "multipart/form-data",
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );

  return client;
};

export default apiClient;