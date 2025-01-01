// IMPORTS
import { PERSIAN_NUMBERS } from "@/constants/consts";

export const convertToEnglishNumber = (str) => {
  if (typeof str === "string") {
    for (let i = 0; i < 10; i++) {
      str = str.replace(PERSIAN_NUMBERS[i], i.toString());
    }
  }
  return str;
};
