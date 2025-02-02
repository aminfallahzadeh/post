// IMPORTS
import { Switch } from "react-native";
import { I18nManager } from "react-native";

I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

try {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  console.log("RTL LOCKED");
} catch (e) {
  console.log(e);
}

const defaultColors = {
  track: {
    false: "#164194",
    true: "#fcd900",
  },
  thumb: "#00075a",
};
const SwitchInput = ({
  trackColor,
  thumbColor,
  onValueChange,
  value,
  disabled,
}) => {
  return (
    <Switch
      trackColor={trackColor ? trackColor : defaultColors.track}
      thumbColor={thumbColor ? thumbColor : defaultColors.thumb}
      onValueChange={onValueChange}
      disabled={disabled}
      value={value}
      style={{
        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    />
  );
};

export default SwitchInput;
