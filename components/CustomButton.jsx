// NATIVE IMPORTS
import { TouchableOpacity, Text } from "react-native";

// LIBRARIES
import { Flow } from "react-native-animated-spinkit";

export const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  disabled,
  height = "h-14",
  bgColor = "bg-primary",
  titleColor = "text-white",
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${bgColor} rounded-lg ${height} justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      style={{ opacity: disabled || isLoading ? 0.5 : 1 }}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <Flow size={45} color="#333" />
      ) : children ? (
        children
      ) : (
        <Text
          className={`${titleColor} font-isansdemibold text-md ${textStyles}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
