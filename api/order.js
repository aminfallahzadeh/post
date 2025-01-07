// AXIOS
import axiosInstance from "@/config/axiosConfig";

export function getProvince() {
  return axiosInstance.get("PriceOrder/GetProvince");
}

export function getCity(provinceID) {
  return axiosInstance.get(`PriceOrder/GetCity?ProvinceCode=${provinceID}`);
}

/**
 * Sends a POST request to fetch the price for a given set of parcel data.
 *
 * @function
 * @param {Object} data - The data object containing the necessary parameters for the request.
 * @param {string} data.contractcode - Contract code for the price request.
 * @param {string} data.username - Username for authentication.
 * @param {string} data.password - Password for authentication.
 * @param {string} data.postnodecode - Code of the post node.
 * @param {number} data.typecode - Type code of the parcel.
 * @param {number} data.servicetype - Service type code.
 * @param {number} data.parceltype - Parcel type code.
 * @param {number} data.sourcecode - Source location code.
 * @param {number} data.destcode - Destination location code.
 * @param {number} data.weight - Weight of the parcel in grams.
 * @param {number} data.spsparceltype - Special parcel type code.
 * @param {number} data.boxsize - Size of the box.
 *
 * @returns {Promise<Object>} A promise resolving to the response of the API call.
 */
export function getPrice(data) {
  return axiosInstance.post("PriceOrder/GetPrice", data);
}

export function validateWeight(data) {
  return axiosInstance.post("PriceOrder/ValidateServiceSpec", data);
}
