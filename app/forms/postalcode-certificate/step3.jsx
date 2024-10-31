// REACT IMPORTS
import { useState, useEffect } from "react";

// NATIVE IMPORTS
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// STORE
import { useUserStore } from "@/store";

// AXIOS

// EXPO
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONETS
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";

// CONSTANTS
import { postalCodeListValidation } from "@/constants/validations";

// ASSETS
import { toastStyles } from "@/constants/styles";

// LIBRARIES
import { showMessage } from "react-native-flash-message";

const Step3 = () => {
  // ACCESS GLOBAL STATE
  const factor = useUserStore((state) => state.factor);

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
        </ScrollView>
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
});
