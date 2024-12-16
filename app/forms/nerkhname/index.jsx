// IMPORTS
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Background from "@/components/Background";
import RadioButtons from "@/components/RadioButtons";
import { serviceOptions } from "@/data/serviceOptions";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import SelectInput from "@/components/SelectInput";
import { nerkhnameServiceOptions } from "@/data/serviceOptions";
import { parcelOptionsAll } from "@/data/parcelOptions";

const Index = () => {
  // STATES
  // CONSTS
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const form_data = watch();
  // HANDLERS

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
          <Title title="نرخ نامه" home={false} />

          {/* FORM FIELDS */}
          <View className="w-full px-5 mt-5">
            <View className="mt-5 relative">
              {errors && (
                <View className="absolute -top-5 left-0">
                  <Text className="text-red-500 font-isansregular">
                    {errors?.serviceType?.message}
                  </Text>
                </View>
              )}

              <Controller
                name="serviceType"
                control={control}
                render={({ field: { onChange } }) => (
                  <SelectInput
                    placeholder="* نوع سرویس"
                    options={nerkhnameServiceOptions}
                    onValueChange={(val) => onChange(val)}
                    primaryColor="#164194"
                    selectedValue={
                      nerkhnameServiceOptions.find(
                        (c) => c.value === form_data?.serviceType
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
                    {errors?.parcelType?.message}
                  </Text>
                </View>
              )}

              <Controller
                name="parcelType"
                control={control}
                render={({ field: { onChange } }) => {
                  const selectedOption = parcelOptionsAll.find(
                    (c) => c.value === form_data?.parcelType
                  );

                  return (
                    <SelectInput
                      placeholder="* نوع مرسوله"
                      options={parcelOptionsAll}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={selectedOption?.value}
                    />
                  );
                }}
              />
            </View>

            <View className="flex-row-reverse justify-center items-center">
              <View className="flex-1 ml-2">
                <FormField
                  placeholder="وزن"
                  type={"number"}
                  keyboardType="numeric"
                  containerStyle="mt-5"
                  control={control}
                  name="weight"
                />
              </View>

              <Text className="flex-3 self-center text-primary text-xl font-isansbold text-center rounded-lg pt-5">
                گرم
              </Text>
            </View>

            <FormField
              placeholder="نوع کارتن"
              type={"text"}
              containerStyle="mt-5"
              control={control}
              name="boxType"
            />

            <View className="flex-row-reverse justify-between items-center mt-5">
              <View className="flex-1 ml-2">
                <Controller
                  name="parcelType"
                  control={control}
                  render={({ field: { onChange } }) => {
                    const selectedOption = [].find(
                      (c) => c.value === form_data?.parcelType
                    );

                    return (
                      <SelectInput
                        placeholder="* شهر"
                        options={[]}
                        onValueChange={(val) => onChange(val)}
                        primaryColor="#164194"
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
                />
              </View>

              <View className="flex-1 ml-2">
                <Controller
                  name="parcelType"
                  control={control}
                  render={({ field: { onChange } }) => {
                    const selectedOption = [].find(
                      (c) => c.value === form_data?.parcelType
                    );

                    return (
                      <SelectInput
                        placeholder="* استان"
                        options={[]}
                        onValueChange={(val) => onChange(val)}
                        primaryColor="#164194"
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
                />
              </View>
            </View>

            <View className="flex-row-reverse justify-between items-center mt-5">
              <View className="flex-1 ml-2">
                <Controller
                  name="parcelType"
                  control={control}
                  render={({ field: { onChange } }) => {
                    const selectedOption = [].find(
                      (c) => c.value === form_data?.parcelType
                    );

                    return (
                      <SelectInput
                        placeholder="* شهر مقصد"
                        options={[]}
                        onValueChange={(val) => onChange(val)}
                        primaryColor="#164194"
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
                />
              </View>

              <View className="flex-1 ml-2">
                <Controller
                  name="parcelType"
                  control={control}
                  render={({ field: { onChange } }) => {
                    const selectedOption = [].find(
                      (c) => c.value === form_data?.parcelType
                    );

                    return (
                      <SelectInput
                        placeholder="* استان مقصد"
                        options={[]}
                        onValueChange={(val) => onChange(val)}
                        primaryColor="#164194"
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="محاسبه"
            // disabled={!form_data.servicetype}
            // handlePress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
