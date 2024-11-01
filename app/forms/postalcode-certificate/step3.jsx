// REACT IMPORTS
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// STORE
import { useUserStore } from "@/store";

// EXPO
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONENTS
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";
import Factor from "@/components/Factor";
import CustomButton from "@/components/CustomButton";

// LIBRARIES
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";

const Step3 = () => {
  // ACCESS GLOBAL STATE
  const factor = useUserStore((state) => state.factor);

  // CHECKBOX STATE & REF
  const [checked, setChecked] = useState(false);
  const bouncyCheckboxRef = useRef(null);

  // SLIDE AND FADE-IN ANIMATION
  const slideAnim = useRef(new Animated.Value(50)).current; // Start 50 units below
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start fully transparent

  useEffect(() => {
    // Run the slide and fade-in animation on component mount
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0, // End position (no translation)
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1, // Fully opaque
        duration: 500, // Adjust the duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // CHECKBOX HANDLER
  const handleCheckboxPress = () => {
    setChecked((prev) => !prev);
  };

  // DEBUGGING
  useEffect(() => {
    console.log("FACTOR:", factor);
  }, [factor]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 90,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <View
            className="flex-col w-full bg-secondary z-10 justify-center items-center relative"
            style={styles.headerContainer}
          >
            <View className="flex-row w-full justify-between items-center">
              <Pressable
                onPress={() => router.back()}
                className="absolute left-4"
              >
                <Feather name="arrow-left" size={25} color="#333" />
              </Pressable>
              <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
                گواهی کد پستی
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={100} />
            </View>
          </View>

          {/* RESULT FACTOR */}
          <View className="w-full px-5 mt-5">
            <Text className="font-isansbold text-primary text-[18px] w-full justify-center items-center text-center">
              فاکتور مجموع
            </Text>
            <Animated.View
              style={[
                {
                  transform: [{ translateY: slideAnim }],
                  opacity: fadeAnim,
                },
                styles.factorContainer,
              ]}
            >
              <Factor data={factor} />
            </Animated.View>
          </View>

          <View className="flex-row justify-center items-center mt-5 px-4">
            <RNBounceable
              style={styles.syntheticButton}
              onPress={() => {
                if (bouncyCheckboxRef.current) {
                  bouncyCheckboxRef.current.onCheckboxPress();
                }
              }}
            >
              <Text className="text-grey2 font-isansregular px-2">
                موارد فوق مورد تایید است و من با{" "}
                <Text
                  style={{ color: "blue" }}
                  onPress={() => console.log("Navigate to Terms")}
                >
                  شرایط{" "}
                </Text>
                خرید موافق هستم
              </Text>
            </RNBounceable>
            <View>
              <BouncyCheckbox
                ref={bouncyCheckboxRef}
                onPress={handleCheckboxPress}
                fillColor="#164194"
              />
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="پرداخت"
            bgColor="bg-green-700"
            titleColor="text-white"
            disabled={!checked}
            // handlePress={onSubmit}
            // isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Step3;

const styles = StyleSheet.create({
  inputContainer: {
    columnGap: 10,
  },
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  disabledPlus: {
    color: "gray",
  },
  postalCodeContaiers: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    minHeight: 100,
  },
  postalCodesItemContainer: {
    gap: 10,
  },
  factorContainer: {
    width: "100%",
    marginTop: 20,
  },
});
