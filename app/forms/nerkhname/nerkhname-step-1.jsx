// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Background from "@/components/Background";
import { requiredRule, nerkhnameValidations } from "@/constants/validations";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import CustomSelect from "@/components/CustomSelect";
import { getPrice } from "@/api/order";
import { parcelOptions } from "@/data/parcelOptions";
import { boxsizeOptions } from "@/data/boxsizeOptions";
import { getProvince, getCity } from "@/api/order";
import { optionsGenerator } from "@/helpers/selectHelper";

const NerkhnameStep1 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [sourceCityOptions, setSourceCityOptions] = useState([]);
  const [destCityOptions, setDestCityOptions] = useState([]);
  const [isDestCityLoading, setIsDestCityLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const [weightRules, setWeightRules] = useState({});

  // CONSTS
  const nerkhname = useUserStore((state) => state.nerkhname);
  const setNerkhname = useUserStore((state) => state.setNerkhname);
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    unregister,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      ...nerkhname,
    },
  });
  const form_data = watch();

  // HANDLERS
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
      setSourceCityOptions(options);
    } finally {
      setIsCityLoading(false);
    }
  };

  const fetchDestCity = async (provinceID = null) => {
    setIsDestCityLoading(true);
    try {
      const response = await getCity(provinceID);
      console.log("CITY RESPONSE: ", response.data);
      const options = optionsGenerator(
        response.data.itemList,
        "cityCode",
        "cityName"
      );
      setDestCityOptions(options);
    } finally {
      setIsDestCityLoading(false);
    }
  };

  useEffect(() => {
    fetchProvince();
  }, []);

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME:", nerkhname);
  }, [nerkhname]);

  useEffect(() => {
    console.log("FORM DATA Step 1: ", form_data);
  }, [form_data]);

  useEffect(() => {
    if (
      form_data?.parceltype &&
      [1, 14, 3, 15].includes(form_data.parceltype)
    ) {
      console.log("Unregistering BoxSize");
      unregister("boxsize");
    }
  }, [form_data?.parceltype, unregister]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await getPrice({
        typecode:
          nerkhname.servicetype.id === 1
            ? 11
            : nerkhname.servicetype.id === 2
            ? 19
            : nerkhname.servicetype.id === 4
            ? 19 //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
            : 77,
        servicetype:
          nerkhname.servicetype.id === 4 ? 2 : nerkhname.servicetype.id, //سرویس امانت همان سرویس سفارشی هست فقط برای 2 کیلو به بالا می باشد
        parceltype: form_data.parceltype,
        sourcecode: form_data.sourcecode,
        destcode: form_data.destcode,
        weight: parseFloat(form_data.weight) || 0,
        // boxsize: form_data.boxsize === undefined ? 1 : form_data.boxsize,
        boxsize: form_data.boxsize || 1,
      });

      console.log("PRICE RESPONSE: ", response.data);
      await setNerkhname({ ...nerkhname, ...response.data.itemList[0].data });
      router.push("forms/nerkhname/nerkhname-step-2");
      reset();
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
            title={`${nerkhname?.servicetype?.label} : نرخ نامه`}
            home={true}
            progress={66}
          />

          {/* FORM FIELDS */}
          <View className="w-full px-5 mt-5">
            <View className="mt-5">
              <CustomSelect
                name="parceltype"
                control={control}
                rules={nerkhnameValidations.parceltype}
                data={
                  nerkhname?.servicetype?.id === 2
                    ? parcelOptions.sefareshi
                    : nerkhname?.servicetype?.id === 4
                    ? parcelOptions.amanat
                    : nerkhname?.servicetype?.id === 3
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

            <View className="flex-row-reverse justify-between items-center mt-5">
              <View className="flex-1 ml-2">
                <CustomSelect
                  name="provinceIDSource"
                  control={control}
                  rules={requiredRule}
                  data={provinceOptions}
                  label="* استان مبدا"
                  errors={errors}
                  setValue={setValue}
                  isLoading={isProvinceLoading}
                  onValueChange={(val) => {
                    if (val) {
                      fetchCity(val);
                    } else {
                      setSourceCityOptions([]);
                    }
                  }}
                  onClear={() => {
                    setValue("senderProvinceID", null);
                    setValue("sourcecode", null);
                    setSourceCityOptions([]);
                  }}
                />
              </View>

              <View className="flex-1 mr-2">
                <CustomSelect
                  name="sourcecode"
                  control={control}
                  rules={requiredRule}
                  data={sourceCityOptions}
                  label="* شهر مبدا"
                  errors={errors}
                  setValue={setValue}
                  isLoading={isCityLoading}
                />
              </View>
            </View>

            <View className="flex-row-reverse justify-between items-center mt-5">
              <View className="flex-1 ml-2">
                <CustomSelect
                  name="provinceIDDest"
                  control={control}
                  rules={requiredRule}
                  data={provinceOptions}
                  label="* استان مقصد"
                  errors={errors}
                  setValue={setValue}
                  isLoading={isProvinceLoading}
                  onValueChange={(val) => {
                    if (val) {
                      fetchDestCity(val);
                    } else {
                      setDestCityOptions([]);
                    }
                  }}
                  onClear={() => {
                    setValue("senderProvinceID", null);
                    setValue("sourcecode", null);
                    setDestCityOptions([]);
                  }}
                />
              </View>

              <View className="flex-1 mr-2">
                <CustomSelect
                  name="destcode"
                  control={control}
                  rules={requiredRule}
                  data={destCityOptions}
                  label="* شهر مقصد"
                  errors={errors}
                  setValue={setValue}
                  isLoading={isDestCityLoading}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="محاسبه"
            isLoading={isLoading}
            handlePress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhnameStep1;
