// NATIVE IMPORTS
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

// COMPONENTS
import CustomButton from "@/components/CustomButton";

const Step1 = () => {
  return (
    <SafeAreaView className="bg-grey1 h-full px-10">
      <Text className="text-primary font-isansbold text-center text-[20px]">
        ثبت درخواست پست امانت
      </Text>

      <View>
        <CustomButton
          title={<Feather name="arrow-left" size={24} color="black" />}
          handlePress={() => router.back()}
          containerStyles={"w-full"}
        />

        <CustomButton
          title="ادامه"
          isLoading={true}
          containerStyles={"w-full"}
          handlePress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default Step1;
