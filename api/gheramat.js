// AXIOS
import axiosInstance from "@/config/axiosConfig";

export function getProvince() {
  return axiosInstance.get("Gheramat/GetProvince");
}

export function getServiceType() {
  return axiosInstance.get("Gheramat/GetServiceType");
}

export function trackingGheramat(mobile) {
  return axiosInstance.get(`Gheramat/TrakingGheramat?mobile=${mobile}`);
}
