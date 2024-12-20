// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function trackingOrder(barcode) {
  return axiosInstance.get(`/Traking/TrakingOrder?barcode=${barcode}`);
}

export function trackingOrders(mobile) {
  return axiosInstance.get(`Traking/TrakingOrders?mobile=${mobile}`);
}
