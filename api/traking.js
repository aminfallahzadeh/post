// AXIOS
import axiosInstance from "./axiosConfig";

export function orderTracking(barcode) {
  return axiosInstance.get(`/Traking/TrakingOrder?barcode=${barcode}`);
}
