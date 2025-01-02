// IMPORTS
import { useEffect, useState } from "react";
import { ScrollView, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import Service from "@/components/Service";
import { router } from "expo-router";
import Background from "@/components/Background";
import CustomModal from "@/components/CustomModal";
import CustomCarousel from "@/components/CustomCarousel";
import { allData } from "@/data/services";

const Index = () => {
  // STATES
  const [visible, setVisible] = useState(false);

  // CONSTS
  const userData = useUserStore((state) => state.userData);

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
          <View className="w-full relative">
            <CustomCarousel />

            <Pressable onPress={() => router.push("forms/follow")}>
              <View className="flex-row justify-center items-center bg-primary py-1 border border-[#fcdb00]">
                <Text className="text-white font-isansbold text-lg text-center">
                  پیگیری مرسوله
                </Text>
              </View>
            </Pressable>
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
              className="flex-row flex-wrap gap-y-2 justify-start items-start px-2 mt-5"
              style={{ transform: [{ scaleX: -1 }] }}
            >
              {allData.map((item, index) => (
                <Service key={index} item={item} />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default Index;
