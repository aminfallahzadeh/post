import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@/constants/apiRoutes";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// GET TOKENS FROM SECURE STORE
const getTokens = async () => {
  const token = await SecureStore.getItemAsync("token");
  const refreshToken = await SecureStore.getItemAsync("refreshToken");

  // DEBUGGING: LOG TOKENS
  console.log("Tokens retrieved from SecureStore:", { token, refreshToken });

  return { token, refreshToken };
};

// SAVE TOKENS TO SECURE STORE
const saveTokens = async (token, refreshToken) => {
  await SecureStore.setItemAsync("token", token);
  if (refreshToken) {
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  }
};

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  async (config) => {
    const { token } = await getTokens();

    const excludedRoutes = [
      "/Customer/GenerateOTP",
      "/Customer/ValidateOTP",
      "/Customer/RefreshToken",
    ];

    const path = config.url.split("?")[0];

    if (token && !excludedRoutes.some((route) => path.includes(route))) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // DEBUGGING: REQUEST
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

// REFRESH TOKEN HANDLER
axiosInstance.interceptors.response.use(
  (response) => {
    // DEBUGGING: RESPONSE
    console.log("Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // CHECK TOKEN EXPIRE ERROR
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log("401 Unauthorized error detected, refreshing token...");
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken } = await getTokens();

      // DEBUGGING: REFRESH TOKEN REQUEST
      console.log("Sending refresh token request:", { refreshToken });

      return new Promise((resolve, reject) => {
        // GET NEW ACCESS TOKEN
        axios
          .post(`${BASE_URL}/Customer/RefreshToken`, { refreshToken })
          .then(async ({ data }) => {
            // DEBUGGING: REFRESH TOKEN RESPONSE
            console.log("Refresh token response:", data);

            await saveTokens(
              data.itemList[0].token,
              data.itemList[0].refreshToken
            );

            console.log("NEW TOKENS SAVED");

            axiosInstance.defaults.headers[
              "Authorization"
            ] = `Bearer ${data.itemList[0].token}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${data.itemList[0].token}`;

            processQueue(null, data.itemList[0].token);
            // RETRY FAILED REQUESTS
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            console.error("Refresh token error:", err.response || err);
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    // REJECT WITH ERROR IF NOT 401
    return Promise.reject(error);
  }
);

export default axiosInstance;
