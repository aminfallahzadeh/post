// IMPORTS
import axiosInstance from "@/config/axiosConfig";

export function getVersion() {
    return axiosInstance.get("PriceOrder/GetVersion");
}
