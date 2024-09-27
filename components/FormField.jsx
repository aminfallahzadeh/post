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
  max,
  ...props
}) => {
  // STATES
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // HANDLERS
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputStyle =
    isFocused || value ? "border-secondary bg-white" : "border-grey4 bg-grey3";

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray2 font-isansmedium text-right">
        {title}
      </Text>

      <View
        className={`w-full h-16 px-4 border-2 rounded-md items-center relative ${inputStyle}`}
      >
        <TextInput
          className="flex-1 text-grey2 font-isansdemibold text-base w-full text-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={type === "password" && !showPassword}
          maxLength={max}
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
