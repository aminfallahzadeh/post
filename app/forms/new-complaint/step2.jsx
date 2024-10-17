// REACT IMPORTS
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

// NATIVE IMPROTS
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONETNS
import ProgressBar from "@/components/ProgressBar";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";

// AXIOS
import { useUserStore } from "@/store";
import { newEop } from "@/api/eop";

// LIBRARIES
import Dropdown from "react-native-input-select";
import { showMessage } from "react-native-flash-message";

// CONTSTANTS
import {
  selectPlaceholderStyle,
  selectContainerStyle,
  selectDropdownStyle,
  selectItemStyle,
  modalControls,
  checkboxControls,
} from "@/constants/styles";
import { stepTwoEopValidation } from "@/constants/validations";

// EXPO IMPORTS
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// ASSETS
import { toastStyles } from "@/constants/styles";

// DATA
import {
  seriveTypeLookup,
  postalReagionLookup,
  complaintTypeLookup,
} from "@/data/lookup.js";

const Step2 = () => {
  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // ACCES GLOBAL STORE
  const complaintData = useUserStore((state) => state.complaintFormData);
  const setComplaintFormData = useUserStore(
    (state) => state.setComplaintFormData
  );
  const removeComplaintData = useUserStore(
    (state) => state.removeComplaintData
  );

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch, reset } = useForm();

  // ACCESS FORM DATA
  const form_data = watch();

  useEffect(() => {
    console.log("THIS IS THE COMPLAINT", complaintData);
  }, [complaintData]);

  const onSubmit = async () => {
    const validations = stepTwoEopValidation(form_data);
    for (let validation of validations) {
      if (validation.check) {
        showMessage({
          message: validation.message,
          type: "danger",
          titleStyle: toastStyles,
        });
        return;
      }
    }

    setIsLoading(true);
    try {
      setComplaintFormData(form_data);

      const response = await newEop(complaintData);
      console.log("Customer profile response", response);
      showMessage({
        message: response.data.message,
        type: "success",
        titleStyle: toastStyles,
      });
      reset();
      router.replace("/services");
      removeComplaintData();
    } catch (error) {
      console.log("Customer profile error: ", error);
      showMessage({
        message: error.response.data.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // DEBUGGING
  useEffect(() => {
    console.log(form_data);
  }, [form_data]);

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
                  ثبت شکایت
                </Text>
              </View>

              <View className="flex-col px-10 w-full pb-2">
                <ProgressBar progress={100} />
              </View>
            </View>

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-4">
                <FormField
                  placeholder="شماره سریال بسته پستی :"
                  keyboardType="default"
                  type={"text"}
                  control={control}
                  containerStyle="mt-5"
                  name="serialNo"
                />
                <View className="mt-5">
                  <Controller
                    name="complaintType"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Dropdown
                        placeholder="نوع شکایت"
                        options={complaintTypeLookup}
                        onValueChange={(val) => onChange(val)}
                        selectedValue={
                          complaintTypeLookup.find(
                            (c) => c.value === form_data?.complaintType
                          )?.value
                        }
                        primaryColor={"#164194"}
                        placeholderStyle={selectPlaceholderStyle}
                        dropdownContainerStyle={selectContainerStyle}
                        dropdownStyle={selectDropdownStyle}
                        selectedItemStyle={selectItemStyle}
                        checkboxControls={checkboxControls}
                        modalControls={modalControls}
                      />
                    )}
                  />
                </View>

                <View className="mt-5">
                  <Controller
                    name="serviceId"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Dropdown
                        placeholder="نوع سرویس"
                        options={seriveTypeLookup}
                        selectedValue={
                          seriveTypeLookup.find(
                            (c) => c.value === form_data?.serviceId
                          )?.value
                        }
                        onValueChange={(val) => onChange(val)}
                        primaryColor={"#164194"}
                        placeholderStyle={selectPlaceholderStyle}
                        dropdownContainerStyle={selectContainerStyle}
                        dropdownStyle={selectDropdownStyle}
                        selectedItemStyle={selectItemStyle}
                        checkboxControls={checkboxControls}
                        modalControls={modalControls}
                      />
                    )}
                  />
                </View>

                <View className="mt-5">
                  <Controller
                    name="to_org_id"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Dropdown
                        placeholder="واحد پستی"
                        options={postalReagionLookup}
                        selectedValue={
                          postalReagionLookup.find(
                            (c) => c.value === form_data?.to_org_id
                          )?.value
                        }
                        onValueChange={(val) => onChange(val)}
                        primaryColor={"#164194"}
                        placeholderStyle={selectPlaceholderStyle}
                        dropdownContainerStyle={selectContainerStyle}
                        dropdownStyle={selectDropdownStyle}
                        selectedItemStyle={selectItemStyle}
                        checkboxControls={checkboxControls}
                        modalControls={modalControls}
                      />
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}

          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
            <CustomButton
              title="ثبت"
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

export default Step2;

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
});
