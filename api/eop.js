// AXIOS
import axiosInstance from "./axiosConfig";

export function newEop(data) {
  // VIEW MODEL
  // {
  // 	"title": "string",
  // 	"complaintType": 0,
  // 	"name": "string",
  // 	"nationalCode": "string",
  // 	"serviceId": 0,
  // 	"lastname": "string",
  // 	"serialNo": "string",
  // 	"mobile": "string",
  // 	"to_org_id": 0
  //   }

  return axiosInstance.post("/EOP/NewEOP", data);
}

export function eopList(mobile) {
  return axiosInstance.get(`/EOP/ListEOP?Mobile=${mobile}`);
}

export function queryEop(key) {
  return axiosInstance.get(`/EOP/QueryEOP?publickey=${key}`);
}
