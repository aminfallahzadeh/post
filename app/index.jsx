// IMPORTS
import { useEffect, useRef, useState } from "react";
import { View, Animated, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../components/CustomButton";
import Background from "@/components/Background";
import images from "../constants/images";
import { Chase } from "react-native-animated-spinkit";
import { isLoginValid } from "@/utils/authUtils";
import useGetUserData from "@/hooks/useGetUserData";
import * as SecureStore from "expo-secure-store";

const Index = () => {
  // STATES
  const [loading, setLoading] = useState(true);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const { fetchCustomerData } = useGetUserData(mobile);
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageTranslateY = useRef(new Animated.Value(100)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // HANDLERS
  const handlePress = () => {
    router.push("/(auth)");
  };

  // EFFECTS
  useEffect(() => {
    if (Platform.OS === "ios") {
      setLoading(false);
      return;
    }

    const checkLogin = async () => {
      const isValid = await isLoginValid();

      if (isValid) {
        await fetchCustomerData(mobile);
        router.replace("/services");
      } else {
        setLoading(false);
      }
    };

    checkLogin();
  }, [mobile, fetchCustomerData]);

  useEffect(() => {
    if (!loading) {
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
        // ANIMATE TEXT
        Animated.timing(textOpacity, {
          toValue: 1,
          delay: 800,
          duration: 1000,
          useNativeDriver: true,
        }),
        // ANIMATE BUTTON
        Animated.timing(buttonOpacity, {
          toValue: 1,
          delay: 1600,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [loading, imageOpacity, imageTranslateY, textOpacity, buttonOpacity]);

  if (loading) {
    return (
      <Background>
        <SafeAreaView className="h-full w-full justify-center items-center">
          <Chase size={50} color="#164194" className="mt-20" />
        </SafeAreaView>
      </Background>
    );
  }

  return (
    <Background>
      <SafeAreaView className="h-full w-full">
        <View className="flex-1 w-full justify-normal items-center px-7">
          <Animated.Image
            source={images.welcome}
            className="w-[300px] h-[300px] mt-[100px]"
            resizeMode="contain"
            style={{
              opacity: imageOpacity,
              transform: [{ translateY: imageTranslateY }],
            }}
          />
          <Animated.Text
            className="text-primary font-isansbold text-[30px] mt-10 text-center w-full"
            style={{ opacity: textOpacity }}
          >
            خوش آمدید...
          </Animated.Text>

          <Animated.Text
            className="text-grey2 font-isansregular text-[17px] mt-10 text-center w-full"
            style={{ opacity: textOpacity }}
          >
            سریع‌ترین و مطمئن‌ترین راه برای ارسال بسته‌های شما، تنها با یک لمس!
          </Animated.Text>

          <Animated.View style={{ opacity: buttonOpacity, width: "100%" }}>
            <CustomButton
              title={"وارد شوید"}
              handlePress={handlePress}
              containerStyles="w-full mt-7"
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
