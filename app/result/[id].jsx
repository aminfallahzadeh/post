// REACT IMPORTS
import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// AXIOS
import { generateCertificate } from "@/api/gnaf";

// EXPO
import { router, useLocalSearchParams } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// COMPONENTS
import { Background, CustomButton } from "@/components";
import { DownloadPDF } from "@/components";

// ASSETS
import { toastStyles } from "@/constants/styles";

// LIBRARIES
import { Chase } from "react-native-animated-spinkit";
import { showMessage } from "react-native-flash-message";

const PaymentResult = () => {
  const { id, success } = useLocalSearchParams();

  // STATES
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // SET STATUS
  useEffect(() => {
    if (success === "1") {
      setIsSuccess(true);
    }
  }, [success]);

  // HANDLERS
  const handleGenerateCertificate = useCallback(async () => {
    setIsLoading(true);
    console.log("DETECTED");
    try {
      const response = await generateCertificate(id);
      console.log("GENERATE CERTIFICATE RESPONSE: ", response.data.itemList);
      setData(response.data.itemList[0].data);
    } catch (error) {
      console.log("GENERATE CERTIFICATE ERROR: ", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // CHECK STATUS LOGIC
  useEffect(() => {
    if (isSuccess) {
      handleGenerateCertificate();
    }
  }, [isSuccess, handleGenerateCertificate]);

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
              <Text className="text-primary font-isansbold text-center text-[20px] py-2 mr-auto ml-auto">
                نتیجه پرداخت
              </Text>
            </View>
          </View>

          {/* RESULT */}
          <View className="w-full px-5">
            <View
              className={
                "w-full rounded-md mt-20 p-5 items-center justify-center"
              }
              style={styles.postalCodeContaiers}
            >
              <View className="mt-1 ml-1">
                <Feather
                  name={isSuccess ? "check-circle" : "x-circle"}
                  size={40}
                  color={isSuccess ? "green" : "red"}
                />
              </View>
              <Text className="text-grey2 font-isansbold text-[20px] text-center mt-5">
                {isSuccess
                  ? "پرداخت با موفقیت انجام شد."
                  : "خطایی در پرداخت شما بوجود آمده است."}
              </Text>
            </View>
          </View>

          {/* DOWNLOAD PDF */}
          {isSuccess && (
            <View className="mt-10 w-full justify-center items-center">
              {isLoading ? (
                <Chase size={50} color="#164194" className="mt-20" />
              ) : data && data.length > 0 ? (
                <>
                  <Text className="text-primary font-isansbold text-[20px]">
                    دانلود PDF
                  </Text>
                  <View className="w-[80%] h-[1px] bg-grey2 mt-2 mb-2" />
                  <View className="w-full mt-10 justify-center items-center">
                    {data.map((item, index) => (
                      <DownloadPDF item={item} key={index} />
                    ))}
                  </View>
                </>
              ) : (
                <Text className="font-isansdemibold text-grey2 text-[30px] mt-20">
                  موردی یافت نشد!
                </Text>
              )}
            </View>
          )}
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="بازگشت"
            isLoading={isLoading}
            handlePress={() => router.replace("/services")}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default PaymentResult;

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
  factorContainer: {
    width: "100%",
    marginTop: 20,
  },
});
