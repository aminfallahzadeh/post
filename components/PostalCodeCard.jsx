// NATIVE IMPORTS
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// EXPO
import Feather from "@expo/vector-icons/Feather";

export const PostalCodeCard = ({ postalCode, handlePress }) => {
  return (
    <View
      className="flex-row-reverse items-center justify-between rounded-md px-4 py-1 border border-gray-300"
      style={styles.container}
    >
      <Text className="text-grey2 font-isansdemibold text-md">
        {postalCode}
      </Text>
      <TouchableOpacity onPress={() => handlePress(postalCode)}>
        <Feather name="x" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default PostalCodeCard;

const styles = StyleSheet.create({
  container: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    columnGap: 10,
  },
});
