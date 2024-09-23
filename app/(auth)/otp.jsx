// NATIVE IMPORTS
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// LIBRARY IMPORTS
import LottieView from "lottie-react-native";
import { OtpInput } from "react-native-otp-entry";

// EXPO IMPORTS
import { router } from "expo-router";

// ASSETS
import OtpLottie from "../../assets/animations/otp-lottie.json";

const otp = () => {
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
            onFilled={() => {
              router.replace("/followup");
            }}
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

export default otp;
