// IMPORTS
import { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Animated,
  View,
  Text,
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
import { allData } from "@/data/services";
import images from "@/constants/images";

const width = Dimensions.get("window").width;

const Index = () => {
  // STATES
  const [visible, setVisible] = useState(false);

  // CONSTS
  const userData = useUserStore((state) => state.userData);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // HANDLERS
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // DEBUG
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
                  onPress={() => router.push("forms/follow")}
                  style={styles.heroTextContainer}
                >
                  <View className="flex-row justify-center items-center bg-primary px-10 py-1 rounded-md border border-[#fcdb00]">
                    <Text className="text-white font-isansbold text-lg text-center">
                      پیگیری مرسوله
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>

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
                {allData.map((item, index) => (
                  <Service key={index} item={item} />
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  heroImage: {
    width,
    height: 300,
    marginTop: 20,
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
