// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import * as SecureStore from "expo-secure-store";
import CustomSelect from "@/components/CustomSelect";
import { Title } from "@/components/Title";
import { toastConfig } from "@/config/toast-config";
import {
  requiredRule,
  nationalCodeRule,
  postCodeRule,
  mobilePhoneValidation,
} from "@/constants/validations";
import { getProvince, getCity } from "@/api/order";
import { optionsGenerator } from "@/helpers/selectHelper";

const NerkhnameStep2 = () => {
  // STATES
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);

  // CONSTS
  const order = useUserStore((state) => state.order);
  const userData = useUserStore((state) => state.userData);
  const setOrder = useUserStore((state) => state.setOrder);
  const sendermobile = SecureStore.getItem("mobile");
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      ...order,
      sendermobile,
      senderid: userData?.nationalCode,
      sendername: order.firstName ? order.sendername : userData?.name,
      senderLastname: order.lastName
        ? order.senderLastname
        : userData?.lastName,
      senderpostalcode: userData?.postalCode || "",
    },
  });
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    // CHECK POSTAL CODE WITH CITY CODE
    const cityCodeString = form_data.sourcecode.toString();

    if (!form_data.senderpostalcode.startsWith(cityCodeString)) {
      toastConfig.warning("کد پستی با شهر انتخابی مطابقت ندارد");
      return;
    }

    console.log("FORM DATA: ", form_data);
    setOrder({ ...order, ...form_data });
    router.push(`/forms/order/order-step-3`);
  };

  const fetchProvince = async () => {
    setIsProvinceLoading(true);
    try {
      const response = await getProvince();
      console.log("PROVINCE RESPONSE: ", response.data);
      const options = optionsGenerator(
        response.data.itemList,
        "provinceCode",
        "provinceName"
      );
      setProvinceOptions(options);
    } finally {
      setIsProvinceLoading(false);
    }
  };

  const fetchCity = async (provinceID = null) => {
    setIsCityLoading(true);
    try {
      const response = await getCity(provinceID);
      console.log("CITY RESPONSE: ", response.data);
      const options = optionsGenerator(
        response.data.itemList,
        "cityCode",
        "cityName"
      );
      setCityOptions(options);
    } finally {
      setIsCityLoading(false);
    }
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            {/* HEADER SECTION */}
            <Title
              title={`${order?.servicetype?.label} : اطلاعات فرستنده`}
              progress={45}
            />

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
                  placeholder="* نام"
                  type={"text"}
                  keyboardType="default"
                  containerStyle="mt-10"
                  control={control}
                  rules={requiredRule}
                  name="sendername"
                />

                <FormField
                  placeholder="* نام خانوادگی"
                  type={"text"}
                  keyboardType="default"
                  containerStyle="mt-5"
                  control={control}
                  rules={requiredRule}
                  name="senderLastname"
                />

                <FormField
                  placeholder="* تلفن همراه"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  control={control}
                  rules={{ ...requiredRule, ...mobilePhoneValidation }}
                  name="sendermobile"
                />

                <FormField
                  placeholder="تلفن ثابت"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  control={control}
                  name="senderPhone"
                />

                <FormField
                  placeholder="* کد ملی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  control={control}
                  rules={{ ...requiredRule, ...nationalCodeRule }}
                  name="senderid"
                />

                <FormField
                  placeholder="* کد پستی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  control={control}
                  rules={{ ...requiredRule, ...postCodeRule }}
                  name="senderpostalcode"
                />

                <View className="mt-5">
                  <CustomSelect
                    name="senderProvinceID"
                    control={control}
                    rules={requiredRule}
                    data={provinceOptions}
                    label="* استان"
                    errors={errors}
                    search={true}
                    setValue={setValue}
                    isLoading={isProvinceLoading}
                    onValueChange={(val) => {
                      if (val) {
                        fetchCity(val);
                      } else {
                        setCityOptions([]);
                      }
                    }}
                    onClear={() => {
                      setValue("senderProvinceID", null);
                      setValue("sourcecode", null);
                      setCityOptions([]);
                    }}
                  />
                </View>

                <View className="mt-5">
                  <CustomSelect
                    name="sourcecode"
                    control={control}
                    rules={requiredRule}
                    data={cityOptions}
                    label="* شهر"
                    errors={errors}
                    setValue={setValue}
                    isLoading={isCityLoading}
                    search={true}
                  />
                </View>

                <FormField
                  placeholder="* آدرس"
                  type={"text"}
                  multiline={true}
                  rules={requiredRule}
                  keyboardType="default"
                  containerStyle="mt-5"
                  search={true}
                  height="h-32 align-top"
                  inputStyle={{
                    textAlignVertical: "top",
                    textAlign: "right",
                    paddingTop: 20,
                  }}
                  control={control}
                  name="senderaddress"
                />
              </View>
            </ScrollView>

            {/* BOTTOM SECTION */}
            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="ادامه"
                handlePress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhnameStep2;
