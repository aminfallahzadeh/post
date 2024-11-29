// IMPORTS
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";
import { POST_YAFTE } from "@/constants/consts";

export default function Step3() {
  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <View
            className="flex-col w-full bg-secondary z-10 justify-center items-center relative"
            style={styles.headerContainer}
          >
            <View className="flex-row w-full justify-between items-center">
              <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
                {POST_YAFTE}
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={100} />
            </View>
          </View>

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
              "درخواست شما با موفقیت ثبت شد"
            </Text>
            <Text className="text-grey2 font-isansregular text-[15px] text-center mt-5">
              "نتیجه و کد پیگیری از طریق پیامک ارسال خواهد شد"
            </Text>
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
}

const styles = StyleSheet.create({
  inputContainer: {
    columnGap: 10,
  },
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  postalCodeContainers: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    minHeight: 100,
  },
});
