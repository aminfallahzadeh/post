// NATIVE IMPORTS
import { View } from "react-native";

export const ProgressBar = ({
  progress,
  style,
  bgColor = "bg-grey5",
  color = "bg-primary",
}) => {
  return (
    <View className={`w-full h-[5px] ${bgColor} rounded relative ${style}`}>
      <View
        className={`absolute top-0 left-0 h-full bg-primary rounded ${color}`}
        style={{ width: `${progress}%` }}
      />
    </View>
  );
};

export default ProgressBar;
