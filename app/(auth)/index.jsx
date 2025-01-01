// IMPORTS
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, Image, ScrollView, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { generateOTP } from "@/api/auth";
import { useUserStore } from "@/store";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { mobilePhoneValidation } from "@/constants/validations";
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
      <SafeAreaView className="h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full h-full justify-center px-4">
            <View className="relative mt-3 justify-center items-center">
              <Animated.Image
                source={images.logo}
                className="w-[150px] h-[150px]"
                resizeMode="contain"
                style={{
                  opacity: imageOpacity,
                  transform: [{ translateY: imageTranslateY }],
                }}
              />

              <View className="flex-row justify-center items-center">
                <View className="relative justify-center items-center">
                  <Text className="text-secondary text-[35px]"> پست </Text>
                  <Image
                    source={images.underline}
                    resizeMode="contain"
                    className="absolute w-[80px] h-[15px] -bottom-1 left-[5px]"
                  />
                </View>
                <Text className="text-primary font-isansbold text-[25px] text-center">
                  شرکت ملی{" "}
                </Text>
              </View>

              <Text className="text-primary font-isansdemibold text-[16px] text-center mt-2">
                جمهوری اسلامی ایران
              </Text>
            </View>

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
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
};

export default Login;
