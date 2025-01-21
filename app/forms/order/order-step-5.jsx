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
import { router } from "expo-router";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { convertToEnglishNumber } from "@/helpers/numberHelper";
import { insuranceOptions } from "@/data/insuranceOptions";
import { insertRequestPriceOrder } from "@/api/request";
import { getPrice } from "@/api/order";
import FormField from "@/components/FormField";
import { Title } from "@/components/Title";
import { CustomModal } from "@/components/CustomModal";
import * as SecureStore from "expo-secure-store";
import CustomSelect from "@/components/CustomSelect";
import { requiredRule } from "@/constants/validations";
import { separateByThousand } from "@/utils/numberSeparator";

const NerkhnameStep5 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountModalVisible, setAmountModalVisible] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const order = useUserStore((state) => state.order);
  const setOrder = useUserStore((state) => state.setOrder);

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    unregister,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      ...order,
    },
  });
  const form_data = watch();

  // helper
  const checkSpecialService = (data, id) => data.some((item) => item.id === id);

  // HANDLERS
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await insertRequestPriceOrder({
        mobile,
        typecode:
          order?.servicetype?.id === 1
            ? 11
            : order?.servicetype?.id === 2
            ? 19
            : order?.servicetype?.id === 4
            ? 27
            : 77,
        servicetype: order?.servicetype?.id,
        parceltype: order?.parceltype,
        sourcecode: order?.sourcecode || "",
        destcode: order?.destcode || "",
        sendername: order?.sendername || "",
        receivername: order?.receivername || "",
        receiverpostalcode: order?.receiverpostalcode || "",
        senderpostalcode: order?.senderpostalcode || "",
        senderid: order?.senderid || "",
        receiverid: order?.receiverid || "",
        sendermobile: order?.sendermobile || "",
        receivermobile: order?.receivermobile || "",
        senderaddress: order?.senderaddress || "",
        receiveraddress: order?.receiveraddress || "",
        weight: parseFloat(convertToEnglishNumber(order?.weight)) || 0,
        insurancetype: form_data.insurancetype || 1,
        insuranceamount: parseFloat(form_data.insuranceamount) || 0,
        spsdestinationtype: 0,
        spsreceivertimetype: 0,
        spsparceltype:
          order?.servicetype?.id !== 3
            ? 0
            : order?.parceltype === 1
            ? 1
            : order?.parceltype === 3
            ? 3
            : 2,
        electworeceiptant: true,
        iscot: order?.specialServices
          ? checkSpecialService(order?.specialServices, 5)
          : false,
        smsservice: order?.specialServices
          ? checkSpecialService(order?.specialServices, 8)
          : false,
        isnonstandard: true,
        contetnts: data?.contetnts || "",
        boxsize: order?.boxsize || 1,
      });

      console.log("INSERT REQUEST PRICE ORDER RESPONSE: ", response.data);
      setResultModalVisible(true);
      reset();
      setOrder([]);
    } finally {
      setIsLoading(false);
    }
  };

  const onCalculate = async () => {
    setIsLoading(true);
    try {
      const response = await getPrice({
        typecode:
          order.servicetype.id === 1
            ? 11
            : order.servicetype.id === 2
            ? 19
            : order.servicetype.id === 4
            ? 19 //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
            : 77,
        servicetype: order.servicetype.id === 4 ? 2 : order.servicetype.id, //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
        parceltype: form_data.parceltype,
        sourcecode: form_data.sourcecode,
        destcode: form_data.destcode,
        weight: parseFloat(form_data.weight) || 0,
        // boxsize: form_data.boxsize === undefined ? 1 : form_data.boxsize,
        boxsize: form_data.boxsize || 1,
      });

      const amount = response.data.itemList[0].data.totalprice;
      console.log(response.data);
      console.log("PRICE RESPONSE: ", response.data);
      setAmount(amount);
      setAmountModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 5: ", order);
    console.log("FORM DATA: ", form_data);
  }, [order, form_data]);

  useEffect(() => {
    if (form_data?.insurancetype && form_data?.insurancetype === 1) {
      unregister("insuranceamount");
    }
  }, [form_data?.insurancetype, unregister]);

  return (
    <>
      <CustomModal
        visible={resultModalVisible}
        closeModal={() => setResultModalVisible(false)}
        title={"توجه"}
        description={
          "درخواست شما ثبت شد. برای پیگیری به صفحه پست من مراجعه کنید"
        }
        onConfirm={() => router.replace("/")}
      />

      <CustomModal
        visible={amountModalVisible}
        closeModal={() => setAmountModalVisible(false)}
        title={"مبلغ قابل پرداخت"}
        description={`${separateByThousand(amount)} ریال`}
        onConfirm={() => setAmountModalVisible(false)}
      />
      <Background>
        <SafeAreaView className="h-full">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <View className="flex-1">
              {/* HEADER SECTION */}
              <Title
                title={`${order?.servicetype?.label} : بیمه`}
                progress={100}
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
                  <View className="mt-5">
                    <CustomSelect
                      name="insurancetype"
                      control={control}
                      rules={requiredRule}
                      data={insuranceOptions}
                      label="* نوع بیمه"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>

                  <FormField
                    placeholder="* محتویات مرسوله"
                    type={"text"}
                    keyboardType="default"
                    containerStyle="mt-5"
                    rules={{
                      required: {
                        value: form_data?.insurancetype === 1 ? true : false,
                        message: "این فیلد اجباری است",
                      },
                    }}
                    control={control}
                    name="contetnts"
                  />

                  {form_data.insurancetype !== 1 && (
                    <View className="flex-row-reverse justify-center items-center">
                      <View className="flex-1 ml-2">
                        <FormField
                          placeholder="مبلغ اظهار شده"
                          keyboardType="numeric"
                          inputMode="numeric"
                          rules={requiredRule}
                          containerStyle="mt-5"
                          control={control}
                          name="insuranceamount"
                        />
                      </View>
                      <Text className="flex-3 self-center text-primary text-xl font-isansbold text-center rounded-lg pt-5">
                        ریال
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>

              {/* BOTTOM SECTION */}
              <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4 flex-row">
                <View className="flex-1 mr-2">
                  <CustomButton title="محاسبه" handlePress={onCalculate} />
                </View>

                <View className="flex-1 ml-2">
                  <CustomButton
                    title="ثبت سفارش"
                    handlePress={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default NerkhnameStep5;
