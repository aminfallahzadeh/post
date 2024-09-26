// REACT IMPORTS
import { useEffect, useRef } from "react";

// NATIVE IMPORTS
import {
  ScrollView,
  Animated,
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// LIBRARY IMPORTS
import Carousel from "react-native-reanimated-carousel";

const Services = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get("window").width;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const images = [
    require("../../assets/images/header-1.jpg"),
    require("../../assets/images/header-2.jpg"),
  ];

  const servicesData = [
    {
      id: "1",
      title: "همه",
      gradientColors: ["#164194", "#a3a3a3"],
      iconName: null,
    },
    {
      id: "2",
      title: "پست",
      gradientColors: ["#164194", "#fcd900"],
      iconName: "truck",
      iconColor: "#000",
    },
    {
      id: "3",
      title: "نرخ نامه",
      gradientColors: ["#164194", "#fcd900"],
      iconName: "credit-card",
      iconColor: "#000",
    },
    {
      id: "4",
      title: "غرامت",
      gradientColors: ["#164194", "#fcd900"],
      iconName: "thumbs-up",
      iconColor: "#000",
    },
    {
      id: "5",
      title: "احراز هویت",
      gradientColors: ["#164194", "#fcd900"],
      iconName: "user",
      iconColor: "#000",
    },
    {
      id: "6",
      title: "شکایت",
      gradientColors: ["#164194", "#fcd900"],
      iconName: "frown",
      iconColor: "#000",
    },
    {
      id: "7",
      title: "صندوق پستی",
      gradientColors: ["#164194", "#fcd900"],
      iconName: "box",
      iconColor: "#000",
    },
    {
      id: "8",
      title: "تخفیف ها",
      gradientColors: ["#164194", "#fcd900"],
      iconName: "check-circle",
      iconColor: "#000",
    },
  ];

  const postServicesData = [
    {
      id: "9",
      title: "ثبت سفارش",
      gradientColors: ["#067800", "#74ff66"],
      iconName: "clipboard",
    },
    {
      id: "10",
      title: "دریافت آیدی",
      gradientColors: ["#067800", "#74ff66"],
      iconName: "hash",
    },
    {
      id: "11",
      title: "صدور گواهی",
      gradientColors: ["#067800", "#74ff66"],
      iconName: "plus",
    },
    {
      id: "12",
      title: "پست یافته",
      gradientColors: ["#067800", "#74ff66"],
      iconName: "truck",
    },
  ];

  const costLetterData = [
    {
      id: "13",
      title: "نرخ مرسولات",
      gradientColors: ["#a5009e", "#f5aaff"],
      iconName: "pie-chart",
    },
    {
      id: "14",
      title: "زمان مرسولات",
      gradientColors: ["#a5009e", "#f5aaff"],
      iconName: "clock",
    },
    {
      id: "15",
      title: "تفکیک هزینه",
      gradientColors: ["#a5009e", "#f5aaff"],
      iconName: "divide",
    },
    {
      id: "16",
      title: "هزینه جانبی",
      gradientColors: ["#a5009e", "#f5aaff"],
      iconName: "layout",
    },
  ];

  const handlePress = () => {
    router.push("/forms/type");
  };

  return (
    <SafeAreaView className="bg-grey1 h-full">
      <Animated.View className="mt-20" style={{ opacity: fadeAnim }}>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "cetner",
              gap: 10,
              paddingHorizontal: 20,
            }}
            style={{
              transform: [{ scaleX: -1 }],
            }}
          >
            {servicesData.map((service) => (
              <View style={styles.filterItem} key={service.id}>
                {service.iconName && (
                  <Feather
                    name={service.iconName}
                    size={12}
                    color={service.iconColor}
                  />
                )}
                <Text style={styles.filterText}>{service.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <ScrollView>
          <View className="mt-10">
            <Text className="text-primary font-isansbold text-[15px] text-right px-10">
              خدمات پستی :
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "cetner",
                gap: 20,
                paddingHorizontal: 20,
                marginTop: 20,
              }}
              style={{
                transform: [{ scaleX: -1 }],
              }}
            >
              {postServicesData.map((item) => (
                <TouchableOpacity key={item.id} onPress={handlePress}>
                  <View
                    key={item.id}
                    className="items-center justify-center gap-y-2"
                    style={{
                      transform: [{ scaleX: -1 }],
                    }}
                  >
                    <LinearGradient
                      key={item.id}
                      colors={item.gradientColors}
                      style={styles.postItemStyle}
                    >
                      <Feather name={item.iconName} size={30} color={"white"} />
                    </LinearGradient>
                    <Text className="text-black font-isansmedium text-[12px]">
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mt-10">
            <Text className="text-primary font-isansbold text-[15px] text-right px-10">
              خدمات نرخ نامه :
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "cetner",
                gap: 20,
                paddingHorizontal: 20,
                marginTop: 20,
              }}
              style={{
                transform: [{ scaleX: -1 }],
              }}
            >
              {costLetterData.map((item) => (
                <View
                  className="items-center justify-center gap-y-2"
                  style={{
                    transform: [{ scaleX: -1 }],
                  }}
                  key={item.id}
                >
                  <LinearGradient
                    key={item.id}
                    colors={item.gradientColors}
                    style={styles.postItemStyle}
                  >
                    <Feather name={item.iconName} size={30} color={"white"} />
                  </LinearGradient>
                  <Text className="text-black font-isansmedium text-[12px]">
                    {item.title}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={{ flex: 1, marginTop: 20 }}>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              data={images}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log("current index:", index)}
              renderItem={({ index }) => (
                <View
                  style={{
                    flex: 1,
                    borderRadius: 20,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={images[index]}
                    style={{ width, borderRadius: 20 }}
                  />
                </View>
              )}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Services;

const styles = StyleSheet.create({
  filterItem: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: Platform.OS === "ios" ? "row" : "row-reverse",
    direction: "rtl",
    gap: 5,
    borderColor: "#333",
    borderWidth: 0.5,
    transform: [{ scaleX: -1 }],
  },
  filterText: {
    color: "#000",
    fontSize: 14,
    lineHeight: 16,
    textAlign: "center",
  },
  postItemStyle: {
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
