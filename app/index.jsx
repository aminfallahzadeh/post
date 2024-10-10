// REACT IMPORTS
import { useEffect, useRef } from "react";

// NATIVE IMPORTS
import { View, ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// COMPONETNS
import CustomButton from "../components/CustomButton";

// ASSETS
import images from "../constants/images";

const Index = () => {
  // ANIMATIONS
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const imageTranslateY = useRef(new Animated.Value(100)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    router.push("/login");
  };

  // FOR DEVELOPMENT
  const removeTokens = async () => {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("refreshToken");
    console.log("tokens removed");
  };

  useEffect(() => {
    removeTokens();
  }, []);

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
  }, [imageOpacity, imageTranslateY, textOpacity, buttonOpacity]);

  return (
    <SafeAreaView className="bg-grey1 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full justify-normal items-center px-7">
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
            className="text-primary font-isansbold text-[30px] mt-10"
            style={{ opacity: textOpacity }}
          >
            خوش آمدید...
          </Animated.Text>

          <Animated.Text
            className="text-grey2 font-isansregular text-[17px] mt-10 text-center"
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
      </ScrollView>

      <StatusBar />
    </SafeAreaView>
  );
};

export default Index;
