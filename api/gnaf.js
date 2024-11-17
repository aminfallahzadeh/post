// AXIOS
import axiosInstance from "@/config/axiosConfig";

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

export function generateCertificateGeo(id) {
  return axiosInstance.post("GNAF/GenerateCertificateGeo", {
    requestID: id,
  });
}

export function getCertificate(mobile) {
  return axiosInstance.get(`GNAF/GetCertificate?mobile=${mobile}`);
}

export function getProvince({ id, term } = {}) {
  let url = "GNAF/GetProvince";
  const params = [];

  if (id) params.push(`id=${id}`);
  if (term) params.push(`Searchstr=${term}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return axiosInstance.get(url);
}

export function getCounty({ id, provinceID, term }) {
  let url = "GNAF/GetCounty";
  const params = [];

  if (id) params.push(`id=${id}`);
  if (term) params.push(`Searchstr=${term}`);
  if (provinceID) params.push(`Provinceid=${provinceID}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return axiosInstance.get(url);
}

export function getZone({ id, term, provinceID, countyID }) {
  let url = "GNAF/GetZone";
  const params = [];

  if (id) params.push(`id=${id}`);
  if (term) params.push(`Searchstr=${term}`);
  if (provinceID) params.push(`Provinceid=${provinceID}`);
  if (countyID) params.push(`countyid=${countyID}`);
  if (params.length > 0) url += `?${params.join("&")}`;

  return axiosInstance.get(url);
}
