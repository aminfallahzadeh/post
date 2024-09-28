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

const Step4 = () => {
  const [destinationType, setDestinationType] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [sendType, setSendType] = useState(null);
  const [forbiddenType, setForbiddenType] = useState(null);

  const destinationTYpeData = [
    { id: 1, label: "شهری", disabled: false, type: "urban" },
    { id: 2, label: "خارجه", disabled: false, type: "foreign" },
    {
      id: 3,
      label: "درون استانی برون استانی",
      disabled: false,
      type: "provincial",
    },
  ];

  const cityData = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "بندر ماهشهر", value: "bandar-mahshahr" },
    { label: "خراسان رضوی", value: "khorasan-razavi" },
    { label: "خراسان شمالی", value: "khorasan-shomali" },
  ];

  const provinceData = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "بندر ماهشهر", value: "bandar-mahshahr" },
    { label: "خراسان رضوی", value: "khorasan-razavi" },
    { label: "خراسان شمالی", value: "khorasan-shomali" },
  ];

  const sendTypeData = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "بندر ماهشهر", value: "bandar-mahshahr" },
    { label: "خراسان رضوی", value: "khorasan-razavi" },
    { label: "خراسان شمالی", value: "khorasan-shomali" },
  ];

  const forbiddenOptions = [
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
        اطلاعات مقصد
      </Text>
      <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
        <View className="absolute top-0 left-0 w-[40%] h-full bg-primary rounded"></View>
      </View>

      <View>
        <Text className="text-base font-isansdemibold text-right">
          نوع مقصد :
        </Text>

        <View className="flex-row gap-3 w-full justify-end mt-1 flex-wrap">
          {destinationTYpeData.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setDestinationType(option)}
              style={[
                styles.select,
                destinationType?.id === option.id && styles.selected,
                option.disabled && styles.disabled,
              ]}
            >
              <Text
                className={`text-center font-isansdemibold text-[12px] ${
                  option.disabled ? "text-gray-400" : ""
                }`}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Form Fields */}
      <View className="flex-col w-full justify-between mt-5">
        {/* First Row */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-1 mr-2">
            <Dropdown
              placeholder="شهر"
              options={cityData}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 13,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
              }}
              selectedValue={city}
              onValueChange={(value) => setCity(value)}
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

          <View className="flex-1 ml-2">
            <Dropdown
              placeholder="استان"
              options={provinceData}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 13,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
              }}
              selectedValue={province}
              onValueChange={(value) => setProvince(value)}
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

        {/* Second Row */}
        <View className="flex-row justify-between mb-2">
          <View className="flex-1 mr-2">
            <FormField
              placeholder="کد مقصد"
              keyboardType="text"
              type={"text"}
              //   height={"h-10"}
            />
          </View>

          <View className="flex-1 ml-2">
            <Dropdown
              placeholder="نحوه رهسپاری"
              options={sendTypeData}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 13,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
              }}
              selectedValue={sendType}
              onValueChange={(value) => setSendType(value)}
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

        <Dropdown
          placeholder="لیست ممنوعات"
          options={forbiddenOptions}
          labelStyle={{
            fontFamily: "IranSans-DemiBold",
            color: "black",
            fontSize: 13,
            alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
            textAlign: "right",
            marginBottom: 7,
          }}
          selectedValue={forbiddenType}
          onValueChange={(value) => setForbiddenType(value)}
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

        {/* Buttons Section */}
        <View className="flex-col gap-y-3 w-full items-center mb-6 mt-2">
          <View className="w-full">
            <CustomButton
              title="ادامه"
              handlePress={() => router.push("forms/amanat/step5")}
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

export default Step4;

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
