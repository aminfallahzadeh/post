// IMPORTS
import FlashMessage, { showMessage } from "react-native-flash-message";

const toastProviderOptions = {
  position: "top",
  titleStyle: {
    fontFamily: "IranSans-DemiBold",
    fontSize: 16,
    textAlign: "center",
    paddingTop: 30,
  },
};

export const toastConfig = {
  registerProvider: () => (
    <FlashMessage position={toastProviderOptions.position} />
  ),
  success: (message) =>
    showMessage({ message, type: "success", ...toastProviderOptions }),
  warning: (message) =>
    showMessage({ message, type: "warning", ...toastProviderOptions }),
  error: (message) =>
    showMessage({ message, type: "danger", ...toastProviderOptions }),
};
