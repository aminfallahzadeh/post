// REACT IMPORTS
import { useState } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPORTS
import {
  ScrollView,
  Text,
  Pressable,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// AXIOS
import { queryEop } from "@/api/eop";

// COMPONENTS
import Background from "@/components/Background";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

// CONSTANTS
import { followComplaintValidation } from "@/constants/validations";

// LIBRARIES
import LottieView from "lottie-react-native";
import { showMessage } from "react-native-flash-message";
import { Chase } from "react-native-animated-spinkit";

// ASSETS
import { toastStyles } from "@/constants/styles";
import searchLottie from "@/assets/animations/search-lottie.json";

const FollowComplaint = () => {
  // LOADIN STATE
  const [isLoading, setIsLoading] = useState(false);

  // MAIN STATE
  const [queryResult, setQueryResult] = useState(null);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch, reset } = useForm();

  // ACCESS HOOK FORM DATA
  const form_data = watch();

  // HANDLERS
  const onSubmit = async () => {
    const validations = followComplaintValidation(form_data);
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
      const response = await queryEop(parseInt(form_data.publickey));
      console.log("Query EOP Response: ", response.data);
      setQueryResult(response.data.message);
      reset();
    } catch (error) {
      console.log("Query EOP error: ", error.response);
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
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 90,
          }}
          showsVericalScrollIndicator={false}
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
                پیگیری شکایت
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
                name="publickey"
              />

              {/* RESPONSE CONTAINER */}
              <Text className="text-primary font-isansbold text-[18px] w-full justify-normal items-center text-center mt-10">
                نتیجه جست و جو
              </Text>

              <View
                className={`w-full rounded-md mt-5 p-5 items-center ${
                  !queryResult ? "justify-center" : "justify-start"
                }`}
                style={styles.resultContainer}
              >
                {isLoading ? (
                  <Chase size={40} color="#164194" />
                ) : queryResult ? (
                  <Text className="text-grey2 font-isansdemibold text-[16px]">
                    {queryResult}
                  </Text>
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
      </SafeAreaView>
    </Background>
  );
};

export default FollowComplaint;

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
