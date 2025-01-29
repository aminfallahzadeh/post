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
import { trackingOrders, returnOtp, saveReturnToSender } from "@/api/tracking";
import FormFieldPastable from "@/components/FormFieldPastable";
import { toastConfig } from "@/config/toast-config";
import { requiredRule } from "@/constants/validations";
import { Title } from "@/components/Title";
import SwitchInput from "@/components/SwitchInput";
import { optionsGenerator } from "@/helpers/selectHelper";
import { OtpInput } from "react-native-otp-entry";
import { formatTime } from "@/utils/formatTime";
import { CustomModal } from "@/components/CustomModal";

const Index = () => {
  // STATES
  const [barcodeOptions, setBarcodeOptions] = useState([]);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isBarcodeLoading, setIsBarcodeLoading] = useState(false);
  const [isRequestOtpLoading, setIsRequestOtpLoading] = useState(false);
  const [isRequestReturnLoading, setIsRequestReturnLoading] = useState(false);
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

  const requestOtp = async (data) => {
    setIsRequestOtpLoading(true);
    try {
      const response = await returnOtp({
        ...data,
        senderMob: mobile,
      });
      console.log("REQUEST RETURN OTP RESPONSE: ", response.data);
      setShowForm(true);
      setTimeLeft(300);
    } finally {
      setIsRequestOtpLoading(false);
    }
  };

  const requestReturn = async (data) => {
    if (code.length < 5) {
      toastConfig.warning("لطفا کد ارسال شده را وارد کنید");
      return;
    } else {
      setIsRequestReturnLoading(true);
      try {
        const response = await saveReturnToSender({
          ...data,
          senderMob: mobile,
          otp: code,
        });
        console.log("REQUEST RETURN RESPONSE: ", response.data);
        setVisible(true);
      } finally {
        setIsRequestReturnLoading(false);
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
        // description={`کرایه پستی : ${separateByThousand(
        //   nerkhname?.postfare || 0
        // )} \n  حق السهم پستی : ${separateByThousand(
        //   nerkhname?.postprice || 0
        // )}\n بیمه : ${separateByThousand(
        //   nerkhname?.insuranceprice || 0
        // )}\n  مالیات : ${separateByThousand(
        //   nerkhname?.tax || 0
        // )} \n مبلغ کل : ${separateByThousand(nerkhname?.totalprice || 0)}`}
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
              <Title title="عودت مرسوله" home={false} />

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
                      name="parcelCode"
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
                      name="parcelCode"
                      keyboardType="numeric"
                      inputMode="numeric"
                    />
                  )}

                  <View className="mt-5">
                    <CustomButton
                      title="درخواست عودت"
                      handlePress={handleSubmit(requestOtp)}
                      bgColor="bg-secondary"
                      titleColor="text-black"
                      isLoading={isRequestOtpLoading}
                      disabled={showForm ? true : false}
                    />
                  </View>

                  {showForm && (
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
                  )}
                </View>
              </ScrollView>

              {/* BOTTOM SECTION */}
              <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
                <CustomButton
                  title="ثبت درخواست"
                  handlePress={handleSubmit(requestReturn)}
                  isLoading={isRequestReturnLoading}
                  disabled={showForm ? false : true}
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
