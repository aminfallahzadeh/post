// IMPORTS
import { View, Text } from "react-native";

export const PostCodeCard = ({ item }) => {
  return (
    <View className="bg-white rounded-md px-5 py-2 w-full">
      <View className="flex-row-reverse justify-between items-center w-full mb-2">
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
          شماره پیگیری :
        </Text>
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
          {item.trackingID}
        </Text>
      </View>

      <View className="flex-row-reverse justify-between items-center w-full mt-2 mb-2">
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
          کد پستی :
        </Text>
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
          {item.postcode}
        </Text>
      </View>
    </View>
  );
};
