// IMPORTS
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import SwitchInput from "@/components/SwitchInput";

const Login = () => {
  // STATES
  const [isEnabled, setIsEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);

  // CONSTS
  const setMobile = useUserStore((state) => state.setMobile);
  const { control, handleSubmit, watch, reset } = useForm();
  const form_data = watch();

  // HANDLERS
  const toggleSwitch = () => {
    reset();
    setIsEnabled((previousState) => !previousState);
  };

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
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 90,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              //   stickyHeaderIndices={[0]}
            >
              <View className="w-full px-5">
                <Animated.Image
                  source={login}
                  className="w-full h-[350px] mt-10 mb-5"
                  resizeMode="contain"
                  style={{
                    opacity: imageOpacity,
                    transform: [{ translateY: imageTranslateY }],
                  }}
                />

                <View className="mt-10 flex-row-reverse items-center justify-start">
                  <Text
                    className={`text-center self-center font-isansdemibold text-md m-2 ${
                      isEnabled ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    ورود با موبایل
                  </Text>

                  <SwitchInput onValueChange={toggleSwitch} value={isEnabled} />
                  <Text
                    className={`text-center self-center font-isansdemibold text-md m-2 ${
                      !isEnabled ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    ورود با شناسه مشتری
                  </Text>
                </View>

                {isEnabled ? (
                  <FormField
                    placeholder={"شماره همراه"}
                    value={phoneNumber}
                    handleChange={setPhoneNumber}
                    keyboardType="numeric"
                    inputMode="numeric"
                    containerStyle="mt-5"
                    max={11}
                    type="text"
                    control={control}
                    name="mobile"
                    rules={mobilePhoneValidation}
                  />
                ) : (
                  <FormField
                    placeholder={"شناسه مشتری"}
                    value={phoneNumber}
                    handleChange={setPhoneNumber}
                    keyboardType="numeric"
                    inputMode="numeric"
                    containerStyle="mt-5"
                    max={11}
                    type="text"
                    control={control}
                    name="customerID"
                    rules={mobilePhoneValidation}
                  />
                )}

                <View className="w-full flex-row-reverse justify-center items-center mt-5">
                  <TouchableOpacity>
                    <Text className="font-isansmedium text-sm text-grey2">
                      ثبت نام شناسه پستی
                    </Text>
                  </TouchableOpacity>

                  <View className="h-6 w-px bg-gray-400 mx-2" />

                  <TouchableOpacity>
                    <Text className="font-isansmedium text-sm text-grey2">
                      فراموشی شناسه پستی
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              {isEnabled ? (
                <CustomButton
                  title="ادامه"
                  handlePress={handleSubmit(onSubmit)}
                  isLoading={isLoading}
                />
              ) : (
                <CustomButton
                  title="ادامه"
                  // handlePress={handleSubmit(onSubmit)}
                  isLoading={isLoading}
                />
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Login;
