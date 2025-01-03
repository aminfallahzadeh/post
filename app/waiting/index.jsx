// IMPORTS
import { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Background } from "@/components";
import { Title } from "@/components/Title";
import * as Linking from "expo-linking";

const Index = () => {
  // CONSTS
  const { url } = useLocalSearchParams();

  // EFFECTS
  useEffect(() => {
    router.push(url);
  }, [url]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        {/* HEADER SECTION */}
        <Title title="در انتظار پرداخت" home={false} back={false} />

        <View className="w-full h-full justify-center items-center">
          <Text className="text-center font-isansbold text-lg">
            لطفا پرداخت خود را انجام دهید...
          </Text>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
