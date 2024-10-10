import axiosInstance from "./axiosConfig";

export function getCustomerProfile(Mobile) {
  return axiosInstance.get(`/Customer/GetCustomerProfile?Mobile=${Mobile}`);
}
