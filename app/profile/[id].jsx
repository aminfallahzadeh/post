// REACT IMPROTS
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// NATIVE
import { View, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO
import { useLocalSearchParams, router } from "expo-router";
import { Feather } from "@expo/vector-icons";

// STORE
import { useUserStore } from "@/store";

// AXIOS
import { customerProfile } from "@/api/customer";

// LIBRARIES
import { showMessage } from "react-native-flash-message";

// COMPONENTS
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

// HOOKS
import useGetUserData from "@/hooks/useGetUserData";

const UserProfile = () => {
  const { id } = useLocalSearchParams(id);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // GLOBAL STATES
  const mobile = useUserStore((state) => state.mobile);
  const userData = useUserStore((state) => state.userData);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch, setValue, reset } = useForm();

  // ACCESS HOOK FORM DATA
  const form_data = watch();

  // ACCES HOOK FUNCTIONS
  const { fetchCustomerData, isLoading: userDataLoading } =
    useGetUserData(mobile);

  // FILL FORM BASED ON USER CURRENT DATA
  useEffect(() => {
    console.log(userData);
    const [year, month, day] = userData.birthDate.split("/");
    if (userData) {
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
        setValue("day", day);
        setValue("year", year);
        setValue("month", month);
      });
    }
  }, [setValue, userData]);

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const birthDate =
        form_data.year + "/" + form_data.month + "/" + form_data.day;

      const response = await customerProfile({
        id,
        name: form_data.name,
        lastName: form_data.lastName,
        birthDate,
        nationalCode: form_data.nationalCode,
        mobile,
      });

      await fetchCustomerData(mobile);
      reset();

      console.log("Customer profile response", response);
      showMessage({
        message: `\n ${response.data.message}`,
        type: "success",
        titleStyle: {
          fontFamily: "IranSans-DemiBold",
          fontSize: 16,
          textAlign: "center",
        },
      });
      router.replace("/services");
    } catch (error) {
      console.log("Customer profile error: ", error);
      showMessage({
        message: `\n ${error.response.data.message}` || `\n ${error.message}`,
        type: "danger",
        titleStyle: {
          fontFamily: "IranSans-DemiBold",
          fontSize: 16,
          textAlign: "center",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between min-h-full gap-y-10">
      <View className="flex-col w-full bg-secondary mt-5">
        <Text className="text-primary font-isansbold text-center text-[20px] py-2">
          پروفایل کاربر
        </Text>
      </View>

      {/* FORM FIELDS */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col gap-3 w-full mt-5">
          <View className="flex-row-reverse justify-between items-center">
            <View className="flex-1 ml-2">
              <FormField
                title="نام :"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
                control={control}
                name="name"
              />
            </View>

            <View className="flex-1 mr-2">
              <FormField
                title="نام خانوادگی:"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
                control={control}
                name="lastName"
              />
            </View>
          </View>

          <View className="flex-row-reverse justify-between items-center">
            <View className="flex-1">
              <FormField
                title="کد ملی :"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
                control={control}
                name="nationalCode"
              />
            </View>
          </View>

          <View>
            <Text className="text-base text-gray2 font-isansmedium">
              تاریخ تولد :
            </Text>
          </View>

          <View className="flex-row-reverse justify-between items-center">
            <View className="flex-1 ml-2">
              <FormField
                title="روز :"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
                max={2}
                control={control}
                name="day"
              />
            </View>

            <View className="flex-1 mr-2 ml-2">
              <FormField
                title="ماه :"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
                max={2}
                control={control}
                name="month"
              />
            </View>

            <View className="flex-1 mr-2">
              <FormField
                title="سال :"
                keyboardType="default"
                type={"text"}
                height={"h-10"}
                max={4}
                control={control}
                name="year"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* BOTTOM SECTION */}
      <View className="flex-row justify-between items-center w-full pb-10">
        <View className="flex-1 mr-2">
          <CustomButton
            title={<Feather name="arrow-left" size={24} color="black" />}
            handlePress={() => router.back()}
            isLoading={isLoading || userDataLoading}
          />
        </View>
        <View className="flex-1 ml-2">
          <CustomButton
            title="ذخیره"
            handlePress={handleSubmit(onSubmit)}
            titleColor={"text-white"}
            bgColor={"bg-green-600"}
            isLoading={isLoading || userDataLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
