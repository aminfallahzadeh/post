// IMPORTS
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { orderTracking } from "@/api/traking";
import { useLocalSearchParams } from "expo-router";
import Background from "@/components/Background";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import OrderTrackCard from "@/components/OrderTrackCard";
// import LottieView from "lottie-react-native";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";
import { orderTrackingValidation } from "@/constants/validations";
// import searchLottie from "@/assets/animations/search-lottie.json";
import { toastStyles } from "@/constants/styles";
import { Title } from "@/components/Title";

const FollowOrder = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // CONSTS
  const { control, handleSubmit, watch, reset } = useForm();
  const { barcode } = useLocalSearchParams();
  const form_data = watch();

  // FETCH LOGIC
  const fetchData = useCallback(
    async (barcode) => {
      setIsLoading(true);
      try {
        const response = await orderTracking(barcode);
        console.log("ORDER TRACKING RESPONSE: ", response.data);
        setResult(response.data.itemList);
        reset();
      } finally {
        setIsLoading(false);
      }
    },
    [reset]
  );

  // HANDLERS
  const onSubmit = async () => {
    const validations = orderTrackingValidation(form_data);
    for (let validation of validations) {
      if (validation.check) {
        showMessage({
          message: validation.message,
          type: "warning",
          titleStyle: toastStyles,
        });
        return;
      }
    }

    fetchData(form_data.barcode);
  };

  // SEND REQ IF THE BARCODE IS PROVIDED
  useEffect(() => {
    if (barcode) {
      fetchData(barcode);
    }
  }, [barcode, fetchData]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 90,
              minHeight: "100%",
            }}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            keyboardShouldPersistTaps="handled"
          >
            {/* HEADER SECTION */}
            <Title title={"پیگیری مرسوله"} home={false} />

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-4">
                {/* <View className="flex-col px-10 w-full">
                  <LottieView
                    source={searchLottie}
                    autoPlay
                    loop
                    className="w-full h-[150px] mt-[50px]"
                  />
                </View> */}

                {!barcode && (
                  <FormField
                    placeholder="کد مرسوله"
                    keyboardType="numeric"
                    type={"text"}
                    containerStyle="mt-5"
                    control={control}
                    name="barcode"
                  />
                )}

                {/* RESPONSE CONTAINER */}

                {isLoading ? (
                  <View className="w-full mt-20 p-5 items-center justify-center">
                    <Chase size={60} color="#164194" />
                  </View>
                ) : result ? (
                  result.map((item, index) => (
                    <OrderTrackCard key={index} item={item} />
                  ))
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}
          {!barcode && (
            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="جست و جو"
                handlePress={handleSubmit(onSubmit)}
                isLoading={isLoading}
              />
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default FollowOrder;
