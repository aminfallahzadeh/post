// IMPORTS
import { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Background, CustomButton } from "@/components";
import { Title } from "@/components/Title";

const Index = () => {
  // CONSTS
  const { url } = useLocalSearchParams();

  // EFFECTS
  useEffect(() => {
    if (url) {
      //   router.push(url);
      console.log(url);
    }
  }, [url]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 90,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <Title title="در انتظار پرداخت" home={false} back={false} />

          <View className="w-full h-full justify-center items-center">
            {url ? (
              <Text className="text-center font-isansbold text-lg">
                لطفا پرداخت خود را انجام دهید...
              </Text>
            ) : (
              <Text className="text-center font-isansbold text-lg">
                خطا در ورود به درگاه بانک!
              </Text>
            )}
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full flex-row z-10 px-4 bg-gray-100 py-4">
          <View className="flex-1 mr-2">
            <CustomButton
              title="انصراف"
              bgColor="bg-red-500"
              titleColor="text-white"
              handlePress={() => router.replace("/")}
            />
          </View>

          <View className="flex-1 ml-2">
            <CustomButton
              title="پرداخت"
              disabled={url ? false : true}
              handlePress={() => {
                router.push(url);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
