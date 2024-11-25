// AXIOS
import axiosInstance from "@/config/axiosConfig";

export async function getCustomerProfile(Mobile) {
  return axiosInstance.get(`/Customer/GetCustomerProfile?Mobile=${Mobile}`);
}

export async function customerProfile(data) {
  return await axiosInstance.post("/Customer/CustomerProfile", data);
}

// http://84.241.12.49:8090/payment/ApprovePayment
// POST

/*
data:
{

}
*/
