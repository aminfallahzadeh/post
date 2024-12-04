// IMPORTS
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Dropdown from "react-native-input-select";

const Step5 = () => {
  // STATES
  const [must, setMust] = useState(null);
  const [packageCartoon, setPackageCartoon] = useState(null);
  const [customerType, setCustomerType] = useState(null);

  // CONSTS
  const { control } = useForm();

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

  const customerTypeData = [
    { id: 1, label: "حقیقی (ایرانی)", disabled: false, type: "realIranian" },
    { id: 2, label: "حقوقی", disabled: false, type: "legal" },
    {
      id: 3,
      label: "حقیقی (اتباع خارجی)",
      disabled: false,
      type: "realForeign",
    },
  ];

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between items-center min-h-full">
      {/* Top Section */}

      <View className="pt-10 gap-2">
        <Text className="text-primary font-isansbold text-center text-[20px] mt-4">
          اقلام مصرفی
        </Text>
        <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
          <View className="absolute top-0 left-0 w-[50%] h-full bg-primary rounded"></View>
        </View>
      </View>

      {/* Form Fields */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col w-full justify-between mt-5">
          {/* First Row */}

          {/* Second Row */}
          <View className="flex-row justify-between mb-2">
            <View className="mr-2 w-1/3">
              <FormField
                placeholder="تعداد"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="numeric"
                name="number"
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
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="numeric"
                name="number"
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

          <View>
            <Text className="text-base font-isansdemibold text-right">
              نوع مشتری :
            </Text>

            <View className="flex-row gap-3 w-full justify-end mt-1 flex-wrap">
              {customerTypeData.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => setCustomerType(option)}
                  style={[
                    styles.select,
                    customerType?.id === option.id && styles.selected,
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
        </View>
      </TouchableWithoutFeedback>

      {/* Buttons Section */}
      <View className="flex-row justify-between items-center w-full pb-10">
        <View className="flex-1 mr-2">
          <CustomButton
            title={<Feather name="arrow-left" size={24} color="black" />}
            handlePress={() => router.back()}
          />
        </View>
        <View className="flex-1 ml-2">
          <CustomButton
            title="ادامه"
            // isLoading={
            //   !weight || !packageType || !packageNumber || !selectedType
            // }
            handlePress={() => router.push("forms/amanat/step6")}
          />
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
