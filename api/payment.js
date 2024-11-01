// AXIOS
import axiosInstance from "./axiosConfig";

export function requestPayment(data) {
  return axiosInstance.post("/Payment/RequestPayment", data);
}
