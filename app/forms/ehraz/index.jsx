// IMPORTS
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Background from "@/components/Background";
import CustomSelect from "@/components/CustomSelect";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import { requiredRule } from "@/constants/validations";
import {
  applicantTypeOptions,
  genderOptions,
  addressStatusOptions,
} from "@/data/ehraz";

const Index = () => {
  // STATES
  const userData = useUserStore((state) => state.userData);
  const setEhrazFormData = useUserStore((state) => state.setEhrazFormData);

  // CONSTS
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: userData.name,
      lastName: userData.lastName,
      nationalCodeOrId: userData.nationalCode,
    },
  });
  const form_data = watch();

  const onSubmit = (data) => {
    setEhrazFormData(data);
    router.push("forms/ehraz/ehraz-step-1");
  };

  // DEBUG
  useEffect(() => {
    console.log(form_data);
  }, [form_data]);

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
          <Title progress={33} title="احراز نشانی" home={false} />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <View className="mt-5">
                <CustomSelect
                  name="applicantType"
                  control={control}
                  rules={requiredRule}
                  data={applicantTypeOptions}
                  label="* نوع شخصیت"
                  errors={errors}
                  setValue={setValue}
                />
              </View>

              <View className="mt-5">
                <CustomSelect
                  name="gender"
                  control={control}
                  rules={requiredRule}
                  data={genderOptions}
                  label="* جنسیت"
                  errors={errors}
                  setValue={setValue}
                />
              </View>

              <FormField
                placeholder="نام"
                keyboardType="default"
                containerStyle="mt-5"
                rules={requiredRule}
                control={control}
                name="firstName"
              />

              <FormField
                placeholder="نام خانوادگی"
                keyboardType="default"
                containerStyle="mt-5"
                rules={requiredRule}
                control={control}
                name="lastName"
              />

              <FormField
                placeholder="شماره ملی"
                keyboardType="numeric"
                inputMode="numeric"
                containerStyle="mt-5"
                rules={requiredRule}
                control={control}
                name="nationalCodeOrId"
              />

              <View className="mt-5">
                <CustomSelect
                  name="addressStatus"
                  control={control}
                  rules={requiredRule}
                  data={addressStatusOptions}
                  label="* وضعیت نشانی"
                  errors={errors}
                  setValue={setValue}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton title="ادامه" handlePress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
