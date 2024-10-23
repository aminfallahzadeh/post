// REACT IMPORTS
import { useState } from "react";

// NATIVE IMPORTS
import { View, Text, StyleSheet, Pressable } from "react-native";

// EXPO
import * as Clipboard from "expo-clipboard";

// ICONS
import Feather from "@expo/vector-icons/Feather";

// LIBRARIES
import { showMessage } from "react-native-flash-message";

// ASSETS
import { toastStyles } from "@/constants/styles";

const ComplaintCard = ({ item, containerStyles }) => {
  // HANDLERS
  const copyHandler = async () => {
    await Clipboard.setStringAsync(item.key.toString());
    showMessage({
      message: "کد پیگیری شما کپی شد",
      type: "success",
      titleStyle: toastStyles,
    });
  };

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

      <View className="flex-row-reverse">
        <View style={styles.status} className="mt-1" />
        <Text className="font-isansregular text-[15px] mr-2">{item.rspns}</Text>
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
    backgroundColor: "red",
    height: 12,
    width: 12,
    borderRadius: 50,
  },
  line: {
    // width: 250,
    alignSelf: "center",
    backgroundColor: "#333",
    height: 1,
    borderRadius: 50,
    marginVertical: 5,
  },
});
