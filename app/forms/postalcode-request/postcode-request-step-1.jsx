// IMPORTS
import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { insertRequestBulk } from "@/api/request";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/Background";
import { router } from "expo-router";
import { useUserStore } from "@/store";
import { BuildingDetailInput } from "@/components/BuildingDetailInput";
import * as SecureStore from "expo-secure-store";
import { Title } from "@/components/Title";
import { requiredRule, postCodeRule } from "@/constants/validations";

const Step2 = () => {
  // STATES
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const userData = useUserStore((state) => state.userData);
  const userAddress = useUserStore((state) => state.userAddress);
  const mobile = SecureStore.getItem("mobile");
  const userAddressCodes = useUserStore((state) => state.userAddressCodes);
  const setFactor = useUserStore((state) => state.setFactor);
  const { control, watch, handleSubmit } = useForm();
  const form_data = watch();

  const deleteBuildingTypeHandler = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const units = items.map((item) => ({
      floorNo: item.floorNo,
      sideFloor: item.sideFloor,
      landUse: item.landUse,
    }));
    try {
      const response = await insertRequestBulk({
        mobile,
        counter: 1,
        sunCityID: userAddressCodes.ruralCityID,
        sunVillageID: userAddressCodes.villageID || null,
        unit: userAddressCodes.unit || 1,
        email: "",
        prePhoneNo: "",
        result: true,
        title: "",
        id: "",
        customerID: "",
        trackingID: "",
        typeID: "",
        date: new Date().toISOString(),
        amount: 0,
        tax: 0,
        payment: 0,
        firstName: userData.name || "",
        lastName: userData.lastName || "",
        phoneNo: form_data.tel || "",
        nearestPostCode: form_data.nearestPostCode || "",
        address: `${userAddress} ${
          form_data.addressSub ? form_data.addressSub : ""
        }`,
        lat: 0,
        lon: 0,
        units,
      });
      setFactor(response.data.itemList[0]);
      router.push("forms/postalcode-request/postcode-request-step-2");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            {/* HEADER SECTION */}
            <Title title={"درخواست کد پستی"} progress={66} home={true} />

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
                  placeholder="* نام"
                  keyboardType="default"
                  containerStyle="mt-5"
                  rules={requiredRule}
                  type={"text"}
                  value={userData?.name || ""}
                  control={control}
                  name="name"
                />

                <FormField
                  placeholder="* نام خانوادگی"
                  keyboardType="default"
                  containerStyle="mt-5"
                  rules={requiredRule}
                  type={"text"}
                  control={control}
                  value={userData?.lastName || ""}
                  name="lastname"
                />

                <FormField
                  placeholder="* تلفن همراه"
                  keyboardType="numeric"
                  inputMode="numeric"
                  containerStyle="mt-5"
                  rules={requiredRule}
                  control={control}
                  editable={false}
                  value={mobile || " "}
                  name="mobile"
                />

                <FormField
                  placeholder="شماره تلفن ثابت"
                  keyboardType="numeric"
                  containerStyle="mt-5"
                  type={"text"}
                  control={control}
                  name="tel"
                />

                <FormField
                  placeholder="موقعیت"
                  keyboardType="default"
                  containerStyle="mt-5"
                  type={"text"}
                  value={userAddress || ""}
                  control={control}
                  name="addressMain"
                  editable={false}
                  height="h-24"
                  multiline={true}
                />

                <FormField
                  placeholder="* نشانی"
                  keyboardType="default"
                  containerStyle="mt-5"
                  rules={requiredRule}
                  type={"text"}
                  control={control}
                  name="addressSub"
                  multiline={true}
                />

                <FormField
                  placeholder="نزدیکترین کد پستی"
                  keyboardType="numeric"
                  containerStyle="mt-5"
                  rules={postCodeRule}
                  type={"text"}
                  control={control}
                  name="nearestPostCode"
                />

                <View className="mt-5">
                  <BuildingDetailInput
                    items={items}
                    setItems={setItems}
                    onDeleteItem={deleteBuildingTypeHandler}
                  />
                </View>
              </View>
            </ScrollView>

            {/* BOTTOM SECTION */}
            <View className="w-full z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="ادامه"
                disabled={items.length === 0}
                handlePress={handleSubmit(onSubmit)}
                isLoading={isLoading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Step2;
