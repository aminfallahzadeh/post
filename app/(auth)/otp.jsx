// REACT IMPORTS
import { useEffect, useState, useCallback } from "react";

// NATIVE IMPORTS
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// LIBRARIES
import LottieView from "lottie-react-native";
import { OtpInput } from "react-native-otp-entry";
import { showMessage } from "react-native-flash-message";

// AXIOS
import { validateOTP } from "@/api/auth";
// import { getCustomerProfile } from "@/api/customer";

// STORE
import { useUserStore } from "@/store";

// EXPO IMPORTS
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// ASSETS
import OtpLottie from "@/assets/animations/otp-lottie.json";

// HOOKS
import useGetUserData from "@/hooks/useGetUserData";

const Otp = () => {
  // DATA STATE
  const [code, setCode] = useState(null);
  const mobile = useUserStore((state) => state.mobile);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // ACCES HOOK FUNCTIONS
  const { fetchCustomerData, isLoading: userDataLoading } =
    useGetUserData(mobile);

  // FUNCTION TO STORE TOKEN
  const saveToken = async function (key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("token saved");
  };

  const saveRefreshToken = async function (key, value) {
    await SecureStore.setItemAsync(key, value);
    console.log("refresh token saved");
  };

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
        message: `\n ${response?.data?.message}`,
        type: "success",
        titleStyle: {
          fontFamily: "IranSans-DemiBold",
          fontSize: 16,
          textAlign: "center",
        },
      });
      await fetchCustomerData(mobile);
      router.replace("/services");
    } catch (error) {
      console.log("this is error", error.response.data?.message);
      showMessage({
        message: `\n ${error.response?.data?.message}` || `\n ${error.message}`,
        type: "danger",
        titleStyle: {
          fontFamily: "IranSans-DemiBold",
          fontSize: 16,
          textAlign: "center",
        },
      });
    } finally {
      setIsLoading(false);
    }
  }, [code, mobile, fetchCustomerData]);

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
    <SafeAreaView className="bg-grey1 h-full">
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

            <View className="flex-row justify-between mt-5 w-full px-14">
              <Text className="text-primary font-isansbold">
                کد را دریافت نمیکنم
              </Text>
              <Text className="text-primary font-isansbold">ارسال مجدد</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Otp;
