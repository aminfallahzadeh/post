// AXIOS
import axiosInstance from "@/config/axiosConfig";

export function getProvince() {
  return axiosInstance.get("Gheramat/GetProvince");
}

export function getServiceType() {
  return axiosInstance.get("Gheramat/GetServiceType");
}

export function insertRequestGheramat(data) {
  return axiosInstance.post("Gheramat/InsertRequestGheramate", data);
}
