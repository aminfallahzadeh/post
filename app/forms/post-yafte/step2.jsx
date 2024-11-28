// IMPORTS
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import SelectInput from "@/components/SelectInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { insertRequestPostYafte } from "@/api/request";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { POST_YAFTE } from "@/constants/consts";
import { postYafteValidation } from "@/constants/validations";

const Step2 = () => {
  // STATES
  const mobile = useUserStore((state) => state.mobile);
  const [isLoading, setIsLoading] = useState(false);
  const foundDocIds = useUserStore((state) => state.foundDocIds);

  // CONSTS
  const { control, handleSubmit, watch } = useForm();
  const form_data = watch();

  // TEMP
  const options = [{ label: "تهران", value: 1 }];

  // HANDLES
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await insertRequestPostYafte({
        mobile: "string",
        cityID: 0,
        address: "string",
        postCode: "string",
        docList: [
          {
            foundDocId: "string",
          },
        ],
        trackingID: "string",
        id: "string",
      });
      console.log("INSERT REQUEST POST YAFTE RESPONSE: ", response.data);
    } finally {
      setIsLoading(false);
    }
  };

  // DEBUG
  useEffect(() => {
    console.log("POST YAFTE FORM:", form_data);
    console.log("POST YAFTE FOUND DOC IDS:", foundDocIds);
  }, [form_data, foundDocIds]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
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
                {POST_YAFTE}
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={66} />
            </View>
          </View>

          {/* FORM FIELDS */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full px-5">
              <FormField
                placeholder="تلفن همراه"
                editable={false}
                type={"text"}
                containerStyle="mt-10"
                control={control}
                value={mobile || " "}
                name="mobile"
              />

              <FormField
                placeholder="آدرس"
                multiline={true}
                keyboardType="default"
                type={"text"}
                containerStyle="mt-5"
                rules={postYafteValidation.address}
                height={"h-40"}
                inputStyle={{
                  textAlignVertical: "top",
                }}
                control={control}
                name="address"
              />

              <FormField
                placeholder="کد پستی"
                keyboardType="numeric"
                type={"text"}
                rules={postYafteValidation.postCode}
                containerStyle="mt-5"
                control={control}
                name="postCode"
              />

              <View className="mt-5">
                <Controller
                  name="state_id"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      onValueChange={(val) => onChange(val)}
                      options={options}
                      primaryColor="#164194"
                      placeholder="استان"
                      selectedValue={
                        options.find((c) => c.value === form_data?.state_id)
                          ?.value
                      }
                    />
                  )}
                />
              </View>

              <View className="mt-5">
                <Controller
                  name="city_id"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <SelectInput
                      onValueChange={(val) => onChange(val)}
                      primaryColor="#164194"
                      selectedValue={
                        options.find((c) => c.value === form_data?.city_id)
                          ?.value
                      }
                      options={options}
                      placeholder="شهر"
                    />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="درخواست ارسال"
            bgColor="bg-green-700"
            titleColor="text-white"
            handlePress={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Step2;

const styles = StyleSheet.create({
  inputContainer: {
    columnGap: 10,
  },
  headerContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  disabledPlus: {
    color: "gray",
  },
  postalCodeContaiers: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    minHeight: 100,
  },
  postalCodesItemContainer: {
    gap: 10,
  },
});
