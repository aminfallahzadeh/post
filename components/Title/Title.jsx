// IMPORTS
import { router } from "expo-router";
import { Pressable, View, Text } from "react-native";
import ProgressBar from "../ProgressBar";
import { Feather } from "@expo/vector-icons";

export const Title = ({ progress, title, home = true }) => {
  return (
    <View className="flex-col w-full bg-primary z-10 justify-center items-center relative">
      <View className="flex-row w-full justify-between items-center">
        <Pressable onPress={() => router.back()} className="absolute left-4">
          <Feather name="arrow-left" size={35} color="#fff" />
        </Pressable>
        <Text className="text-white font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
          {title}
        </Text>

        {home && (
          <Pressable
            onPress={() => router.replace("/services")}
            className="absolute right-4"
          >
            <Feather name="home" size={25} color="#fff" />
          </Pressable>
        )}
      </View>

      {progress && (
        <View className="flex-col px-10 w-full py-4">
          <ProgressBar progress={progress} />
        </View>
      )}
    </View>
  );
};
