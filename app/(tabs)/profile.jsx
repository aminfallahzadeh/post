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
        <Animated.View className="mt-20" style={{ opacity: fadeAnim }}>
          <View className="flex flex-row flex-wrap gap-y-5 justify-center items-center px-2 mt-5">
            <View className="items-center gap-2 w-1/4">
              <LinearGradient
                colors={["#067800", "#74ff66"]}
                style={{
                  borderRadius: 10,
                  padding: 10,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                  elevation: 8,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
              >
                <MaterialCommunityIcons
                  name="numeric"
                  size={30}
                  color="white"
                />
              </LinearGradient>

              <Text className="text-black font-isansmedium text-[12px]">
                کد پستی
              </Text>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    </Background>
  );
};

export default Profile;
