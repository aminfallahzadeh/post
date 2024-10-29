// AXIOS
import axiosInstance from "./axiosConfig";

export function addressByPostCode(data) {
  return axiosInstance.post("GNAF/AddressUnCompleteByPostcode", {
    postCodes: data,
  });
}

export function generateCertificate(data) {
  return axiosInstance.post("GNAF/GenerateCertificate", {
    postCodes: data,
  });
}
