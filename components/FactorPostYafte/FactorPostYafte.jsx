// IMPORTS
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { separateByThousand } from "@/utils/numberSeparator";

export const FactorPostYafte = ({ data }) => {
  return (
    <View
      style={styles.container}
      className="w-full bg-white rounded-md p-2 justify-center items-center border border-grey2"
    >
      <View className="flex-row-reverse justify-between w-full items-center flex-wrap">
        <Text className="font-isansdemibold text-grey2 text-[15px]">
          شماره فاکتور
        </Text>
        <Text className="font-isansregular">{data.id}</Text>
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
          مبلغ درخواست ارسال :
        </Text>
        <Text className="font-isansregular">
          {separateByThousand(data.amount)} ریال
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
          مالیات بر ارزش افزوده :
        </Text>
        <Text className="font-isansregular">
          {separateByThousand(data?.tax)} ریال
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
          هزینه بسته بندی :
        </Text>
        <Text className="font-isansregular">
          {separateByThousand(data?.escrow)} ریال
        </Text>
      </View>

      <View className="w-full bg-primary h-[2px] mt-5 mb-5" />

      <View className="flex-row-reverse justify-between w-full items-center">
        <Text className="font-isansdemibold text-grey2 text-[15px]">
          جمع کل
        </Text>
        <Text className="font-isansregular">
          {separateByThousand(data?.tax + data?.amount + data?.escrow)} ریال
        </Text>
      </View>
    </View>
  );
};

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
