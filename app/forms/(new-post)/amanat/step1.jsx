// REACT IMPORTS
import { useState } from "react";

// NATIVE IMPORTS
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// EXPO IMPORTS
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

// COMPONENTS
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";

// LIBRARIES
import Dropdown from "react-native-input-select";

const Step1 = () => {
  const [packageType, setPackageType] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState(0);
  const [packageNumber, setPackageNumber] = useState(0);

  const packageTypeOptions = [
    { id: 1, label: "قابل تفکیک", disabled: false, type: "tafkik" },
    { id: 2, label: "غیر قابل تفکیک", disabled: false, type: "notafkik" },
  ];

  return (
    <SafeAreaView className="bg-grey1 h-full px-5 justify-center items-center gap-y-6">
      <View className="flex-row items-center w-[350px] h-[5px] bg-grey5 rounded relative">
        <View className="absolute top-0 left-0 w-[30%] h-full bg-primary rounded"></View>
      </View>

      <Text className="text-primary font-isansbold text-center text-[20px]">
        اطلاعات مرسوله
      </Text>

      <View className="flex-col gap-3 w-full">
        <View className="flex-row justify-between items-center">
          <View className="w-[150px]">
            <FormField
              title="وزن مرسوله :"
              keyboardType="email-address"
              type={"text"}
              handleChange={setWeight}
              value={weight}
              max={3}
            />
          </View>
          <View className="w-[150px]">
            <FormField
              title="تعداد مرسولات :"
              keyboardType="email-address"
              type={"text"}
              handleChange={setPackageNumber}
              value={packageNumber}
              max={3}
            />
          </View>
        </View>

        <View>
          <Dropdown
            label={<Text>نوع بسته بندی :</Text>}
            placeholder="انتخاب کنید"
            options={[
              { label: "کارتن", value: "karton" },
              { label: "پاکت پلاستیکی", value: "plastic" },
              { label: "پاکت حبابدار", value: "bubilon" },
              { label: "سفارشی", value: "vijhe" },
            ]}
            labelStyle={{
              fontFamily: "IranSans-DemiBold",
              color: "black",
              fontSize: 14,
              alignSelf: Platform.OS === "ios" ? "flex-start" : "flex-end",
              textAlign: "right",
              marginBottom: 7,
            }}
            selectedValue={packageType}
            onValueChange={(value) => setPackageType(value)}
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
          <Text className="text-base font-isansdemibold text-center">
            نوع بسته :
          </Text>

          <View className="flex-row gap-3 w-full justify-center mt-3">
            {packageTypeOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedType(option)}
                style={[
                  styles.select,
                  selectedType?.id === option.id && styles.selected,
                  option.disabled && styles.disabled,
                ]}
              >
                <Text
                  className={`text-center font-isansdemibold text-[16px] ${
                    option.disabled ? "text-gray-400" : ""
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View className="flex-col gap-3 w-full items-center justify-center">
        <View className="w-full">
          <CustomButton
            title="ادامه"
            // isLoading={
            //   !weight || !packageType || !packageNumber || !selectedType
            // }
            handlePress={() => router.push("forms/amanat/step2")}
          />
        </View>

        <View className="w-full">
          <CustomButton
            title={<Feather name="arrow-left" size={24} color="black" />}
            handlePress={() => router.back()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Step1;

const styles = StyleSheet.create({
  select: {
    borderWidth: 1,
    borderColor: "#fcd900",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    width: 150,
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#fcd900",
    borderColor: "#000",
  },
  disabled: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
  },
});
