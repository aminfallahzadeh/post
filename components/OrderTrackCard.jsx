// NATIVE IMPORTS
import { View, Text } from "react-native";

const OrderTrackCard = ({ item }) => {
  const date = item.tfDate.split(" ")[0];
  return (
    <View className="w-full my-5">
      <View className="flex-row-reverse justify-between mb-2">
        <Text className="text-primary font-isansbold text-sm">تاریخ :</Text>
        <Text className="text-grey2 font-isansdemibold text-sm">{date}</Text>
      </View>

      <View className="w-full h-[1px] bg-gray-400" />

      <View className="mt-4">
        <Text className="text-primary font-isansbold text-sm text-right">
          توضیحات :
        </Text>
        <Text className="text-grey2 font-isansdemibold text-sm mt-1 text-right">
          {item.describe}
        </Text>
      </View>
    </View>
  );
};

export default OrderTrackCard;
