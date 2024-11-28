// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function getAllPostYafte(data) {
  return axiosInstance.post("Postyafteh/GetAllPostYafte", data);
}
