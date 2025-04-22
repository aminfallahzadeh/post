// IMPORTS
import { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import { Flow, Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import { login, generateOTP } from "@/api/auth";
import { useLocalSearchParams } from "expo-router";
import useGetUserData from "@/hooks/useGetUserData";
import { formatTime } from "@/utils/formatTime";
import { toastConfig } from "@/config/toast-config";
import otp from "@/assets/images/otp.png";
import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  Image,
  StyleSheet,
} from "react-native";

const Otp = () => {
  // STATES
  const [isValidating, setIsValidating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [retryDisabled, setRetryDisabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(120);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const { isMobile } = useLocalSearchParams();
  const { fetchCustomerData } = useGetUserData(mobile);

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
  const loginHandler = useCallback(async () => {
    setIsValidating(true);
    try {
      await login({ code, mobile });
      await fetchCustomerData(mobile);
    } finally {
      setIsValidating(false);
    }
  }, [code, mobile, fetchCustomerData]);

  // GENERATE OTP FUNCTION
  const generateOTPHandler = async () => {
    setIsLoading(true);
    try {
      Keyboard.dismiss();
      await generateOTP(mobile, isMobile);
      setTimeLeft(120);
      setRetryDisabled(true);
      toastConfig.success("کد مجددا ارسال شد");
      setCode(null);
    } finally {
      setIsLoading(false);
    }
  };

  // VALIDATE ON FILLED
  useEffect(() => {
    if (code?.length === 4) {
      Keyboard.dismiss();
      loginHandler();
    }
  }, [code, loginHandler]);

  return (
    <Background>
      <SafeAreaView className="h-full w-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <View style={styles.inner}>
            <Image
              source={otp}
              className="w-full h-[350px] mt-10"
              resizeMode="contain"
            />

            <View className="w-full absolute bottom-10 px-4 bg-gray-100 justify-center items-center">
              <OtpInput
                numberOfDigits={4}
                focusColor="#164194"
                onTextChange={setCode}
                secureTextEntry={true}
                textInputProps={{
                  textContentType: "oneTimeCode",
                  autoComplete: "sms-otp",
                }}
                theme={{
                  containerStyle: {
                    width: "70%",
                  },
                  pinCodeContainerStyle: {
                    borderColor: "#333",
                  },
                }}
              />

              <Text className="text-gray-500 font-isansbold mt-7">
                {formatTime(timeLeft)}
              </Text>

              <View className="mt-15">
                {isLoading || isValidating ? (
                  <Chase size={60} color="#164194" />
                ) : null}
              </View>

              <View className="flex-row justify-center items-center mt-5 w-full px-1">
                {/* <Pressable
                  onPress={() => {}}
                  className="border rounded-full border-gray-300 justify-center items-center w-[150px] h-[35px]"
                >
                  {isLoading || isValidating ? (
                    <View className="py-1 px-4">
                      <Flow size={25} color="#d0d0d0" />
                    </View>
                  ) : (
                    <Text className="text-primary font-isansbold">
                      کد را دریافت نمی کنم
                    </Text>
                  )}
                </Pressable> */}

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
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    width: "100%",
  },
});
