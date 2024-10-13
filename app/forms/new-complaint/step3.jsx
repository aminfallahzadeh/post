// REACT IMPORTS
import { useState } from "react";
import { useForm } from "react-hook-form";

// NATIVE IMPROTS
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONETNS
import ProgressBar from "@/components/ProgressBar";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";

// LIBRARIES
import Dropdown from "react-native-input-select";

// EXPO IMPORTS
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// DATA
import { seriveTypeLookup, postalReagionLookup } from "@/data/lookup.js";

const Step3 = () => {
  const [serviceType, setServiceType] = useState(null);
  const [postalReagion, setPostalReagion] = useState(null);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch } = useForm();

  return (
    <SafeAreaView className="bg-grey1 h-full px-3 justify-between items-center min-h-full">
      {/* TOP SECTION */}
      <View className="flex-col pt-10 w-full">
        <Text className="text-primary font-isansbold text-center text-[20px]">
          ثبت شکایت
        </Text>

        <ProgressBar progress={100} style={"mt-4"} />
      </View>
      {/* FORM FIELDS */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-col gap-3 w-full">
          <View className="mb-2">
            <FormField
              title="شماره سریال بسته پستی :"
              keyboardType="text"
              type={"text"}
              control={control}
              name="serial"
            />
          </View>
          <View>
            <Dropdown
              label={<Text>نوع سرویس :</Text>}
              placeholder="انتخاب کنید"
              options={seriveTypeLookup}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 14,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
              }}
              selectedValue={serviceType}
              onValueChange={(value) => setServiceType(value)}
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

          <View>
            <Dropdown
              label={<Text>واحد پستی :</Text>}
              placeholder="انتخاب کنید"
              options={postalReagionLookup}
              labelStyle={{
                fontFamily: "IranSans-DemiBold",
                color: "black",
                fontSize: 14,
                alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
                textAlign: "right",
                marginBottom: 7,
              }}
              selectedValue={postalReagion}
              onValueChange={(value) => setPostalReagion(value)}
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
            title="ثبت"
            handlePress={() => {}}
            titleColor={"text-white"}
            bgColor={"bg-green-600"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step3;
