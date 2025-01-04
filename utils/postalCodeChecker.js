// IMPORTS
import { convertToEnglishNumber } from "../helpers/numberHelper";

export const validatePostalCode = (postalCode) => {
  if (postalCode && postalCode.length > 0) {
    const code = convertToEnglishNumber(postalCode);
    if (!/^[0-9]{10}$/.test(code)) {
      return false;
    }
    if (/^[0-9]{5}/.test(code) && /[02]/.test(code.slice(0, 5))) {
      return false;
    }
    if (code[4] === "5") {
      return false;
    }
    if (code[5] === "0") {
      return false;
    }
    if (postalCode.slice(-4) === "0000") {
      return false;
    }

    if (new Set(postalCode).size === 1) {
      return false;
    }
  }

  return true;
};
