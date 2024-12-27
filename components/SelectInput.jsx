// IMPORTS
import Dropdown from "react-native-input-select";
import { selectMessages } from "@/constants/messages";
import Feather from "@expo/vector-icons/Feather";

const selectSettings = (props) => ({
  placeholderStyle: {
    color: props.disabled ? "#6a6a6a" : "#333",
    fontFamily: "IranSans-DemiBold",
    fontSize: 13,
    direction: "rtl",
    marginRight: 10,
  },
  dropdownContainerStyle: {
    fontFamily: "IranSans-DemiBold",
    direction: "rtl",
  },
  dropdownStyle: {
    borderColor: props.disabled ? "#e9e9e9" : "#b8b8b8",
    fontFamily: "IranSans-DemiBold",
    backgroundColor: "#fff",
    direction: "rtl",
  },
  selectedItemStyle: {
    color: "#333",
    fontFamily: "IranSans-Regular",
    direction: "rtl",
    paddingRight: 25,
  },
  checkboxControls: {
    checkboxLabelStyle: {
      fontFamily: "IranSans-DemiBold",
      textAlign: "right",
      direction: "rtl",
      marginRight: 10,
    },
    checkboxStyle: {
      borderRadius: 3,
    },
  },
  modalControls: {
    modalOptionsContainerStyle: {
      fontFamily: "IranSans-DemiBold",
      direction: "rtl",
      padding: 10,
    },
  },
  listControls: {
    emptyListMessage: selectMessages.EMPTY_LIST,
  },
  searchControls: {
    textInputContainerStyle: {},
  },
  listComponentStyles: {
    textAlign: "center",
    listEmptyComponentStyle: {
      fontFamily: "IranSans-Bold",
      direction: "rtl",
    },
    itemSeparatorStyle: {
      height: 1,
      backgroundColor: "blue",
    },
  },
  dropdownIcon: (
    <Feather
      name="chevron-down"
      size={20}
      color={props.disabled ? "#6a6a6a" : "#333"}
    />
  ),
  dropdownIconStyle: {
    alignSelf: "center",
    top: 20,
  },
});

const SelectInput = (props) => {
  const settings = selectSettings(props);

  return <Dropdown {...settings} {...props} />;
};

export default SelectInput;
