// IMPORTS
import * as Clipboard from "expo-clipboard";
import { toastConfig } from "@/config/toast-config";

export const copyPasteHandler = async (
  term,
  message = "متن مورد نظر کپی شد"
) => {
  await Clipboard.setStringAsync(term.toString());
  toastConfig.success(message);
};
