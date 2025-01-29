// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function trackingOrder(barcode) {
  return axiosInstance.get(`/Traking/TrakingOrder?barcode=${barcode}`);
}

export function trackingOrders(mobile) {
  return axiosInstance.get(`Traking/TrakingOrders?mobile=${mobile}`);
}

export function returnOtp(data) {
  return axiosInstance.post(`/Traking/GetReturnToSenderOTP`, data);
}

export function redistributionOtp(data) {
  return axiosInstance.post(`/Traking/GetRedistributeReqOTP`, data);
}

export function saveReturnToSender(data) {
  return axiosInstance.post(`/Traking/SaveReturnToSender`, data);
}

export function saveRedistribute(data) {
  return axiosInstance.post(`/Traking/SaveRedistribute`, data);
}
