import { View, Text } from "react-native";
import React from "react";

// COMPONENTS
import Background from "@/components/Background";

const MyGovahiView = () => {
  return (
    <Background>
      <View className="flex justify-center items-center w-full h-full">
        <Text>MyGovahiView</Text>
      </View>
    </Background>
  );
};

export default MyGovahiView;
