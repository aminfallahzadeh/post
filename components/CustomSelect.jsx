// IMPORTS
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet } from "react-native";
import { LOADING_MESSAGE } from "@/constants/messages";

const CustomSelect = ({
  name,
  label,
  control,
  errors,
  rules,
  data,
  disabled,
  search,
  onValueChange,
  setValue,
  onClear,
  isLoading,
}) => {
  // STATES
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (value) => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#183f97" }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View className="relative">
      {errors && (
        <View className="absolute -top-5 left-0">
          <Text className="text-red-500 font-isansregular">
            {errors?.[name]?.message}
          </Text>
        </View>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View style={styles.container}>
            {renderLabel(value)}
            <Dropdown
              style={[
                styles.dropdown,
                {
                  borderColor:
                    disabled || data.length === 0 ? "#e9e9e9" : "#183f97",
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              containerStyle={{
                borderRadius: 7,
              }}
              data={data}
              search={search}
              onChange={(val) => {
                onValueChange?.(val.value);
                onChange(val.value);
              }}
              mode="modal"
              flatListProps={{
                style: {
                  maxHeight: 500,
                },
              }}
              labelField="label"
              activeColor="#fcd900"
              valueField="value"
              disable={disabled || isLoading || data.length === 0}
              itemTextStyle={{
                fontFamily: "IranSans-Regular",
                textAlign: "right",
              }}
              placeholder={
                value || isFocus ? "" : isLoading ? LOADING_MESSAGE : label
              }
              searchPlaceholder="جستجو..."
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              value={value}
              renderLeftIcon={() =>
                value &&
                setValue && (
                  <Pressable
                    onPress={() => {
                      onClear?.();
                      setValue(name, null);
                    }}
                  >
                    <Feather name="x-circle" size={25} color={"#AFB4C0"} />
                  </Pressable>
                )
              }
              renderRightIcon={() => (
                <Feather
                  name="chevron-down"
                  size={20}
                  color={disabled ? "#AFB4C0" : "#6b7280"}
                />
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CustomSelect;

const styles = StyleSheet.create({
  container: {
    fontFamily: "IranSans-Regular",
    textAlign: "right",
    height: 56,
  },
  dropdown: {
    height: 56,
    textAlign: "right",
    fontFamily: "IranSans-Regular",
    borderColor: "#183f97",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 10,
    right: 10,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontFamily: "IranSans-DemiBold",
    fontSize: 14,
    color: "#AFB4C0",
  },
  placeholderStyle: {
    fontSize: 13,
    fontFamily: "IranSans-DemiBold",
    color: "#AFB4C0",
    height: 58,
    paddingTop: 15,
    textAlign: "right",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "IranSans-Regular",
    height: 55,
    paddingTop: 15,
    textAlign: "right",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    textAlign: "right",
  },
});
