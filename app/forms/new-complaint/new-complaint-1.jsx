// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { newEop } from "@/api/eop";
import CustomSelect from "@/components/CustomSelect";
import { showMessage } from "react-native-flash-message";
import { stepTwoEopValidation, requiredRule } from "@/constants/validations";
import { router } from "expo-router";
import { toastStyles } from "@/constants/styles";
import { CustomModal } from "@/components/CustomModal";
import { Title } from "@/components/Title";
import {
  serviceTypeLookup,
  postalRegionLookup,
  complaintTypeLookup,
} from "@/data/lookup.js";

const NewComplaintStep1 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  // CONSTS
  const complaintData = useUserStore((state) => state.complaintFormData);
  const removeComplaintData = useUserStore(
    (state) => state.removeComplaintData
  );
  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
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
      router.replace("/");
      setVisible(true);
      removeComplaintData();
    } catch (error) {
      console.log("Complain error: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
      reset();
      removeComplaintData();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CustomModal
        visible={visible}
        closeModal={() => setVisible(false)}
        title={"توجه"}
        description={
          "درخواست شما ثبت شد. برای پیگیری به صفحه پست من مراجعه کنید"
        }
        onConfirm={() => router.replace("/")}
      />
      <Background>
        <SafeAreaView className="h-full">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <View className="flex-1">
              {/* HEADER SECTION */}
              <Title title={"ثبت شکایت"} progress={100} home={true} />

              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: 90,
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                //   stickyHeaderIndices={[0]}
              >
                {/* FORM FIELDS */}
                <View className="w-full px-5">
                  <FormField
                    placeholder="شماره سریال بسته پستی"
                    keyboardType="numeric"
                    inputMode="numeric"
                    control={control}
                    containerStyle="mt-5"
                    name="serialNo"
                  />

                  <View className="mt-5">
                    <CustomSelect
                      name="complaintType"
                      control={control}
                      rules={requiredRule}
                      data={complaintTypeLookup}
                      label="* نوع شکایت"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>

                  <View className="mt-5">
                    <CustomSelect
                      name="serviceId"
                      control={control}
                      rules={requiredRule}
                      data={serviceTypeLookup}
                      label="* نوع سرویس"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>

                  <View className="mt-5">
                    <CustomSelect
                      name="to_org_id"
                      control={control}
                      rules={requiredRule}
                      data={postalRegionLookup}
                      label="* واحد پستی"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>
                </View>
              </ScrollView>

              {/* Submit Section */}
              <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
                <CustomButton
                  title="ثبت شکایت"
                  handlePress={handleSubmit(onSubmit)}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default NewComplaintStep1;
