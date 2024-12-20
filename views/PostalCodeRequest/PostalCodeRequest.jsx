// IMPORTS
import { useEffect, useReducer, useState } from "react";
import { reducer, initialState } from "./reducer";
import { useFetchData } from "./useFetchData";
import { useUserStore } from "@/store";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import SelectInput from "@/components/SelectInput";
import SwitchInput from "@/components/SwitchInput";
import {
  PROVINCE,
  COUNTY,
  ZONE,
  DEH,
  CITY,
  VILLAGE,
  POST_AREA,
} from "@/constants/consts";
import { LOADING_MESSAGE } from "@/constants/messages";
import { postAreaOptions } from "@/data/postArea";
import { Title } from "@/components/Title";

export const PostalCodeRequest = () => {
  // STATES
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // CONSTS
  const { control, watch, handleSubmit, setValue } = useForm();
  const form_data = watch();
  const fetchData = useFetchData(dispatch);
  const setUserAddress = useUserStore((state) => state.setUserAddress);
  const setUserAddressCodes = useUserStore(
    (state) => state.setUserAddressCodes
  );

  useEffect(() => {
    fetchData("province");
    fetchData("county");
    fetchData("ruralCity", { village: "false" });
  }, [fetchData]);

  // HANDLERS
  const changeModeHandler = () => {
    dispatch({ type: "TOGGLE_MODE" });

    setValue("zoneID", null);
    setValue("ruralCityID", null);
    setValue("villageID", null);

    if (!state.isUrban) {
      fetchData("ruralCity", {
        village: "false",
        countyID: form_data.countyID,
        provinceID: form_data.province_id,
      });
    } else {
      fetchData("zone", {
        countyID: form_data.countyID,
        provinceID: form_data.province_id,
      });
      fetchData("ruralCity", {
        village: "true",
        countyID: form_data.countyID,
        provinceID: form_data.province_id,
      });
      fetchData("village", {
        countyID: form_data.countyID,
        provinceID: form_data.province_id,
      });
    }
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
    router.push("forms/postalcode-request/step2");
    setIsSubmitLoading(false);
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
          <Title title={"درخواست کد پستی"} progress={33} home={false} />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <View className="mt-5">
                <Controller
                  name="province_id"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder={
                        state.isLoading.province ? LOADING_MESSAGE : PROVINCE
                      }
                      disabled={state.isLoading.province}
                      options={state.options.province}
                      onValueChange={(val) => {
                        setValue("countyID", null);
                        fetchData("county", { provinceID: val });
                        return onChange(val);
                      }}
                      primaryColor="#164194"
                      selectedValue={
                        state.options.province.find(
                          (c) => c.value === form_data?.province_id
                        )?.value
                      }
                    />
                  )}
                />
              </View>
              <View className="mt-5">
                <Controller
                  name="countyID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder={
                        state.isLoading.county ? LOADING_MESSAGE : COUNTY
                      }
                      disabled={state.isLoading.county}
                      options={state.options.county}
                      onValueChange={(val) => {
                        if (val) {
                          const target = state.data.county.find(
                            (c) => c.id === val
                          );

                          setValue("province_id", target.province_id);
                        }

                        state.isUrban &&
                          fetchData("ruralCity", {
                            village: "false",
                            countyID: val,
                          });

                        fetchData("zone", {
                          countyID: val,
                        });

                        return onChange(val);
                      }}
                      primaryColor="#164194"
                      selectedValue={
                        state.options.county.find(
                          (c) => c.value === form_data?.countyID
                        )?.value
                      }
                    />
                  )}
                />
              </View>

              <View className="mt-5 flex-row-reverse items-center justify-start ">
                <Text
                  className={`text-center self-center font-isansdemibold text-lg ${
                    state.isUrban ? "text-primary" : "text-gray-400"
                  }`}
                >
                  شهری
                </Text>

                <SwitchInput
                  onValueChange={changeModeHandler}
                  value={state.isUrban}
                />

                <Text
                  className={`text-center self-center font-isansdemibold text-lg ${
                    !state.isUrban ? "text-primary" : "text-gray-400"
                  }`}
                >
                  روستایی
                </Text>
              </View>

              {state.isUrban ? (
                <>
                  <View className="mt-5">
                    <Controller
                      name="ruralCityID"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <SelectInput
                          placeholder={
                            state.isLoading.ruralCity ? LOADING_MESSAGE : CITY
                          }
                          disabled={state.isLoading.ruralCity}
                          options={state.options.ruralCity}
                          onValueChange={async (val) => {
                            if (val) {
                              const target = state.data.ruralCity.find(
                                (c) => c.id === val
                              );
                              setValue("province_id", target.province_id);
                              await fetchData("county", {
                                id: target.county_id,
                              });
                              setValue("countyID", target.county_id);
                            }
                            return onChange(val);
                          }}
                          primaryColor="#164194"
                          selectedValue={
                            state.options.ruralCity.find(
                              (c) => c.value === form_data?.ruralCityID
                            )?.value
                          }
                        />
                      )}
                    />
                  </View>

                  {form_data.ruralCityID && form_data.ruralCityID === 1051 && (
                    <View className="mt-5">
                      <Controller
                        name="unit"
                        control={control}
                        render={({ field: { onChange } }) => (
                          <SelectInput
                            placeholder={POST_AREA}
                            options={postAreaOptions}
                            onValueChange={(val) => onChange(val)}
                            primaryColor="#164194"
                            selectedValue={
                              postAreaOptions.find(
                                (c) => c.value === form_data?.unit
                              )?.value
                            }
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              ) : (
                <>
                  <View className="mt-5">
                    <Controller
                      name="zoneID"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <SelectInput
                          placeholder={
                            state.isLoading.zone ? LOADING_MESSAGE : ZONE
                          }
                          disabled={state.isLoading.zone}
                          options={state.options.zone}
                          onValueChange={(val) => {
                            fetchData("rurlalCity", {
                              village: "true",
                              zoneID: val,
                            });
                            return onChange(val);
                          }}
                          primaryColor="#164194"
                          selectedValue={
                            state.options.zone.find(
                              (c) => c.value === form_data?.zoneID
                            )?.value
                          }
                        />
                      )}
                    />
                  </View>

                  <View className="mt-5">
                    <Controller
                      name="ruralCityID"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <SelectInput
                          placeholder={
                            state.isLoading.ruralCity ? LOADING_MESSAGE : DEH
                          }
                          disabled={state.isLoading.ruralCity}
                          options={state.options.ruralCity}
                          onValueChange={(val) => onChange(val)}
                          primaryColor="#164194"
                          selectedValue={
                            state.options.ruralCity.find(
                              (c) => c.value === form_data?.ruralCityID
                            )?.value
                          }
                        />
                      )}
                    />
                  </View>

                  <View className="mt-5">
                    <Controller
                      name="villageID"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <SelectInput
                          placeholder={
                            state.isLoading.village ? LOADING_MESSAGE : VILLAGE
                          }
                          disabled={state.isLoading.village}
                          options={state.options.village}
                          onValueChange={(val) => onChange(val)}
                          primaryColor="#164194"
                          selectedValue={
                            state.options.village.find(
                              (c) => c.value === form_data?.zoneID
                            )?.value
                          }
                        />
                      )}
                    />
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
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
