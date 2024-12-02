// IMPORTS
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Pressable,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { orderTracking } from "@/api/traking";
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Background from "@/components/Background";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import OrderTrackCard from "@/components/OrderTrackCard";
import LottieView from "lottie-react-native";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";
import { orderTrackingValidation } from "@/constants/validations";
import searchLottie from "@/assets/animations/search-lottie.json";
import { toastStyles } from "@/constants/styles";

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
    // try {
    //   setIsLoading(true);
    //   const response = await orderTracking(form_data.barcode);
    //   console.log("ORDER TRACKING RESPONSE: ", response.data);
    //   setResult(response.data.itemList);
    //   // setDate(response.data.itemList[0].tfDate.split(" ")[0]);
    //   reset();
    // } finally {
    //   setIsLoading(false);
    // }
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
                  پیگیری مرسوله
                </Text>
              </View>
            </View>

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-4">
                <View className="flex-col px-10 w-full">
                  <LottieView
                    source={searchLottie}
                    autoPlay
                    loop
                    className="w-full h-[150px] mt-[50px]"
                  />
                </View>

                {!barcode && (
                  <FormField
                    placeholder="شماره پیگیری"
                    keyboardType="numeric"
                    type={"text"}
                    containerStyle="mt-5"
                    control={control}
                    name="barcode"
                  />
                )}

                {/* RESPONSE CONTAINER */}
                <Text className="text-primary font-isansbold text-[18px] w-full justify-normal items-center text-center mt-10">
                  نتیجه جست و جو
                </Text>

                <View
                  className={`w-full rounded-md mt-5 p-5 items-center ${
                    !result ? "justify-center" : "justify-start"
                  }`}
                  style={styles.resultContainer}
                >
                  {isLoading ? (
                    <Chase size={40} color="#164194" />
                  ) : result ? (
                    result.map((item, index) => (
                      <OrderTrackCard key={index} item={item} />
                    ))
                  ) : (
                    !barcode && (
                      <Text className="text-grey4 font-isansregular text-[15px]">
                        شماره پیگیری را وارد کرده و جست و جو کنید
                      </Text>
                    )
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}
          {!barcode && (
            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="جست و جو"
                bgColor="bg-green-700"
                titleColor="text-white"
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

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  resultContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    minHeight: 100,
  },
});
