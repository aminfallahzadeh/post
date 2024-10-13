// REACT IMPORTS
import { useEffect, useState, useCallback } from "react";

// NATIVE IMPORTS
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// LIBRARIES
import LottieView from "lottie-react-native";
import { OtpInput } from "react-native-otp-entry";
import { showMessage } from "react-native-flash-message";
import { Flow } from "react-native-animated-spinkit";

// COMPONENTS
import Background from "@/components/Background";

// AXIOS
import { validateOTP, generateOTP } from "@/api/auth";

// STORE
import { useUserStore } from "@/store";

// EXPO IMPORTS
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// ASSETS
import OtpLottie from "@/assets/animations/otp-lottie.json";
import { toastStyles } from "@/constants/styles";

// HOOKS
import useGetUserData from "@/hooks/useGetUserData";

// UTILS
import { formatTime } from "@/utils/helpers";

const Otp = () => {
  // DATA STATE
  const [code, setCode] = useState(null);

  // ACCESS STORE STATE
  const setMobile = useUserStore((state) => state.setMobile);
  const mobile = useUserStore((state) => state.mobile);

  const [retryDisabled, setRetryDisabled] = useState(true);

  // TIMER STATE
  const [timeLeft, setTimeLeft] = useState(120);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // ACCES HOOK FUNCTIONS
  const { fetchCustomerData } = useGetUserData(mobile);

  // FUNCTION TO STORE TOKEN
  const saveToken = async function (key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("token saved");
  };

  const saveRefreshToken = async function (key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("refresh token saved");
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      setRetryDisabled(false);
    }
  }, [timeLeft]);

  // VALIDATE FUNCTION
  const validateOTPHanlder = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await validateOTP({
        code: parseInt(code),
        mobile,
      });
      const data = response.data?.itemList[0];
      console.log("this is response:", response.data);
      saveToken("token", data.token);
      saveRefreshToken("refreshToken", data.refreshToken);
      showMessage({
        message: response?.data?.message,
        type: "success",
        titleStyle: toastStyles,
      });
      await fetchCustomerData(mobile);
      router.replace("/services");
    } catch (error) {
      console.log("this is error", error.response.data?.message);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
    } finally {
      setIsLoading(false);
    }
  }, [code, mobile, fetchCustomerData]);

  // GENERATE OTP FUNCTION
  const generateOTPHandler = async () => {
    setIsLoading(true);
    try {
      const response = await generateOTP(mobile);
      setMobile(response.data.itemList[0].mobile);
      showMessage({
        message: "کد مجددا ارسال شد",
        type: "success",
        titleStyle: toastStyles,
      });
      setTimeLeft(120);
      setRetryDisabled(true);
    } catch (error) {
      console.log("this is error", error);
      showMessage({
        message: error.message || error,
        type: "danger",
        titleStyle: toastStyles,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // FOR DEVELOPMENT
  // const validateOTPHanlder = useCallback(() => {
  //   router.replace("/services");
  // }, []);

  // VLAIDATE ON FILLED
  useEffect(() => {
    if (code?.length === 4) {
      validateOTPHanlder();
    }
  }, [code, validateOTPHanlder]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 90,
              minHeight: "100%",
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="w-full h-full justify-normal items-center px-7 mt-15">
              <LottieView
                source={OtpLottie}
                autoPlay
                loop
                className="w-full h-[250px] mt-[100px]"
              />

              <OtpInput
                numberOfDigits={4}
                focusColor="#fcd900"
                onTextChange={setCode}
                theme={{
                  containerStyle: {
                    width: "70%",
                  },
                }}
              />

              <View className="flex-row justify-between mt-8 w-full px-10 ">
                <Pressable
                  onPress={() => {}}
                  className="border px-4 rounded-full border-gray-300 py-1 justify-center items-center w-[150px] h-[35px]"
                >
                  {isLoading ? (
                    <View className="py-1 px-4">
                      <Flow size={25} color="#d0d0d0" />
                    </View>
                  ) : (
                    <Text className="text-primary font-isansbold">
                      کد را دریافت نمیکنم
                    </Text>
                  )}
                </Pressable>

                <Pressable
                  onPress={generateOTPHandler}
                  disabled={retryDisabled}
                  className="border px-4 rounded-full border-gray-300 py-1 justify-center items-center w-[110px] h-[35px]"
                >
                  {isLoading ? (
                    <View className="py-1 px-4">
                      <Flow size={25} color="#d0d0d0" />
                    </View>
                  ) : (
                    <Text
                      className={`${
                        retryDisabled ? "text-gray-500" : "text-primary"
                      } font-isansbold`}
                    >
                      ارسال مجدد
                    </Text>
                  )}
                </Pressable>
              </View>

              <Text className="text-gray-500 font-isansbold mt-7">
                {formatTime(timeLeft)}
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Otp;
