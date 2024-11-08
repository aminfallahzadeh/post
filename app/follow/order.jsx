// REACT IMPORTS
import { useState } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPORTS
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

// AXIOS
import { orderTracking } from "@/api/traking";

// EXPO
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONENTS
import Background from "@/components/Background";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

// LIBRARIES
import LottieView from "lottie-react-native";
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";

// CONSTS
import { orderTrackingValidation } from "@/constants/validations";

// ASSETS
import searchLottie from "@/assets/animations/search-lottie.json";
import { toastStyles } from "@/constants/styles";

const FollowOrder = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [date, setDate] = useState(null);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch, reset } = useForm();

  // ACCESS HOOK FORM DATA
  const form_data = watch();

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

    try {
      setIsLoading(true);
      const response = await orderTracking(form_data.barcode);
      console.log("ORDER TRACKING RESPONSE: ", response.data);
      setResult(response.data.itemList[0]);
      setDate(response.data.itemList[0].tfDate.split(" ")[0]);
      reset();
    } catch (error) {
      console.log("ORDER TRACKING ERROR: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
      reset();
    } finally {
      setIsLoading(false);
    }
  };

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

                <FormField
                  placeholder="شماره پیگیری"
                  keyboardType="numeric"
                  type={"text"}
                  containerStyle="mt-5"
                  control={control}
                  name="barcode"
                />

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
                    <View className="w-full">
                      <View className="flex-row-reverse justify-between mb-2">
                        <Text className="text-primary font-isansbold text-sm">
                          تاریخ :
                        </Text>
                        <Text className="text-grey2 font-isansdemibold text-sm">
                          {date}
                        </Text>
                      </View>

                      <View className="w-full h-[1px] bg-gray-400" />

                      <View className="mt-2">
                        <Text className="text-primary font-isansbold text-sm">
                          توضیحات :
                        </Text>
                        <Text className="text-grey2 font-isansdemibold text-sm mt-1">
                          {result.describe}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <Text className="text-grey4 font-isansregular text-[15px]">
                      شماره پیگیری را وارد کرده و جست و جو کنید
                    </Text>
                  )}
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}
          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
            <CustomButton
              title="جست و جو"
              bgColor="bg-green-700"
              titleColor="text-white"
              handlePress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </View>
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
