// IMPORTS
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Background from "@/components/Background";
import * as SecureStore from "expo-secure-store";
import SelectInput from "@/components/SelectInput";
import { optionsGenerator } from "@/helpers/selectHelper";
import { getProvince, getServiceType } from "@/api/gheramat";
import { insertRequestGheramat } from "@/api/request";
import { REQUIRED } from "@/constants/messages";
import { LOADING_MESSAGE } from "@/constants/messages";
import { nationalCodeRule, requiredRule } from "@/constants/validations";
import { Title } from "@/components/Title";

const Index = () => {
  // STATES
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const setGheramatResult = useUserStore((state) => state.setGheramatResult);
  const userData = useUserStore((state) => state.userData);
  const mobile = SecureStore.getItem("mobile");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const form_data = watch();

  // HANDLERS
  const fetchServiceType = async () => {
    setIsServiceLoading(true);
    try {
      const response = await getServiceType();
      console.log("SERVICE RESPONSE: ", response.data);
      const options = optionsGenerator(response.data.itemList, "id", "name");
      setServiceOptions(options);
    } finally {
      setIsServiceLoading(false);
    }
  };

  const fetchProvince = async () => {
    setIsProvinceLoading(true);
    try {
      const response = await getProvince();
      console.log("PROVINCE RESPONSE: ", response.data);
      const options = optionsGenerator(response.data.itemList, "id", "name");
      setProvinceOptions(options);
    } finally {
      setIsProvinceLoading(false);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await insertRequestGheramat({
        parcellno: form_data.parcellno,
        serviceKind: form_data.serviceKind,
        province: parseInt(form_data.province),
        mobile,
        customerName: userData.name,
        customerFamily: userData.lastName,
        nationalID: userData.nationalCode,
      });
      console.log("GHERAMAT RESPONSE: ", response.data);
      setGheramatResult(response.data.itemList[0]);
      router.push("forms/gheramat/step2");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  // EFFECTS
  useEffect(() => {
    fetchProvince();
    fetchServiceType();
  }, []);

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
          <Title title={"درخواست غرامت"} progress={50} home={false} />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-4">
              <FormField
                placeholder="نام"
                type={"text"}
                value={userData?.name || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="name"
              />

              <FormField
                placeholder="نام خانوادگی"
                type={"text"}
                value={userData?.lastName || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="lastname"
              />

              <FormField
                placeholder="کد ملی"
                type={"text"}
                rules={nationalCodeRule}
                value={userData?.nationalCode || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="nationalCode"
              />

              <FormField
                placeholder="تلفن"
                type={"text"}
                value={mobile || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="mobile"
              />

              <FormField
                placeholder="* شماره مرسوله"
                keyboardType="numeric"
                type={"text"}
                rules={requiredRule}
                containerStyle="mt-5"
                control={control}
                name="parcellno"
              />

              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.serviceKind?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="serviceKind"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: REQUIRED,
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <SelectInput
                      placeholder={
                        isServiceLoading ? LOADING_MESSAGE : "* نوع سرویس"
                      }
                      options={serviceOptions}
                      onChange={(val) => onChange(val.value)}
                      value={value}
                      onClear={() => setValue("serviceKind", null)}
                    />
                  )}
                />
              </View>

              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.serviceKind?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="province"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: REQUIRED,
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <SelectInput
                      placeholder={
                        isProvinceLoading ? LOADING_MESSAGE : "* شهر"
                      }
                      options={provinceOptions}
                      onChange={(val) => onChange(val.value)}
                      value={value}
                      onClear={() => setValue("province", null)}
                      search={true}
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
