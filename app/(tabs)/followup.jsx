// REACT IMPORTS
import { useEffect, useRef } from "react";

// NATIVE IMPORTS
import { ScrollView, Animated, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

// COMPONENTS
import SliderItem from "@/components/SliderItem";

// LIBRARY IMPORTS
import LottieView from "lottie-react-native";

// ASSETS
import WhereLottie from "../../assets/animations/where-lottie.json";

const FollowUp = ({ newsList }) => {
  const DATA = [
    {
      id: "1",
      title: "ربات های تجزیه گر نمادی از هوشمندسازی پست",
      image: "announce-5.png",
    },
    {
      id: "2",
      title: "همیشه همه جا با پست ایران",
      image: "announce-2.png",
    },
    {
      id: "3",
      title: "خیلی دور٬ خیلی نزدیک؛ پست همراه همیشگی شما!",
      image: "announce-3.png",
    },
    {
      id: "4",
      title: "تا آخرش با شما هستیم ...",
      image: "announce-4.png",
    },
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView bg-grey1 h-full>
      <Animated.View className="mt-20" style={{ opacity: fadeAnim }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 20,
          }}
        >
          {DATA.map((item, index) => (
            <SliderItem key={item.id} slideItem={item} />
          ))}
        </ScrollView>

        <View className="flex-row justify-center items-center w-full px-14 py-5">
          <View className="items-center gap-2">
            <Text
              className="text-primary font-isansbold text-[25px]"
              numberOfLines={2}
            >
              پیگیری مرسولات
            </Text>

            <Text className="text-secondary font-isansmedium text-[20px]">
              پستی و سازمانی
            </Text>
          </View>

          <LottieView
            source={WhereLottie}
            autoPlay
            loop
            className="w-[150px] h-[120px]"
          />
        </View>

        <View className="flex-row justify-center items-center px-4 gap-x-7 gap-y-4 py-8 flex-wrap">
          <View className="items-center gap-2">
            <LinearGradient
              colors={["#067800", "#74ff66"]}
              style={{
                borderRadius: 10,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 8,
                width: 55,

                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            >
              <MaterialCommunityIcons name="numeric" size={30} color="white" />
            </LinearGradient>

            <Text className="text-black font-isansmedium">کد پستی</Text>
          </View>

          <View className="items-center gap-2 ">
            <LinearGradient
              colors={["#a5009e", "#f5aaff"]}
              style={{
                borderRadius: 10,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 8,
                width: 55,

                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            >
              <FontAwesome5 name="hand-paper" size={30} color="white" />
            </LinearGradient>

            <Text className="text-black font-isansmedium">شکایت</Text>
          </View>

          <View className="items-center gap-2">
            <LinearGradient
              colors={["#1725dc", "#87d4dc"]}
              style={{
                borderRadius: 10,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 8,
                width: 55,
                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            >
              <MaterialCommunityIcons
                name="truck-cargo-container"
                size={30}
                color="white"
              />
            </LinearGradient>

            <Text className="text-black font-isansmedium">پست یافته</Text>
          </View>

          <View className="items-center gap-2">
            <LinearGradient
              colors={["#1725dc", "#87d4dc"]}
              style={{
                borderRadius: 10,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 8,
                width: 55,
                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            >
              <MaterialCommunityIcons name="numeric" size={30} color="white" />
            </LinearGradient>

            <Text className="text-black font-isansmedium">پست یافته</Text>
          </View>

          <View className="items-center gap-2">
            <LinearGradient
              colors={["#1725dc", "#87d4dc"]}
              style={{
                borderRadius: 10,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 8,
                width: 55,
                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            >
              <MaterialCommunityIcons name="numeric" size={30} color="white" />
            </LinearGradient>

            <Text className="text-black font-isansmedium">پست یافته</Text>
          </View>

          <View className="items-center gap-2 ">
            <LinearGradient
              colors={["#a5009e", "#f5aaff"]}
              style={{
                borderRadius: 10,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 8,
                width: 55,

                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            >
              <FontAwesome5 name="hand-paper" size={30} color="white" />
            </LinearGradient>

            <Text className="text-black font-isansmedium">شکایت</Text>
          </View>

          <View className="items-center gap-2 ">
            <LinearGradient
              colors={["#a5009e", "#f5aaff"]}
              style={{
                borderRadius: 10,
                padding: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
                elevation: 8,
                width: 55,

                justifyContent: "center",
                alignItems: "center",
              }}
              start={{ x: 0.5, y: 1 }}
              end={{ x: 0.5, y: 0 }}
            >
              <FontAwesome5 name="hand-paper" size={30} color="white" />
            </LinearGradient>

            <Text className="text-black font-isansmedium">شکایت</Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default FollowUp;
