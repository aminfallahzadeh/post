// IMPORTS
import { useState, useEffect, useRef } from "react";
import { useController } from "react-hook-form";
import Feather from "@expo/vector-icons/Feather";
import { View, Text, TextInput, Animated, Pressable } from "react-native";

export const FormFieldPastable = ({
  title,
  value,
  placeholder,
  containerStyle,
  textStyle,
  type,
  inputStyle,
  multiline = false,
  height = "h-14",
  max,
  editable = true,
  clearBtn = true,
  name,
  control,
  rules,
  animate = true,
  keyboardType = "default",
  inputMode = "text",
  numberOfLines,
}) => {
  // STATES
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const placeholderAnimation = useState(new Animated.Value(0))[0];

  // CONSTS
  const { field, fieldState } = useController({
    control,
    defaultValue: value,
    name,
    rules,
  });

  // HANDLERS
  useEffect(() => {
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
  // HANDLE REACT NATIVE MESS
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
        className={`w-full ${height} px-4 border rounded-lg items-center relative ${
          editable ? "bg-white" : "bg-gray-300"
        } border-primary`}
      >
        {/* Animated Placeholder */}
        {animate ? (
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
        ) : (
          <Text className="text-gray-400 font-isansdemibold text-xs absolute -top-2 right-2 bg-white rounded-md px-2">
            {placeholder}
          </Text>
        )}

        {/* ERROR */}
        {fieldState?.error && (
          <View className="absolute -top-5 left-0">
            <Text className="text-red-500 font-isansregular">
              {fieldState?.error?.message}
            </Text>
          </View>
        )}

        <View className="w-full h-full">
          <TextInput
            className={`flex-1 w-full text-grey2 font-isansdemibold text-sm`}
            value={field.value}
            placeholderTextColor="transparent"
            onChangeText={field.onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={[inputStyle]}
            secureTextEntry={type === "password" && !showPassword}
            maxLength={max}
            editable={editable}
            keyboardType={keyboardType}
            textAlign="right"
            autoCorrect={false}
            inputMode={inputMode}
            multiline={multiline}
            numberOfLines={numberOfLines}
          />
        </View>

        {type === "password" ? (
          <Pressable
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
          </Pressable>
        ) : type !== "password" && field.value && clearBtn && editable ? (
          <Pressable
            onPress={handleRemoveField}
            className="absolute top-[50%] left-2"
            style={{
              transform: [{ translateY: -12 }],
            }}
          >
            <Feather
              name="x-circle"
              size={animate ? 24 : 20}
              color={"#AFB4C0"}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default FormFieldPastable;
