// IMPORTS
import Dropdown from "react-native-input-select";
import { selectMessages } from "@/constants/messages";
import Feather from "@expo/vector-icons/Feather";

const selectSettings = (props) => ({
  placeholderStyle: {
    color: props.disabled ? "#6a6a6a" : "#333",
    fontFamily: "IranSans-DemiBold",
    fontSize: 13,
    transform: [{ scaleX: -1 }],
  },
  dropdownContainerStyle: {
    marginBottom: 0,
    fontFamily: "IranSans-DemiBold",
    innerHeight: 20,
  },
  dropdownStyle: {
    borderColor: props.disabled ? "#e9e9e9" : "#b8b8b8",
    fontFamily: "IranSans-DemiBold",
    transform: [{ scaleX: -1 }, { scaleY: 0.95 }],
    backgroundColor: "#fff",
  },
  selectedItemStyle: {
    color: "#333",
    fontFamily: "IranSans-Regular",
    transform: [{ scaleX: -1 }],
  },
  checkboxControls: {
    checkboxLabelStyle: {
      fontFamily: "IranSans-DemiBold",
      transform: [{ scaleX: -1 }],
    },
    checkboxStyle: {
      transform: [{ scaleX: -1 }],
      borderRadius: 3,
    },
  },
  modalControls: {
    modalOptionsContainerStyle: {
      fontFamily: "IranSans-DemiBold",
      transform: [{ scaleX: -1 }],
    },
  },
  listControls: {
    emptyListMessage: selectMessages.EMPTY_LIST,
  },
  listComponentStyles: {
    listEmptyComponentStyle: {
      color: "gray",
      transform: [{ scaleX: -1 }],
      fontFamily: "IranSans-Bold",
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

export const SelectInput = (props) => {
  const settings = selectSettings(props);

  return <Dropdown {...settings} {...props} />;
};
