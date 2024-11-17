// IMPORTS
import { useState, useEffect, useCallback } from "react";
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
import { getProvince, getCounty, getZone } from "@/api/gnaf";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";
import SelectInput from "@/components/SelectInput";
import SwitchInput from "@/components/SwitchInput";
import { optionsGenerator } from "@/helpers/selectHelper";
import { PROVINCE, COUNTY, ZONE } from "@/constants/consts";
import { LOADING_MESSAGE } from "@/constants/messages";

const Index = () => {
  // STATES
  const [isUrban, setIsUrban] = useState(true);
  const [isProvinceLoading, setIsProvinceLoading] = useState(false);
  const [isCountyLoading, setIsCountyLoading] = useState(false);
  const [isZoneLoading, setIsZoneLoading] = useState(false);

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [countyOptions, setCountyOptions] = useState([]);
  const [zoneOptions, setZoneOptions] = useState([]);

  // CONSTS
  const { control, handleSubmit, watch, setValue } = useForm();
  const form_data = watch();

  // HANDLERS
  const changeModeHandler = () => {
    setIsUrban((prev) => !prev);
  };

  // FETCH FUNCTIONS
  const fetchProvince = useCallback(async () => {
    setIsProvinceLoading(true);
    const response = await getProvince();
    const data = JSON.parse(response.data.noneobject).value;
    setProvinceOptions(optionsGenerator(data, "id", "name"));
    setIsProvinceLoading(false);
  }, []);

  const fetchCounties = useCallback(async () => {
    setIsCountyLoading(true);
    const response = await getCounty({ provinceID: form_data.provinceID });
    const data = JSON.parse(response.data.noneobject).value;
    setCountyOptions(optionsGenerator(data, "id", "name"));
    setIsCountyLoading(false);
  }, [form_data.provinceID]);

  const fetchZones = useCallback(async () => {
    setIsZoneLoading(true);
    const response = await getZone({
      provinceID: form_data.provinceID,
      countyID: form_data.countyID,
    });
    const data = JSON.parse(response.data.noneobject).value;
    setZoneOptions(optionsGenerator(data, "id", "name"));
    setIsZoneLoading(false);
  }, [form_data.provinceID, form_data.countyID]);

  // GET DATA
  useEffect(() => {
    fetchProvince();
  }, [fetchProvince]);

  useEffect(() => {
    if (form_data.provinceID) {
      fetchCounties();
    }
  }, [fetchCounties, form_data.provinceID]);

  useEffect(() => {
    if (form_data.countyID) {
      fetchZones();
    }
  }, [fetchZones, form_data.countyID]);

  // DEBUGGING
  useEffect(() => {
    console.log("FORMDATA:", form_data);
  }, [form_data]);

  const onSubmit = () => {};

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
              <ProgressBar progress={33} />
            </View>
          </View>

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <View className="mt-5">
                <Controller
                  name="provinceID"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder={
                        isProvinceLoading ? LOADING_MESSAGE : PROVINCE
                      }
                      disabled={isProvinceLoading}
                      options={provinceOptions}
                      onValueChange={(val) => {
                        setValue("countyID", null);
                        setValue("zoneID", null);
                        return onChange(val);
                      }}
                      primaryColor="#164194"
                      selectedValue={
                        provinceOptions.find(
                          (c) => c.value === form_data?.provinceID
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
                      placeholder={isCountyLoading ? LOADING_MESSAGE : COUNTY}
                      disabled={isCountyLoading || !form_data.provinceID}
                      options={countyOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        countyOptions.find(
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
                    isUrban ? "text-primary" : "text-gray-400"
                  }`}
                >
                  شهری
                </Text>

                <SwitchInput
                  onValueChange={changeModeHandler}
                  value={isUrban}
                />

                <Text
                  className={`text-center self-center font-isansdemibold text-lg ${
                    !isUrban ? "text-primary" : "text-gray-400"
                  }`}
                >
                  روستایی
                </Text>
              </View>

              {isUrban && (
                <View className="mt-5">
                  <Controller
                    name="zoneID"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <SelectInput
                        placeholder={isZoneLoading ? LOADING_MESSAGE : ZONE}
                        disabled={isZoneLoading || !form_data.countyID}
                        options={zoneOptions}
                        onValueChange={(val) => onChange(val)}
                        primaryColor="#164194"
                        selectedValue={
                          zoneOptions.find((c) => c.value === form_data?.zoneID)
                            ?.value
                        }
                      />
                    )}
                  />

                  {/* {
                    form_data.
                  } */}
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="ادامه"
            handlePress={handleSubmit(onSubmit)}
            isLoading={isProvinceLoading || isCountyLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;

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
  postalCodeContaiers: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    minHeight: 100,
  },
  postalCodesItemContainer: {
    gap: 10,
  },
});
