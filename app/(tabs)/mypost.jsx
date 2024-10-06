// REACT IMPORTS
import { useEffect, useRef } from "react";

// NATIVE IMPORTS
import { View, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// COMPONENTS
import Background from "@/components/Background";

const Profile = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Background>
      <SafeAreaView className="w-full h-full justify-center items-center">
        <View className="justify-center flex items-center">
          <Text className="text-gray-700 font-isansbold text-[30px]">
            در حال توسعه...
          </Text>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Profile;
