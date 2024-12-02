// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function getAllPostYafte(data) {
  return axiosInstance.post("Postyafteh/GetAllPostYafte", data);
}

export function getYafteProvince() {
  return axiosInstance.get("Postyafteh/GetProvince");
}

export function getYafteCity({ provinceID }) {
  let url = "Postyafteh/GetCity";
  const params = [];

  if (provinceID) params.push(`provinceid=${provinceID}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return axiosInstance.get(url);
}
