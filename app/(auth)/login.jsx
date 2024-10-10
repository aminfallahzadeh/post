// REACT IMPORTS
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPORTS
import { View, Image, ScrollView, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import { router } from "expo-router";

// AXIOS
import { generateOTP } from "@/api/auth";

// STORE
import { useUserStore } from "@/store";

// LIBRARIES
import { showMessage } from "react-native-flash-message";

// ASSETS
import images from "../../constants/images";

// COMPONETNS
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const Login = () => {
  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // FORM STATES
  const [phoneNumber, setPhoneNumber] = useState(null);

  // ACCESS STORE STATE
  const setMobile = useUserStore((state) => state.setMobile);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch } = useForm();

  // ACCESS HOOK FORM DATA
  const form_data = watch();

  // GENERATE OTP FUNCTION
  const generateOTPHandler = async () => {
    setIsLoading(true);
    try {
      const response = await generateOTP(form_data.mobile);
      setMobile(response.data.itemList[0].mobile);
      router.push("/otp");
    } catch (error) {
      console.log("this is error", error);
      showMessage({
        message: `\n ${error.message}`,
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
  };

  // FOR DEVELOPMENMT
  // const generateOTPHandler = () => {
  //   router.push("/otp");
  // };

  // SUBMIT HANDLER
  const onSubmit = async () => {
    if (!form_data.mobile || form_data.mobile.length !== 11) {
      showMessage({
        message: "\n شماره موبایل معتبر نیست",
        type: "danger",
        titleStyle: {
          fontFamily: "IranSans-DemiBold",
          fontSize: 16,
          textAlign: "center",
        },
      });
    } else {
      generateOTPHandler(phoneNumber);
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
    <SafeAreaView className="bg-grey1 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-center px-4">
          <View className="releative mt-3 justify-center items-center">
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
              <View className="relativejustify-center items-center">
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
            title="شماره همراه :"
            value={phoneNumber}
            handleChange={setPhoneNumber}
            containerStyle="mt-20"
            keyboardType="email-address"
            type={"text"}
            control={control}
            name="mobile"
          />

          <CustomButton
            title={"تایید"}
            containerStyles={"mt-10"}
            handlePress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
