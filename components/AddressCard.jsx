// REACT IMPROTS
import { useEffect } from "react";

// NATIVE IMPROTS
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// EXPO
import { LinearGradient } from "expo-linear-gradient";

// ICONS
import Feather from "@expo/vector-icons/Feather";

const AddressCard = ({ item, isSelected, onSelect }) => {
  // DEBUGGING
  useEffect(() => {
    console.log("THIS IS THE ITEM:", item);
  }, [item]);

  // SELECT EFFECT
  useEffect(() => {
    console.log("THIS IS THE ITEM:", item);
  }, [item]);

  return (
    <TouchableOpacity
      onPress={onSelect}
      className={`w-full py-2 px-5 rounded-md ${
        isSelected ? "bg-blue-100" : "bg-gray-200"
      }`}
    >
      <View className="flex-row-reverse justify-between items-center">
        <View>
          {isSelected ? (
            <Feather name="check-circle" size={24} color="black" />
          ) : (
            <Feather name="circle" size={24} color="black" />
          )}
        </View>
        <View
          className="flex-row-reverse items-center justify-center"
          style={styles.columnGapMd}
        >
          <Text className="text-grey2 font-isansbold text-[15px]">
            کد پستی :
          </Text>

          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.postcode || "---"}
          </Text>
        </View>
      </View>

      <View className="mt-2 mb-2">
        <LinearGradient
          colors={["transparent", "#000", "transparent"]}
          style={styles.gradientLineHorizontal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      <View
        className="flex-row-reverse justify-between mt-2"
        style={styles.columnGapLg}
      >
        <View
          className="flex-row-reverse justify-center items-center"
          style={styles.columnGapMd}
        >
          <Text className="text-grey2 font-isansbold text-[15px]">استان :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.province || "---"}
          </Text>
        </View>

        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">شهر :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.localityName || "---"}
          </Text>
        </View>

        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">روستا :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.village || "---"}
          </Text>
        </View>
      </View>

      <View
        className="flex-row-reverse justify-between items-center mt-2"
        style={styles.columnGapLg}
      >
        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">بلوک :</Text>
          <Text className="text-grey2 font-isansdemibold text-[15px]">
            {item.result.buildingName || "---"}
          </Text>
        </View>

        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">ورودی :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.description || "---"}
          </Text>
        </View>

        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">ناحیه :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.zone || "---"}
          </Text>
        </View>
      </View>

      <View
        className="flex-row-reverse justify-between items-center mt-2"
        style={styles.columnGapLg}
      >
        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">پلاک :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.houseNumber || "---"}
          </Text>
        </View>

        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">طبقه :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.floor || "---"}
          </Text>
        </View>

        <View className="flex-row-reverse" style={styles.columnGapMd}>
          <Text className="text-grey2 font-isansbold text-[15px]">واحد :</Text>
          <Text className="text-grey2 font-isansregular text-[15px]">
            {item.result.localityCode || "---"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
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
  gradientLineHorizontal: {
    width: "100%",
    height: 1,
  },
});
