import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@App:accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("@App:refreshToken");
        if (!refreshToken) {
          logoutUsuarioLocal();
          return Promise.reject(error);
        }

        const response = await api.post("/api/refresh-token", {
          refreshToken,
        });

        const { accessToken } = response.data;
        localStorage.setItem("@App:accessToken", accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        logoutUsuarioLocal();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

function logoutUsuarioLocal() {
  localStorage.removeItem("@App:accessToken");
  localStorage.removeItem("@App:refreshToken");
  localStorage.removeItem("@App:user");
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}
