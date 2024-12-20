// IMPORTS
import { useEffect, useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { addressByPostCode } from "@/api/gnaf";
import { router } from "expo-router";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";
import FormField from "@/components/FormField";
import { postCodeRules } from "@/constants/validations";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { insertRequestEhraz } from "@/api/request";
import * as SecureStore from "expo-secure-store";
import { lastStreetRules } from "@/constants/validations";

const EhrazStep2 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const bouncyCheckboxRef = useRef(null);
  const confirmedCheckboxRef = useRef(null);
  const [address, setAddress] = useState("");

  // CONSTS
  const ehrazFormData = useUserStore((state) => state.ehrazFormData);
  const setFactor = useUserStore((state) => state.setFactor);
  const mobile = SecureStore.getItem("mobile");
  const {
    watch,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lastStreet: "",
      buildingNumber: "",
      floor: "",
      unit: "",
    },
  });
  const postalCode = watch("postalCode");

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
        postCode: postalCode,
      },
    ];
    const response = await addressByPostCode(data);

    const result = response?.data?.itemList[0].data[0].result;
    const address = `استان ${result?.province} - شهرستان ${result?.localityName} - بخش ${result?.zone} - شهر ${result?.townShip} - خیابان ${result?.street} - خیابان ${result?.street2} - پلاک ${result?.houseNumber} - ساختمان ${result?.buildingName} - ${result?.description} - طبقه ${result?.floor} - واحد ${result?.sideFloor}`;
    setValue("address", address);
  }, [postalCode, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const { postalCode, lastStreet, buildingNumber, floor, unit } = data;
      const response = await insertRequestEhraz({
        ...ehrazFormData,
        postalCode,
        lastStreet,
        buildingNumber,
        floor,
        unit,
        phoneNumber: mobile,
      });

      console.log("INSERT EHRAZ RESPONSE: ", response.data);
      setFactor(response.data.itemList[0]);
      router.push("ehraz/ehraz-step-3");
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

    if (postalCode) {
      validateAndFetch();
    }
  }, [postalCode, trigger, fetchAddress]);

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
          <Title progress={66} title="احراز نشانی" />
          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <FormField
                placeholder="کد پستی"
                type={"text"}
                containerStyle="mt-10"
                keyboardType="numeric"
                control={control}
                rules={postCodeRules}
                name="postalCode"
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
                multiline={true}
                editable={checked}
                control={control}
                height={"h-28"}
                rules={lastStreetRules}
                inputStyle={{
                  textAlignVertical: "top",
                  textAlign: "right",
                  paddingTop: 15,
                }}
                name="lastStreet"
              />

              <View className="flex-row-reverse justify-between items-center">
                <View className="flex-1 ml-2">
                  <FormField
                    placeholder="پلاک"
                    type={"text"}
                    containerStyle="mt-5"
                    keyboardType="numeric"
                    editable={checked}
                    control={control}
                    name="buildingNumber"
                  />
                </View>
                <View className="flex-1 ml-2">
                  <FormField
                    placeholder="طبقه"
                    type={"text"}
                    containerStyle="mt-5"
                    editable={checked}
                    keyboardType="numeric"
                    control={control}
                    name="floor"
                  />
                </View>
                <View className="flex-1 ml-2">
                  <FormField
                    placeholder="واحد"
                    type={"text"}
                    containerStyle="mt-5"
                    keyboardType="numeric"
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
          </TouchableWithoutFeedback>
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
      </SafeAreaView>
    </Background>
  );
};

export default EhrazStep2;
