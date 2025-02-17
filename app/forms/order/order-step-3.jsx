// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import { CustomTextInput } from "@/components/CustomTextInput";
import { Title } from "@/components/Title";
import { toastConfig } from "@/config/toast-config";
import { getProvince, getCity } from "@/api/order";
import { optionsGenerator } from "@/helpers/selectHelper";
import {
  requiredRule,
  nationalCodeRule,
  postCodeRule,
  mobilePhoneValidation,
} from "@/constants/validations";

const OrderStep3 = () => {
  // STATES
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);

  // CONSTS
  const order = useUserStore((state) => state.order);
  const setOrder = useUserStore((state) => state.setOrder);
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    values: {
      ...order,
    },
  });
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    if (form_data.receiverpostalcode) {
      const cityCodeString = form_data.destcode.toString();

      if (!form_data.receiverpostalcode.startsWith(cityCodeString)) {
        toastConfig.warning("کد پستی با شهر انتخابی مطابقت ندارد");
        return;
      }
    }

    if (form_data.receiverid === order.senderid) {
      //   setNationalCodeModal(true);
      toastConfig.warning("شماره موبایل گیرنده و فرستنده باید متفاوت باشد");
      return;
    }

    if (form_data.receivermobile === order.sendermobile) {
      //   setMobileModal(true);
      toastConfig.warning("شماره موبایل گیرنده و فرستنده باید متفاوت باشد");
      return;
    }

    if (form_data.receiverpostalcode === order.senderpostalcode) {
      //   setPostalCodeModal(true);
      toastConfig.warning("کد پستی گیرنده و فرستنده باید متفاوت باشد");
      return;
    }

    setOrder({ ...order, ...form_data });
    router.push(`/forms/order/order-step-4`);
    console.log("FORM DATA: ", form_data);
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

  useEffect(() => {
    if (order?.destcode) {
      fetchCity(order?.destcode);
    }
  }, [order?.destcode]);

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME STEP 3: ", order);
    console.log("FORM DATA STEP 3: ", form_data);
  }, [order, form_data]);

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
              title={`${order?.servicetype?.label} : اطلاعات گیرنده`}
              progress={64}
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
                <CustomTextInput
                  placeholder="* نام"
                  type={"text"}
                  keyboardType="default"
                  containerStyle="mt-10"
                  control={control}
                  rules={requiredRule}
                  name="receivername"
                />

                <CustomTextInput
                  placeholder="* نام خانوادگی"
                  type={"text"}
                  keyboardType="default"
                  containerStyle="mt-5"
                  control={control}
                  rules={requiredRule}
                  name="receiverLastname"
                />

                <CustomTextInput
                  placeholder="* تلفن همراه"
                  keyboardType="numeric"
                  inputMode="numeric"
                  rules={{ ...requiredRule, ...mobilePhoneValidation }}
                  containerStyle="mt-5"
                  control={control}
                  name="receivermobile"
                />

                <CustomTextInput
                  placeholder="تلفن ثابت"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  control={control}
                  name="receiverPhone"
                />

                <CustomTextInput
                  placeholder="کد ملی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  control={control}
                  rules={nationalCodeRule}
                  name="receiverid"
                />

                <CustomTextInput
                  placeholder="کد پستی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  rules={postCodeRule}
                  containerStyle="mt-5"
                  control={control}
                  name="receiverpostalcode"
                />

                <View className="mt-5">
                  <CustomSelect
                    name="receiverProvinceID"
                    control={control}
                    rules={requiredRule}
                    data={provinceOptions}
                    label="* استان"
                    errors={errors}
                    setValue={setValue}
                    search={true}
                    isLoading={isProvinceLoading}
                    onValueChange={(val) => {
                      if (val) {
                        setValue("destcode", null);
                        fetchCity(val);
                      } else {
                        setCityOptions([]);
                      }
                    }}
                    onClear={() => {
                      setValue("receiverProvinceID", null);
                      setValue("destcode", null);
                      setCityOptions([]);
                    }}
                  />
                </View>

                <View className="mt-5">
                  <CustomSelect
                    name="destcode"
                    control={control}
                    rules={requiredRule}
                    data={cityOptions}
                    label="* شهر"
                    search={true}
                    errors={errors}
                    setValue={setValue}
                    isLoading={isCityLoading}
                  />
                </View>

                <CustomTextInput
                  placeholder="* آدرس"
                  type={"text"}
                  multiline={true}
                  rules={requiredRule}
                  keyboardType="default"
                  containerStyle="mt-5"
                  height="h-32 align-top"
                  inputStyle={{
                    textAlignVertical: "top",
                    textAlign: "right",
                    paddingTop: 20,
                  }}
                  control={control}
                  name="receiveraddress"
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

export default OrderStep3;
