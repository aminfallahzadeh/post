// IMPORTS
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import { useUserStore } from "@/store";
import * as SecureStore from "expo-secure-store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import { trackingOrders } from "../../../api/tracking";
import FormFieldPastable from "@/components/FormFieldPastable";
import FormField from "@/components/FormField";
import { toastConfig } from "@/config/toast-config";
import { requiredRule, nationalCodeRule } from "@/constants/validations";
import { Title } from "@/components/Title";
import SwitchInput from "@/components/SwitchInput";
import { optionsGenerator } from "@/helpers/selectHelper";
import { OtpInput } from "react-native-otp-entry";
import { getProvince, getCity } from "@/api/order";

const Index = () => {
  // STATES
  const [barcodeOptions, setBarcodeOptions] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isBarcodeLoading, setIsBarcodeLoading] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const {
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  // HANDLERS
  const fetchBarcode = useCallback(async () => {
    setIsBarcodeLoading(true);
    try {
      const response = await trackingOrders(mobile);
      console.log("BARCODE RESPONSE:", response);
      const options = optionsGenerator(
        response.data.itemList,
        "barcode",
        "barcode"
      );
      setBarcodeOptions(options);
    } finally {
      setIsBarcodeLoading(false);
    }
  }, [mobile]);

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

  const toggleSwitch = () => {
    setValue("barcode", "");
    setIsEnabled((previousState) => !previousState);
  };

  // FETCH DATA
  useEffect(() => {
    fetchBarcode();
    fetchProvince();
  }, [fetchBarcode]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            {/* HEADER SECTION */}
            <Title title="بازتوزیع مرسوله" home={false} />

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
              <View className="mt-5 flex-row-reverse items-center justify-start">
                <Text
                  className={`text-center self-center font-isansdemibold text-md m-2 ${
                    isEnabled ? "text-primary" : "text-gray-400"
                  }`}
                >
                  انتخاب بارکد
                </Text>

                <SwitchInput onValueChange={toggleSwitch} value={isEnabled} />
                <Text
                  className={`text-center self-center font-isansdemibold text-md m-2 ${
                    !isEnabled ? "text-primary" : "text-gray-400"
                  }`}
                >
                  ورود بارکد
                </Text>
              </View>

              <View className="w-full px-5">
                {isEnabled ? (
                  <CustomSelect
                    name="barcode"
                    control={control}
                    rules={requiredRule}
                    data={barcodeOptions}
                    label="* بارکد مرسوله"
                    errors={errors}
                    setValue={setValue}
                    isLoading={isBarcodeLoading}
                    search={true}
                  />
                ) : (
                  <FormFieldPastable
                    placeholder="* بارکد مرسوله"
                    control={control}
                    rules={requiredRule}
                    name="barcode"
                    keyboardType="numeric"
                    inputMode="numeric"
                  />
                )}

                <View className="mt-5">
                  <CustomButton
                    title="درخواست عودت"
                    //   handlePress={handleSubmit(onSubmit)}
                    //   isLoading={isLoading}
                  />
                </View>

                <View className="mt-10 w-full justify-center items-center flex-row-reverse">
                  <View className="ml-2">
                    <Text className="text-grey2 font-isansmedium text-md">
                      کد ارسال شده
                    </Text>
                  </View>
                  <OtpInput
                    numberOfDigits={5}
                    focusColor="#164194"
                    // onTextChange={setCode}
                    secureTextEntry={true}
                    theme={{
                      containerStyle: {
                        width: "70%",
                      },
                      pinCodeContainerStyle: {
                        borderColor: "#333",
                      },
                    }}
                  />
                </View>

                <FormField
                  placeholder="* نام"
                  type={"text"}
                  keyboardType="default"
                  containerStyle="mt-10"
                  control={control}
                  rules={requiredRule}
                  name="receivername"
                />

                <FormField
                  placeholder="* نام خانوادگی"
                  type={"text"}
                  keyboardType="default"
                  containerStyle="mt-5"
                  control={control}
                  rules={requiredRule}
                  name="receiverLastname"
                />

                <FormField
                  placeholder="کد ملی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  control={control}
                  rules={nationalCodeRule}
                  name="receiverid"
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

                <FormField
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

                <FormField
                  placeholder="* توضیحات"
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
                  name="description"
                />
              </View>
            </ScrollView>

            {/* BOTTOM SECTION */}
            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="ثبت درخواست"
                //   handlePress={handleSubmit(onSubmit)}
                //   isLoading={isLoading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
