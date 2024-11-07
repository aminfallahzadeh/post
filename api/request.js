// AXIOS
import axiosInstance from "./axiosConfig";

export function insertRequestCertification(data) {
  /*
    SCHEMA: 
    {
        "id": "string",
        "mobile": "string",
        "customerID": "string",
        "trackingID": "string",
        "typeID": "string",
        "date": "2024-10-31T17:41:55.632Z",
        "result": true,
        "title": "string",
        "counter": 0,
        "amount": 0,
        "tax": 0,
        "payment": 0
    }
*/

  return axiosInstance.post("/Request/InsertRequestCertification", data);
}

export function insertRequestCertificationGeo(data) {
  return axiosInstance.post("/Request/InsertRequestCertificationGeo", data);
}
