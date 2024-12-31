// IMPORTS
import { useEffect, useRef, useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { LinearGradient } from "expo-linear-gradient";
import Service from "@/components/Service";
import { router } from "expo-router";
import Background from "@/components/Background";
import CustomModal from "@/components/CustomModal";
// import useRenderService from "@/hooks/useRenderService";
// import { filtersData } from "@/data/filters";
import { allData } from "@/data/services";
import images from "@/constants/images";
import * as SecureStore from "expo-secure-store";

const width = Dimensions.get("window").width;

// const filterReducer = (state, actions) => {
//   switch (actions.type) {
//     case "ALL":
//       return "all";
//     case "FOLLOW_UP":
//       return "followup";
//     case "REQUEST":
//       return "request";

//     default:
//       return state;
//   }
// };
const Services = () => {
  // FILTER STATE
  //   const [selected, setSelected] = useState(filtersData[0]);
  //   const [filteredItems, dispatch] = useReducer(filterReducer, "all");
  const [visible, setVisible] = useState(false);

  // ACCESS USER DATA
  const userData = useUserStore((state) => state.userData);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // FOR TESTING
  useEffect(() => {
    console.log("token ", SecureStore.getItem("token"));
    console.log("refreshToken ", SecureStore.getItem("refreshToken"));
    console.log("expireTime ", SecureStore.getItem("expireTime"));
  }, []);

  //   const handleOnFilterPress = (option, type) => {
  //     setSelected(option);
  //     dispatch({ type });
  //   };

  //   const handlePress = (item) => {
  //     if (item.nationalCodeRequired && !userData.birthDate) {
  //       setVisible(true);
  //       return;
  //     } else {
  //       if (item.url) router.push(item.url);
  //     }
  //   };

  //   const renderServices = useRenderService(handlePress);

  useEffect(() => {
    console.log("USER DATA: ", userData);
  }, [userData]);

  return (
    <>
      <CustomModal
        visible={visible}
        closeModal={() => setVisible(false)}
        title="توجه"
        description="شماره ملی شما ثبت نشده است. لطفا از پروفایل کاربری اقدام به ثبت شماره ملی نمایید."
      />
      <Background>
        <SafeAreaView className="h-full">
          <Animated.View style={{ opacity: fadeAnim }}>
            <View className="w-full">
              <View style={{ position: "relative" }}>
                <Image
                  source={images.home}
                  style={styles.heroImage}
                  resizeMode="contain"
                />
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.0)"]}
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

                <Pressable
                  onPress={() => router.push("follow")}
                  style={styles.heroTextContainer}
                >
                  <View className="flex-row justify-center items-center bg-primary px-10 py-1 rounded-md border border-[#fcdb00]">
                    <Text className="text-white font-isansbold text-lg text-center">
                      پیگیری مرسوله
                    </Text>

                    {/* <Feather
                      size={25}
                      name="arrow-right-circle"
                      color="#164194"
                    /> */}
                  </View>
                </Pressable>
              </View>
            </View>
            {/* <View className="mt-5">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  paddingHorizontal: 20,
                }}
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              >
                {filtersData.map((service) => (
                  <Pressable
                    style={[
                      styles.filterItem,
                      selected?.id === service.id && styles.selected,
                    ]}
                    key={service.id}
                    onPress={() => handleOnFilterPress(service, service.type)}
                  >
                    {service.iconName && (
                      <Feather
                        name={service.iconName}
                        size={12}
                        color={service.iconColor}
                      />
                    )}
                    <Text style={styles.filterText}>{service.label}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View> */}

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingTop: 20,
                paddingBottom: 600,
              }}
            >
              <View
                className="flex-row flex-wrap gap-y-2 justify-start items-start px-2 "
                style={{ transform: [{ scaleX: -1 }] }}
              >
                {/* {allData.map((item) => renderServices(item))} */}
                {allData.map((item, index) => (
                  <Service key={index} item={item} />
                ))}

                {/* {filteredItems === "all"
                  ? allData.map((item) => renderServices(item))
                  : filteredItems === "followup"
                  ? followUpData.map((item) => renderServices(item))
                  : filteredItems === "request"
                  ? requestData.map((item) => renderServices(item))
                  : null} */}
              </View>
            </ScrollView>
          </Animated.View>
        </SafeAreaView>
      </Background>
    </>
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
    gap: 5,
    borderColor: "#333",
    borderWidth: 0.5,
    transform: [{ scaleX: -1 }],
  },
  selected: {
    borderColor: "transparent",
    backgroundColor: "#fcdb00",
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
    height: 300,
    marginTop: 30,
    // height: height / 5,
  },

  heroTextContainer: {
    position: "absolute",
    bottom: 10,
    // backgroundColor: "#fcd900",
    // backgroundColor: "rgba(252, 217, 0, 0.7)",
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
