// IMPORTS
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUserStore } from "@/store";
import { router } from "expo-router";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { Title } from "@/components/Title";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";

const OrderStep6 = () => {
  // CONSTS
  const order = useUserStore((state) => state.order);
  const setOrder = useUserStore((state) => state.setOrder);

  // HANDLERS
  const onSubmit = () => {
    setOrder([]);
    router.replace("/");
  };

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
                  {order?.trackingId || "---"}
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
                  نوع سرویس
                </Text>
                <Text className="font-isansregular">
                  {order?.servicetypeName || "---"}
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
                  نوع مرسوله
                </Text>
                <Text className="font-isansregular">
                  {order?.parceltypeName || "---"}
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
                  فرستنده
                </Text>
                <Text className="font-isansregular">
                  {order?.sendername + " " + order?.senderLastname || "---"}
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
                  گیرنده
                </Text>
                <Text className="font-isansregular">
                  {order?.receivername + " " + order?.receiverLastname || "---"}
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
                  آدرس فرستنده
                </Text>
                <Text
                  className="font-isansregular flex-1 text-left break-words mr-10"
                  style={{ flexWrap: "wrap" }}
                >
                  {order?.senderaddress || "---"}
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
                  آدرس گیرنده
                </Text>
                <Text
                  className="font-isansregular flex-1 text-left break-words mr-10"
                  style={{ flexWrap: "wrap" }}
                >
                  {order?.receiveraddress || "---"}
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full justify-center items-center mt-5">
            <Text className="font-isansregular text-grey2 text-sm">
              برای پیگیری به صفحه پست من مراجعه کنید
            </Text>
          </View>
        </View>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton title="بازگشت" handlePress={onSubmit} />
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
