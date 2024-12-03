// IMPORTS
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";
import * as SecureStore from "expo-secure-store";
import SelectInput from "@/components/SelectInput";
import { optionsGenerator } from "@/helpers/selectHelper";
import { getProvince, getServiceType } from "@/api/gheramat";
import { insertRequestGheramat } from "@/api/request";
import { REQUIRED } from "@/constants/messages";
import { LOADING_MESSAGE } from "@/constants/messages";

const Index = () => {
  // STATES
  const [isServiceLoading, setIsServiceLoading] = useState(false);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const setGheramatResult = useUserStore((state) => state.setGheramatResult);
  const userData = useUserStore((state) => state.userData);
  const mobile = SecureStore.getItem("mobile");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const form_data = watch();

  // HANDLERS
  const fetchServiceType = async () => {
    setIsServiceLoading(true);
    try {
      const response = await getServiceType();
      console.log("SERVICE RESPONSE: ", response.data);
      const options = optionsGenerator(response.data.itemList, "id", "name");
      setServiceOptions(options);
    } finally {
      setIsServiceLoading(false);
    }
  };

  const fetchProvince = async () => {
    setIsProvinceLoading(true);
    try {
      const response = await getProvince();
      console.log("PROVINCE RESPONSE: ", response.data);
      const options = optionsGenerator(response.data.itemList, "id", "name");
      setProvinceOptions(options);
    } finally {
      setIsProvinceLoading(false);
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await insertRequestGheramat({
        parcellno: form_data.parcellno,
        serviceKind: form_data.serviceKind,
        province: parseInt(form_data.province),
        mobile,
        customerName: userData.name,
        customerFamily: userData.lastName,
        nationalID: userData.nationalCode,
      });
      console.log("GHERAMAT RESPONSE: ", response.data);
      setGheramatResult(response.data.itemList[0]);
      router.push("forms/gheramat/step2");
    } finally {
      setIsLoading(false);
    }
  };

  // EFFECTS
  useEffect(() => {
    fetchProvince();
    fetchServiceType();
  }, []);

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
          <View
            className="flex-col w-full bg-secondary z-10 justify-center items-center relative"
            style={styles.headerContainer}
          >
            <View className="flex-row w-full justify-between items-center">
              <Pressable
                onPress={() => router.back()}
                className="absolute left-4"
              >
                <Feather name="arrow-left" size={25} color="#333" />
              </Pressable>
              <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
                درخواست غرامت
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={50} />
            </View>
          </View>

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-4">
              <FormField
                placeholder="نام"
                type={"text"}
                value={userData?.name || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="name"
              />

              <FormField
                placeholder="نام خانوادگی"
                type={"text"}
                value={userData?.lastName || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="lastname"
              />

              <FormField
                placeholder="کد ملی"
                type={"text"}
                value={userData?.nationalCode || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="nationalCode"
              />

              <FormField
                placeholder="تلفن"
                type={"text"}
                value={mobile || "-"}
                editable={false}
                containerStyle="mt-5"
                control={control}
                name="mobile"
              />

              <FormField
                placeholder="شماره مرسوله"
                keyboardType="numeric"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                name="parcellno"
              />

              <View className="mt-5 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.serviceKind?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="serviceKind"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: REQUIRED,
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder={
                        isServiceLoading ? LOADING_MESSAGE : "* نوع سرویس"
                      }
                      options={serviceOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        serviceOptions.find(
                          (c) => c.value === form_data?.serviceKind
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
                      {errors?.serviceKind?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="province"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: REQUIRED,
                    },
                  }}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder={
                        isProvinceLoading ? LOADING_MESSAGE : "* شهر"
                      }
                      options={provinceOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        provinceOptions.find(
                          (c) => c.value === form_data?.province
                        )?.value
                      }
                    />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="ادامه"
            handlePress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
});
