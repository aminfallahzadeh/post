// NATIVE IMPORTS
import { View, Text, TextInput, TouchableOpacity } from "react-native";

// REACT IMPORTS
import { useState } from "react";

// ASSETS
import Feather from "@expo/vector-icons/Feather";

const FormField = ({
  title,
  value,
  placeholder,
  handleChange,
  otherStyles,
  type,
  ...props
}) => {
  // STATES
  const [showPassword, setShowPassword] = useState(false);

  // HANLDERS
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray2 font-isansmedium">{title}</Text>

      <View className="w-full h-16 px-4 bg-grey3 border-2 border-grey4 rounded-md focus:border-secondary focus:bg-white items-center relative">
        <TextInput
          className="flex-1 text-grey2 font-isansdemibold text-base w-full text-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChange={handleChange}
          secureTextEntry={type === "password" && !showPassword}
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={handleShowPassword}
            className="absolute top-[50%] left-4"
            style={{
              transform: [{ translateY: -12 }],
            }}
          >
            <Feather name={showPassword ? "eye-off" : "eye"} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
