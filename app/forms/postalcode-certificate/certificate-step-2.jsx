// IMPORTS
import { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { requestPayment } from "@/api/payment";
import { router } from "expo-router";
import { Background, Factor, CustomButton } from "@/components";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import * as SecureStore from "expo-secure-store";
import { Title } from "@/components/Title";

const CertificateStep3 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [cancelButton, setCancelButton] = useState(false);
  const bouncyCheckboxRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // CONSTS
  const factor = useUserStore((state) => state.factor);
  //   const setFactor = useUserStore((state) => state.setFactor);
  const mobile = SecureStore.getItem("mobile");

  // ANIMATION
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  // CHECKBOX HANDLER
  const handleCheckboxPress = () => {
    setChecked((prev) => !prev);
  };

  // HANDLE SUBMIT
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = {
        clientOrderID: "string",
        mobile,
        paymentTypeID: "2",
        postUnitID: 2,
        income: factor.amount * factor.counter,
        tax: factor.tax * factor.counter,
        escrow: 0,
        callBackUrl: "",
        additionalData: "string",
        requestID: factor.id,
      };

      const response = await requestPayment(data);
      router.push(response.data.itemList[0].data.paymentUrl);
      setCancelButton(true);
      //   setFactor([]);
      //   router.replace({
      //     pathname: "/waiting",
      //     params: {
      //       url: encodeURIComponent(response.data.itemList[0].data.paymentUrl),
      //     },
      //   });
    } finally {
      setIsLoading(false);
    }
  };

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
          <Title title={"گواهی کد پستی"} progress={100} home={true} />

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
                <Text style={{ color: "blue" }} onPress={() => {}}>
                  شرایط
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
          {cancelButton ? (
            <CustomButton
              title="انصراف"
              bgColor="bg-red-500"
              titleColor="text-white"
              handlePress={() => router.replace("/")}
            />
          ) : (
            <CustomButton
              title="پرداخت"
              disabled={!checked}
              handlePress={onSubmit}
              isLoading={isLoading}
            />
          )}
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default CertificateStep3;

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
  postalCodesItemContainer: {
    gap: 10,
  },
  factorContainer: {
    width: "100%",
    marginTop: 20,
  },
});
