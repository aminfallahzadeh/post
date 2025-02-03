// IMPORTS
import { View, Text, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { Barcode } from "expo-barcode-generator";
import { copyPasteHandler } from "@/utils/copyPaste";
import { BARCODE_COPIED_MESSAGE } from "@/constants/messages";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { trackingOrder } from "@/api/tracking";

const ParcelCard = ({ item, loadingStates, setLoadingStates }) => {
  // HANDLERS
  const onSubmit = async (barcode) => {
    setLoadingStates((prev) => ({ ...prev, [barcode]: true }));
    try {
      const response = await trackingOrder(barcode);
      console.log("TRACKING ORDER RESPONSE:", response.data);
      router.push({
        pathname: "forms/follow",
        params: { barcode },
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [barcode]: false }));
    }
  };

  return (
    <View className="w-full">
      <View className="bg-white rounded-md p-2 w-full">
        <View className="flex-row-reverse justify-between items-center w-full mb-2">
          <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm">
            نوع پیگیری :
          </Text>
          <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
            {item?.stateName || "---"}
          </Text>
        </View>

        <View className="flex-row-reverse justify-between items-center w-full mb-2">
          <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm">
            تاریخ صدور :
          </Text>
          <Text className="font-isansregular first:leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
            {item?.issueDateShamsi || "---"}
          </Text>
        </View>

        {item.state === 2 ? (
          <View className="justify-between items-center w-full mb-2">
            <View className="flex-row justify-center items-center w-full">
              <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                کد پیگیری
              </Text>
              <Pressable
                onPress={() =>
                  copyPasteHandler(item.barcode, BARCODE_COPIED_MESSAGE)
                }
                className="p-1 rounded-full bg-gray-200"
              >
                <Feather name="copy" size={14} color="black" />
              </Pressable>
            </View>

            <Barcode
              value={item.barcode}
              options={{
                format: "CODE128",
                height: "50",
              }}
            />
          </View>
        ) : (
          <View className="flex-row-reverse justify-between items-center w-full mb-2">
            <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm">
              کد مرسوله :
            </Text>

            <View className="flex-row items-start justify-center">
              <Pressable
                onPress={() =>
                  copyPasteHandler(item.barcode, BARCODE_COPIED_MESSAGE)
                }
                className="mr-1 p-1 rounded-full bg-gray-200"
              >
                <Feather name="copy" size={14} color="black" />
              </Pressable>
              <Text className="font-isansregular leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                {item.barcode}
              </Text>
            </View>
          </View>
        )}
        {item.state !== 2 && (
          <CustomButton
            title="پیگیری"
            height="h-10"
            isLoading={loadingStates[item?.barcode] || false}
            disabled={Object.values(loadingStates).some((state) => state)}
            handlePress={() => onSubmit(item?.barcode)}
          />
        )}
      </View>
    </View>
  );
};

export default ParcelCard;
