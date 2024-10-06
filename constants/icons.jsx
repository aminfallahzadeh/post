// EXPO IMPORTS
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

export const icons = {
  followup: (props) => (
    <MaterialCommunityIcons
      name="briefcase-search-outline"
      size={24}
      {...props}
    />
  ),
  services: (props) => (
    <MaterialCommunityIcons name="hand-coin-outline" size={24} {...props} />
  ),
  mypost: (props) => (
    <MaterialCommunityIcons name="package-variant" size={24} {...props} />
  ),
};
