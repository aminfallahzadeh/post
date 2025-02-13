// IMPORTS
import { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { addressStringByPostCode, addressByPostCode } from "@/api/gnaf";
import { router } from "expo-router";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import { postCodeRule } from "@/constants/validations";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { insertRequestEhraz } from "@/api/request";
import * as SecureStore from "expo-secure-store";
import { lastStreetRules } from "@/constants/validations";
import {
  View,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const EhrazStep1 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const bouncyCheckboxRef = useRef(null);
  const confirmedCheckboxRef = useRef(null);
  const [canAddHouseNumber, setCanAddHouseNumber] = useState(false);

  // CONSTS
  const ehrazFormData = useUserStore((state) => state.ehrazFormData);
  const setFactor = useUserStore((state) => state.setFactor);
  const mobile = SecureStore.getItem("mobile");
  const { watch, handleSubmit, control, trigger, setValue } = useForm({
    defaultValues: {
      lastStreet: "",
      buildingNumber: "",
      floor: "",
      unit: "",
    },
  });
  const postCode = watch("postCode");

  // HANDLERS
  const handleCheckboxPress = () => {
    setValue("lastStreet", "");
    setValue("buildingNumber", "");
    setValue("floor", "");
    setValue("unit", "");

    setChecked((prev) => !prev);
  };

  const handleConfirmedCheckboxPress = () => {
    setConfirmed((prev) => !prev);
  };

  const fetchAddress = useCallback(async () => {
    const data = [
      {
        clientRowID: 0,
        postCode,
      },
    ];
    const houseNumberCheckResponse = await addressByPostCode(data);
    console.log("UNIT CHECK RESPONSE:", houseNumberCheckResponse.data);
    const houseNumber =
      houseNumberCheckResponse.data.itemList[0].data[0].result.houseNumber;
    if (!houseNumber) {
      setCanAddHouseNumber(true);
    } else {
      setCanAddHouseNumber(false);
    }

    const response = await addressStringByPostCode(data);
    console.log("ADDRESS STRING RESPONSE: ", response.data);
    if (response.data.itemList[0].resMsg === "موفق") {
      const address = response.data.itemList[0].data[0].result.value;
      setValue("address", address);
    } else {
      setValue("address", response.data.itemList[0].resMsg);
    }
  }, [postCode, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { postCode, lastStreet, buildingNumber, floor, unit } = data;
      const {
        firstName,
        lastName,
        applicantType,
        gender,
        nationalCodeOrId,
        addressStatus,
      } = ehrazFormData;
      const response = await insertRequestEhraz({
        // ...ehrazFormData,
        firstName,
        lastName,
        applicantType,
        gender,
        nationalCodeOrId,
        addressStatus,
        postalCode: postCode,
        lastStreet,
        buildingNumber,
        floor,
        unit,
        phoneNumber: mobile,
      });

      console.log("INSERT EHRAZ RESPONSE: ", response.data);
      setFactor(response.data.itemList[0]);
      router.push("forms/ehraz/ehraz-step-2");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const validateAndFetch = async () => {
      const isValid = await trigger("postCode");
      if (isValid) {
        fetchAddress();
      }
    };

    if (postCode && postCode.length === 10) {
      validateAndFetch();
    }
  }, [postCode, trigger, fetchAddress]);

  // DEBUG
  useEffect(() => {
    console.log(postCode);
  }, [postCode]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            {/* HEADER SECTION */}
            <Title progress={66} title="احراز نشانی" />

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
                  placeholder="کد پستی"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-10"
                  control={control}
                  rules={postCodeRule}
                  name="postCode"
                />

                <FormField
                  placeholder="آدرس"
                  type={"text"}
                  containerStyle="mt-5"
                  multiline={true}
                  editable={false}
                  control={control}
                  height={"h-28"}
                  inputStyle={{
                    textAlignVertical: "top",
                    textAlign: "right",
                    paddingTop: 15,
                  }}
                  name="address"
                />

                <View className="flex-row justify-center items-center mt-5">
                  <RNBounceable
                    onPress={() => {
                      if (bouncyCheckboxRef.current) {
                        bouncyCheckboxRef.current.onCheckboxPress();
                      }
                    }}
                  >
                    <Text className="text-red-900 font-isansregular text-right px-3">
                      در صورت نقص در هریک از اجزای نشانی نمایش داده شده. لطفا
                      اطلاعات تکمیلی زیر را وارد نمایید
                    </Text>
                  </RNBounceable>
                  <View>
                    <BouncyCheckbox
                      ref={bouncyCheckboxRef}
                      onPress={handleCheckboxPress}
                      fillColor="#ff0000"
                    />
                  </View>
                </View>

                <FormField
                  placeholder="معبر آخر"
                  type={"text"}
                  containerStyle="mt-5"
                  editable={checked}
                  control={control}
                  rules={lastStreetRules}
                  name="lastStreet"
                />

                <View className="flex-row-reverse justify-between items-center">
                  <View className="flex-1 ml-2">
                    <FormField
                      placeholder="پلاک"
                      keyboardType="numeric"
                      inputMode="numeric"
                      containerStyle="mt-5"
                      editable={checked && canAddHouseNumber}
                      control={control}
                      name="buildingNumber"
                    />
                  </View>
                  <View className="flex-1 ml-2">
                    <FormField
                      placeholder="طبقه"
                      keyboardType="numeric"
                      inputMode="numeric"
                      containerStyle="mt-5"
                      editable={checked}
                      control={control}
                      name="floor"
                    />
                  </View>
                  <View className="flex-1 ml-2">
                    <FormField
                      placeholder="واحد"
                      keyboardType="numeric"
                      inputMode="numeric"
                      containerStyle="mt-5"
                      editable={checked}
                      control={control}
                      name="unit"
                    />
                  </View>
                </View>

                <View className="flex-row justify-center items-center mt-5">
                  <RNBounceable
                    onPress={() => {
                      if (confirmedCheckboxRef.current) {
                        confirmedCheckboxRef.current.onCheckboxPress();
                      }
                    }}
                  >
                    <Text className="text-grey2 font-isansregular text-right px-3">
                      مسئولیت صحت اطلاعات وارد شده بعهده متقاضی می باشد. مدارک
                      مربوطه توسط نامه رسان در مکان مشتری کنترل می شود.
                    </Text>
                  </RNBounceable>
                  <View>
                    <BouncyCheckbox
                      ref={confirmedCheckboxRef}
                      onPress={handleConfirmedCheckboxPress}
                      fillColor="#ff7800"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* BOTTOM SECTION */}
            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="ثبت درخواست"
                handlePress={handleSubmit(onSubmit)}
                disabled={!confirmed}
                isLoading={isLoading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default EhrazStep1;
