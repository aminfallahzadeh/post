import { useState } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { insertRequestBulk } from "@/api/request";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "@/components/Background";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import ProgressBar from "@/components/ProgressBar";
import { useUserStore } from "@/store";
import { BuildingDetailInput } from "@/components/BuildingDetailInput";
import * as SecureStore from "expo-secure-store";

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
      console.log("FINAL RESPONSE:", response.data);
      setFactor(response.data.itemList[0]);
      router.push("forms/postalcode-request/step3");
    } finally {
      setIsLoading(false);
    }
  };

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
                درخواست کد پستی
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={66} />
            </View>
          </View>

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-4">
              <FormField
                placeholder="نام"
                keyboardType="default"
                containerStyle="mt-5"
                type={"text"}
                value={userData?.name || ""}
                control={control}
                name="name"
              />

              <FormField
                placeholder="نام خانوادگی"
                keyboardType="default"
                containerStyle="mt-5"
                type={"text"}
                control={control}
                value={userData?.lastName || ""}
                name="lastname"
              />

              <FormField
                placeholder="تلفن همراه"
                keyboardType="numeric"
                containerStyle="mt-5"
                type={"text"}
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
                placeholder="نشانی"
                keyboardType="default"
                containerStyle="mt-5"
                type={"text"}
                control={control}
                name="addressSub"
                multiline={true}
              />

              <FormField
                placeholder="نزدیکترین کد پستی"
                keyboardType="numeric"
                containerStyle="mt-5"
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
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
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

export default Step2;

const styles = StyleSheet.create({
  inputContainer: {
    columnGap: 10,
  },
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  disabledPlus: {
    color: "gray",
  },

  postalCodesItemContainer: {
    gap: 10,
  },
});
