// IMPORTS
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const RadioButtons = ({
  title,
  options,
  value = [],
  onChange,
  containerStyle,
  titleStyle,
  isMulti = false,
  itemsContainerStyle = "flex-row flex-wrap justify-between items-center gap-y-3 w-full",
}) => {
  const handleOptionPress = (option) => {
    if (isMulti) {
      const isSelected = value.some((selected) => selected.id === option.id);
      if (isSelected) {
        onChange(value.filter((selected) => selected.id !== option.id));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  };

  const isSelected = (option) => {
    if (isMulti) {
      return value.some((selected) => selected.id === option.id);
    }
    return value?.id === option.id;
  };

  return (
    <View className={`justify-center items-center gap-y-10 ${containerStyle}`}>
      {title && (
        <Text
          className={`text-primary font-isansbold text-center text-[20px] ${titleStyle}`}
        >
          {title}
        </Text>
      )}

      <View className={itemsContainerStyle}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => handleOptionPress(option)}
            style={[
              styles.select,
              isSelected(option) && styles.selected,
              option.disabled && styles.disabled,
            ]}
            disabled={option.disabled}
          >
            <Text
              className={` text-center font-isansdemibold text-[16px] ${
                option.disabled ? "text-gray-400" : ""
              }`}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  select: {
    flexBasis: "48%",
    borderWidth: 1,
    borderColor: "#fcd900",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    width: "100%",
    alignItems: "center",
    height: 58,
    justifyContent: "center",
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
