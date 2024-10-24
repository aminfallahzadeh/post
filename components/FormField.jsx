// NATIVE IMPORTS
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";

// REACT IMPORTS
import { useState, useEffect } from "react";
import { useController } from "react-hook-form";

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
  height = "h-14",
  max,
  editable = true,
  clearBtn = true,
  name,
  control,
  ...props
}) => {
  // STATES
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // ANIMATION
  const placeholderAnimation = useState(new Animated.Value(0))[0];

  const { field } = useController({
    control,
    defaultValue: value,
    name,
  });

  useEffect(() => {
    //
    Animated.timing(placeholderAnimation, {
      toValue: isFocused || field?.value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, field?.value, placeholderAnimation]);

  // PLACEHOLDER CONFIG
  const placeholderTranslateY = placeholderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [15, -10],
  });

  const placeholderFontSize = placeholderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [13, 12],
  });
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

  const handleRemoveField = () => {
    field.onChange("");
  };

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
        className={`w-full ${height} px-4 border rounded-md items-center relative ${
          editable ? "bg-white" : "bg-gray-300"
        } border-gray-300`}
      >
        {/* Animated Placeholder */}
        <Animated.Text
          style={{
            position: "absolute",
            right: 12,
            top: placeholderTranslateY,
            fontSize: placeholderFontSize,
            fontFamily: "IranSans-DemiBold",
            borderRadius: 50,
            paddingVertical: 1,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
            color: "#AFB4C0",
          }}
        >
          {placeholder}
        </Animated.Text>

        <TextInput
          className="flex-1 text-grey2 font-isansdemibold text-base w-full text-center"
          value={field.value}
          placeholderTextColor="transparent"
          onChangeText={field.onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          secureTextEntry={type === "password" && !showPassword}
          maxLength={max}
          editable={editable}
          {...props}
        />

        {type === "password" ? (
          <TouchableOpacity
            onPress={handleShowPassword}
            className="absolute top-[50%] left-4"
            style={{
              transform: [{ translateY: -12 }],
            }}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={"gray"}
            />
          </TouchableOpacity>
        ) : type === "text" && field.value && clearBtn && editable ? (
          <TouchableOpacity
            onPress={handleRemoveField}
            className="absolute top-[50%] left-4"
            style={{
              transform: [{ translateY: -12 }],
            }}
          >
            <Feather name="x-circle" size={24} color={"#AFB4C0"} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default FormField;
