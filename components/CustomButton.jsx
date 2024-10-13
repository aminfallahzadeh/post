// NATIVE IMPORTS
import { TouchableOpacity, Text } from "react-native";

// LIBRARIES
import { Flow } from "react-native-animated-spinkit";

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  testStyles,
  isLoading,
  bgColor = "bg-secondary",
  titleColor = "text-gray-600",
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${bgColor} rounded-md h-14 justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {isLoading ? (
        <Flow size={45} color="#333" />
      ) : (
        <Text
          className={`${titleColor} font-isansdemibold text-lg ${testStyles}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
