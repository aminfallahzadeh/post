// IMPORTS
import { View, Text } from "react-native";
import Background from "@/components/Background";
import { Title } from "@/components/Title";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Image, Pressable } from "react-native";
import images from "@/constants/images";

const Index = () => {
  return (
    <Background>
      <SafeAreaView className="h-full">
        {/* HEADER SECTION */}
        <Title title="تماس با ما" home={false} />

        <View className="w-full h-full justify-start items-center mt-10 px-5">
          <Text className="text-md font-isansbold text-right text-grey2 w-full">
            شاید ساده ترین و آسان ترین راه برای تماس با یک شرکت از طریق "تلفن"
            باشد.
          </Text>

          <Text className="text-md font-isansbold text-right text-grey2 mt-5 w-full">
            شماره تلفن : ۱۹۳
          </Text>

          <View className="w-full h-[2px] bg-grey3 rounded-lg mt-5" />

          <Pressable
            className="w-full flex-row justify-end items-center mt-5"
            onPress={() => {
              router.push("https://gap.im/nationalpost");
            }}
          >
            <Text className="text-md font-isansregular text-right text-grey2 mr-2">
              گپ
            </Text>
            <Image source={images.gap} className="w-[30px] h-[30px]" />
          </Pressable>

          <Pressable
            className="w-full flex-row justify-end items-center mt-5"
            onPress={() => {
              router.push("https://sapp.ir/nationalpost");
            }}
          >
            <Text className="text-md font-isansregular text-right text-grey2 mr-2">
              سروش +
            </Text>
            <Image source={images.soroush} className="w-[30px] h-[30px]" />
          </Pressable>

          <Pressable
            className="w-full flex-row justify-end items-center mt-5"
            onPress={() => {
              router.push("https://www.aparat.com/nationalpost");
            }}
          >
            <Text className="text-md font-isansregular text-right text-grey2 mr-2">
              آپارات
            </Text>
            <Image source={images.aparat} className="w-[30px] h-[30px]" />
          </Pressable>

          <Pressable
            className="w-full flex-row justify-end items-center mt-5"
            onPress={() => {
              router.push("https://rubika.ir/irannationalpost");
            }}
          >
            <Text className="text-md font-isansregular text-right text-grey2 mr-2">
              روبیکا
            </Text>
            <Image source={images.rubika} className="w-[30px] h-[30px]" />
          </Pressable>

          <Pressable
            className="w-full flex-row justify-end items-center mt-5"
            onPress={() => {
              router.push("https://ble.ir/nationalpost");
            }}
          >
            <Text className="text-md font-isansregular text-right text-grey2 mr-2">
              بله
            </Text>
            <Image source={images.bale} className="w-[30px] h-[30px]" />
          </Pressable>

          <Pressable
            className="w-full flex-row justify-end items-center mt-5"
            onPress={() => {
              router.push("https://virasty.com/irannationalpost");
            }}
          >
            <Text className="text-md font-isansregular text-right text-grey2 mr-2">
              ویراستی
            </Text>
            <Image source={images.virasti} className="w-[30px] h-[30px]" />
          </Pressable>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
