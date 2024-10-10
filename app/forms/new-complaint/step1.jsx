// REACT IMPORTS
import { useState } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPORTS
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// AXIOS AND STORE
import { useUserStore } from "@/store";

// EXPO IMPORTS
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONETS
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import ProgressBar from "@/components/ProgressBar";

// LIBRARIES
import Dropdown from "react-native-input-select";

// DATA
import { complaintTypeLookup } from "../../data/lookup.js";

const Step1 = () => {
  // MAIN STATE
  const [complaintType, setComplaintType] = useState(null);

  // ACCESS GLOBAL STATES
  const mobile = useUserStore((state) => state.mobile);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch } = useForm();

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between items-center min-h-full">
      {/* TOP SECTION */}

      <View className="flex-col pt-10 w-full">
        <Text className="text-primary font-isansbold text-center text-[20px]">
          ثبت شکایت
        </Text>

        <ProgressBar progress={33} style={"mt-4"} />
      </View>

      {/* FORM FIELDS */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col gap-3 w-full">
          <View className="mb-2">
            <FormField
              title="شماره موبایل :"
              keyboardType="text"
              type={"text"}
              height={"h-10"}
              editable={false}
              value={mobile}
              style={{ color: "#666666" }}
              control={control}
              name="mobile"
            />
          </View>

          <View className="mb-2">
            <FormField
              title="عنوان شکایت :"
              keyboardType="text"
              type={"text"}
              height={"h-[150px]"}
              max={800}
              multiline
              inputStyle={{
                textAlignVertical: "top",
                textAlign: "right",
              }}
              control={control}
              name="onvan"
            />
          </View>

          <View>
            <Dropdown
              label="نوع شکایت"
              placeholder="انتخاب کنید"
              options={complaintTypeLookup}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 14,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
                paddingTop: 5,
              }}
              selectedValue={complaintType}
              onValueChange={(value) => setComplaintType(value)}
              primaryColor={"blue"}
              placeholderStyle={{
                color: "grey",
                fontFamily: "IranSans-DemiBold",
              }}
              dropdownContainerStyle={{
                direction: "rtl",
                borderColor: "#fcd900",
                fontFamily: "IranSans-DemiBold",
              }}
              dropdownStyle={{
                borderColor: "#fcd900",
                fontFamily: "IranSans-DemiBold",
              }}
              selectedItemStyle={{
                color: "black",
                fontFamily: "IranSans-Regular",
              }}
              modalControls={{
                modalOptionsContainerStyle: {
                  direction: "rtl",
                },
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      {/* BOTTOM SECTION */}

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
            handlePress={() => router.push("forms/new-complaint/step2")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step1;
