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
"mobile":"09123259816",
"typecode":11,
"servicetype":1,
"parceltype":1,
"sourcecode":1,
"destcode":51,
"sendername":"ali",
"receivername":"asghar",
"receiverpostalcode":"1671989696",
"senderpostalcode":"1671989697",
"weight":100,
"postalcostcategoryid":1,
"postalcosttypeflag":"f",
"relationalkey":"",
"senderid":"0064551751",
"receiverid":"2142474918",
"sendermobile":"09123259816",
"receivermobile":"09352474918",
"senderaddress":"address1",
"receiveraddress":"address2",
"insurancetype":1,
"insuranceamount":0,
"spsdestinationtype":0,
"spsreceivertimetype":0,
"spsparceltype":0,
"tlsservicetype":1,
"tworeceiptant":false,
"electworeceiptant":false,
"iscot":false,
"smsservice":true,
"isnonstandard":true,
"sendplacetype":2,
"Contractorportion":200000,
"Contetnts":"",
"Vid":"654656",
"boxsize":"5"
}
     */
  return axiosInstance.post("Request/InsertRequestPriceOrder", data);
}
