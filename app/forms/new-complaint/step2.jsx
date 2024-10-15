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
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONETNS
import ProgressBar from "@/components/ProgressBar";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";

// LIBRARIES
import Dropdown from "react-native-input-select";

// CONTSTANTS
import {
  selectPlaceholderStyle,
  selectContainerStyle,
  selectDropdownStyle,
  selectItemStyle,
  modalControls,
  checkboxControls,
} from "@/constants/styles";

// EXPO IMPORTS
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// DATA
import {
  seriveTypeLookup,
  postalReagionLookup,
  complaintTypeLookup,
} from "@/data/lookup.js";

const Step2 = () => {
  const [complaintType, setComplaintType] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [postalReagion, setPostalReagion] = useState(null);

  // ACCESS HOOK FORM METHODS
  const { control, handleSubmit, watch } = useForm();

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
                <ProgressBar progress={100} />
              </View>
            </View>

            {/* FORM FIELDS */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className="w-full px-4">
                <FormField
                  placeholder="شماره سریال بسته پستی :"
                  keyboardType="default"
                  type={"text"}
                  control={control}
                  containerStyle="mt-5"
                  name="serialNo"
                />
                <View className="mt-5">
                  <Dropdown
                    placeholder="نوع شکایت"
                    options={complaintTypeLookup}
                    selectedValue={complaintType}
                    onValueChange={(value) => setComplaintType(value)}
                    primaryColor={"#164194"}
                    placeholderStyle={selectPlaceholderStyle}
                    dropdownContainerStyle={selectContainerStyle}
                    dropdownStyle={selectDropdownStyle}
                    selectedItemStyle={selectItemStyle}
                    checkboxControls={checkboxControls}
                    modalControls={modalControls}
                  />
                </View>

                <View className="mt-5">
                  <Dropdown
                    placeholder="نوع سرویس"
                    options={seriveTypeLookup}
                    selectedValue={serviceType}
                    onValueChange={(value) => setServiceType(value)}
                    primaryColor={"#164194"}
                    placeholderStyle={selectPlaceholderStyle}
                    dropdownContainerStyle={selectContainerStyle}
                    dropdownStyle={selectDropdownStyle}
                    selectedItemStyle={selectItemStyle}
                    checkboxControls={checkboxControls}
                    modalControls={modalControls}
                  />
                </View>

                <View className="mt-5">
                  <Dropdown
                    placeholder="واحد پستی"
                    options={postalReagionLookup}
                    selectedValue={postalReagion}
                    onValueChange={(value) => setPostalReagion(value)}
                    primaryColor={"#164194"}
                    placeholderStyle={selectPlaceholderStyle}
                    dropdownContainerStyle={selectContainerStyle}
                    dropdownStyle={selectDropdownStyle}
                    selectedItemStyle={selectItemStyle}
                    checkboxControls={checkboxControls}
                    modalControls={modalControls}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>

          {/* BOTTOM SECTION */}

          <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
            <CustomButton
              title="ثبت"
              bgColor="bg-green-700"
              titleColor="text-white"
              handlePress={() => {}}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default Step2;

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
