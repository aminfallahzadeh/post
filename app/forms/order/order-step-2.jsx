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
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import * as SecureStore from "expo-secure-store";
import SelectInput from "@/components/SelectInput";
import { originOptions } from "@/data/originOptions";
import { destinationOptions } from "@/data/destinationOptions";
import { Title } from "@/components/Title";
import { requiredRule } from "@/constants/validations";
import { LOADING_MESSAGE } from "@/constants/messages";
import { getProvince, getCity } from "@/api/order";
import { optionsGenerator } from "@/helpers/selectHelper";

const NerkhnameStep2 = () => {
  // STATES
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);

  // CONSTS
  const order = useUserStore((state) => state.order);
  const userData = useUserStore((state) => state.userData);
  const setOrder = useUserStore((state) => state.setOrder);
  const mobile = SecureStore.getItem("mobile");
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile,
      nationalCode: userData?.nationalCode,
    },
  });
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    const data = { ...order, sender: { ...form_data } };
    setOrder(data);
    router.push(`/forms/order/order-step-3`);
  };

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

  useEffect(() => {
    fetchProvince();
  }, []);

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 2: ", order);
  }, [order]);

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
            title={`${order?.servicetype?.label} : اطلاعات فرستنده`}
            progress={45}
          />

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
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
                name="lastName"
              />

              <FormField
                placeholder="* تلفن همراه"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                rules={requiredRule}
                name="mobile"
              />

              <FormField
                placeholder="تلفن ثابت"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                name="phone"
              />

              <FormField
                placeholder="* کد ملی"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                rules={requiredRule}
                name="nationalCode"
              />

              <FormField
                placeholder="* کد پستی"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                rules={requiredRule}
                name="postalCode"
              />

              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.origin?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="origin"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder="مبدا"
                      options={originOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        originOptions.find((c) => c.value === form_data?.origin)
                          ?.value
                      }
                    />
                  )}
                />
              </View>

              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.destination?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="destination"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder="مقصد"
                      options={destinationOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        destinationOptions.find(
                          (c) => c.value === form_data?.destination
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
                      {errors?.provinceID?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="provinceID"
                  control={control}
                  rules={requiredRule}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder={
                        isProvinceLoading ? LOADING_MESSAGE : "* استان"
                      }
                      options={provinceOptions}
                      onValueChange={(val) => {
                        if (val) {
                          fetchCity(val);
                        } else {
                          setCityOptions([]);
                        }
                        return onChange(val);
                      }}
                      primaryColor="#164194"
                      selectedValue={
                        provinceOptions.find(
                          (c) => c.value === form_data?.provinceID
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
                      {errors?.cityID?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="cityID"
                  control={control}
                  rules={requiredRule}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder={isCityLoading ? LOADING_MESSAGE : "* شهر"}
                      options={cityOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        cityOptions.find((c) => c.value === form_data?.cityID)
                          ?.value
                      }
                    />
                  )}
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
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton title="ادامه" handlePress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhnameStep2;
