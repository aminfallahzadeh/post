import axios from "axios";
import { useUserStore } from "@/store";
import { BASE_URL } from "@/constants/apiRoutes";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

// ADD A REQUEST INTECEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const { token } = useUserStore.getState();

    // ADD HEADER IF TOKEN EXISTS
    if (token && config.url !== "/Customer/GenerateOTP") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // DEBUGGING: LOG REQUEST DETAILS
    console.log("Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// ADD A RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => {
    // DEBUGGING: LOG RESPONSE DETAILS
    console.log("Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    return response;
  },
  (error) => {
    console.error(
      "Response error:",
      error.response
        ? {
            url: error.response.config.url,
            status: error.response.status,
            data: error.response.data,
          }
        : error
    );

    return Promise.reject(error);
  }
);

export default axiosInstance;
