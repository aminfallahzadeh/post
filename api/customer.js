// AXIOS
import axiosInstance from "@/config/axiosConfig";

export async function getCustomerProfile(Mobile) {
  return axiosInstance.get(`/Customer/GetCustomerProfile?Mobile=${Mobile}`);
}

export async function customerProfile(data) {
  return await axiosInstance.post("/Customer/CustomerProfile", data);
}
