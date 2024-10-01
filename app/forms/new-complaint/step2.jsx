// NATIVE IMPORTS
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONETNS
import ProgressBar from "@/components/ProgressBar";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

// EXPO IMPORTS
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const Step2 = () => {
  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between items-center min-h-full">
      {/* TOP SECTION */}

      <View className="flex-col pt-10 w-full">
        <Text className="text-primary font-isansbold text-center text-[20px]">
          ثبت شکایت
        </Text>

        <ProgressBar progress={66} style={"mt-4"} />
      </View>

      {/* FORM FIELDS */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col gap-3 w-full">
          <View className="mb-2">
            <FormField title="نام :" keyboardType="text" type={"text"} />
          </View>
          <View className="mb-2">
            <FormField
              title="نام خانوادگی :"
              keyboardType="text"
              type={"text"}
            />
          </View>

          <View className="mb-2">
            <FormField title="کد ملی :" keyboardType="text" type={"text"} />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* BOTTOM SECTION */}

      <View className="flex-row justify-between items-center w-full pb-10">
        <View className="flex-1 mr-2">
          <CustomButton
            title={<Feather name="arrow-left" size={24} color="black" />}
            handlePress={() => router.back()}
          />
        </View>
        <View className="flex-1 ml-2">
          <CustomButton
            title="ادامه"
            handlePress={() => router.push("forms/new-complaint/step3")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step2;
