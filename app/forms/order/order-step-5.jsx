// IMPORTS
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { router } from "expo-router";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import { insuranceOptions } from "@/data/insuranceOptions";
import { insertRequestPriceOrder } from "@/api/request";
import FormField from "@/components/FormField";
import { Title } from "@/components/Title";
import { CustomModal } from "@/components/CustomModal";
import * as SecureStore from "expo-secure-store";

const NerkhnameStep5 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const order = useUserStore((state) => state.order);

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const form_data = watch();

  // helper
  const checkSpecialService = (data, id) => data.some((item) => item.id === id);

  // HANDLERS
  const onSubmit = async () => {
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
        sourcecode: order?.sender?.cityID || "",
        destcode: order?.receiver?.cityID || "",
        sendername: order?.sender?.name || "",
        receivername: order?.receiver?.name || "",
        receiverpostalcode: order?.postalCode?.name || "",
        senderpostalcode: order?.postalCode?.name || "",
        weight: parseFloat(order?.weight) || 0,
        senderid: order?.sender?.nationalCode || "",
        receiverid: order?.receiver?.nationalCode || "",
        sendermobile: order?.sender?.mobile || "",
        receivermobile: order?.receiver?.mobile || "",
        senderaddress: order?.sender?.address || "",
        receiveraddress: order?.receiver?.address || "",
        insurancetype: form_data.insurancetype || 1,
        insuranceamount: form_data.insuranceamount || 0,
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
        iscot: checkSpecialService(order?.specialServices, 5),
        smsservice: checkSpecialService(order?.specialServices, 8),
        isnonstandard: true,
        contetnts: order?.contetnts || "",
        boxsize: order?.BoxSize || "0",
      });

      console.log("INSERT REQUEST PRICE ORDER RESPONSE: ", response.data);
      setResultModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 5: ", order);
    console.log("FORM DATA: ", form_data);
  }, [order, form_data]);

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
            <Title
              title={`${order?.servicetype?.label} : بیمه`}
              progress={100}
            />

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-5">
                <View className="mt-10 relative">
                  {errors && (
                    <View className="absolute -top-5 left-0">
                      <Text className="text-red-500 font-isansregular">
                        {errors?.insurancetype?.message}
                      </Text>
                    </View>
                  )}

                  <Controller
                    name="insurancetype"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <SelectInput
                        placeholder="* نوع بیمه"
                        options={insuranceOptions}
                        onValueChange={(val) => onChange(val)}
                        primaryColor="#164194"
                        selectedValue={
                          insuranceOptions.find(
                            (c) => c.value === form_data?.insurancetype
                          )?.value
                        }
                      />
                    )}
                  />
                </View>

                <FormField
                  placeholder="محتویات مرسوله"
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

                <View className="flex-row-reverse justify-center items-center">
                  <View className="flex-1 ml-2">
                    <FormField
                      placeholder="مبلغ اظهار شده"
                      type={"number"}
                      keyboardType="numeric"
                      rules={{
                        required: form_data.insurancetype === 1 ? false : true,
                        message: "این فیلد اجباری است",
                      }}
                      containerStyle="mt-5"
                      editable={form_data.insurancetype === 1 ? false : true}
                      control={control}
                      name="insuranceamount"
                    />
                  </View>
                  <Text className="flex-3 self-center text-primary text-xl font-isansbold text-center rounded-lg pt-5">
                    ریال
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}
          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
            <CustomButton
              title="ثبت سفارش"
              handlePress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </View>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default NerkhnameStep5;
