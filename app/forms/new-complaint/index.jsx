// IMPORTS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { stepOneEopValidations } from "@/constants/validations";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Background from "@/components/Background";
import { showMessage } from "react-native-flash-message";
import { toastStyles } from "@/constants/styles";
import { nationalCodeRule } from "@/constants/validations";
import * as SecureStore from "expo-secure-store";
import CustomModal from "@/components/CustomModal";
import { Title } from "@/components/Title";

const Index = () => {
  // STATES
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const userData = useUserStore((state) => state.userData);
  const setComplaintFormData = useUserStore(
    (state) => state.setComplaintFormData
  );
  const { control, handleSubmit, watch } = useForm();
  const form_data = watch();

  // HANDLERS
  const onSubmit = async () => {
    const validations = stepOneEopValidations(form_data);

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
    await setComplaintFormData(form_data);
    setIsLoading(false);
    router.push("/forms/new-complaint/new-complaint-1");
  };

  useEffect(() => {
    if (!userData.nationalCode) {
      setVisible(true);
    }
  }, [userData.nationalCode]);

  return (
    <>
      <CustomModal
        visible={visible}
        closeModal={() => router.replace("/")}
        title="توجه"
        description="شماره ملی شما ثبت نشده است. لطفا از پروفایل کاربری اقدام به ثبت شماره ملی نمایید."
      />
      <Background>
        <SafeAreaView className="h-full">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <View className="flex-1">
              {/* HEADER SECTION */}
              <Title title={"ثبت شکایت"} progress={50} home={false} />

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
                <View className="w-full px-4">
                  <FormField
                    placeholder="شماره موبایل"
                    keyboardType="default"
                    type={"text"}
                    editable={false}
                    value={mobile || "-"}
                    style={{ color: "#666666" }}
                    containerStyle="mt-5"
                    control={control}
                    name="mobile"
                  />

                  <FormField
                    placeholder="نام"
                    keyboardType="default"
                    containerStyle="mt-5"
                    type={"text"}
                    value={userData?.name || "-"}
                    editable={false}
                    style={{ color: "#666666" }}
                    control={control}
                    name="name"
                  />

                  <FormField
                    placeholder="نام خانوادگی"
                    keyboardType="default"
                    containerStyle="mt-5"
                    type={"text"}
                    control={control}
                    editable={false}
                    style={{ color: "#666666" }}
                    value={userData?.lastName || "-"}
                    name="lastname"
                  />

                  <FormField
                    placeholder="کد ملی"
                    keyboardType="default"
                    type={"text"}
                    control={control}
                    rules={nationalCodeRule}
                    containerStyle="mt-5"
                    editable={false}
                    style={{ color: "#666666" }}
                    value={userData?.nationalCode || "-"}
                    name="nationalCode"
                  />

                  <FormField
                    placeholder="عنوان شکایت"
                    keyboardType="default"
                    type={"text"}
                    height={"h-[100px]"}
                    containerStyle="mt-5"
                    max={800}
                    multiline
                    inputStyle={{
                      textAlignVertical: "top",
                      textAlign: "right",
                      paddingTop: 10,
                    }}
                    control={control}
                    name="title"
                  />
                </View>
              </ScrollView>

              {/* BOTTOM SECTION */}
              <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
                <CustomButton
                  title="ادامه"
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

export default Index;
