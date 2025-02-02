// IMPORTS
import { Switch } from "react-native";

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
        transform: [{ scaleX: 1 }],
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    />
  );
};

export default SwitchInput;
