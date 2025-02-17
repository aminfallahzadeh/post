// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { newEop } from "@/api/eop";
import CustomSelect from "@/components/CustomSelect";
import { showMessage } from "react-native-flash-message";
import { requiredRule, barcodeRule } from "@/constants/validations";
import { router } from "expo-router";
import { toastStyles } from "@/constants/styles";
import { CustomModal } from "@/components/CustomModal";
import { Title } from "@/components/Title";
import FormFieldPastable from "@/components/FormFieldPastable";
import {
  serviceTypeLookup,
  postalRegionLookup,
  complaintTypeLookup,
} from "@/data/lookup.js";

const NewComplaintStep1 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trackingCode, setTrackingCode] = useState("یافت نشد");
  const [isBarcodeRequired, setIsBarcodeRequired] = useState(true);

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
    trigger,
    formState: { errors },
    unregister,
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
    // const validations = stepTwoEopValidation(form_data);
    // for (let validation of validations) {
    //   if (validation.check) {
    //     showMessage({
    //       message: validation.message,
    //       type: "warning",
    //       titleStyle: toastStyles,
    //     });
    //     return;
    //   }
    // }
    setIsLoading(true);
    try {
      const response = await newEop({
        ...complaintData,
        ...form_data,
        serialNo: form_data.serialNo ? form_data.serialNo : "",
        serviceId: form_data.serviceId ? form_data.serviceId : 106,
      });
      console.log("Customer profile response", response);
      showMessage({
        message: response.data.message,
        type: "success",
        titleStyle: toastStyles,
      });
      setTrackingCode(response.data.itemList[0].retVal);
      setVisible(true);
      reset();
      removeComplaintData();
    } catch (error) {
      console.log("Complain error: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // EFFECTS
  useEffect(() => {
    if (form_data.complaintType) {
      if ([81, 110, 79].includes(form_data.complaintType)) {
        unregister("serialNo");
        unregister("serviceId");
        setIsBarcodeRequired(false);
      } else {
        setIsBarcodeRequired(true);
      }
    }
  }, [form_data.complaintType, unregister]);

  useEffect(() => {
    trigger("serialNo");
  }, [trigger, isBarcodeRequired]);

  // DEBUG
  useEffect(() => {
    console.log("FORM DATA: ", form_data);
  }, [form_data]);

  return (
    <>
      <CustomModal
        visible={visible}
        title={"توجه"}
        description={`درخواست شما با موفقیت ثبت شد \n شماره پیگیری :${trackingCode}`}
        onConfirm={() => router.replace("/")}
      >
        <Text className="text-grey2 text-sm font-isansregular text-center pt-5 mt-5">
          برای اطلاعات بیشتر به صفحه{" "}
          <Text
            className="text-primary text-md font-isansbold text-center underline"
            onPress={() => router.replace("/mypost/my-complaint")}
          >
            پست من{" "}
          </Text>
          مراجعه کنید
        </Text>
      </CustomModal>
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

                  {form_data.complaintType !== 81 &&
                    form_data.complaintType !== 110 &&
                    form_data.complaintType !== 79 && (
                      <>
                        <FormFieldPastable
                          placeholder="بارکد پستی"
                          keyboardType="numeric"
                          inputMode="numeric"
                          control={control}
                          rules={{
                            ...barcodeRule,
                            required: {
                              value: isBarcodeRequired,
                              message: "این فیلد الزامی است",
                            },
                          }}
                          containerStyle="mt-5"
                          name="serialNo"
                        />

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
                      </>
                    )}

                  <View className="mt-5">
                    <CustomSelect
                      name="to_org_id"
                      control={control}
                      rules={requiredRule}
                      data={postalRegionLookup}
                      label="* استان مقصد"
                      errors={errors}
                      setValue={setValue}
                      search={true}
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
