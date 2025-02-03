// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useUserStore } from "@/store";
import { customerProfile } from "@/api/customer";
import { showMessage } from "react-native-flash-message";
import { days, months, years } from "@/data/lookup";
import { toastConfig } from "@/config/toast-config";
import FormField from "@/components/FormField";
// import FormFieldPastable from "@/components/FormFieldPastable";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import Background from "@/components/Background";
import useGetUserData from "@/hooks/useGetUserData";
import { userDataValidations, nationalCodeRule } from "@/constants/validations";
import { validatePostCode } from "@/api/gnaf";
import { Title } from "@/components/Title";
import * as SecureStore from "expo-secure-store";
import { toastStyles } from "@/constants/styles";
import { postalCodeValidation } from "@/constants/validations";

const UserProfile = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // CONSTS
  const { id } = useLocalSearchParams();
  const mobile = SecureStore.getItem("mobile");
  const userData = useUserStore((state) => state.userData);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const form_data = watch();

  // ACCESS HOOK FUNCTIONS
  const { fetchCustomerData, isLoading: userDataLoading } =
    useGetUserData(mobile);

  // FILL FORM BASED ON USER CURRENT DATA
  useEffect(() => {
    if (userData && userData.birthDate) {
      const [year, month, day] = userData?.birthDate?.split("/");
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
        setValue("day", day);
        setValue("year", year);
        setValue("month", month);
      });
    }
  }, [setValue, userData]);

  const onSubmit = async (data) => {
    const validations = [
      ...userDataValidations(form_data),
      ...postalCodeValidation(form_data),
    ];

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

    setIsValidating(true);
    try {
      const data = [{ clientRowID: 1, postCode: form_data.postalCode }];
      const validateResponse = await validatePostCode(data);
      if (!validateResponse.data.itemList[0].value) {
        toastConfig.warning("کد پستی معتبر نیست");
        return;
      }

      setIsLoading(true);
      const birthDate =
        form_data.year + "/" + form_data.month + "/" + form_data.day;

      const response = await customerProfile({
        id,
        name: form_data.name,
        lastName: form_data.lastName,
        birthDate,
        nationalCode: form_data.nationalCode,
        postalCode: form_data.postalCode,
        mobile,
      });

      await fetchCustomerData(mobile);
      reset();
      toastConfig.success(response.data.message);
      router.replace("/");
    } finally {
      setIsValidating(false);
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            {/* HEADER SECTION */}
            <Title title={"پروفایل کاربر"} progress={false} home={true} />

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 90,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              //   stickyHeaderIndices={[0]}
            >
              <View className="w-full px-5">
                <FormField
                  placeholder="نام"
                  control={control}
                  containerStyle="mt-5"
                  name="name"
                />

                <FormField
                  placeholder="نام خانوادگی"
                  control={control}
                  containerStyle="mt-5"
                  name="lastName"
                />
                <FormField
                  placeholder="کد ملی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  rules={nationalCodeRule}
                  control={control}
                  containerStyle="mt-5"
                  name="nationalCode"
                />

                <FormField
                  placeholder="کد پستی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  control={control}
                  containerStyle="mt-5"
                  name="postalCode"
                />

                <View className="mt-5">
                  <Text className="text-base text-gray2 font-isansmedium w-full text-right px-2">
                    تاریخ تولد :
                  </Text>
                </View>

                <View className="flex-row-reverse justify-between items-center mt-5">
                  <View className="flex-1 ml-2">
                    <CustomSelect
                      name="day"
                      control={control}
                      data={days}
                      label="روز"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>

                  <View className="flex-1 mr-2 ml-2">
                    <CustomSelect
                      name="month"
                      control={control}
                      data={months}
                      label="ماه"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>

                  <View className="flex-1 mr-2">
                    <CustomSelect
                      name="year"
                      control={control}
                      data={years}
                      label="سال"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* BOTTOM SECTION */}

            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="ذخیره"
                handlePress={handleSubmit(onSubmit)}
                isLoading={isLoading || userDataLoading || isValidating}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default UserProfile;
