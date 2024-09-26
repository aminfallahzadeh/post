// NATIVE IMPORTS
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import CustomButton from "@/components/CustomButton";

// EXPO IMPORTS
import { router } from "expo-router";

const Type = () => {
  // Change state to store the complete object
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected) {
      router.push(`/forms/${selected.type}/step1`);
    }
  };

  const options = [
    { id: 1, label: "پست پیشتاز", disabled: false, type: "pishtaz" },
    { id: 2, label: "پست امانت", disabled: false, type: "amanat" },
    { id: 3, label: "پست سفارش", disabled: false, type: "sefareshi" },
    { id: 4, label: "پست ویژه", disabled: false, type: "vijhe" },
    { id: 5, label: "پست اکسپرس (در حال توسعه)", disabled: true },
  ];

  return (
    <SafeAreaView className="bg-grey1 h-full justify-center items-center px-8 gap-y-10">
      <Text className="text-primary font-isansbold text-center text-[20px]">
        نوع مرسوله را انتخاب کنید
      </Text>

      <View className="items-center justify-center gap-3 w-full">
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => !option.disabled && setSelected(option)} //
            style={[
              styles.select,
              selected?.id === option.id && styles.selected,
              option.disabled && styles.disabled,
            ]}
            disabled={option.disabled}
          >
            <Text
              className={`text-center font-isansdemibold text-[16px] ${
                option.disabled ? "text-gray-400" : ""
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className="w-full">
        <CustomButton
          title={"ادامه"}
          containerStyles={"mt-10"}
          handlePress={handleSubmit}
          isLoading={!selected}
        />
      </View>
    </SafeAreaView>
  );
};

export default Type;

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
  disabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
  },
});
