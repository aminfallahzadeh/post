// IMPORTS
import { useForm, Controller } from "react-hook-form";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import Background from "@/components/Background";
import RadioButtons from "@/components/RadioButtons";
import { serviceOptions } from "@/data/serviceOptions";
import { useUserStore } from "@/store";
import { Title } from "@/components/Title";

const Index = () => {
  // CONSTS
  const setOrder = useUserStore((state) => state.setOrder);
  const order = useUserStore((state) => state.order);
  const { watch, handleSubmit, control } = useForm();
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    setOrder({ ...order, ...form_data });
    router.push(`/forms/order/order-step-1`);
  };

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
          <Title progress={16} title="نوع سرویس" home={false} />

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
