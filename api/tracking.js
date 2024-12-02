// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function trackingOrder(barcode) {
  return axiosInstance.get(`/Traking/TrakingOrder?barcode=${barcode}`);
}

export function trackingOrderByNID(nationalCode) {
  return axiosInstance.get(
    `Traking/TrakingOrdersByNID?NationalCode=${nationalCode}`
  );
}
