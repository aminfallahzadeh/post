// REACT IMPROTS
import { useEffect } from "react";

// NATIVE IMPROTS
import { View, Text, StyleSheet } from "react-native";

const AddressCard = ({ item }) => {
  // DEBUGGING
  useEffect(() => {
    console.log("THIS IS THE ITEM:", item);
  }, [item]);

  return (
    <View className="w-full bg-gray-200 p-2 rounded-md">
      <View className="flex-row-reverse justify-between items-center">
        <Text className="text-grey2 font-isansdemibold text-[15px]">
          کد پستی :
        </Text>

        <Text className="text-grey2 font-isansdemibold text-[15px]">
          {item.postcode}
        </Text>
      </View>

      <View className="flex-row-reverse mt-2" style={styles.columnGapLg}>
        <View
          className="flex-row-reverse justify-center items-center"
          style={styles.columnGapMd}
        >
          <Text className="text-grey2 font-isansdemibold text-[15px]">
            استان :
          </Text>
          <Text className="text-grey2 font-isansdemibold text-[15px]">
            {item.result.province}
          </Text>
        </View>

        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansdemibold text-[15px]">
            شهر :
          </Text>
          <Text className="text-grey2 font-isansdemibold text-[15px]">
            {item.result.localityName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AddressCard;

const styles = StyleSheet.create({
  columnGapMd: {
    columnGap: 5,
  },
  columnGapLg: {
    columnGap: 10,
  },
});
