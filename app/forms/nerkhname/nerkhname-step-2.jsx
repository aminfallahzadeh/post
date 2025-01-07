// IMPORTS
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useUserStore } from "@/store";
import { Background, CustomButton } from "@/components";
import { LinearGradient } from "expo-linear-gradient";
import { Title } from "@/components/Title";
import { separateByThousand } from "@/utils/numberSeparator";

const NerkhnameStep2 = () => {
  // STATES
  // CONSTS
  const nerkhname = useUserStore((state) => state.nerkhname);

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
          <Title
            title={`${nerkhname?.servicetype?.label} : نرخ نامه`}
            home={true}
            progress={100}
          />

          <View className="w-full px-5 mt-5">
            <View
              style={styles.container}
              className="w-full bg-white rounded-md p-2 justify-center items-center border border-grey2"
            >
              <View>
                <Text className="font-isansmedium text-base">
                  ** مبالغ به ریال می باشد **
                </Text>
              </View>

              <View className="w-full bg-primary h-[2px] mt-5 mb-5" />

              <View className="flex-row-reverse justify-between w-full items-center flex-wrap">
                <Text className="font-isansdemibold text-grey2 text-[15px]">
                  کرایه پستی
                </Text>
                <Text className="font-isansregular">
                  {separateByThousand(nerkhname?.postfare)}
                </Text>
              </View>

              <View className="mt-2 mb-2 w-full">
                <LinearGradient
                  colors={["transparent", "#000", "transparent"]}
                  style={styles.gradientLineHorizontal}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>

              <View className="flex-row-reverse justify-between w-full items-center flex-wrap">
                <Text className="font-isansdemibold text-grey2 text-[15px]">
                  حق السهم پستی
                </Text>
                <Text className="font-isansregular">
                  {separateByThousand(nerkhname?.postprice)}
                </Text>
              </View>

              <View className="mt-2 mb-2 w-full">
                <LinearGradient
                  colors={["transparent", "#000", "transparent"]}
                  style={styles.gradientLineHorizontal}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>

              <View className="flex-row-reverse justify-between w-full items-center flex-wrap">
                <Text className="font-isansdemibold text-grey2 text-[15px]">
                  بیمه
                </Text>
                <Text className="font-isansregular">
                  {separateByThousand(nerkhname?.insuranceprice)}
                </Text>
              </View>

              <View className="mt-2 mb-2 w-full">
                <LinearGradient
                  colors={["transparent", "#000", "transparent"]}
                  style={styles.gradientLineHorizontal}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>

              <View className="flex-row-reverse justify-between w-full items-center flex-wrap">
                <Text className="font-isansdemibold text-grey2 text-[15px]">
                  مالیات
                </Text>
                <Text className="font-isansregular">
                  {separateByThousand(nerkhname?.tax)}
                </Text>
              </View>

              <View className="w-full bg-primary h-[2px] mt-5 mb-5" />

              <View className="flex-row-reverse justify-between w-full items-center flex-wrap">
                <Text className="font-isansdemibold text-grey2 text-[15px]">
                  مبلغ کل
                </Text>
                <Text className="font-isansregular">
                  {separateByThousand(nerkhname?.totalprice)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="بازگشت"
            handlePress={() => {
              router.replace("/");
            }}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhnameStep2;

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  gradientLineHorizontal: {
    width: "100%",
    height: 2,
  },
});
