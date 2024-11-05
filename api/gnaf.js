// AXIOS
import axiosInstance from "./axiosConfig";

export function addressByPostCode(data) {
  return axiosInstance.post("GNAF/AddressUnCompleteByPostcode", {
    postCodes: data,
  });
}

export function generateCertificate(id) {
  return axiosInstance.post("GNAF/GenerateCertificate", {
    requestID: id,
  });
}
