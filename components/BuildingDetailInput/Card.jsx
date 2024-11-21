// REACT IMPORTS
import { View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const Card = ({ text, onDelete, id }) => {
  return (
    <View className="w-full px-2 py-1 border border-gray-400 rounded-md flex-row-reverse items-center justify-between">
      <Text className="text-sm text-grey2 font-isansdemibold text-center">
        {text}
      </Text>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Card;
