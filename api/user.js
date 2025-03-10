// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function getCarousel() {
  return axiosInstance.get("User/GetCarousel");
}
