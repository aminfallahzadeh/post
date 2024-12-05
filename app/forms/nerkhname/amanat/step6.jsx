// IMPORTS
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  View,
  Text,
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

const Step6 = () => {
  // STATES
  const [insurance, setInsurance] = useState(null);
  const [group, setGroup] = useState(null);

  // CONSTS
  const { control } = useForm();

  const mohtaviyatGroupOptions = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "بندر ماهشهر", value: "bandar-mahshahr" },
    { label: "خراسان رضوی", value: "khorasan-razavi" },
    { label: "خراسان شمالی", value: "khorasan-shomali" },
  ];

  const insuranceType = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "بندر ماهشهر", value: "bandar-mahshahr" },
    { label: "خراسان رضوی", value: "khorasan-razavi" },
    { label: "خراسان شمالی", value: "khorasan-shomali" },
  ];

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between items-center min-h-full">
      {/* Top Section */}

      <View className="pt-10 gap-2">
        <Text className="text-primary font-isansbold text-center text-[20px] mt-4">
          بیمه
        </Text>
        <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
          <View className="absolute top-0 left-0 w-[60%] h-full bg-primary rounded"></View>
        </View>
      </View>

      {/* Form Fields */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col w-full justify-between mt-5">
          {/* First Row */}
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Dropdown
                label="نوع بیمه :"
                placeholder="انتخاب کنید"
                options={insuranceType}
                labelStyle={{
                  fontFamily: "IranSans-DemiBold",
                  color: "black",
                  fontSize: 13,
                  alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                  textAlign: "right",
                  marginBottom: 7,
                }}
                selectedValue={insurance}
                onValueChange={(value) => setInsurance(value)}
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
            <View className="flex-1">
              <FormField
                placeholder="مبلغ اظهار شده"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="numeric"
                name="price"
              />
            </View>
          </View>

          {/* Third Row */}
          <View className="flex-row justify-between mb-2">
            <View className="flex-1">
              <FormField
                placeholder="محتویات مرسوله"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="default"
                name="content"
              />
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1">
              <Dropdown
                label="گروه محتویات :"
                placeholder="انتخاب کنید"
                options={mohtaviyatGroupOptions}
                labelStyle={{
                  fontFamily: "IranSans-DemiBold",
                  color: "black",
                  fontSize: 13,
                  alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                  textAlign: "right",
                  marginBottom: 7,
                }}
                selectedValue={group}
                onValueChange={(value) => setGroup(value)}
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
        </View>
      </TouchableWithoutFeedback>

      {/* Buttons Section */}
      <View className="flex-row justify-between items-center w-full pb-10 pt-5">
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
            handlePress={() => router.push("forms/amanat/step7")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step6;
