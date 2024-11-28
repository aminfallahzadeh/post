// IMPORTS
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";

export const PostYafteCard = ({ item, isSelected, onSelect }) => {
  const isDisabled = item.requestStatus === 13;
  return (
    <TouchableOpacity
      onPress={onSelect}
      disabled={isDisabled}
      className={`w-full py-2 px-5 rounded-md ${
        isSelected ? "bg-blue-100" : isDisabled ? "bg-gray-200" : "bg-gray-300"
      }`}
    >
      <View className="flex-row-reverse justify-between items-center">
        <View>
          {isSelected ? (
            <Feather name="check-circle" size={24} color="green" />
          ) : isDisabled ? (
            <Feather name="clock" size={24} color="#00adff" />
          ) : (
            <Feather name="circle" size={24} color="orange" />
          )}
        </View>
        <View
          className="flex-row-reverse items-center justify-center"
          style={styles.columnGapMd}
        >
          <Text
            className={`${
              isDisabled ? "text-gray-400" : "text-grey2"
            } font-isansbold text-sm`}
          >
            {item.docType || "---"}
          </Text>
        </View>
      </View>

      <View className="mt-2 mb-2">
        <LinearGradient
          colors={["transparent", "#a8a8a8", "transparent"]}
          style={styles.gradientLineHorizontal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>

      <View
        className="flex-row-reverse justify-between mt-2 flex-wrap"
        style={styles.columnGapLg}
      >
        <View
          className="flex-row-reverse justify-center items-center"
          style={styles.columnGapMd}
        >
          <Text
            className={`${
              isDisabled ? "text-gray-400" : "text-grey2"
            } font-isansbold text-sm`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            وضعیت :
          </Text>
          <Text
            className={`${
              isDisabled ? "text-gray-400" : "text-grey2"
            } font-isansregular text-sm`}
          >
            {item.requestStatusDesc || "---"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
