// REACT IMPORTS
import { useEffect, useRef, useState, useReducer } from "react";

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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// STORE
import { useUserStore } from "@/store";

// EXPO IMPORTS
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

// COMPONENTS
import Background from "@/components/Background";
import CustomModal from "@/components/CustomModal";

// HOOKS
import useRenderService from "@/hooks/useRenderService";

// DATA
import { filtersData } from "@/data/filters";
import { followUpData, requestData } from "@/data/services";
import { allData } from "@/data/services";

// ASSETS
import images from "@/constants/images";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const filterReducer = (state, actions) => {
  switch (actions.type) {
    case "ALL":
      return "all";
    case "FOLLOW_UP":
      return "followup";
    case "REQUEST":
      return "request";

    default:
      return state;
  }
};
const Services = () => {
  // FILTER STATE
  const [selected, setSelected] = useState(filtersData[0]);
  const [filteredItems, dispatch] = useReducer(filterReducer, "all");
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

  const handleOnFilterPress = (option, type) => {
    setSelected(option);
    dispatch({ type });
  };

  const handlePress = (item) => {
    if (item.nationalCodeRequired && !userData.birthDate) {
      setVisible(true);
      return;
    } else {
      if (item.url) router.push(item.url);
    }
  };

  const renderSrvices = useRenderService(handlePress);

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
          <Animated.View className="mt-16" style={{ opacity: fadeAnim }}>
            <View className="w-full">
              <View style={{ position: "relative" }}>
                <Image source={images.announce} style={styles.heroImage} />
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
                  <Pressable onPress={() => router.push("follow")}>
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
                  </Pressable>
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
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 300 }}
            >
              <View
                className="flex-row flex-wrap gap-y-4 justify-start mt-5 px-2"
                style={{ transform: [{ scaleX: -1 }] }}
              >
                {filteredItems === "all"
                  ? allData.map((item) => renderSrvices(item))
                  : filteredItems === "followup"
                  ? followUpData.map((item) => renderSrvices(item))
                  : filteredItems === "request"
                  ? requestData.map((item) => renderSrvices(item))
                  : null}
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
  },
});
