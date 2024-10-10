// AXIOS
import axiosInstance from "./axiosConfig";

// EXPO
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

// LIBRARIES
import { showMessage } from "react-native-flash-message";

export function generateOTP(Mobile) {
  return axiosInstance.post(`/Customer/GenerateOTP?Mobile=${Mobile}`);
}

export function validateOTP(data) {
  return axiosInstance.post("/Customer/ValidateOTP", data);
}

// LOGOUT API
// REMOVE TOKENS FROM SECURE STORE
const removeTokens = async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("refreshToken");
};

export async function logout() {
  try {
    const response = await axiosInstance.post("/Customer/Logout");
    console.log("Logout response:", response);
    await removeTokens();

    showMessage({
      message: `\n ${response.data.message}`,
      type: "success",
      titleStyle: {
        fontFamily: "IranSans-DemiBold",
        fontSize: 16,
        textAlign: "center",
      },
    });
    router.replace("login");

    // DEBUGGING
    console.log("User successfully logged out and tokens cleared.");
  } catch (error) {
    console.error("Error during logout:", error.response || error);
    showMessage({
      message: `\n ${error.response.data.message}` || `\n ${error.message}`,
      type: "danger",
      titleStyle: {
        fontFamily: "IranSans-DemiBold",
        fontSize: 16,
        textAlign: "center",
      },
    });
  }
}
