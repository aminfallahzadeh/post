// AXIOS
import axiosInstance from "./axiosConfig";

export function requestPayment(data) {
  /*
    SCHEMA

    {
  "clientOrderID": "string",
  "mobile": "string",
  "paymentTypeID": "2",
  "postUnitID": 2,
  "income": 0,
  "tax": 0,
  "escrow": 0,
  "callBackUrl": "",
  "additionalData": "string",
  "requestID": id
}
  
  */
  return axiosInstance.post("/Payment/RequestPayment", data);
}
