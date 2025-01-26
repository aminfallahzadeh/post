// IMPORTS
import React, { useEffect, useState } from "react";
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
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import { validateServiceSpec } from "@/api/order";
import FormField from "@/components/FormField";
import { parcelOptions } from "@/data/parcelOptions";
import { boxsizeOptions } from "@/data/boxsizeOptions";
import { toastConfig } from "@/config/toast-config";
import { nerkhnameValidations, requiredRule } from "@/constants/validations";
import { Title } from "@/components/Title";
import { insuranceOptions } from "@/data/insuranceOptions";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomModal from "@/components/CustomModal";

const OrderStep1 = () => {
  // STATES
  const [weightRules, setWeightRules] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [parcelHelpModalVisible, setParcelHelpModalVisible] = useState(false);
  const [weightHelpModalVisible, setWeightHelpModalVisible] = useState(false);
  const [isContentRequired, setIsContentRequired] = useState(true);

  // CONSTS
  const order = useUserStore((state) => state.order);
  const setOrder = useUserStore((state) => state.setOrder);
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    unregister,
    setValue,
    trigger,
  } = useForm({
    values: {
      ...order,
    },
  });
  const form_data = watch();

  // HANDLERS
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await validateServiceSpec({
        typecode:
          order.servicetype.id === 1
            ? 11
            : order?.servicetype.id === 4
            ? 11
            : order.servicetype.id === 2
            ? 19
            : order.servicetype.id === 5
            ? 19 // سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
            : 77,
        servicetype: order.servicetype.id === 5 ? 2 : order.servicetype.id,
        parceltype: form_data.parceltype,
        weight: parseFloat(form_data.weight) || 0,
        boxsize: form_data.boxsize || 1,
        insurancetype: form_data.insurancetype,
        insuranceamount: form_data.insuranceamount || 0,
        Contetnts: form_data.contetnts,
      });
      if (response.data.status) {
        setOrder({ ...order, ...form_data });
        router.push(`/forms/order/order-step-2`);
      } else {
        toastConfig.warning("وزن نامعتبر است");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // EFFECTS
  useEffect(() => {
    if (form_data?.parceltype === 3) {
      setWeightRules(nerkhnameValidations.weight.underOneKilo);
    } else if (form_data?.parceltype === 1) {
      setWeightRules(nerkhnameValidations.weight.underTwoKilo);
    } else {
      setWeightRules(nerkhnameValidations.weight.other);
    }
  }, [form_data?.parceltype]);

  useEffect(() => {
    if (
      form_data?.parceltype &&
      [1, 14, 3, 15].includes(form_data.parceltype)
    ) {
      unregister("boxsize");
    }
  }, [form_data?.parceltype, unregister]);

  useEffect(() => {
    if (form_data?.insurancetype === 1) {
      if (
        form_data?.servicetype?.id === 3 ||
        form_data?.servicetype?.id === 1
      ) {
        if (form_data?.parceltype === 1) {
          setIsContentRequired(false);
        } else {
          setIsContentRequired(true);
        }
      } else if (form_data?.servicetype?.id === 2) {
        if (form_data?.parceltype === 3) {
          setIsContentRequired(false);
        } else {
          setIsContentRequired(true);
        }
      }
    } else {
      setIsContentRequired(true);
    }
  }, [form_data]);

  useEffect(() => {
    trigger("contetnts");
  }, [trigger, isContentRequired]);

  //   // DEBUG
  //   useEffect(() => {
  //     console.log("FORM DATA: ", form_data);
  //     console.log("IS CONTENT REQUIRED: ", isContentRequired);
  //   }, [form_data, isContentRequired]);

  return (
    <>
      <CustomModal
        visible={parcelHelpModalVisible}
        closeModal={() => setParcelHelpModalVisible(false)}
        title={"راهنمای مرسوله"}
        description={
          "پاکت : مرسولات اوراق و کاغذ که در پاکت های استاندارد پستی قرار میگیرند \n\n پاکت - جوف : هرگونه شیء که غیر اوراق و کاغذ در درون پاکت های استاندارد پستی قرار میگیرند از وزن 1 گرم تا 2000 گرم"
        }
      />

      <CustomModal
        visible={weightHelpModalVisible}
        closeModal={() => setWeightHelpModalVisible(false)}
        title={"راهنمای وزن"}
        description={
          "پاکت تا ۵۰۰ گرم \n پاکت جوف تا ۲۰۰۰ گرم \n بسته از حداکثر ۳۰۰۰۰ گرم"
        }
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
                title={`${order?.servicetype?.label} : اطلاعات مرسوله`}
                progress={32}
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
                    placeholder="تعداد مرسوله"
                    editable={false}
                    type="text"
                    containerStyle="mt-10"
                    control={control}
                    value="1"
                    name="number"
                  />

                  <View className="flex-row-reverse justify-center items-center mt-5">
                    <View className="flex-1 ml-2">
                      <CustomSelect
                        name="parceltype"
                        control={control}
                        rules={nerkhnameValidations.parceltype}
                        data={
                          order?.servicetype?.id === 2
                            ? parcelOptions.sefareshi
                            : order?.servicetype?.id === 5
                            ? parcelOptions.amanat
                            : order?.servicetype?.id === 3
                            ? parcelOptions.vijhe
                            : parcelOptions.pishtaz
                        }
                        label="* نوع مرسوله"
                        errors={errors}
                        setValue={setValue}
                      />
                    </View>

                    <Pressable onPress={() => setParcelHelpModalVisible(true)}>
                      <AntDesign name="question" size={28} color="#164194" />
                    </Pressable>
                  </View>

                  <View className="flex-row-reverse justify-center items-center">
                    <View className="flex-1 ml-2">
                      <FormField
                        placeholder="وزن مرسوله"
                        keyboardType="numeric"
                        inputMode="numeric"
                        containerStyle="mt-5"
                        control={control}
                        rules={{ ...requiredRule, ...weightRules }}
                        name="weight"
                      />
                    </View>

                    <View className="flex-row justify-center items-center pt-5 gap-2">
                      <Pressable
                        onPress={() => setWeightHelpModalVisible(true)}
                      >
                        <AntDesign name="question" size={28} color="#164194" />
                      </Pressable>

                      <Text className="flex-3 self-center text-primary text-xl font-isansbold text-center rounded-lg">
                        گرم
                      </Text>
                    </View>
                  </View>

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
                        value: isContentRequired,
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

                  {![1, 14, 3, 15].includes(form_data?.parceltype) && (
                    <View className="mt-5">
                      <CustomSelect
                        name="boxsize"
                        control={control}
                        rules={requiredRule}
                        data={boxsizeOptions}
                        label="* سایز کارتن"
                        errors={errors}
                        setValue={setValue}
                      />
                    </View>
                  )}
                </View>
              </ScrollView>

              {/* BOTTOM SECTION */}
              <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
                <CustomButton
                  title="ادامه"
                  handlePress={handleSubmit(onSubmit)}
                  isLoading={isLoading}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default OrderStep1;
