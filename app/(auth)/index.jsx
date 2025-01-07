// IMPORTS
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { generateOTP } from "@/api/auth";
import { useUserStore } from "@/store";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { mobilePhoneValidation } from "@/constants/validations";
import login from "@/assets/images/login.png";
import * as SecureStore from "expo-secure-store";

const Login = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  // CONSTS
  const setMobile = useUserStore((state) => state.setMobile);
  const { control, handleSubmit, watch } = useForm();
  const form_data = watch();

  // HANDLERS
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await generateOTP(form_data.mobile);
      setMobile(response.data.itemList[0].mobile);
      await SecureStore.setItemAsync(
        "mobile",
        response.data.itemList[0].mobile
      );
      router.push("/otp");
    } finally {
      setIsLoading(false);
    }
  };

  // ANIMATIONS
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageTranslateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    // ANIMATE IMAGE
    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(imageTranslateY, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [imageOpacity, imageTranslateY]);

  return (
    <Background>
      <SafeAreaView className="w-full h-full">
        <View className="w-full flex-1 justify-between items-center">
          <Animated.Image
            source={login}
            className="w-full h-[350px] mt-10"
            resizeMode="contain"
            style={{
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            }}
          />

          <View className="w-full px-7 mb-16">
            <FormField
              placeholder={"شماره همراه"}
              value={phoneNumber}
              handleChange={setPhoneNumber}
              containerStyle="mt-20"
              keyboardType="numeric"
              inputMode="numeric"
              max={11}
              type="text"
              control={control}
              name="mobile"
              rules={mobilePhoneValidation}
            />

            <CustomButton
              title={"تایید"}
              containerStyles={"mt-5"}
              handlePress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Login;
