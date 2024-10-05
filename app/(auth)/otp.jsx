// REACT IMPORTS
import { useEffect, useState } from "react";

// NATIVE IMPORTS
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// LIBRARY IMPORTS
import LottieView from "lottie-react-native";
import { OtpInput } from "react-native-otp-entry";

// AXIOS
import { validateOTP } from "@/api/customer";

// STORE
import { useUserStore } from "@/store";

// EXPO IMPORTS
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// LIBRARIES
import { showMessage } from "react-native-flash-message";

// ASSETS
import OtpLottie from "../../assets/animations/otp-lottie.json";

const Otp = () => {
  // DATA STATE
  const [code, setCode] = useState(2222);
  const mobile = useUserStore((state) => state.mobile);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(mobile);
  }, [mobile]);

  // VALIDATE FUNCTION
  const validateOTPHanlder = async () => {
    setIsLoading(true);
    try {
      const response = await validateOTP({
        code,
        mobile,
      });
      const data = response.data?.itemList[0];
      console.log("this is response:", response.data);
      saveToken("token", data.token);
      saveRefreshToken("refreshToken", data.refreshToken);
      showMessage({
        message: response.data?.message,
        type: "success",
        titleStyle: {
          fontFamily: "IranSans-DemiBold",
          fontSize: 16,
        },
        style: {
          height: 100,
          width: "100%",
          paddingTop: 50,
          alignItems: "center",
        },
      });
      router.replace("/services");
    } catch (error) {
      console.log("this is error", error);
      showMessage({
        message: error.message,
        type: "danger",
        style: {
          color: "blue",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-grey1 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-normal items-center px-7 mt-15">
          <LottieView
            source={OtpLottie}
            autoPlay
            loop
            className="w-full h-[350px] mt-[100px]"
          />

          <OtpInput
            numberOfDigits={4}
            focusColor="#fcd900"
            onFilled={validateOTPHanlder}
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
    </SafeAreaView>
  );
};

export default Otp;
