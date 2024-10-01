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

// DATA
import { filtersData } from "../data/filters";
import {
  postServicesData,
  costLetterData,
  complaintData,
} from "../data/services";

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

  const handlePress = (url) => {
    router.push(url);
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
            {filtersData.map((service) => (
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

        <ScrollView
          contentContainerStyle={{ paddingBottom: 170 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-10">
            <Text className="text-primary font-isansbold text-[15px] text-right px-5">
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
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handlePress(item.url)}
                >
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
                      <Feather name={item.iconName} size={20} color={"white"} />
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
            <Text className="text-primary font-isansbold text-[15px] text-right px-5">
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
              {complaintData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handlePress(item.url)}
                >
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
                      <Feather name={item.iconName} size={20} color={"white"} />
                    </LinearGradient>
                    <Text className="text-black font-isansmedium text-[12px]">
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={{ flex: 1, marginTop: 20, paddingHorizontal: 20 }}>
            <LinearGradient
              colors={["#4c669f", "#00075a"]}
              style={styles.carouselContainer}
            >
              <Carousel
                loop
                width={width * 0.8}
                height={width / 3}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={1000}
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
            </LinearGradient>
          </View>

          <View className="mt-6">
            <Text className="text-primary font-isansbold text-[15px] text-right px-5">
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
                    <Feather name={item.iconName} size={20} color={"white"} />
                  </LinearGradient>
                  <Text className="text-black font-isansmedium text-[12px]">
                    {item.title}
                  </Text>
                </View>
              ))}
            </ScrollView>
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
    padding: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },

  carouselContainer: {
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
