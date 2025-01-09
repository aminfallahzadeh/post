// IMPORTS
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useUserStore } from "@/store";
import Service from "@/components/Service";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import Background from "@/components/Background";
import CustomModal from "@/components/CustomModal";
import CustomCarousel from "@/components/CustomCarousel";
import CustomButton from "@/components/CustomButton";
import { allData } from "@/data/services";
import FormField from "@/components/FormField";

const Index = () => {
  // STATES
  const [visible, setVisible] = useState(false);

  // CONSTS
  const userData = useUserStore((state) => state.userData);
  const { handleSubmit, control } = useForm();

  // DEBUG
  useEffect(() => {
    console.log("USER DATA: ", userData);
  }, [userData]);

  const onSubmit = (data) => {
    if (data.barcode) {
      router.push({
        pathname: "forms/follow",
        params: {
          barcode: data.barcode,
        },
      });
    }
  };

  return (
    <>
      <CustomModal
        visible={visible}
        closeModal={() => setVisible(false)}
        title="توجه"
        description="شماره ملی شما ثبت نشده است. لطفا از پروفایل کاربری اقدام به ثبت شماره ملی نمایید."
      />
      <Background>
        <View className="h-36">
          <CustomCarousel />
        </View>

        <View className="w-full flex-row-reverse px-4 bg-white py-4">
          <View className="w-3/4">
            <FormField
              placeholder="کد رهگیری"
              keyboardType="numeric"
              inputMode="numeric"
              control={control}
              name="barcode"
              height="h-10"
              animate={false}
            />
          </View>

          <View className="w-1/4 mr-2">
            <CustomButton
              title="جستجو"
              height="h-10"
              handlePress={handleSubmit(onSubmit)}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120,
          }}
        >
          <View
            className="flex-row flex-wrap gap-y-2 justify-start items-start px-2 mt-5"
            style={{ transform: [{ scaleX: -1 }] }}
          >
            {allData.map((item, index) => (
              <Service key={index} item={item} />
            ))}
          </View>
        </ScrollView>
      </Background>
    </>
  );
};

export default Index;
