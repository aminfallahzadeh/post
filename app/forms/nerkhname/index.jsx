// IMPORTS
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Background from "@/components/Background";
import { requiredRule } from "@/constants/validations";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import SelectInput from "@/components/SelectInput";
import { getPrice } from "@/api/order";
import { nerkhnameServiceOptions } from "@/data/serviceOptions";
import { parcelOptionsAll } from "@/data/parcelOptions";
import { boxsizeOptions } from "@/data/boxsizeOptions";
import { getProvince, getCity } from "@/api/order";
import { optionsGenerator } from "@/helpers/selectHelper";
import { LOADING_MESSAGE } from "@/constants/messages";

const Index = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [sourceCityOptions, setSourceCityOptions] = useState([]);
  const [destCityOptions, setDestCityOptions] = useState([]);
  const [isDestCityLoading, setIsDestCityLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);

  // CONSTS
  const setNerkhname = useUserStore((state) => state.setNerkhname);
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await getPrice({
        typecode: 11,
        servicetype: form_data.servicetype,
        parceltype: form_data.parceltype,
        sourcecode: form_data.sourcecode,
        destcode: form_data.destcode,
        weight: parseFloat(form_data.weight) || 0,
        spsparceltype: 0,
        boxsize: form_data.boxsize,
      });

      console.log("PRICE RESPONSE: ", response.data);
      await setNerkhname(response.data.itemList[0].data);
      router.push("forms/nerkhname/nerkhname-step-2");
    } finally {
      setIsLoading(false);
    }
  };

  // DEBUG
  useEffect(() => {
    console.log("FORM DATA: ", form_data);
  }, [form_data]);

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
          <Title title="نرخ نامه" home={false} progress={50} />

          {/* FORM FIELDS */}
          <View className="w-full px-5 mt-5">
            <View className="mt-5 relative">
              {errors && (
                <View className="absolute -top-5 left-0">
                  <Text className="text-red-500 font-isansregular">
                    {errors?.servicetype?.message}
                  </Text>
                </View>
              )}

              <Controller
                name="servicetype"
                control={control}
                rules={requiredRule}
                render={({ field: { onChange } }) => (
                  <SelectInput
                    placeholder="* نوع سرویس"
                    options={nerkhnameServiceOptions}
                    onValueChange={(val) => onChange(val)}
                    primaryColor="#164194"
                    selectedValue={
                      nerkhnameServiceOptions.find(
                        (c) => c.value === form_data?.servicetype
                      )?.value
                    }
                  />
                )}
              />
            </View>

            <View className="mt-5 relative">
              {errors && (
                <View className="absolute -top-5 left-0">
                  <Text className="text-red-500 font-isansregular">
                    {errors?.parceltype?.message}
                  </Text>
                </View>
              )}

              <Controller
                name="parceltype"
                control={control}
                rules={requiredRule}
                render={({ field: { onChange } }) => {
                  const selectedOption = parcelOptionsAll.find(
                    (c) => c.value === form_data?.parceltype
                  );

                  return (
                    <SelectInput
                      placeholder="* نوع مرسوله"
                      options={parcelOptionsAll}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={selectedOption?.value}
                    />
                  );
                }}
              />
            </View>

            <View className="flex-row-reverse justify-center items-center">
              <View className="flex-1 ml-2">
                <FormField
                  placeholder="وزن"
                  type={"number"}
                  rules={requiredRule}
                  keyboardType="numeric"
                  containerStyle="mt-5"
                  control={control}
                  name="weight"
                />
              </View>

              <Text className="flex-3 self-center text-primary text-xl font-isansbold text-center rounded-lg pt-5">
                گرم
              </Text>
            </View>

            <View className="mt-5 relative">
              {errors && (
                <View className="absolute -top-5 left-0">
                  <Text className="text-red-500 font-isansregular">
                    {errors?.boxsize?.message}
                  </Text>
                </View>
              )}

              <Controller
                name="boxsize"
                control={control}
                rules={requiredRule}
                render={({ field: { onChange } }) => (
                  <SelectInput
                    placeholder="* نوع کارتن"
                    options={boxsizeOptions}
                    onValueChange={(val) => onChange(val)}
                    primaryColor="#164194"
                    selectedValue={
                      boxsizeOptions.find((c) => c.value === form_data?.boxsize)
                        ?.value
                    }
                  />
                )}
              />
            </View>

            <View className="flex-row-reverse justify-between items-center mt-5">
              <View className="flex-1 ml-2">
                <Controller
                  name="provinceIDSource"
                  control={control}
                  render={({ field: { onChange } }) => {
                    const selectedOption = provinceOptions.find(
                      (c) => c.value === form_data?.provinceIDSource
                    );

                    return (
                      <SelectInput
                        placeholder={
                          isProvinceLoading ? LOADING_MESSAGE : "* استان"
                        }
                        options={provinceOptions}
                        onValueChange={(val) => {
                          if (val) {
                            fetchCity(val);
                          } else {
                            setSourceCityOptions([]);
                          }
                          return onChange(val);
                        }}
                        primaryColor="#164194"
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
                />
              </View>

              <View className="flex-1 ml-2">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.sourcecode?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="sourcecode"
                  control={control}
                  rules={requiredRule}
                  render={({ field: { onChange } }) => {
                    const selectedOption = sourceCityOptions.find(
                      (c) => c.value === form_data?.sourcecode
                    );

                    return (
                      <SelectInput
                        placeholder={isCityLoading ? LOADING_MESSAGE : "* شهر"}
                        options={sourceCityOptions}
                        primaryColor="#164194"
                        onValueChange={(val) => onChange(val)}
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
                />
              </View>
            </View>

            <View className="flex-row-reverse justify-between items-center mt-5">
              <View className="flex-1 ml-2">
                <Controller
                  name="provinceIDDest"
                  control={control}
                  render={({ field: { onChange } }) => {
                    const selectedOption = provinceOptions.find(
                      (c) => c.value === form_data?.provinceIDDest
                    );

                    return (
                      <SelectInput
                        placeholder={
                          isProvinceLoading ? LOADING_MESSAGE : "* استان مقصد"
                        }
                        options={provinceOptions}
                        onValueChange={(val) => {
                          if (val) {
                            fetchDestCity(val);
                          } else {
                            setDestCityOptions([]);
                          }
                          return onChange(val);
                        }}
                        primaryColor="#164194"
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
                />
              </View>

              <View className="flex-1 ml-2">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.destcode?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="destcode"
                  control={control}
                  rules={requiredRule}
                  render={({ field: { onChange } }) => {
                    const selectedOption = destCityOptions.find(
                      (c) => c.value === form_data?.destcode
                    );

                    return (
                      <SelectInput
                        placeholder={
                          isDestCityLoading ? LOADING_MESSAGE : "* شهر مقصد"
                        }
                        options={destCityOptions}
                        onValueChange={(val) => onChange(val)}
                        primaryColor="#164194"
                        selectedValue={selectedOption?.value}
                      />
                    );
                  }}
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
            disabled={!form_data.servicetype}
            handlePress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
