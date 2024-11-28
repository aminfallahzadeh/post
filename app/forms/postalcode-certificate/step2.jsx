// IMPORTS
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { insertRequestCertification } from "@/api/request";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import ProgressBar from "@/components/ProgressBar";
import Background from "@/components/Background";
import AddressCard from "@/components/AddressCard";
import CustomButton from "@/components/CustomButton";
import { postalCodeListValidation } from "@/constants/validations";
import { toastStyles } from "@/constants/styles";
import { showMessage } from "react-native-flash-message";
import { SELECT_ALL, POST_CODE_CERTIFICATE } from "@/constants/consts";

const Step2 = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const addressByPostCode = useUserStore((state) => state.addressByPostCode);
  const mobile = useUserStore((state) => state.mobile);
  const setFactor = useUserStore((state) => state.setFactor);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  // HANLDERS
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
      const title = selectedItems.join(",");
      const response = await insertRequestCertification({
        mobile,
        title,
      });
      console.log("INSERT REQUEST CERTIFICATE REPONSE: ", response.data);
      setFactor(response.data.itemList[0]);
      router.push("forms/postalcode-certificate/step3");
    } catch (error) {
      console.log("INSERT REQUEST CERTIFICATE ERROR: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
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
                {POST_CODE_CERTIFICATE}
              </Text>
            </View>

            <View className="flex-col px-10 w-full pb-2">
              <ProgressBar progress={66} />
            </View>
          </View>

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
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="تایید"
            handlePress={onSubmit}
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
