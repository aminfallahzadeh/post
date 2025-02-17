// IMPORTS
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import CustomSelect from "@/components/CustomSelect";
import { insertRequestGheramat } from "@/api/request";
import { CustomModal } from "@/components/CustomModal";
import { bitkindOptions, changeCostOptions } from "@/data/gheramatData";
import { validatePostCode } from "@/api/gnaf";
import { Title } from "@/components/Title";
import { toastConfig } from "@/config/toast-config";
import { CustomTextInput } from "@/components/CustomTextInput";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
} from "react-native";
import {
  nationalCodeRule,
  requiredRule,
  postCodeRule,
  shebaRule,
} from "@/constants/validations";

const Index = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [visible, setVisible] = useState(false);

  // CONSTS
  const setGheramatResult = useUserStore((state) => state.setGheramatResult);
  const userData = useUserStore((state) => state.userData);
  const mobile = SecureStore.getItem("mobile");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
    trigger,
  } = useForm({
    values: {
      mobile,
      bitkind: 3,
      customerName: userData.name,
      customerFamily: userData.lastName,
      nationalID: userData.nationalCode,
    },
  });
  const postalcode = watch("postalcode");

  // HANDLERS
  const handleUploadButtonClick = () => {
    setVisible(true);
  };

  const pickImage = async (type) => {
    let result;

    if (type === "gallery") {
      setVisible(false);
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 6],
        quality: 1,
        base64: true,
      });
    } else {
      setVisible(false);
      result = await ImagePicker.launchCameraAsync({
        base64: true,
        aspect: [4, 6],
        quality: 1,
        allowsEditing: true,
      });
    }

    console.log("RESULT", result);

    if (!result.canceled) {
      const imageSize = result.assets[0]?.fileSize || 0;

      console.log("IMAGE SIZE: ", imageSize);

      if (imageSize > 5 * 1024 * 1024) {
        toastConfig.warning("حجم تصویر نباید بیشتر از 5 مگابایت باشد");
        return;
      }

      setImageBase64(result.assets[0].base64);
      setImagePreview(result.assets[0].uri);
    }
  };

  const onSubmit = async (data) => {
    if (!imageBase64) {
      toastConfig.warning("لطفا تصویر فاکتور را بارگذاری کنید");
      return;
    }

    setIsLoading(true);
    try {
      const response = await insertRequestGheramat({
        ...data,
        img64base: imageBase64 ? imageBase64 : "",
      });
      console.log("GHERAMAT RESPONSE: ", response.data);
      setGheramatResult(response.data.itemList[0]);
      router.push("forms/gheramat/gheramat-step-1");
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const validatePostalCode = async () => {
      const isValid = await trigger("postalcode");
      console.log("IS VALID:", isValid);
      if (isValid) {
        const validateResponse = await validatePostCode([
          { clientRowID: 1, postCode: postalcode },
        ]);

        console.log(!validateResponse.data.itemList[0].value);

        if (!validateResponse.data.itemList[0].value) {
          setValue("postalcode", "", { shouldValidate: true });
          toastConfig.warning("کد پستی معتبر نیست");
        }
      }
    };

    if (postalcode && postalcode.length === 10) {
      validatePostalCode();
    }
  }, [postalcode, setValue, trigger]);

  return (
    <>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        title={"روش بارگذاری را انتخاب کنید"}
        closeModal={() => setVisible(false)}
      >
        <View className="w-full flex-row px-4">
          <View className="flex-1 mr-2">
            <CustomButton
              title="دوربین"
              handlePress={() => pickImage("camera")}
            />
          </View>

          <View className="flex-1 ml-2">
            <CustomButton
              title="گالری تصاویر"
              handlePress={() => pickImage("gallery")}
            />
          </View>
        </View>
      </CustomModal>

      <Background>
        <SafeAreaView className="h-full">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <View className="flex-1">
              {/* HEADER SECTION */}
              <Title title={"درخواست غرامت"} progress={50} home={false} />

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
                  <CustomTextInput
                    placeholder="نام"
                    value={userData?.name || "-"}
                    editable={false}
                    containerStyle="mt-5"
                    control={control}
                    name="customerName"
                  />

                  <CustomTextInput
                    placeholder="نام خانوادگی"
                    value={userData?.lastName || "-"}
                    editable={false}
                    containerStyle="mt-5"
                    control={control}
                    name="customerFamily"
                  />

                  <CustomTextInput
                    placeholder="کد ملی"
                    type={"text"}
                    rules={nationalCodeRule}
                    value={userData?.nationalCode || "-"}
                    editable={false}
                    containerStyle="mt-5"
                    control={control}
                    name="nationalID"
                  />

                  <CustomTextInput
                    placeholder="موبایل"
                    value={mobile || "-"}
                    editable={false}
                    containerStyle="mt-5"
                    control={control}
                    name="mobile"
                  />

                  <CustomTextInput
                    placeholder="* شماره مرسوله"
                    keyboardType="numeric"
                    inputMode="numeric"
                    rules={requiredRule}
                    containerStyle="mt-5"
                    control={control}
                    name="parcellno"
                  />

                  <CustomTextInput
                    placeholder={"تلفن ثابت"}
                    keyboardType="numeric"
                    inputMode="numeric"
                    max={11}
                    containerStyle="mt-5"
                    control={control}
                    name="tellno"
                  />

                  <CustomTextInput
                    placeholder="کد پستی"
                    keyboardType="numeric"
                    inputMode="numeric"
                    containerStyle="mt-5"
                    rules={postCodeRule}
                    control={control}
                    max={10}
                    name="postalcode"
                  />

                  <View className="mt-5">
                    <CustomSelect
                      name="bitkind"
                      control={control}
                      data={bitkindOptions}
                      placeholder="نوع غرامت"
                      label="نوع غرامت"
                      errors={errors}
                      setValue={setValue}
                      disabled={true}
                    />
                  </View>

                  <CustomTextInput
                    placeholder={"ارزش مرسوله"}
                    keyboardType="numeric"
                    inputMode="numeric"
                    containerStyle="mt-5"
                    control={control}
                    name="parcellcost"
                    rules={requiredRule}
                  />

                  <View className="mt-5">
                    <CustomSelect
                      name="modcostallow"
                      control={control}
                      data={changeCostOptions}
                      label="امکان تغییر ارزش مرسوله توسط پست"
                      errors={errors}
                      setValue={setValue}
                    />
                  </View>

                  <CustomTextInput
                    placeholder={"شماره شبا"}
                    keyboardType="numeric"
                    inputMode="numeric"
                    containerStyle="mt-5"
                    control={control}
                    max={26}
                    name="shebano"
                    rules={{ ...requiredRule, ...shebaRule }}
                  />

                  <CustomTextInput
                    placeholder="نام صاحب شماره شبا"
                    containerStyle="mt-5"
                    control={control}
                    name="shebaownname"
                  />

                  <View style={styles.container}>
                    <View className="mt-5 w-full">
                      <CustomButton
                        title="* بارگذاری تصویر فاکتور"
                        bgColor="bg-secondary"
                        height="h-10"
                        titleColor="text-grey2"
                        handlePress={handleUploadButtonClick}
                      />
                    </View>
                    {imagePreview && (
                      <Image
                        source={{ uri: imagePreview }}
                        style={styles.image}
                      />
                    )}
                  </View>

                  <CustomTextInput
                    placeholder="* آدرس"
                    multiline={true}
                    rules={requiredRule}
                    keyboardType="default"
                    containerStyle="mt-5"
                    search={true}
                    height="h-32 align-top"
                    numberOfLine={3}
                    inputStyle={{
                      textAlignVertical: "top",
                      textAlign: "right",
                      paddingTop: 20,
                    }}
                    control={control}
                    name="addr"
                  />
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

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 5,
  },
});
