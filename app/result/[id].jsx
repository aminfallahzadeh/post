// REACT IMPORTS
import { useState, useEffect, useCallback } from "react";
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

// AXIOS
import { generateCertificate } from "@/api/gnaf";

// EXPO
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONENTS
import { ProgressBar, Background, Factor, CustomButton } from "@/components";

// ASSETS
import { toastStyles } from "@/constants/styles";

// LIBRARIES
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { showMessage } from "react-native-flash-message";

const PaymentResult = () => {
  const { id, success } = useLocalSearchParams();

  // STATES
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // SET STATUS
  useEffect(() => {
    if (success === "1") {
      setIsSuccess(true);
    }
  }, [success]);

  // HANDLERS
  const handleGenerateCertificate = useCallback(async () => {
    setIsLoading(true);
    console.log("DETECTED");
    try {
      const response = await generateCertificate(id);
      console.log("GENERATE CERTIFICATE RESPONSE: ", response.data.data);
    } catch (error) {
      console.log("GENERATE CERTIFICATE ERROR: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // CHECK STATUS LOGIC
  useEffect(() => {
    if (isSuccess) {
      handleGenerateCertificate();
    }
  }, [isSuccess, handleGenerateCertificate]);

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
              <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
                نتیجه پرداخت
              </Text>
            </View>
          </View>

          {/* RESULT */}
          <View className="w-full px-5">
            <View
              className={
                "w-full rounded-md mt-20 p-5 items-center justify-center"
              }
              style={styles.postalCodeContaiers}
            >
              <View className="mt-1 ml-1">
                <Feather
                  name={isSuccess ? "check-circle" : "x-circle"}
                  size={40}
                  color={isSuccess ? "green" : "red"}
                />
              </View>
              <Text className="text-grey2 font-isansbold text-[20px] text-center mt-5">
                {isSuccess
                  ? "پرداخت با موفقیت انجام شد."
                  : "خطایی در پرداخت شما بوجود آمده است."}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="بازگشت"
            isLoading={isLoading}
            handlePress={() => router.replace("/services")}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default PaymentResult;

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
