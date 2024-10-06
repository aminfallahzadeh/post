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
  containerStyle,
  textStyle,
  type,
  inputStyle,
  height = "h-16",
  max,
  editable,
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

  const wrapperStyle =
    isFocused || (value && editable)
      ? "border-secondary bg-white"
      : editable === false
      ? "border-gray-300 bg-gray-100"
      : "border-grey4 bg-grey3";

  return (
    <View className={`space-y-2 ${containerStyle}`}>
      {title && (
        <Text
          className={`text-base text-gray2 font-isansmedium text-right ${textStyle}`}
        >
          {title}
        </Text>
      )}

      <View
        className={`w-full ${height} px-4 border-2 rounded-md items-center relative ${wrapperStyle}`}
      >
        <TextInput
          className="flex-1 text-grey2 font-isansdemibold text-base w-full text-center"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          secureTextEntry={type === "password" && !showPassword}
          maxLength={max}
          editable={editable}
          {...props}
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
