// IMPORTS
import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { copyPasteHandler } from "@/utils/copyPaste";
import {
  TRACKING_CODE_COPIED_MESSAGE,
  BARCODE_COPIED_MESSAGE,
} from "@/constants/messages";

const ComplaintCard = ({ item, containerStyles }) => {
  // STATUS
  const responded = [1, 2];
  const respondedWithDetails = [3, 4, 5, 6, 7, 8, 9];
  const error = [-1, -2];

  return (
    <View className={"bg-white rounded-md p-2 w-full"}>
      <View className="flex-row-reverse justify-between items-center w-full mb-2">
        <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm">
          بارکد پستی :
        </Text>

        <View className="flex-row items-start justify-center">
          <Pressable
            onPress={() => copyPasteHandler(item.srial, BARCODE_COPIED_MESSAGE)}
            className="mr-1 p-1 rounded-full bg-gray-200"
          >
            <Feather name="copy" size={14} color="black" />
          </Pressable>
          <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
            {item?.srial || "---"}
          </Text>
        </View>
      </View>

      <View className="flex-row-reverse justify-between items-center w-full mb-2">
        <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm">
          کد پیگیری :
        </Text>

        <View className="flex-row items-start justify-center">
          <Pressable
            onPress={() =>
              copyPasteHandler(item.key, TRACKING_CODE_COPIED_MESSAGE)
            }
            className="mr-1 p-1 rounded-full bg-gray-200"
          >
            <Feather name="copy" size={14} color="black" />
          </Pressable>
          <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
            {item?.key || "---"}
          </Text>
        </View>
      </View>

      <View className="flex-row-reverse justify-between items-center w-full mb-2">
        <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm">
          نوع شکایت :
        </Text>
        <Text className="font-isansregular first:leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
          {item?.typename || "---"}
        </Text>
      </View>

      <View className="flex-row-reverse justify-between items-center w-full mb-2">
        <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm">
          تاریخ صدور :
        </Text>
        <Text className="font-isansregular first:leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
          {item?.adate || "---"}
        </Text>
      </View>

      <View className="justify-center items-center w-full mb-2">
        {respondedWithDetails.includes(item.stat) ? (
          <Feather name="alert-circle" size={24} color="#ff9c00" />
        ) : responded.includes(item.stat) ? (
          <Feather name="check-circle" size={24} color="#16ed00" />
        ) : error.includes(item.stat) ? (
          <Feather name="x-circle" size={24} color="#ff1400" />
        ) : (
          <Feather name="help-circle" size={24} color="#ccc" />
        )}
      </View>
      <View className="justify-between items-center w-full">
        <Text className="font-isansregular text-center text-sm">
          {item?.rspns || "---"}
        </Text>
      </View>
    </View>
  );
};

export default ComplaintCard;
