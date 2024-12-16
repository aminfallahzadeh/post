// AXIOS
import axiosInstance from "@/config/axiosConfig";

export function getProvince() {
  return axiosInstance.get("PriceOrder/GetProvince");
}

export function getCity(provinceID) {
  return axiosInstance.get(`PriceOrder/GetCity?ProvinceCode=${provinceID}`);
}
