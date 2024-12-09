// IMPORTS
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { Title } from "@/components/Title";

const NerkhnameStep3 = () => {
  // CONSTS
  const nerkhname = useUserStore((state) => state.nerkhname);
  const setNerkhname = useUserStore((state) => state.setNerkhname);
  const { watch, handleSubmit, control } = useForm();
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    const data = { ...nerkhname, receiver: { ...form_data } };
    setNerkhname(data);
    router.push(`/forms/nerkhname/nerkhname-step-4`);
    console.log("FORM DATA: ", form_data);
  };

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 3: ", nerkhname);
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
          <Title
            title={`${nerkhname?.servicetype?.label} : اطلاعات گیرنده`}
            progress={60}
          />

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <FormField
                placeholder="نام"
                type={"text"}
                keyboardType="default"
                containerStyle="mt-10"
                control={control}
                name="name"
              />

              <FormField
                placeholder="نام خانوادگی"
                type={"text"}
                keyboardType="default"
                containerStyle="mt-5"
                control={control}
                name="lastName"
              />

              <FormField
                placeholder="تلفن همراه"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                name="mobile"
              />

              <FormField
                placeholder="تلفن ثابت"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                name="phone"
              />

              <FormField
                placeholder="کد ملی"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                name="nationalCode"
              />

              <FormField
                placeholder="کد پستی"
                type={"text"}
                keyboardType="numeric"
                containerStyle="mt-5"
                control={control}
                name="postalCode"
              />

              <FormField
                placeholder="شهر"
                type={"text"}
                keyboardType="default"
                containerStyle="mt-5"
                control={control}
                name="city"
              />

              <FormField
                placeholder="آدرس"
                type={"text"}
                multiline={true}
                keyboardType="default"
                containerStyle="mt-5"
                height="h-32 align-top"
                inputStyle={{
                  textAlignVertical: "top",
                  textAlign: "right",
                  paddingTop: 20,
                }}
                control={control}
                name="address"
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton title="ادامه" handlePress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhnameStep3;

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
