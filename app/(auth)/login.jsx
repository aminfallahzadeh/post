// REACT IMPORTS
import { useState, useRef, useEffect } from "react";

// NATIVE IMPORTS
import { View, Image, ScrollView, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import { router } from "expo-router";

// ASSETS
import images from "../../constants/images";

// COMPONETNS
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

const Login = () => {
  // FORM STATES
  const [phoneNumber, setPhoneNumber] = useState("");

  // HANDLERS
  const handleDataCahnge = (e) => {
    setPhoneNumber(e);
  };

  const handleSubmit = () => {
    router.push("/otp");
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

            <Text className="text-primary font-isansbold text-[25px] text-cente">
              شرکت ملی <Text className="text-secondary"> پست </Text>
            </Text>

            <Image
              source={images.underline}
              resizeMode="contain"
              className="absolute w-[80px] h-[15px] bottom-7 left-[100px]"
            />
            <Text className="text-primary font-isansdemibold text-[16px] text-center mt-2">
              جمهوری اسلامی ایران
            </Text>
          </View>

          <FormField
            title="شماره همراه :"
            value={phoneNumber}
            handleChange={handleDataCahnge}
            otherStyles="mt-20"
            keyboardType="email-address"
            type={"text"}
          />

          <CustomButton
            title={"تایید"}
            containerStyles={"mt-10"}
            handlePress={handleSubmit}
          />
        </View>

        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
