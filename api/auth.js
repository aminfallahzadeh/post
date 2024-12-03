// IMPORTS
import axiosInstance from "@/config/axiosConfig";
import { router } from "expo-router";
import { removeCredentials, setCredentials } from "@/utils/authUtils";
import { toastConfig } from "@/config/toast-config";

export function generateOTP(Mobile) {
  return axiosInstance.post(`/Customer/GenerateOTP?Mobile=${Mobile}`);
}

export async function login(data) {
  const response = await axiosInstance.post("/Customer/ValidateOTP", data);
  const expireTime = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds
  const expiryDate = new Date(Date.now() + expireTime).toISOString();
  console.log("login", response.data);
  toastConfig.success(response.data.message);
  setCredentials(
    response?.data?.itemList[0].token,
    response?.data?.itemList[0].refreshToken,
    expiryDate
  );
  router.replace("/services");
}

export async function logout() {
  const response = await axiosInstance.post("/Customer/Logout");
  console.log("Logout response:", response);
  await removeCredentials();
  toastConfig.success(response.data.message);
  router.replace("/(auth)");
}
