// IMPORTS
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { insertRequestCertification } from "@/api/request";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Background from "@/components/Background";
import AddressCard from "@/components/AddressCard";
import CustomButton from "@/components/CustomButton";
import { postalCodeListValidation } from "@/constants/validations";
import { SELECT_ALL } from "@/constants/consts";
import { toastConfig } from "@/config/toast-config";
import * as SecureStore from "expo-secure-store";
import { Title } from "@/components/Title";

const CertificateStep2 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const addressByPostCode = useUserStore((state) => state.addressByPostCode);
  const mobile = SecureStore.getItem("mobile");
  const setFactor = useUserStore((state) => state.setFactor);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  // HANDLERS
  const handleSelect = (postcode) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(postcode)
        ? prevSelectedItems.filter((item) => item !== postcode)
        : [...prevSelectedItems, postcode]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === addressByPostCode.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(addressByPostCode.map((item) => item.postcode));
    }
  };

  // SELECT ALL EFFECT
  useEffect(() => {
    if (selectedItems?.length === addressByPostCode?.length) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [selectedItems?.length, addressByPostCode?.length]);

  // HANDLE SUBMIT
  const onSubmit = async () => {
    const validations = postalCodeListValidation(selectedItems);
    for (let validation of validations) {
      if (validation.check) {
        toastConfig.warning(validation.message);
        return;
      }
    }

    setIsLoading(true);
    try {
      const title = selectedItems.join(",");
      const response = await insertRequestCertification({
        mobile,
        title,
        counter: selectedItems.length,
      });
      setFactor(response.data.itemList[0]);
      router.push("forms/postalcode-certificate/certificate-step-2");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <SafeAreaView className="h-full">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View className="flex-1">
            {/* HEADER SECTION */}
            <Title title={"گواهی کد پستی"} progress={66} home={true} />

            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 90,
              }}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              //   stickyHeaderIndices={[0]}
            >
              <TouchableOpacity
                onPress={handleSelectAll}
                className="mt-5 flex-row-reverse justify-center items-center self-end px-2 rounded-md mr-5"
              >
                {isSelectedAll ? (
                  <Feather name="check-circle" size={24} color="black" />
                ) : (
                  <Feather name="circle" size={24} color="black" />
                )}

                <Text className="text-grey2 text-[15px] font-isansbold mr-2">
                  {SELECT_ALL}
                </Text>
              </TouchableOpacity>

              {/* RESULT LIST */}
              <View className="w-full px-5">
                {addressByPostCode.map((item, index) => (
                  <View key={index} className="mt-5">
                    <AddressCard
                      item={item}
                      isSelected={selectedItems.includes(item.postcode)}
                      onSelect={() => handleSelect(item.postcode)}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* BOTTOM SECTION */}
            <View className="w-full absolute bottom-0 z-10 px-4 bg-gray-100 py-4">
              <CustomButton
                title="ادامه"
                handlePress={onSubmit}
                isLoading={isLoading}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Background>
  );
};

export default CertificateStep2;
