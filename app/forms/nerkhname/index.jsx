// IMPORTS
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Background from "@/components/Background";
import ProgressBar from "@/components/ProgressBar";
import Feather from "@expo/vector-icons/Feather";
import RadioButtons from "@/components/RadioButtons";
import { serviceOptions } from "@/data/serviceOptions";
import { useUserStore } from "@/store";

const Index = () => {
  // CONSTS
  const setNerkhname = useUserStore((state) => state.setNerkhname);
  const { watch, handleSubmit, control } = useForm();
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    setNerkhname(form_data);
    router.push(`/forms/nerkhname/nerkhname-step-1`);
  };

  // DEBUG
  useEffect(() => {
    console.log("FORM DATA: ", form_data);
  }, [form_data]);

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
              <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
                نوع سرویس
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={15} />
            </View>
          </View>

          {/* FORM FIELDS */}

          <View className="w-full px-5 mt-10">
            <Controller
              name="servicetype"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioButtons
                  options={serviceOptions}
                  onChange={onChange}
                  value={value}
                  itemsContainerStyle={
                    "flex-col w-full gap-y-5 items-center justify-center"
                  }
                />
              )}
            />
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="ادامه"
            disabled={!form_data.servicetype}
            handlePress={handleSubmit(onSubmit)}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;

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
