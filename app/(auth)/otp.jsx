// IMPORTS
import { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { OtpInput } from "react-native-otp-entry";
import { Flow, Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import { validateOTP, generateOTP } from "@/api/auth";
import { useUserStore } from "@/store";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import OtpLottie from "@/assets/animations/otp-lottie.json";
import useGetUserData from "@/hooks/useGetUserData";
import { formatTime } from "@/utils/helpers";
import useQuery from "@/hooks/useQuery";
import useMutation from "@/hooks/useMutation";
import { toastConfig } from "@/config/toast-config";

const Otp = () => {
  // STATES
  const [code, setCode] = useState(null);
  const [retryDisabled, setRetryDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120);

  // STORE
  const mobile = useUserStore((state) => state.mobile);

  // ACCES HOOK FUNCTIONS
  const { fetchCustomerData } = useGetUserData(mobile);

  const { isLoading, fetchQuery } = useQuery();
  const { isLoading: isValidating, fetchMutation } = useMutation();

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
    const response = await fetchMutation(
      validateOTP,
      undefined,
      {
        code: parseInt(code),
        mobile,
      },
      true
    );
    const data = response.data?.itemList[0];
    saveToken("token", data.token);
    saveRefreshToken("refreshToken", data.refreshToken);
    await fetchCustomerData(mobile);
    router.replace("/services");
  }, [code, mobile, fetchMutation, fetchCustomerData]);

  // GENERATE OTP FUNCTION
  const generateOTPHandler = async () => {
    Keyboard.dismiss();
    await fetchQuery(generateOTP, mobile);
    setTimeLeft(120);
    setRetryDisabled(true);
    toastConfig.success("کد مجددا ارسال شد");
    setCode(null);
  };

  // VLAIDATE ON FILLED
  useEffect(() => {
    if (code?.length === 4) {
      Keyboard.dismiss();
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

              <View className="flex-row justify-between items-center mt-8 w-full px-1">
                <Pressable
                  onPress={() => {}}
                  className="border rounded-full border-gray-300 justify-center items-center w-[150px] h-[35px]"
                >
                  {isLoading || isValidating ? (
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
                  className="border rounded-full border-gray-300 justify-center items-center w-[110px] h-[35px]"
                >
                  {isLoading || isValidating ? (
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

              <View className="mt-20">
                {isLoading || isValidating ? (
                  <Chase size={60} color="#164194" />
                ) : null}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Otp;
