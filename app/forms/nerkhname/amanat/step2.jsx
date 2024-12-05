// IMPORTS
import { useForm } from "react-hook-form";
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";

const Step2 = () => {
  // CONSTS
  const { control } = useForm();

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between items-center min-h-full">
      {/* Top Section */}

      <View className="pt-10 gap-2">
        <Text className="text-primary font-isansbold text-center text-[20px] mt-4">
          اطلاعات فرستنده
        </Text>
        <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
          <View className="absolute top-0 left-0 w-[20%] h-full bg-primary rounded"></View>
        </View>
      </View>

      {/* Form Fields */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col gap-3 w-full">
          {/* First Row */}
          <View className="flex-row justify-between mb-2">
            <View className="flex-1 mr-2">
              <FormField
                placeholder="نام خانوادگی"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="default"
                name="lastName"
              />
            </View>
            <View className="flex-1 ml-2">
              <FormField
                placeholder="نام"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="default"
                name="name"
              />
            </View>
          </View>

          {/* Second Row */}
          <View className="flex-row justify-between mb-2">
            <View className="flex-1 mr-2">
              <FormField
                placeholder="کد پستی"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="numeric"
                name="postalCode"
              />
            </View>
            <View className="flex-1 ml-2">
              <FormField
                placeholder="کد ملی"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="numeric"
                name="nationalCode"
              />
            </View>
          </View>

          {/* Third Row */}
          <View className="flex-row justify-between mb-2">
            <View className="flex-1 mr-2">
              <FormField
                placeholder="تلفن همراه"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="numeric"
                name="mobile"
              />
            </View>
            <View className="flex-1 ml-2">
              <FormField
                placeholder="تلفن ثابت"
                type={"text"}
                containerStyle="mt-5"
                control={control}
                keyboardType="numeric"
                name="phone"
              />
            </View>
          </View>

          {/* Address Field */}
          <View className="mb-2">
            <FormField
              placeholder="ادرس"
              type={"text"}
              containerStyle="mt-5"
              control={control}
              keyboardType="numeric"
              name="address"
              multiline={true}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* Buttons Section */}
      <View className="flex-row justify-between items-center w-full pb-10">
        <View className="flex-1 mr-2">
          <CustomButton
            title={<Feather name="arrow-left" size={24} color="black" />}
            handlePress={() => router.back()}
          />
        </View>
        <View className="flex-1 ml-2">
          <CustomButton
            title="ادامه"
            // isLoading={
            //   !weight || !packageType || !packageNumber || !selectedType
            // }
            handlePress={() => router.push("forms/amanat/step3")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step2;
