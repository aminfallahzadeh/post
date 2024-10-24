// REACT IMPORTS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPORTS
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// AXIOS AND STORE
import { useUserStore } from "@/store";

// CONSTANTS
import { stepOneEopValidations } from "@/constants/validations";

// EXPO IMPORTS
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONETS
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";
import PostalCodeCard from "@/components/PostalCodeCard";

// LIBRARIES
import { showMessage } from "react-native-flash-message";
import LottieView from "lottie-react-native";

// ASSETS
import { toastStyles } from "@/constants/styles";
import judgeLottie from "@/assets/animations/judge-lottie.json";

const Index = () => {
  // MAIN STATE
  const [postalCodes, setPostalCodes] = useState([]);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch } = useForm();

  // ACCESS HOOK FORM DATA
  const form_data = watch();

  // LOADINT STATE
  const [isLoading, setIsLoading] = useState(false);

  // PLUS DISABLED
  const [plusDisabled, setPlusDisabled] = useState(true);

  // SUBMIT HANDLER
  const onSubmit = () => {
    console.log(form_data);
  };

  // DISBALE HANLDER
  useEffect(() => {
    if (form_data.postalCode && form_data.postalCode.length > 0) {
      setPlusDisabled(false);
    } else {
      setPlusDisabled(true);
    }
  }, [form_data.postalCode, plusDisabled]);

  // DEBUGGING
  useEffect(() => {
    console.log(postalCodes);
  }, [postalCodes]);

  // HANDLERS
  const addPostalCodeHandler = () => {
    if (postalCodes.includes(form_data.postalCode)) {
      showMessage({
        message: "این کد پستی قبلا اضافه شده است",
        type: "warning",
        titleStyle: toastStyles,
      });
      return;
    }
    setPostalCodes([...postalCodes, form_data.postalCode]);
  };

  const removePostalCodeHandler = (postalCode) => {
    setPostalCodes(postalCodes.filter((item) => item !== postalCode));
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
                  گواهی کد پستی
                </Text>
              </View>

              <View className="flex-col px-10 w-full pb-2">
                <ProgressBar progress={33} />
              </View>
            </View>

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-5">
                <View
                  className="w-full flex-row-reverse px-10 justify-between items-center mt-10"
                  style={styles.inputContainer}
                >
                  <FormField
                    placeholder="کد پستی"
                    keyboardType="numeric"
                    type={"text"}
                    containerStyle="w-full"
                    control={control}
                    name="postalCode"
                  />
                  <TouchableOpacity
                    disabled={plusDisabled}
                    onPress={addPostalCodeHandler}
                  >
                    <Feather
                      name="plus"
                      size={24}
                      color={`${plusDisabled ? "gray" : "green"}`}
                    />
                  </TouchableOpacity>
                </View>

                <View className="w-full mt-20 justify-center items-center">
                  <Text className="text-primary font-isansbold text-[18px]">
                    لیست کد پستی های شما
                  </Text>
                  <View
                    className={`w-full rounded-md mt-5 p-5 items-center ${
                      postalCodes.length === 0
                        ? "justify-center"
                        : "justify-start"
                    }`}
                    style={styles.postalCodeContaiers}
                  >
                    {postalCodes.length === 0 ? (
                      <Text className="text-grey4 font-isansregular text-[15px]">
                        لطفا کد پستی خود را اضافه کنید
                      </Text>
                    ) : (
                      <View
                        className="w-full flex-row-reverse flex-wrap"
                        style={styles.postalCodesItemContainer}
                      >
                        {postalCodes.map((postalCode, index) => (
                          <PostalCodeCard
                            key={index}
                            postalCode={postalCode}
                            handlePress={() =>
                              removePostalCodeHandler(postalCode)
                            }
                          />
                        ))}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}

          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
            <CustomButton
              title="ادامه"
              handlePress={handleSubmit(onSubmit)}
              isLoading={isLoading}
              // disabled={true}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Index;

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
