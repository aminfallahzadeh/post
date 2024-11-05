// AXIOS
import axiosInstance from "./axiosConfig";
import axios from "axios";

// CONSTANTS
import { TEST_URL } from "@/constants/apiRoutes";

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

export function approvePayemnt() {
  return axios.post(`${TEST_URL}/ApprovePayment`, {
    TransactionID: "33911098",
    ClientOrderID: "83bfe338c3f7402685f3da15ec93392a",
    RRN: "",
    ProviderID: "",
    ResCode: 0,
    Msg: "",
  });
}
