// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function orderTracking(barcode) {
  return axiosInstance.get(`/Traking/TrakingOrder?barcode=${barcode}`);
}
