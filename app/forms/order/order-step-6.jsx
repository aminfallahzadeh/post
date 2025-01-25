// IMPORTS
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "@/components/Title";
import { LinearGradient } from "expo-linear-gradient";

const OrderStep6 = () => {
  // CONSTS
  const order = useUserStore((state) => state.order);

  // DEBUG
  useEffect(() => {
    console.log("ORDER IN RESID: ", order);
  }, [order]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <View className="flex-1">
          <Title title={"رسید سفارش"} progress={100} />
          <View className="justify-center items-center mt-5 px-4">
            <View
              style={styles.container}
              className="w-full bg-white rounded-md p-2 justify-center items-center border border-grey2"
            >
              <View>
                <Text className="font-isansmedium text-base">
                  ** مبالغ به ریال می باشد **
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

              <View className="flex-row-reverse justify-between w-full items-center">
                <Text className="font-isansdemibold text-grey2 text-[15px]">
                  کد پیگیری
                </Text>
                <Text className="font-isansregular">
                  {order.trackingId || "---"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default OrderStep6;

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
