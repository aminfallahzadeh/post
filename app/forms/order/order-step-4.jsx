// IMPORTS
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, ScrollView } from "react-native";
import { useUserStore } from "@/store";
import Background from "@/components/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import RadioButtons from "@/components/RadioButtons";
import { specialServiceOptions } from "@/data/specialServiceOptions";
import { Title } from "@/components/Title";

const NerkhnameStep4 = () => {
  // CONSTS
  const order = useUserStore((state) => state.order);
  const setOrder = useUserStore((state) => state.setOrder);
  const { watch, handleSubmit, control } = useForm({
    defaultValues: {
      ...order.sender,
    },
  });
  const form_data = watch();

  // HANDLERS
  const onSubmit = () => {
    const data = { ...order, ...form_data };
    setOrder(data);
    router.push(`/forms/order/order-step-5`);
    console.log("FORM DATA: ", form_data);
  };

  // DEBUG
  useEffect(() => {
    console.log("NERKHNAME Step 4: ", order);
    console.log("FORM DATA: ", form_data);
  }, [order, form_data]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          stickyHeaderIndices={[0]}
        >
          {/* HEADER SECTION */}
          <Title
            title={`${order?.servicetype?.label} : خدمات ویژه`}
            progress={80}
          />

          {/* FORM FIELDS */}

          <View className="w-full px-5 mt-10">
            <Controller
              name="specialServices"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioButtons
                  options={specialServiceOptions}
                  title="نوع خدمات ویژه"
                  onChange={onChange}
                  value={value}
                  isMulti={true}
                  textSize="text-sm"
                  itemsContainerStyle={
                    "flex-row-reverse w-full flex-wrap justify-between items-center gap-y-3"
                  }
                />
              )}
            />
          </View>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton title="ادامه" handlePress={handleSubmit(onSubmit)} />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default NerkhnameStep4;
