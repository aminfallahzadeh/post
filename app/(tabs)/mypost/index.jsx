import { useState, useCallback } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Chase } from "react-native-animated-spinkit";
import CustomButton from "@/components/CustomButton";
import { trackingOrders, trackingOrder } from "@/api/tracking";
import { useUserStore } from "@/store";
import * as SecureStore from "expo-secure-store";
import { Barcode } from "expo-barcode-generator";
import * as Clipboard from "expo-clipboard";
import Feather from "@expo/vector-icons/Feather";
import { toastConfig } from "@/config/toast-config";

const Index = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // Track loading state per item
  const [data, setData] = useState([]);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const userData = useUserStore((state) => state.userData);

  const fetchData = useCallback(async () => {
    if (userData.nationalCode) {
      setIsLoading(true);
      try {
        const response = await trackingOrders(mobile);
        console.log("TRACKING ORDER RESPONSE:", response.data);
        setData(response.data.itemList);
      } finally {
        setIsLoading(false);
      }
    }
  }, [mobile, userData?.nationalCode]);

  // HANDLERS
  const copyHandler = async (code) => {
    await Clipboard.setStringAsync(code.toString());
    toastConfig.success("بارکد پستی کپی شد");
  };

  const onSubmit = async (barcode) => {
    setLoadingStates((prev) => ({ ...prev, [barcode]: true })); // Set the clicked button to loading
    try {
      const response = await trackingOrder(barcode);
      console.log("TRACKING ORDER RESPONSE:", response.data);
      router.push({
        pathname: "forms/follow",
        params: { barcode },
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [barcode]: false })); // Reset loading state
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();

      return () => {};
    }, [fetchData])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          rowGap: 10,
          transform: [{ scaleX: -1 }],
        }}
        className="justify-normal items-center mt-5 px-10 h-full pb-32"
      >
        {isLoading ? (
          <Chase size={50} color="#164194" className="mt-20" />
        ) : !userData?.nationalCode ? (
          <Text className="font-isansdemibold text-grey2 text-lg mt-20">
            کد ملی را ثبت کنید
          </Text>
        ) : data.length === 0 ? (
          <Text className="font-isansdemibold text-grey2 text-lg mt-20">
            موردی یافت نشد!
          </Text>
        ) : (
          data.map((item, index) => (
            <View key={index} className="w-full">
              <View className="bg-white rounded-md px-5 py-2 w-full">
                <View className="flex-row-reverse justify-between items-center w-full mb-2">
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                    نوع پیگیری :
                  </Text>
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                    {item.stateName}
                  </Text>
                </View>

                <View className="flex-row-reverse justify-between items-center w-full mb-2">
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                    تاریخ صدور :
                  </Text>
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                    {item.issueDateShamsi}
                  </Text>
                </View>

                {item.state === 2 ? (
                  <View className="justify-between items-center w-full mb-2">
                    <View className="flex-row justify-center items-center w-full">
                      <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                        کد پیگیری
                      </Text>
                      <Pressable onPress={() => copyHandler(item.barcode)}>
                        <Feather name="copy" size={14} color="black" />
                      </Pressable>
                    </View>

                    <Barcode
                      value={item.barcode}
                      options={{
                        format: "CODE128",
                        height: "50",
                      }}
                    />
                  </View>
                ) : (
                  <View className="flex-row-reverse justify-between items-center w-full mb-2">
                    <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                      کد مرسوله
                    </Text>

                    <View className="flex-row items-center justify-center">
                      <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                        {item.barcode}
                      </Text>
                      <Pressable onPress={() => copyHandler(item.barcode)}>
                        <Feather name="copy" size={14} color="black" />
                      </Pressable>
                    </View>
                  </View>
                )}

                {item.state !== 2 && (
                  <CustomButton
                    title="پیگیری"
                    height="h-10"
                    isLoading={loadingStates[item.barcode] || false}
                    disabled={Object.values(loadingStates).some(
                      (state) => state
                    )}
                    handlePress={() => onSubmit(item.barcode)}
                  />
                )}
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
