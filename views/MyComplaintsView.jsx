import { View, Text } from "react-native";
import React from "react";

// COMPONENTS
import Background from "@/components/Background";
const MyComplaintsView = () => {
  return (
    <Background>
      <View className="flex justify-center items-center w-full h-full">
        <Text>MyComplaintsView</Text>
      </View>
    </Background>
  );
};

export default MyComplaintsView;
