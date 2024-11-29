// IMPORTS
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Clipboard from "expo-clipboard";
import Feather from "@expo/vector-icons/Feather";
import { showMessage } from "react-native-flash-message";
import { toastStyles } from "@/constants/styles";

export const ComplaintCard = ({ item, containerStyles }) => {
  // HANDLERS
  const copyHandler = async () => {
    await Clipboard.setStringAsync(item.key.toString());
    showMessage({
      message: "کد پیگیری شما کپی شد",
      type: "success",
      titleStyle: toastStyles,
    });
  };

  // STATUS
  const responded = [1, 2];
  const respondedWithDetails = [3, 4, 5, 6, 7, 8, 9];
  const error = [-1, -2];

  return (
    <View
      className={`justify-start items-start bg-white rounded-md px-5 py-2 w-full ${containerStyles}`}
      style={styles.container}
    >
      <View className="flex-row-reverse justify-between items-center w-full mb-2">
        <Pressable
          onPress={copyHandler}
          className="bg-blue-300 px-2 rounded-full flex-row-reverse justify-center items-center"
        >
          <Feather name="copy" size={14} color="black" />
          <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center">
            {item.key}
          </Text>
        </Pressable>

        <View className="flex-row-reverse justify-center items-center bg-green-300 px-2 rounded-lg">
          <Feather name="calendar" size={16} color="black" />
          <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center">
            {item.adate}
          </Text>
        </View>
      </View>

      <View style={styles.line} />

      <View className="flex-row-reverse w-full">
        {respondedWithDetails.includes(item.stat) ? (
          <Feather name="alert-circle" size={24} color="#ff9c00" />
        ) : responded.includes(item.stat) ? (
          <Feather name="check-circle" size={24} color="#16ed00" />
        ) : error.includes(item.stat) ? (
          <Feather name="x-circle" size={24} color="#ff1400" />
        ) : (
          <Feather name="help-circle" size={24} color="#ccc" />
        )}
        <Text className="font-isansregular text-right text-[15px] mr-1">
          {item.rspns}
        </Text>
      </View>
    </View>
  );
};

export default ComplaintCard;

const styles = StyleSheet.create({
  container: {
    columnGap: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  status: {
    height: 12,
    width: 12,
    borderRadius: 50,
  },
  line: {
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    height: 1,
    borderRadius: 50,
    marginVertical: 5,
  },
});
