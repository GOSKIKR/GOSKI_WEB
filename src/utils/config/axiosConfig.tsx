import axios from "axios";

const apiClient = axios.create({
  // Create a new axios instance
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL
  timeout: 10000, // Request timeout
  headers: {
    // Custom headers
    "Content-Type": "application/json", // Content type
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request headers here (e.g., authorization token)
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
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here (e.g., show notification, redirect)
    return Promise.reject(error);
  }
);

export default apiClient;
