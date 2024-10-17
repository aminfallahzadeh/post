// REACT IMPORTS
import { useState } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPORTS
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// AXIOS AND STORE
import { useUserStore } from "@/store";

// CONSTANTS
import { stepOneEopValidations } from "@/constants/validations";

// EXPO IMPORTS
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONETS
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";

// LIBRARIES
import { showMessage } from "react-native-flash-message";
import LottieView from "lottie-react-native";

// ASSETS
import { toastStyles } from "@/constants/styles";
import judgeLottie from "@/assets/animations/judge-lottie.json";
import { useEffect } from "react";

const Step1 = () => {
  // LOADINT STATE
  const [isLoading, setIsLoading] = useState(false);

  // ACCESS GLOBAL STATES
  const mobile = useUserStore((state) => state.mobile);
  const userData = useUserStore((state) => state.userData);
  const setComplaintFormData = useUserStore(
    (state) => state.setComplaintFormData
  );

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch } = useForm();

  // ACCESS HOOK FORM DATA
  const form_data = watch();

  useEffect(() => {
    console.log(form_data);
  }, [form_data]);

  // SUBMIT HANDLERS
  const onSubmit = async () => {
    const validations = stepOneEopValidations(form_data);

    for (let validation of validations) {
      if (validation.check) {
        showMessage({
          message: validation.message,
          type: "danger",
          titleStyle: toastStyles,
        });
        return;
      }
    }
    setIsLoading(true);
    await setComplaintFormData(form_data);
    setIsLoading(false);
    router.push("/forms/new-complaint/step2");
  };

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 90,
              minHeight: "100%",
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
                  ثبت شکایت
                </Text>
              </View>

              <View className="flex-col px-10 w-full pb-2">
                <ProgressBar progress={50} />
              </View>
            </View>

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-4">
                <LottieView
                  source={judgeLottie}
                  autoPlay
                  loop
                  className="w-full h-[100px] mt-[50px]"
                />

                <FormField
                  placeholder="شماره موبایل :"
                  keyboardType="default"
                  type={"text"}
                  editable={false}
                  value={mobile || "-"}
                  style={{ color: "#666666" }}
                  containerStyle="mt-5"
                  control={control}
                  name="mobile"
                />

                <FormField
                  placeholder="نام :"
                  keyboardType="default"
                  containerStyle="mt-5"
                  type={"text"}
                  value={userData?.name || "-"}
                  editable={false}
                  style={{ color: "#666666" }}
                  control={control}
                  name="name"
                />

                <FormField
                  placeholder="نام خانوادگی :"
                  keyboardType="default"
                  containerStyle="mt-5"
                  type={"text"}
                  control={control}
                  editable={false}
                  style={{ color: "#666666" }}
                  value={userData?.lastName || "-"}
                  name="lastname"
                />

                <FormField
                  placeholder="کد ملی :"
                  keyboardType="default"
                  type={"text"}
                  control={control}
                  containerStyle="mt-5"
                  editable={false}
                  style={{ color: "#666666" }}
                  value={userData?.nationalCode || "-"}
                  name="nationalCode"
                />

                <FormField
                  placeholder="عنوان شکایت :"
                  keyboardType="text"
                  type={"text"}
                  height={"h-[100px]"}
                  containerStyle="mt-5"
                  max={800}
                  multiline
                  inputStyle={{
                    textAlignVertical: "top",
                    textAlign: "right",
                    paddingTop: 10,
                  }}
                  control={control}
                  name="title"
                />
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          {/* BOTTOM SECTION */}

          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
            <CustomButton
              title="ادامه"
              handlePress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Step1;

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
