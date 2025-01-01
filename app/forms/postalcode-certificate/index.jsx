// IMPORTS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { addressByPostCode } from "@/api/gnaf";
import { useUserStore } from "@/store";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Background from "@/components/Background";
import PostalCodeCard from "@/components/PostalCodeCard";
import { postalCodeValidation } from "@/constants/validations";
import { showMessage } from "react-native-flash-message";
import { Title } from "@/components/Title";
import { toastStyles } from "@/constants/styles";

const Index = () => {
  // STATES
  const [postalCodes, setPostalCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [plusDisabled, setPlusDisabled] = useState(true);

  // CONSTS
  const { control, handleSubmit, watch, setValue } = useForm();
  const form_data = watch();
  const setAddressByPostCode = useUserStore(
    (state) => state.setAddressByPostCode
  );

  // DISABLE HANDLER
  useEffect(() => {
    if (form_data.postalCode && form_data.postalCode.length > 0) {
      setPlusDisabled(false);
    } else {
      setPlusDisabled(true);
    }
  }, [form_data.postalCode, plusDisabled]);

  // HANDLERS
  const addPostalCodeHandler = () => {
    const validations = postalCodeValidation(form_data);

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

    if (postalCodes.includes(form_data.postalCode)) {
      showMessage({
        message: "این کد پستی قبلا اضافه شده است",
        type: "warning",
        titleStyle: toastStyles,
      });
      return;
    }
    setPostalCodes([...postalCodes, form_data.postalCode]);
    setValue("postalCode", "");
  };

  const removePostalCodeHandler = (postalCode) => {
    setPostalCodes(postalCodes.filter((item) => item !== postalCode));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const data = postalCodes.map((code, index) => ({
        clientRowID: index,
        postCode: code,
      }));
      const response = await addressByPostCode(data);
      console.log("POSTAL CODES RESPONSE: ", response.data.itemList[0].data);
      await setAddressByPostCode(response.data.itemList[0].data);
      router.push("forms/postalcode-certificate/certificate-step-1");
    } catch (error) {
      console.log("POSTAL CODE ERRORS: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
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
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <Title title={"گواهی کد پستی"} progress={33} home={false} />

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
                  inputMode="numeric"
                  containerStyle="w-full"
                  control={control}
                  name="postalCode"
                  max={10}
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
                  style={styles.postalCodeContainers}
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
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="ادامه"
            handlePress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
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
  postalCodeContainers: {
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
