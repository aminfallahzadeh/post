// REACT IMPORTS
import { useState } from "react";

// NATIVE IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

// COMPONENTS
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";

// LIBRARIES
import Dropdown from "react-native-input-select";

const Step5 = () => {
  const [must, setMust] = useState(null);
  const [packageCartoon, setPackageCartoon] = useState(null);

  const mustOptions = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "بندر ماهشهر", value: "bandar-mahshahr" },
    { label: "خراسان رضوی", value: "khorasan-razavi" },
    { label: "خراسان شمالی", value: "khorasan-shomali" },
  ];

  const packageCartoonData = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "بندر ماهشهر", value: "bandar-mahshahr" },
    { label: "خراسان رضوی", value: "khorasan-razavi" },
    { label: "خراسان شمالی", value: "khorasan-shomali" },
  ];

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-center items-center gap-y-4">
      {/* Top Section */}

      <Text className="text-primary font-isansbold text-center text-[20px] mt-4">
        اقلام مصرفی
      </Text>
      <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
        <View className="absolute top-0 left-0 w-[50%] h-full bg-primary rounded"></View>
      </View>

      {/* Form Fields */}
      <View className="flex-col w-full justify-between mt-5">
        {/* First Row */}

        {/* Second Row */}
        <View className="flex-row justify-between mb-2">
          <View className="mr-2 w-1/3">
            <FormField
              placeholder="تعداد"
              keyboardType="text"
              type={"text"}
              //   height={"h-10"}
            />
          </View>

          <View className="flex-1 ml-2">
            <Dropdown
              placeholder="ملزومات"
              options={mustOptions}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 13,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
              }}
              selectedValue={must}
              onValueChange={(value) => setMust(value)}
              primaryColor={"blue"}
              placeholderStyle={{
                color: "grey",
                fontFamily: "IranSans-DemiBold",
              }}
              dropdownContainerStyle={{
                direction: "rtl",
                borderColor: "#fcd900",
                fontFamily: "IranSans-DemiBold",
              }}
              dropdownStyle={{
                borderColor: "#fcd900",
                fontFamily: "IranSans-DemiBold",
              }}
              selectedItemStyle={{
                color: "black",
                fontFamily: "IranSans-Regular",
              }}
              modalControls={{
                modalOptionsContainerStyle: {
                  direction: "rtl",
                },
              }}
            />
          </View>
        </View>

        <View className="flex-row justify-between mb-2">
          <View className="mr-2 w-1/3">
            <FormField
              placeholder="تعداد"
              keyboardType="text"
              type={"text"}
              //   height={"h-10"}
            />
          </View>

          <View className="flex-1 ml-2">
            <Dropdown
              placeholder="کارتون / پاکت"
              options={packageCartoonData}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 13,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
              }}
              selectedValue={packageCartoon}
              onValueChange={(value) => setPackageCartoon(value)}
              primaryColor={"blue"}
              placeholderStyle={{
                color: "grey",
                fontFamily: "IranSans-DemiBold",
              }}
              dropdownContainerStyle={{
                direction: "rtl",
                borderColor: "#fcd900",
                fontFamily: "IranSans-DemiBold",
              }}
              dropdownStyle={{
                borderColor: "#fcd900",
                fontFamily: "IranSans-DemiBold",
              }}
              selectedItemStyle={{
                color: "black",
                fontFamily: "IranSans-Regular",
              }}
              modalControls={{
                modalOptionsContainerStyle: {
                  direction: "rtl",
                },
              }}
            />
          </View>
        </View>

        {/* Buttons Section */}
        <View className="flex-col gap-y-3 w-full items-center mb-6 mt-2">
          <View className="w-full">
            <CustomButton
              title="ادامه"
              handlePress={() => router.push("forms/amanat/step3")}
            />
          </View>
          <View className="w-full">
            <CustomButton
              title={<Feather name="arrow-left" size={24} color="black" />}
              handlePress={() => router.back()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step5;

const styles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: "#fcd900",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    width: 150,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#fcd900",
    borderColor: "#000",
  },
  disabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
  },
});
