// IMPORTS
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import ProgressBar from "@/components/ProgressBar";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import SelectInput from "@/components/SelectInput";
import { insuranceOptions } from "@/data/insuranceOptions";

const NerkhnameStep5 = () => {
  // CONSTS
  const nerkhname = useUserStore((state) => state.nerkhname);
  const setNerkhname = useUserStore((state) => state.setNerkhname);
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    // const data = { ...nerkhname, receiver: { ...form_data } };
    // setNerkhname(data);
    // router.push(`/forms/nerkhname/nerkhname-step-4`);
    console.log("FORM DATA: ", form_data);
  };

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 5: ", nerkhname);
  }, [nerkhname]);

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
              <Text className="text-primary font-isansbold text-center text-[15px] py-2 mr-auto ml-auto">
                {nerkhname?.servicetype?.label} : بیمه
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={100} />
            </View>
          </View>

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <View className="mt-10 relative">
                {errors && (
                  <View className="absolute -top-5 left-0">
                    <Text className="text-red-500 font-isansregular">
                      {errors?.insurancetype?.message}
                    </Text>
                  </View>
                )}

                <Controller
                  name="insurancetype"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      placeholder="* نوع بیمه"
                      options={insuranceOptions}
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        insuranceOptions.find(
                          (c) => c.value === form_data?.insurancetype
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
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4 flex-row-reverse gap-x-2">
          <View className="w-full flex-1">
            <CustomButton
              title="ثبت سفارش"
              bgColor="bg-green-500"
              titleColor="text-white"
              handlePress={handleSubmit(onSubmit)}
            />
          </View>
          <View className="w-full flex-1">
            <CustomButton
              title="نمایش نرخنامه"
              bgColor="bg-blue-500"
              titleColor="text-white"
              handlePress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhnameStep5;

const styles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: "#fcd900",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    width: "100%",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#fcd900",
    borderColor: "#000",
  },
  disabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
  },
});
