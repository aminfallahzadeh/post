// IMPORTS
import { View, Text } from "react-native";
import Background from "@/components/Background";
import { Title } from "@/components/Title";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  return (
    <Background>
      <SafeAreaView className="h-full">
        {/* HEADER SECTION */}
        <Title title="ثبت پیشنهاد" home={false} />

        <View className="w-full h-full justify-center items-center">
          <Text className="text-md font-isansbold text-center text-grey2">
            در حال توسعه...
          </Text>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
