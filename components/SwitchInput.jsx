// IMPORTS
import { useEffect } from "react";
import { Switch } from "react-native";
import { I18nManager } from "react-native";

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
  // DEBUG
  useEffect(() => {
    console.log("IS RTL:", I18nManager.isRTL);
  }, []);

  return (
    <Switch
      trackColor={trackColor ? trackColor : defaultColors.track}
      thumbColor={thumbColor ? thumbColor : defaultColors.thumb}
      onValueChange={onValueChange}
      disabled={disabled}
      value={value}
      style={{
        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
        alignSelf: "center",
      }}
    />
  );
};

export default SwitchInput;
