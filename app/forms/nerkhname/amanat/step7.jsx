// REACT IMPORTS
import { useState } from "react";

// NATIVE IMPORTS
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

// COMPONENTS
import CustomButton from "@/components/CustomButton";

const Step7 = () => {
  const [services, setServices] = useState([]);

  const specialServiceOptions = [
    { id: 1, label: "آگهی تحویل فیزیکی", disabled: false, type: "physical" },
    {
      id: 2,
      label: "آگهی تحویل الکترونیک",
      disabled: false,
      type: "electronic",
    },
    { id: 3, label: "اشیا شکستنی", disabled: false, type: "glasses" },
    { id: 4, label: "خارج از اندازه", disabled: false, type: "oversize" },
    {
      id: 5,
      label: "کرایه در مقصد",
      disabled: false,
      type: "pardakhtDarbeManzel",
    },
    { id: 6, label: "حاوی مایعات", disabled: false, type: "watery" },
    {
      id: 7,
      label: "شناسه الکترونیک",
      disabled: false,
      type: "electronicCode",
    },
    {
      id: 8,
      label: "سرویس SMS",
      disabled: false,
      type: "SMS",
    },
    {
      id: 9,
      label: "اکسپرس",
      disabled: false,
      type: "express",
    },
    {
      id: 10,
      label: "مرسولات جوق",
      disabled: false,
      type: "joogh",
    },
    {
      id: 11,
      label: "تحویل در صندوق شخصی",
      disabled: false,
      type: "personalSandogh",
    },
  ];

  const toggleService = (option) => {
    if (services.includes(option.id)) {
      // If already selected, remove it from the array
      setServices(services.filter((serviceId) => serviceId !== option.id));
    } else {
      // Otherwise, add it to the array
      setServices([...services, option.id]);
    }
  };

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between items-center min-h-full">
      {/* Top Section */}

      <View className="pt-10 gap-2">
        <Text className="text-primary font-isansbold text-center text-[20px] mt-4">
          خدمات ویژه
        </Text>
        <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
          <View className="absolute top-0 left-0 w-[75%] h-full bg-primary rounded"></View>
        </View>
      </View>

      {/* Form Fields */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col w-full justify-between mt-5">
          {/* First Row */}

          <View>
            <Text className="text-base font-isansdemibold text-right">
              نوع خدمات :
            </Text>

            <View className="flex-row gap-3 w-full justify-center mt-1 flex-wrap">
              {specialServiceOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => toggleService(option)}
                  style={[
                    styles.select,
                    services.includes(option.id) && styles.selected,
                    option.disabled && styles.disabled,
                  ]}
                >
                  <Text
                    className={`text-center font-isansregular text-[15px] ${
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
            // Add logic for when to enable/disable the button
            handlePress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step7;

const styles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: "#fcd900",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
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
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
