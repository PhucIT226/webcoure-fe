import axios, { AxiosError } from "axios";
import { API_URL } from "../constants";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 });

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 🔹 Interceptor Request
axiosClient.interceptors.request.use(
  (config) => {
    NProgress.start();

    const me = localStorage.getItem("me");
    if (me) {
      const user = JSON.parse(me);
      if (user?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    NProgress.done();
    console.error("❌ [Request Error]:", error);
    return Promise.reject(error);
  }
);

// 🔹 Interceptor Response
axiosClient.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  async (error) => {
    NProgress.done();

    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      console.warn("⚠️ [401] Access token có thể hết hạn → thử refresh token...");

      try {
        const refreshRes = await axiosClient.post("/auth/refresh");

        if (refreshRes.data?.accessToken) {
          // 🔹 Cập nhật access token mới
          const me = localStorage.getItem("me");
          const user = me ? JSON.parse(me) : {};
          user.accessToken = refreshRes.data.accessToken;
          localStorage.setItem("me", JSON.stringify(user));

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;
          }
        } else {
          console.warn("⚠️ Refresh không trả accessToken (cookie-based auth)");
        }

        // 🔹 Thử lại request gốc
        return axiosClient(originalRequest);
      } catch (refreshError) {
        if (axios.isAxiosError(refreshError)) {
          console.error("❌ [Refresh Error]:", refreshError.response?.data);
        } else {
          console.error("❌ [Unknown Error]:", refreshError);
        }

        localStorage.removeItem("me");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
