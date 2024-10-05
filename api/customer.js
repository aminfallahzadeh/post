import axiosInstance from "./axiosConfig";

export function generateOTP(Mobile) {
  return axiosInstance.post(`/Customer/GenerateOTP?Mobile=${Mobile}`);
}

export function validateOTP(data) {
  return axiosInstance.post("/Customer/ValidateOTP", data);
}
