// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import FormField from "@/components/FormField";
import { parcelOptions } from "@/data/parcelOptions";
import { boxsizeOptions } from "@/data/boxsizeOptions";
import { nerkhnameValidations, requiredRule } from "@/constants/validations";
import { Title } from "@/components/Title";

const NerkhNameStep1 = () => {
  // STATES
  const [weightRules, setWeightRules] = useState({});

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
  } = useForm({
    defaultValues: {
      ...order,
    },
  });
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    setOrder({ ...order, ...form_data });
    router.push(`/forms/order/order-step-2`);
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

  // DEBUG
  useEffect(() => {
    console.log("order Step 1: ", order);
  }, [order]);

  useEffect(() => {
    console.log("FORM DATA Step 1: ", form_data);
  }, [form_data]);

  useEffect(() => {
    if (
      form_data?.parceltype &&
      [1, 14, 3, 15].includes(form_data.parceltype)
    ) {
      console.log("Unregistering boxsize");
      unregister("boxsize");
    }
  }, [form_data?.parceltype, unregister]);

  return (
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
            title={`${order?.servicetype?.label} : اطلاعات مرسوله`}
            progress={30}
          />

          {/* FORM FIELDS */}
          <View className="w-full px-5">
            <FormField
              placeholder="تعداد مرسوله"
              editable={false}
              type={"text"}
              containerStyle="mt-10"
              control={control}
              value="1"
              name="number"
            />

            <View className="mt-5">
              <CustomSelect
                name="parceltype"
                control={control}
                rules={nerkhnameValidations.parceltype}
                data={
                  order?.servicetype?.id === 2
                    ? parcelOptions.sefareshi
                    : order?.servicetype?.id === 4
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

              <Text className="flex-3 self-center text-primary text-xl font-isansbold text-center rounded-lg pt-5">
                گرم
              </Text>
            </View>

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
          <CustomButton title="ادامه" handlePress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhNameStep1;
