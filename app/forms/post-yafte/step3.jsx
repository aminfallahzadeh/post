// IMPORTS
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { POST_YAFTE } from "@/constants/consts";
import { Title } from "@/components/Title";

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
          <Title title={POST_YAFTE} progress={100} home={true} />

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
