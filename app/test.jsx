// NATIVE IMPORTS
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import CustomButton from "@/components/CustomButton";

// EXPO IMPORTS
import { router } from "expo-router";

const First = () => {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    router.push("/first");
  };

  const options = [
    "پست پیشتاز",
    "پست امانت",
    "پست سفارشس",
    "پست ویژه",
    "پست اکسپرس (در حال توسعه)",
  ];

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full h-full gap-y-10 px-8">
      <Text className="text-primary font-isansbold text-center text-[20px]">
        نوع مرسوله را انتخاب کنید
      </Text>

      <View className="items-center justify-center gap-3 w-full">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelected(option)}
            style={[styles.select, selected === option && styles.selected]}
          >
            <Text className="text-center font-isansdemibold text-[16px]">
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomButton
        title={"تایید"}
        containerStyles={"mt-10"}
        handlePress={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default First;

const styles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: "#fcd900",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    width: "100%",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#fcd900",
    borderColor: "#000",
  },
});
