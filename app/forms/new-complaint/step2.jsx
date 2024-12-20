// IMPORTS
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { newEop } from "@/api/eop";
import Dropdown from "react-native-input-select";
import { showMessage } from "react-native-flash-message";
import {
  selectPlaceholderStyle,
  selectContainerStyle,
  selectDropdownStyle,
  selectItemStyle,
  modalControls,
  checkboxControls,
} from "@/constants/styles";
import { stepTwoEopValidation } from "@/constants/validations";
import { router } from "expo-router";
import { toastStyles } from "@/constants/styles";
import {
  seriveTypeLookup,
  postalReagionLookup,
  complaintTypeLookup,
} from "@/data/lookup.js";
import { Title } from "@/components/Title";

const Step2 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const complaintData = useUserStore((state) => state.complaintFormData);
  const removeComplaintData = useUserStore(
    (state) => state.removeComplaintData
  );
  const { control, handleSubmit, watch, reset } = useForm();
  const form_data = watch();

  // EFFECTS
  useEffect(() => {
    console.log("THIS IS THE COMPLAINT", complaintData);
  }, [complaintData]);

  useEffect(() => {
    console.log(Number(complaintData.serialNo));
  }, [complaintData.serialNo]);

  const onSubmit = async () => {
    const validations = stepTwoEopValidation(form_data);
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

    setIsLoading(true);
    try {
      const response = await newEop({
        ...complaintData,
        ...form_data,
      });
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
      console.log("Complain error: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
      reset();
      router.replace("/services");
      removeComplaintData();
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
          <Title title={"ثبت شکایت"} progress={100} home={true} />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-4">
              <FormField
                placeholder="شماره سریال بسته پستی"
                keyboardType="numeric"
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
            title="ثبت شکایت"
            handlePress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Step2;
