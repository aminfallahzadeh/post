// IMPORTS
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Background from "@/components/Background";
import SelectInput from "@/components/SelectInput";
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
    router.push("/ehraz/ehraz-step-2");
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
          <Title progress={50} title="احراز نشانی" home={false} />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.applicantType?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="applicantType"
                  control={control}
                  rules={requiredRule}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder="* نوع شخصیت"
                      options={applicantTypeOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        applicantTypeOptions.find(
                          (c) => c.value === form_data?.applicantType
                        )?.value
                      }
                    />
                  )}
                />
              </View>

              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.gender?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="gender"
                  control={control}
                  rules={requiredRule}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder="* جنسیت"
                      options={genderOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        genderOptions.find((c) => c.value === form_data?.gender)
                          ?.value
                      }
                    />
                  )}
                />
              </View>

              <FormField
                placeholder="نام"
                type={"text"}
                containerStyle="mt-5"
                keyboardType="default"
                rules={requiredRule}
                control={control}
                name="firstName"
              />

              <FormField
                placeholder="نام خانوادگی"
                type={"text"}
                containerStyle="mt-5"
                keyboardType="default"
                rules={requiredRule}
                control={control}
                name="lastName"
              />

              <FormField
                placeholder="شماره ملی"
                type={"text"}
                containerStyle="mt-5"
                keyboardType="numeric"
                rules={requiredRule}
                control={control}
                name="nationalCodeOrId"
              />

              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.addressStatus?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="addressStatus"
                  control={control}
                  rules={requiredRule}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder="وضعیت نشانی"
                      options={addressStatusOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        addressStatusOptions.find(
                          (c) => c.value === form_data?.addressStatus
                        )?.value
                      }
                    />
                  )}
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
