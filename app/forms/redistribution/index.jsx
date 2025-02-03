// IMPORTS
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import {
  trackingOrders,
  redistributionOtp,
  saveRedistribute,
} from "@/api/tracking";
import FormFieldPastable from "@/components/FormFieldPastable";
import FormField from "@/components/FormField";
import { toastConfig } from "@/config/toast-config";
import { requiredRule, nationalCodeRule } from "@/constants/validations";
import { Title } from "@/components/Title";
import CustomSwitch from "@/components/CustomSwitch";
import { optionsGenerator } from "@/helpers/selectHelper";
import { OtpInput } from "react-native-otp-entry";
import { getProvince, getCity } from "@/api/order";
import { formatTime } from "@/utils/formatTime";
import { CustomModal } from "@/components/CustomModal";

const Index = () => {
  // STATES
  const [barcodeOptions, setBarcodeOptions] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isSwitchDisabled, setIsSwitchDisabled] = useState(false);
  const [isBarcodeLoading, setIsBarcodeLoading] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const [isRequestOtpLoading, setIsRequestOtpLoading] = useState(false);
  const [isRequestRedistributionLoading, setIsRequestRedistributionLoading] =
    useState(false);
  const [showForm, setShowForm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [code, setCode] = useState(null);
  const [visible, setVisible] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const {
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
      const filteredData = response.data.itemList.filter(
        (item) => item.state !== 2
      );
      const options = optionsGenerator(filteredData, "barcode", "barcode");
      if (options.length === 0) {
        toastConfig.warning("بارکدی یافت نشد لطفا بارکد را وارد کنید");
        setIsEnabled(false);
        setIsSwitchDisabled(true);
        return;
      }
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

  const requestOtp = async (data) => {
    setIsRequestOtpLoading(true);
    try {
      const response = await redistributionOtp({
        ...data,
        receiverMob: mobile,
      });
      console.log("REQUEST RETURN OTP RESPONSE: ", response.data);
      setShowForm(true);
      setTimeLeft(300);
    } finally {
      setIsRequestOtpLoading(false);
    }
  };

  const requestRedistribution = async (data) => {
    if (!code || code.length < 5) {
      toastConfig.warning("لطفا کد ارسال شده را وارد کنید");
      return;
    } else {
      setIsRequestRedistributionLoading(true);
      try {
        const response = await saveRedistribute({
          ...data,
          receiverMob: mobile,
          otp: code,
        });
        console.log("REQUEST RETURN RESPONSE: ", response.data);
        setVisible(true);
      } finally {
        setIsRequestRedistributionLoading(false);
      }
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

  // EFFECTS
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      setShowForm(false);
    }
  }, [timeLeft]);

  return (
    <>
      <CustomModal
        visible={visible}
        closeModal={() => router.replace("/")}
        title={"توجه"}
        description={"درخواست با موفقیت ثبت شد"}
        onConfirm={() => router.replace("/")}
      />

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

                  <CustomSwitch
                    value={isEnabled}
                    onToggle={toggleSwitch}
                    disabled={isSwitchDisabled}
                  />

                  <Text
                    className={`text-center self-center font-isansdemibold text-md m-2 ${
                      !isEnabled ? "text-primary" : "text-gray-400"
                    }`}
                  >
                    ورود بارکد
                  </Text>
                </View>

                <View className="w-full px-5 mt-5">
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
                      title="درخواست بازتوزیع"
                      handlePress={handleSubmit(requestOtp)}
                      isLoading={isRequestOtpLoading}
                      bgColor="bg-secondary"
                      titleColor="text-black"
                      disabled={showForm ? true : false}
                    />
                  </View>

                  {showForm && (
                    <>
                      <View className="w-full justify-center items-center">
                        <View className="mt-10 w-full justify-center items-center flex-row-reverse">
                          <View className="ml-2">
                            <Text className="text-grey2 font-isansmedium text-md">
                              کد ارسال شده
                            </Text>
                          </View>
                          <OtpInput
                            numberOfDigits={5}
                            focusColor="#164194"
                            onTextChange={setCode}
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

                        <Text className="text-gray-500 font-isansbold mt-7">
                          {formatTime(timeLeft)}
                        </Text>
                      </View>

                      <FormField
                        placeholder="* نام"
                        type={"text"}
                        keyboardType="default"
                        containerStyle="mt-10"
                        control={control}
                        rules={requiredRule}
                        name="name"
                      />

                      <FormField
                        placeholder="* نام خانوادگی"
                        type={"text"}
                        keyboardType="default"
                        containerStyle="mt-5"
                        control={control}
                        rules={requiredRule}
                        name="family"
                      />

                      <FormField
                        placeholder="کد ملی"
                        keyboardType="numeric"
                        inputMode="numeric"
                        containerStyle="mt-5"
                        control={control}
                        rules={nationalCodeRule}
                        name="nid"
                      />

                      <FormField
                        placeholder="پست الکترونیک"
                        type={"text"}
                        keyboardType="default"
                        containerStyle="mt-5"
                        control={control}
                        // rules={requiredRule}
                        name="email"
                      />

                      <View className="mt-5">
                        <CustomSelect
                          name="toProvinceID"
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
                              setValue("toCityID", null);
                              fetchCity(val);
                            } else {
                              setCityOptions([]);
                            }
                          }}
                          onClear={() => {
                            setValue("toProvinceID", null);
                            setValue("toCityID", null);
                            setCityOptions([]);
                          }}
                        />
                      </View>

                      <View className="mt-5">
                        <CustomSelect
                          name="toCityID"
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
                        name="address"
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
                    </>
                  )}
                </View>
              </ScrollView>

              {/* BOTTOM SECTION */}
              <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
                <CustomButton
                  title="ثبت درخواست"
                  handlePress={handleSubmit(requestRedistribution)}
                  isLoading={isRequestRedistributionLoading}
                  //   disabled={showForm ? false : true}
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
