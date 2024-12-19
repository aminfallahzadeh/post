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
import { insurancePriceRules, requiredRule } from "@/constants/validations";
import FormField from "@/components/FormField";
import { Title } from "@/components/Title";
import { insertRequestPriceOrder } from "@/api/request";
import { CustomModal } from "@/components/CustomModal";

const NerkhnameStep5 = () => {
  // STATES
  const [visible, setVisible] = useState(false);
  const [priceRules, setPriceRules] = useState({});

  // CONSTS
  const order = useUserStore((state) => state.order);

  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    if (order?.parceltype === 1 && !order?.contetnts) {
      setVisible(true);
    }

    console.log("FORM DATA: ", form_data);
  };

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 5: ", form_data);
  }, [form_data]);

  // EFFECTS
  useEffect(() => {
    if (form_data.insurancetype === 3) {
      setPriceRules(insurancePriceRules.oragh);
    } else if (form_data.insurancetype === 5) {
      setPriceRules(insurancePriceRules.sayer);
    }
  }, [form_data.insurancetype]);

  return (
    <>
      <CustomModal
        visible={visible}
        closeModal={() => setVisible(false)}
        title={"توجه"}
        description={"درصورت  عادی بودن بیمه لطفا نوع مرسوله را وارد کنید "}
        onConfirm={() => router.replace("/forms/order/order-step-1")}
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
            />
          </View>
        </SafeAreaView>
      </Background>
    </>
  );
};

export default NerkhnameStep5;
