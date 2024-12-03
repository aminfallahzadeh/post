// IMPORTS
import * as SecureStore from "expo-secure-store";

export const isLoginValid = async () => {
  const expireTime = await SecureStore.getItemAsync("expireTime");
  console.log("EXPIRE DATE:", expireTime);
  const expireDate = new Date(expireTime);
  const now = new Date();
  console.log("IS VALID:", now < expireDate);
  return now < expireDate;
};

export const removeCredentials = async () => {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.deleteItemAsync("refreshToken");
  await SecureStore.deleteItemAsync("expireTime");
  console.log("CREDENTIALS REMOVED");
};

export const setCredentials = async (token, refreshToken, expireTime) => {
  await SecureStore.setItemAsync("token", token);
  await SecureStore.setItemAsync("refreshToken", refreshToken);
  await SecureStore.setItemAsync("expireTime", expireTime);
  console.log("CREDENTIALS SAVED");
};
