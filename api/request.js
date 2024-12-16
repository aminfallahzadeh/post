// AXIOS
import axiosInstance from "@/config/axiosConfig";

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

export function insertRequestBulk(data) {
  return axiosInstance.post("/Request/InsertRequestBulk", data);
}

export function insertRequestPostYafte(data) {
  return axiosInstance.post("/Request/InsertRequestPostYafte", data);
}

export function getRequestBulk(mobile) {
  return axiosInstance.get(`/Request/GetRequestBulk?Mobile=${mobile}`);
}

export function getRequestPostYafte(mobile) {
  return axiosInstance.get(`/Request/GetRequestPostYafte?Mobile=${mobile}`);
}

export function insertRequestGheramat(data) {
  return axiosInstance.post("Request/InsertRequestGheramate", data);
}

export function insertRequestEhraz(data) {
  /**
     *
     * {
  "phoneNumber": "string",
  "applicantType": 0,
  "gender": 0,
  "firstName": "string",
  "lastName": "string",
  "nationalCodeOrId": "string",
  "addressStatus": 0,
  "postalCode": "string",
  "lastStreet": "string",
  "buildingNumber": "string",
  "floor": "string",
  "unit": "string"
}
  */
  return axiosInstance.post("Request/InsertRequestEhraz", data);
}

export function insertRequestPriceOrder(data) {
  /**
     *
     * {
  "contractcode": "string",
  "username": "string",
  "password": "string",
  "postnodecode": "string",
  "mobile": "string",
  "trackingId": "string",
  "typecode": 0,
  "servicetype": 0,
  "parceltype": 0,
  "sourcecode": 0,
  "destcode": 0,
  "sendername": "string",
  "receivername": "string",
  "receiverpostalcode": "string",
  "senderpostalcode": "string",
  "weight": 0,
  "senderid": "string",
  "receiverid": "string",
  "sendermobile": "string",
  "receivermobile": "string",
  "senderaddress": "string",
  "receiveraddress": "string",
  "insurancetype": 0,
  "insuranceamount": 0,
  "spsdestinationtype": 0,
  "spsreceivertimetype": 0,
  "spsparceltype": 0,
  "electworeceiptant": true,
  "iscot": true,
  "smsservice": true,
  "isnonstandard": true,
  "contetnts": "string",
  "boxsize": 0
}
     */
  return axiosInstance.post("Request/InsertRequestPriceOrder", data);
}
