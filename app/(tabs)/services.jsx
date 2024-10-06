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
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import { LinearGradient } from "expo-linear-gradient";
import { Feather, AntDesign, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

// LIBRARY IMPORTS
import Background from "@/components/Background";

// DATA
import { filtersData } from "../data/filters";
import {
  postServicesData,
  costLetterData,
  complaintData,
  allData,
} from "../data/services";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Services = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // DEBUGGING
  const getTokens = async function () {
    let token = await SecureStore.getItemAsync("token");
    let refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (token && refreshToken) {
      alert("🔐 Here's your token 🔐 \n" + token);
      alert("🔐 Here's your token 🔐 \n" + refreshToken);
    } else {
      alert("No values stored under that key.");
    }
  };

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
    require("../../assets/images/announce-4.png"),
  ];

  const handlePress = (url) => {
    if (url) router.push(url);
    return;
  };

  return (
    <Background>
      <SafeAreaView className="h-full">
        <Animated.View className="mt-16" style={{ opacity: fadeAnim }}>
          <View className="w-full">
            <View style={{ position: "relative" }}>
              <Image source={images[2]} style={styles.heroImage} />
              <LinearGradient
                colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
                style={[
                  styles.heroImage,
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                ]}
              />
              <View style={styles.heroTextContainer}>
                <TouchableOpacity onPress={() => alert("hello")}>
                  <View className="flex-row justify-center items-center gap-x-2">
                    <Text className="text-tertiary font-isansbold text-2xl text-center">
                      پیگیری مرسوله
                    </Text>

                    <Feather
                      size={25}
                      name="arrow-right-circle"
                      color="#164194"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="mt-5">
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
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 300 }}
          >
            <View
              className="flex-row flex-wrap gap-y-5 justify-start items-start mt-5 px-2"
              style={{ transform: [{ scaleX: -1 }] }}
            >
              {allData.map((item) => (
                <Pressable
                  className="items-center gap-2 flex-shrink-0"
                  key={item.id}
                  style={{ width: "26%", transform: [{ scaleX: -1 }] }}
                  onPress={() => handlePress(item.url)}
                >
                  <LinearGradient
                    colors={item.gradientColors}
                    style={styles.postItemStyle}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                  >
                    {item.iconName === "exclamationcircle" ? (
                      <AntDesign name={item.iconName} size={28} color="white" />
                    ) : item.iconName === "address-card" ? (
                      <FontAwesome
                        name={item.iconName}
                        size={28}
                        color="white"
                      />
                    ) : (
                      <Feather name={item.iconName} size={30} color="white" />
                    )}
                  </LinearGradient>

                  <Text
                    className="text-black font-isansmedium text-[12px]"
                    style={{ minHeight: 35, textAlign: "center" }}
                    numberOfLines={2}
                  >
                    {item.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* <ScrollView
            contentContainerStyle={{ paddingBottom: 170 }}
            showsVerticalScrollIndicator={false}
          >
            <View>
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
                        <Feather
                          name={item.iconName}
                          size={20}
                          color={"white"}
                        />
                      </LinearGradient>
                      <Text className="text-black font-isansmedium text-[12px]">
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </ScrollView> */}
          {/* 
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
          </View> */}
        </Animated.View>
      </SafeAreaView>
    </Background>
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
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  carouselContainer: {
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  heroImage: {
    width,
    height: height / 5,
  },

  heroTextContainer: {
    position: "absolute",
    bottom: 25,
    backgroundColor: "#fcd900",
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // shadowColor: "#fff",
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.9,
    // shadowRadius: 10,
    // elevation: 20,
  },
});
