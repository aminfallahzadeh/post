// IMPORTS
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Background, CustomButton } from "@/components";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";

const Step2 = () => {
  // CONSTS
  const gheramatResult = useUserStore((state) => state.gheramatResult);

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
          <Title title={"درخواست غرامت"} progress={100} home={true} />

          {/* RESULT */}
          <View className="w-full px-5">
            <View
              className={
                "w-full rounded-md mt-20 p-5 items-center justify-center"
              }
              style={styles.postalCodeContainers}
            >
              <View className="mt-1 ml-1">
                <Feather name="check-circle" size={40} color="green" />
              </View>
              <Text className="text-grey2 font-isansbold text-[20px] text-center mt-5">
                درخواست شما با موفقیت ثبت شد
              </Text>

              <View className="mt-5 flex-row-reverse justify-center items-center">
                <Text className="text-grey2 font-isansregular text-[15px]">
                  کد پیگیری :
                </Text>
                <Text className="text-grey2 font-isansbold text-[15px]">
                  {gheramatResult?.trackingId}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="بازگشت"
            handlePress={() => router.replace("/services")}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Step2;

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
});
