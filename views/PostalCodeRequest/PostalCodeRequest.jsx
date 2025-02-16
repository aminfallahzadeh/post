// IMPORTS
import { useEffect, useReducer, useState } from "react";
import { reducer, initialState } from "./reducer";
import { useFetchData } from "./useFetchData";
import { useUserStore } from "@/store";
import { useForm } from "react-hook-form";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import CustomSelect from "@/components/CustomSelect";
import Background from "@/components/Background";
import CustomSwitch from "@/components/CustomSwitch";
import {
  PROVINCE,
  COUNTY,
  ZONE,
  DEH,
  CITY,
  VILLAGE,
  POST_AREA,
} from "@/constants/consts";
import { postAreaOptions } from "@/data/postArea";
import { requiredRule } from "@/constants/validations";
import { Title } from "@/components/Title";

export const PostalCodeRequest = () => {
  // STATES
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // CONSTS
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const form_data = watch();
  const fetchData = useFetchData(dispatch);
  const setUserAddress = useUserStore((state) => state.setUserAddress);
  const setUserAddressCodes = useUserStore(
    (state) => state.setUserAddressCodes
  );

  useEffect(() => {
    fetchData("province");
  }, [fetchData]);

  // HANDLERS
  const changeModeHandler = () => {
    dispatch({ type: "TOGGLE_MODE" });

    setValue("zoneID", null);
    setValue("ruralCityID", null);
    setValue("villageID", null);
  };

  const onSubmit = async () => {
    setIsSubmitLoading(true);
    await setUserAddressCodes(form_data);

    const province = form_data.province_id
      ? state.options.province?.find(
          (item) => item.value === form_data.province_id
        )
      : null;
    const county = form_data.countyID
      ? state.options.county?.find((item) => item.value === form_data.countyID)
      : null;
    const city = form_data.ruralCityID
      ? state.options.ruralCity?.find(
          (item) => item.value === form_data.ruralCityID
        )
      : null;
    const zone = form_data.zoneID
      ? state.options.zone?.find((item) => item.value === form_data.zoneID)
      : null;
    const village = form_data.villageID
      ? state.options.village?.find(
          (item) => item.value === form_data.villageID
        )
      : null;

    if (!province || !county) {
      setIsSubmitLoading(false);
    }

    const main = `شهرستان ${province?.label || ""} استان ${
      county?.label || ""
    } `;
    const restUrban = city ? `شهر ${city.label} ` : "";
    const restNotUrban =
      zone && village
        ? `بخش ${zone.label} دهستان ${city?.label || ""} روستا ${
            village.label
          } `
        : "";

    const resultUrban = main + restUrban;
    const resultNotUrban = main + restNotUrban;

    await setUserAddress(state.isUrban ? resultUrban : resultNotUrban);
    router.push("forms/postalcode-request/postcode-request-step-1");
    setIsSubmitLoading(false);
  };

  // DEBUG
  useEffect(() => {
    console.log("REQUEST STATES:", state);
  }, [state]);

  // EFFECTS
  useEffect(() => {
    if (!state.isUrban && form_data.countyID) {
      fetchData("zone", { countyID: form_data.countyID });
    }
  }, [form_data.countyID, fetchData, state.isUrban]);

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
          <Title title={"درخواست کد پستی"} progress={33} home={false} />

          {/* FORM FIELDS */}
          <View className="w-full px-5">
            <View className="mt-5">
              <CustomSelect
                name="province_id"
                control={control}
                rules={requiredRule}
                data={state.options.province}
                label={PROVINCE}
                errors={errors}
                //   setValue={setValue}
                search={true}
                onValueChange={(val) => {
                  fetchData("county", { provinceID: val });
                }}
                isLoading={state.isLoading.province}
              />
            </View>

            <View className="mt-5">
              <CustomSelect
                name="countyID"
                control={control}
                rules={requiredRule}
                data={state.options.county}
                label={COUNTY}
                errors={errors}
                //   setValue={setValue}
                search={true}
                onValueChange={(val) => {
                  if (state.isUrban) {
                    fetchData(
                      "ruralCity",
                      {
                        village: "false",
                        countyID: val,
                      },
                      state.isUrban
                    );
                  } else {
                    fetchData("zone", {
                      countyID: val,
                    });
                  }
                }}
                isLoading={state.isLoading.county}
              />
            </View>

            <View className="mt-5 flex-row-reverse items-center justify-start ">
              <Text
                className={`text-center self-center font-isansdemibold text-lg ml-2 ${
                  state.isUrban ? "text-primary" : "text-gray-400"
                }`}
              >
                شهری
              </Text>

              <CustomSwitch
                onToggle={changeModeHandler}
                value={state.isUrban}
              />

              <Text
                className={`text-center self-center font-isansdemibold text-lg mr-2 ${
                  !state.isUrban ? "text-primary" : "text-gray-400"
                }`}
              >
                روستایی
              </Text>
            </View>

            {state.isUrban ? (
              <>
                <View className="mt-5">
                  <CustomSelect
                    name="ruralCityID"
                    control={control}
                    rules={requiredRule}
                    data={state.options.ruralCity}
                    label={CITY}
                    errors={errors}
                    //   setValue={setValue}
                    search={true}
                    isLoading={state.isLoading.ruralCity}
                  />
                </View>

                {form_data.ruralCityID && form_data.ruralCityID === 16492 && (
                  <View className="mt-5">
                    <CustomSelect
                      name="unit"
                      control={control}
                      rules={requiredRule}
                      data={postAreaOptions}
                      label={POST_AREA}
                      errors={errors}
                      //   setValue={setValue}
                      search={false}
                    />
                  </View>
                )}
              </>
            ) : (
              <>
                <View className="mt-5">
                  <CustomSelect
                    name="zoneID"
                    control={control}
                    rules={requiredRule}
                    data={state.options.zone}
                    label={ZONE}
                    errors={errors}
                    //   setValue={setValue}
                    search={true}
                    isLoading={state.isLoading.zone}
                    onValueChange={(val) => {
                      fetchData(
                        "ruralCity",
                        {
                          village: "true",
                          zoneID: val,
                        },
                        state.isUrban
                      );
                    }}
                  />
                </View>

                <View className="mt-5">
                  <CustomSelect
                    name="ruralCityID"
                    control={control}
                    rules={requiredRule}
                    data={state.options.ruralCity}
                    label={DEH}
                    errors={errors}
                    //   setValue={setValue}
                    search={true}
                    isLoading={state.isLoading.ruralCity}
                    onValueChange={(val) => {
                      fetchData("village", {
                        ruralID: val,
                      });
                    }}
                  />
                </View>

                <View className="mt-5">
                  <CustomSelect
                    name="villageID"
                    control={control}
                    rules={requiredRule}
                    data={state.options.village}
                    label={VILLAGE}
                    errors={errors}
                    //   setValue={setValue}
                    search={true}
                    isLoading={state.isLoading.village}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="ادامه"
            handlePress={handleSubmit(onSubmit)}
            isLoading={
              Object.values(state.isLoading).some((value) => value) ||
              isSubmitLoading
            }
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};
