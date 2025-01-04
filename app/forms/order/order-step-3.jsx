// IMPORTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, ScrollView } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import FormField from "@/components/FormField";
import { Title } from "@/components/Title";
import {
  requiredRule,
  nationalCodeRule,
  postCodeRule,
} from "@/constants/validations";
import { getProvince, getCity } from "@/api/order";
import { optionsGenerator } from "@/helpers/selectHelper";

const NerkhnameStep3 = () => {
  // STATES
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);

  // CONSTS
  const order = useUserStore((state) => state.order);
  const setOrder = useUserStore((state) => state.setOrder);
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
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
    router.push(`/forms/order/order-step-4`);
    console.log("FORM DATA: ", form_data);
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
    console.log("NERKHNAME Step 4: ", order);
    console.log("FORM DATA: ", form_data);
  }, [order, form_data]);

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
            title={`${order?.servicetype?.label} : اطلاعات گیرنده`}
            progress={60}
          />

          {/* FORM FIELDS */}
          <View className="w-full px-5">
            <FormField
              placeholder="* نام"
              type={"text"}
              keyboardType="default"
              containerStyle="mt-10"
              control={control}
              rules={requiredRule}
              name="receivername"
            />

            <FormField
              placeholder="* نام خانوادگی"
              type={"text"}
              keyboardType="default"
              containerStyle="mt-5"
              control={control}
              rules={requiredRule}
              name="receiverLastname"
            />

            <FormField
              placeholder="تلفن همراه"
              keyboardType="numeric"
              inputMode="numeric"
              rules={requiredRule}
              containerStyle="mt-5"
              control={control}
              name="receivermobile"
            />

            <FormField
              placeholder="تلفن ثابت"
              keyboardType="numeric"
              inputMode="numeric"
              containerStyle="mt-5"
              control={control}
              name="receiverPhone"
            />

            <FormField
              placeholder="کد ملی"
              keyboardType="numeric"
              inputMode="numeric"
              containerStyle="mt-5"
              control={control}
              rules={nationalCodeRule}
              name="receiverid"
            />

            <FormField
              placeholder="کد پستی"
              keyboardType="numeric"
              inputMode="numeric"
              rules={postCodeRule}
              containerStyle="mt-5"
              control={control}
              name="receiverpostalcode"
            />

            <View className="mt-5">
              <CustomSelect
                name="receiverProvinceID"
                control={control}
                rules={requiredRule}
                data={provinceOptions}
                label="* استان"
                errors={errors}
                setValue={setValue}
                search={true}
                isLoading={isProvinceLoading}
                onValueChange={(val) => {
                  if (val) {
                    console.log(val);
                    fetchCity(val);
                  } else {
                    setCityOptions([]);
                  }
                }}
                onClear={() => {
                  setValue("receiverProvinceID", null);
                  setValue("destcode", null);
                  setCityOptions([]);
                }}
              />
            </View>

            <View className="mt-5">
              <CustomSelect
                name="destcode"
                control={control}
                rules={requiredRule}
                data={cityOptions}
                label="* شهر"
                search={true}
                errors={errors}
                setValue={setValue}
                isLoading={isCityLoading}
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
              name="receiveraddress"
            />
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

export default NerkhnameStep3;
