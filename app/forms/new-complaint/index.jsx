// IMPORTS
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { stepOneEopValidations } from "@/constants/validations";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Background from "@/components/Background";
import { showMessage } from "react-native-flash-message";
import LottieView from "lottie-react-native";
import { toastStyles } from "@/constants/styles";
import judgeLottie from "@/assets/animations/judge-lottie.json";
import * as SecureStore from "expo-secure-store";
import { Title } from "@/components/Title";

const Index = () => {
  // STATES
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
    router.push("/forms/new-complaint/step2");
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
          <Title title={"ثبت شکایت"} progress={50} home={false} />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-4">
              <LottieView
                source={judgeLottie}
                autoPlay
                loop
                className="w-full h-[100px] mt-[50px]"
              />

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
                containerStyle="mt-5"
                editable={false}
                style={{ color: "#666666" }}
                value={userData?.nationalCode || "-"}
                name="nationalCode"
              />

              <FormField
                placeholder="عنوان شکایت"
                keyboardType="text"
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
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
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
