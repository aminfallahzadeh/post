// IMPORTS
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, ScrollView } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import RadioButtons from "@/components/RadioButtons";
import { specialServiceOptions } from "@/data/specialServiceOptions";
import { getPrice } from "@/api/order";
import { Title } from "@/components/Title";
import { CustomModal } from "@/components/CustomModal";
import { separateByThousand } from "@/utils/numberSeparator";
import * as SecureStore from "expo-secure-store";
import { insertRequestPriceOrder } from "@/api/request";
import { convertToEnglishNumber } from "@/helpers/numberHelper";

const OrderStep4 = () => {
  // STATES
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [calculateResult, setCalculateResult] = useState(null);
  const [amountModalVisible, setAmountModalVisible] = useState(false);

  // CONSTS
  const order = useUserStore((state) => state.order);
  const setFactor = useUserStore((state) => state.setFactor);
  const mobile = SecureStore.getItem("mobile");
  const setOrder = useUserStore((state) => state.setOrder);
  const { watch, handleSubmit, control } = useForm({
    defaultValues: {
      ...order.sender,
    },
  });
  const form_data = watch();

  // HELPERS
  const checkSpecialService = (data, id) => data.some((item) => item.id === id);

  // HANDLERS
  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await insertRequestPriceOrder({
        mobile,
        typecode:
          order?.servicetype?.id === 1
            ? 11
            : order?.servicetype.id === 4
            ? 11
            : order?.servicetype?.id === 2
            ? 19
            : order?.servicetype?.id === 5
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
        insurancetype: order?.insurancetype || 1,
        insuranceamount: parseFloat(order?.insuranceamount) || 0,
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
        electworeceiptant: checkSpecialService(form_data?.specialServices, 2)
          ? true
          : false,
        iscot: order?.specialServices
          ? checkSpecialService(form_data?.specialServices, 5)
          : false,
        smsservice: order?.specialServices
          ? checkSpecialService(form_data?.specialServices, 8)
          : false,
        isnonstandard: checkSpecialService(form_data?.specialServices, 3)
          ? true
          : checkSpecialService(form_data?.specialServices, 4)
          ? true
          : checkSpecialService(form_data?.specialServices, 6)
          ? true
          : false,
        contetnts: order?.contetnts || "",
        boxsize: order?.boxsize || 1,
      });
      console.log("INSERT REQUEST PRICE ORDER RESPONSE: ", response.data);
      setOrder({ ...order, ...form_data, ...response.data.itemList[0] });
      setFactor({ ...response.data.itemList[0] });
      router.push(`/forms/order/order-step-5`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const specialOptions = specialServiceOptions(order?.parceltype);

  const onCalculate = async () => {
    setIsCalculating(true);
    try {
      const response = await getPrice({
        typecode:
          order.servicetype.id === 1
            ? 11
            : order?.servicetype.id === 4
            ? 11
            : order.servicetype.id === 2
            ? 19
            : order.servicetype.id === 5
            ? 19 //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
            : 77,
        servicetype: order.servicetype.id === 5 ? 2 : order.servicetype.id, //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
        parceltype: order.parceltype,
        sourcecode: order.sourcecode,
        destcode: order.destcode,
        weight: parseFloat(order.weight) || 0,
        // boxsize: form_data.boxsize === undefined ? 1 : form_data.boxsize,
        boxsize: order.boxsize || 1,
      });

      setCalculateResult(response.data.itemList[0].data);
      console.log("PRICE RESPONSE: ", response.data);
      //   setAmount(amount);
      setAmountModalVisible(true);
    } finally {
      setIsCalculating(false);
    }
  };

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 4: ", order);
    console.log("FORM DATA: ", form_data);
  }, [order, form_data]);

  return (
    <>
      <CustomModal
        visible={amountModalVisible}
        closeModal={() => setAmountModalVisible(false)}
        title={"مبلغ قابل پرداخت به ریال"}
        description={`کرایه پستی : ${separateByThousand(
          calculateResult?.postfare || 0
        )} \n  حق السهم پستی : ${separateByThousand(
          calculateResult?.postprice || 0
        )}\n بیمه : ${separateByThousand(
          calculateResult?.insuranceprice || 0
        )}\n  مالیات : ${separateByThousand(
          calculateResult?.tax || 0
        )} \n مبلغ کل : ${separateByThousand(
          calculateResult?.totalprice || 0
        )}`}
        onConfirm={() => setAmountModalVisible(false)}
      />

      <Background>
        <SafeAreaView className="h-full">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            stickyHeaderIndices={[0]}
          >
            {/* HEADER SECTION */}
            <Title
              title={`${order?.servicetype?.label} : خدمات ویژه`}
              progress={82}
            />

            {/* FORM FIELDS */}

            <View className="w-full px-5 mt-10">
              <Controller
                name="specialServices"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioButtons
                    options={specialOptions}
                    title="نوع خدمات ویژه"
                    onChange={onChange}
                    value={value}
                    isMulti={true}
                    textSize="text-sm"
                    itemsContainerStyle={
                      "flex-row-reverse w-full flex-wrap justify-between items-center gap-y-3"
                    }
                  />
                )}
              />
            </View>
          </ScrollView>

          {/* BOTTOM SECTION */}
          {/* <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton title="ادامه" handlePress={handleSubmit(onSubmit)} />
        </View> */}
          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4 flex-row">
            <View className="flex-1 mr-2">
              <CustomButton
                title="محاسبه"
                handlePress={onCalculate}
                isLoading={isCalculating}
                disabled={isSubmitting}
              />
            </View>

            <View className="flex-1 ml-2">
              <CustomButton
                title="ثبت سفارش"
                handlePress={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                disabled={isCalculating}
              />
            </View>
          </View>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default OrderStep4;
