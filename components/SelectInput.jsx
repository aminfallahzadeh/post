// IMPORTS
// import Dropdown from "react-native-input-select";
import { useState } from "react";
import { Text, View, Pressable } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Feather from "@expo/vector-icons/Feather";
import { StyleSheet } from "react-native";

// const selectSettings = (props) => ({
//   placeholderStyle: {
//     color: props.disabled ? "#6a6a6a" : "#333",
//     fontFamily: "IranSans-DemiBold",
//     fontSize: 13,
//     direction: "rtl",
//     marginRight: 10,
//   },
//   dropdownContainerStyle: {
//     fontFamily: "IranSans-DemiBold",
//     direction: "rtl",
//   },
//   dropdownStyle: {
//     borderColor: props.disabled ? "#e9e9e9" : "#b8b8b8",
//     fontFamily: "IranSans-DemiBold",
//     backgroundColor: "#fff",
//     direction: "rtl",
//   },
//   selectedItemStyle: {
//     color: "#333",
//     fontFamily: "IranSans-Regular",
//     direction: "rtl",
//     paddingRight: 25,
//   },
//   checkboxControls: {
//     checkboxLabelStyle: {
//       fontFamily: "IranSans-DemiBold",
//       textAlign: "right",
//       direction: "rtl",
//       marginRight: 10,
//     },
//     checkboxStyle: {
//       borderRadius: 3,
//     },
//   },
//   modalControls: {
//     modalOptionsContainerStyle: {
//       fontFamily: "IranSans-DemiBold",
//       direction: "rtl",
//       padding: 10,
//     },
//   },
//   listControls: {
//     emptyListMessage: selectMessages.EMPTY_LIST,
//   },
//   searchControls: {
//     textInputContainerStyle: {},
//   },
//   listComponentStyles: {
//     textAlign: "center",
//     listEmptyComponentStyle: {
//       fontFamily: "IranSans-Bold",
//       direction: "rtl",
//     },
//     itemSeparatorStyle: {
//       height: 1,
//       backgroundColor: "blue",
//     },
//   },
//   dropdownIcon: (
//     <Feather
//       name="chevron-down"
//       size={20}
//       color={props.disabled ? "#6a6a6a" : "#333"}
//     />
//   ),
//   dropdownIconStyle: {
//     alignSelf: "center",
//     top: 20,
//   },
// });

const SelectInput = (props) => {
  //   const settings = selectSettings(props);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (props.value) {
      return (
        <Text style={[styles.label, isFocus && { color: "#183f97" }]}>
          {props.placeholder}
        </Text>
      );
    }
    return null;
  };

  //   useEffect(() => {
  //     console.log(props.value);
  //   }, [props.value]);

  //   return <Dropdown {...settings} {...props} />;
  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[
          styles.dropdown,
          {
            borderColor:
              props.disabled || props.options.length === 0
                ? "#e9e9e9"
                : "#6b7280",
          },
          isFocus && { borderColor: "#183f97" },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.options}
        search={props.search}
        mode="modal"
        flatListProps={{
          style: {
            maxHeight: 500,
          },
        }}
        labelField="label"
        valueField="value"
        disable={props.disabled || props.options.length === 0}
        itemTextStyle={{ fontFamily: "IranSans-Regular" }}
        placeholder={props.value || isFocus ? "" : props.placeholder}
        searchPlaceholder="جستجو..."
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        renderRightIcon={() =>
          props.value &&
          props.onClear && (
            <Pressable onPress={props.onClear}>
              <Feather name="x-circle" size={25} color={"#AFB4C0"} />
            </Pressable>
          )
        }
        renderLeftIcon={() => (
          <Feather
            name="chevron-down"
            size={20}
            color={props.disabled ? "#AFB4C0" : "#6b7280"}
          />
        )}
        {...props}
      />
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  container: {
    fontFamily: "IranSans-Regular",
    direction: "rtl",
  },
  dropdown: {
    height: 55,
    fontFamily: "IranSans-Regular",
    borderColor: "#6b7280",
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 8,
    padding: 10,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 5,
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
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "IranSans-Regular",
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
