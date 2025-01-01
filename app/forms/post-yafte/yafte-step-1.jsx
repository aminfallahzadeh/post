// IMPORTS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import CustomSelect from "@/components/CustomSelect";
import { SafeAreaView } from "react-native-safe-area-context";
import { insertRequestPostYafte } from "@/api/request";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { POST_YAFTE } from "@/constants/consts";
import { requiredRule } from "@/constants/validations";
import { postYafteValidation } from "@/constants/validations";
import { getYafteProvince, getYafteCity } from "@/api/yafte";
import { optionsGenerator } from "@/helpers/selectHelper";
import * as SecureStore from "expo-secure-store";
import { Title } from "@/components/Title";

const YafteStep1 = () => {
  // STATES
  const mobile = SecureStore.getItem("mobile");
  const [isLoading, setIsLoading] = useState(false);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const foundDocIds = useUserStore((state) => state.foundDocIds);

  // CONSTS
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const form_data = watch();

  // HANDLES
  const fetchProvince = async () => {
    setIsProvinceLoading(true);
    try {
      const response = await getYafteProvince();
      console.log("PROVINCE RESPONSE: ", response.data);
      const options = optionsGenerator(response.data.itemList, "id", "name");
      setProvinceOptions(options);
    } finally {
      setIsProvinceLoading(false);
    }
  };

  const fetchCity = async (provinceID = null) => {
    setIsCityLoading(true);
    try {
      const response = await getYafteCity({ provinceID });
      console.log("CITY RESPONSE: ", response.data);
      const options = optionsGenerator(response.data.itemList, "id", "name");
      setCityOptions(options);
    } finally {
      setIsCityLoading(false);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const docList = foundDocIds.map((doc) => ({
        foundDocId: doc.id,
      }));
      const response = await insertRequestPostYafte({
        mobile,
        cityID: form_data.city_id,
        address: form_data.address,
        postCode: form_data.postCode,
        docList: docList,
        trackingID: "",
        id: "",
      });
      console.log("POST YAFTE RESPONSE: ", response.data);
      router.replace("/forms/post-yafte/yafte-step-2");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  // EFFECTS
  useEffect(() => {
    fetchProvince();
  }, []);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <Title title={POST_YAFTE} progress={66} home={true} />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <FormField
                placeholder="تلفن همراه"
                editable={false}
                type={"text"}
                containerStyle="mt-10"
                control={control}
                value={mobile || " "}
                name="mobile"
              />

              <FormField
                placeholder="* آدرس"
                multiline={true}
                keyboardType="default"
                type={"text"}
                containerStyle="mt-5"
                rules={postYafteValidation.address}
                height={"h-40"}
                inputStyle={{
                  textAlignVertical: "top",
                }}
                control={control}
                name="address"
              />

              <FormField
                placeholder="* کد پستی"
                keyboardType="numeric"
                inputMode="numeric"
                rules={postYafteValidation.postCode}
                containerStyle="mt-5"
                control={control}
                name="postCode"
              />

              <View className="mt-5">
                <CustomSelect
                  name="state_id"
                  control={control}
                  rules={requiredRule}
                  data={provinceOptions}
                  label="* استان"
                  errors={errors}
                  setValue={setValue}
                  isLoading={isProvinceLoading}
                  onValueChange={(val) => {
                    fetchCity(val);
                  }}
                  onClear={() => {
                    setValue("state_id", null);
                    setValue("city_id", null);
                    setCityOptions([]);
                  }}
                />
              </View>

              <View className="mt-5">
                <CustomSelect
                  name="city_id"
                  control={control}
                  rules={requiredRule}
                  data={cityOptions}
                  label="* شهر"
                  errors={errors}
                  setValue={setValue}
                  isLoading={isCityLoading}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="درخواست ارسال"
            handlePress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default YafteStep1;
