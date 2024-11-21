// IMPORTS
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RadioButtons = ({
  title,
  options,
  value,
  onChange,
  //   buttonComponent: ButtonComponent,
  containerStyle,
  titleStyle,
}) => {
  const handleOptionPress = (option) => {
    onChange(option); // Update the selected option
  };

  //   const handleSubmit = () => {
  //     if (selected) {
  //       onSubmit(selected);
  //     }
  //   };

  return (
    // <View className={`justify-center items-center gap-y-10 ${containerStyle}`}>
    //   {title && (
    //     <Text
    //       className={`text-primary font-isansbold text-center text-[20px] ${titleStyle}`}
    //     >
    //       {title}
    //     </Text>
    //   )}

    //   <View className="flex-row flex-wrap justify-between items-center gap-y-3 w-full">
    //     {options.map((option) => (
    //       <TouchableOpacity
    //         key={option.id}
    //         onPress={() => handleOptionPress(option)}
    //         style={[
    //           styles.select,
    //           selected?.id === option.id && styles.selected,
    //           option.disabled && styles.disabled,
    //         ]}
    //         disabled={option.disabled}
    //       >
    //         <Text
    //           className={`text-center font-isansdemibold text-[16px] ${
    //             option.disabled ? "text-gray-400" : ""
    //           }`}
    //         >
    //           {option.label}
    //         </Text>
    //       </TouchableOpacity>
    //     ))}
    //   </View>
    <View className={`justify-center items-center gap-y-10 ${containerStyle}`}>
      {title && (
        <Text
          className={`text-primary font-isansbold text-center text-[20px] ${titleStyle}`}
        >
          {title}
        </Text>
      )}

      <View className="flex-row flex-wrap justify-between items-center gap-y-3 w-full">
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleOptionPress(option)}
            style={[
              styles.select,
              value?.id === option.id && styles.selected,
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

      {/* <View className="w-full">
        {ButtonComponent ? (
          <ButtonComponent handlePress={handleSubmit} isDisabled={!selected} />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!selected}
            style={[styles.defaultButton, !selected && styles.disabledButton]}
          >
            <Text style={styles.buttonText}>ادامه</Text>
          </TouchableOpacity>
        )}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    flexBasis: "48%",
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
  defaultButton: {
    backgroundColor: "#fcd900",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ddd",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default RadioButtons;
