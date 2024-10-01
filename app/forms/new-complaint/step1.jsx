// REACT IMPORTS
import { useState } from "react";

// NATIVE IMPORTS
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
            />
          </View>

          <View>
            <Dropdown
              label={<Text>نوع شکایت :</Text>}
              placeholder="انتخاب کنید"
              options={complaintTypeLookup}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 14,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
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
