// AXIOS
import axiosInstance from "./axiosConfig";

export async function newEop(data) {
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
