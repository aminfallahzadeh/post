// IMPORTS
import { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, View, Pressable } from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet } from "react-native";

const CustomMultiSelect = ({
  name,
  label,
  control,
  errors,
  rules,
  data,
  search,
  excludeItems,
}) => {
  // STATES
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = (value) => {
    if (value?.length > 0 || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#183f97" }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
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

            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={label}
              value={value}
              activeColor="#fcd900"
              search={search}
              mode="modal"
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              searchPlaceholder="جستجو..."
              excludeItems={excludeItems}
              inside
              flatListProps={{
                style: {
                  maxHeight: 500,
                },
              }}
              onChange={(val) => {
                onChange(val);
              }}
              renderItem={renderItem}
              renderSelectedItem={(item, unSelect) => (
                <Pressable onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.selectedStyle}>
                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                    <Feather name="x" size={17} color="black" />
                  </View>
                </Pressable>
              )}
            />
          </View>
        )}
      />
    </View>
  );
};

export default CustomMultiSelect;

const styles = StyleSheet.create({
  container: {
    fontFamily: "IranSans-Regular",
    textAlign: "right",
    // height: 56,
  },
  dropdown: {
    // height: 50,
    backgroundColor: "white",
    fontFamily: "IranSans-Regular",
    borderColor: "#183f97",
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    textAlign: "right",
    shadowColor: "#AFB4C0",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
    fontFamily: "IranSans-Regular",
    color: "#AFB4C0",
    height: 58,
    paddingTop: 19,
    textAlign: "right",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "IranSans-Regular",
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
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
