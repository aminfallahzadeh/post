// IMPORTS
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useUserStore } from "@/store";
import { customerProfile } from "@/api/customer";
import { showMessage } from "react-native-flash-message";
import LottieView from "lottie-react-native";
import Dropdown from "react-native-input-select";
import { days, months, years } from "@/data/lookup";
import userLottie from "@/assets/animations/user-lottie.json";
import { toastConfig } from "@/config/toast-config";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import useGetUserData from "@/hooks/useGetUserData";
import { userDataValidations } from "@/constants/validations";
import * as SecureStore from "expo-secure-store";

// ASSETS
import { toastStyles } from "@/constants/styles";
import {
  selectPlaceholderStyle,
  selectContainerStyle,
  selectDropdownStyle,
  selectItemStyle,
  modalControls,
  checkboxControls,
} from "@/constants/styles";

const UserProfile = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const { id } = useLocalSearchParams();
  const mobile = SecureStore.getItem("mobile");
  const userData = useUserStore((state) => state.userData);
  const { control, handleSubmit, watch, setValue, reset } = useForm();
  const form_data = watch();

  // ACCESS HOOK FUNCTIONS
  const { fetchCustomerData, isLoading: userDataLoading } =
    useGetUserData(mobile);

  // FILL FORM BASED ON USER CURRENT DATA
  useEffect(() => {
    if (userData && userData.birthDate) {
      const [year, month, day] = userData?.birthDate?.split("/");
      Object.keys(userData).forEach((key) => {
        setValue(key, userData[key]);
        setValue("day", day);
        setValue("year", year);
        setValue("month", month);
      });
    }
  }, [setValue, userData]);

  const onSubmit = async () => {
    const validations = userDataValidations(form_data);

    for (let validation of validations) {
      if (validation.check) {
        showMessage({
          message: validation.message,
          type: "warning",
          titleStyle: toastStyles,
        });
        return;
      }
    }

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
      toastConfig.success(response.data.message);
      router.replace("/services");
    } finally {
      setIsLoading(false);
    }
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
                پروفایل کاربر
              </Text>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-4 pt-5">
              <LottieView
                source={userLottie}
                autoPlay
                loop
                className="w-full h-[150px] mt-[50px]"
              />

              <FormField
                placeholder="نام"
                keyboardType="default"
                type={"text"}
                control={control}
                containerStyle="mt-5"
                name="name"
              />

              <FormField
                placeholder="نام خانوادگی"
                keyboardType="default"
                type={"text"}
                control={control}
                containerStyle="mt-5"
                name="lastName"
              />
              <FormField
                placeholder="کد ملی"
                keyboardType="numeric"
                type={"text"}
                control={control}
                containerStyle="mt-5"
                name="nationalCode"
              />

              <View className="mt-5">
                <Text className="text-base text-gray2 font-isansmedium w-full text-right px-2">
                  تاریخ تولد :
                </Text>
              </View>

              <View className="flex-row-reverse justify-between items-center mt-5">
                <View className="flex-1 ml-2">
                  <Controller
                    name="day"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Dropdown
                        placeholder="روز"
                        options={days}
                        selectedValue={
                          days.find((c) => c.value === form_data?.day)?.value
                        }
                        onValueChange={(val) => onChange(val)}
                        primaryColor={"#164194"}
                        placeholderStyle={selectPlaceholderStyle}
                        dropdownContainerStyle={selectContainerStyle}
                        dropdownStyle={selectDropdownStyle}
                        selectedItemStyle={selectItemStyle}
                        checkboxControls={checkboxControls}
                        modalControls={modalControls}
                        dropdownIconStyle={{ right: 10, top: 28 }}
                      />
                    )}
                  />
                </View>

                <View className="flex-1 mr-2 ml-2">
                  <Controller
                    name="month"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Dropdown
                        placeholder="ماه"
                        options={months}
                        selectedValue={
                          months.find((c) => c.value === form_data?.month)
                            ?.value
                        }
                        onValueChange={(val) => onChange(val)}
                        primaryColor={"#164194"}
                        placeholderStyle={selectPlaceholderStyle}
                        dropdownContainerStyle={selectContainerStyle}
                        dropdownStyle={selectDropdownStyle}
                        selectedItemStyle={selectItemStyle}
                        checkboxControls={checkboxControls}
                        modalControls={modalControls}
                        dropdownIconStyle={{ right: 10, top: 28 }}
                      />
                    )}
                  />
                </View>

                <View className="flex-1 mr-2">
                  <Controller
                    name="year"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Dropdown
                        placeholder="سال"
                        options={years}
                        selectedValue={
                          years.find((c) => c.value === form_data?.year)?.value
                        }
                        onValueChange={(val) => onChange(val)}
                        primaryColor={"#164194"}
                        placeholderStyle={selectPlaceholderStyle}
                        dropdownContainerStyle={selectContainerStyle}
                        dropdownStyle={selectDropdownStyle}
                        selectedItemStyle={selectItemStyle}
                        checkboxControls={checkboxControls}
                        modalControls={modalControls}
                        dropdownIconStyle={{ right: 10, top: 28 }}
                      />
                    )}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}

        <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="ذخیره"
            handlePress={handleSubmit(onSubmit)}
            titleColor={"text-white"}
            bgColor={"bg-green-600"}
            isLoading={isLoading || userDataLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
});
