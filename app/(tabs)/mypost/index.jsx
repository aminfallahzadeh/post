// IMPORTS
import { useState, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Chase } from "react-native-animated-spinkit";
import CustomButton from "@/components/CustomButton";
import { trackingOrders, trackingOrder } from "@/api/tracking";
import { useUserStore } from "@/store";
import * as SecureStore from "expo-secure-store";
import { Barcode } from "expo-barcode-generator";

const Index = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
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
  const onSubmit = async (barcode) => {
    setIsOrderLoading(true);
    try {
      const response = await trackingOrder(barcode);
      console.log("TRACKING ORDER RESPONSE:", response.data);
      router.push(`/follow/order?barcode=${barcode}`);
    } finally {
      setIsOrderLoading(false);
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
                    <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                      کد پیگیری
                    </Text>

                    {/* {item.barcode} */}
                    <Barcode
                      value={item.barcode}
                      options={{
                        format: "CODE128",
                        height: "50",
                      }}
                      style={{}}
                    />
                  </View>
                ) : (
                  <View className="flex-row-reverse justify-between items-center w-full mb-2">
                    <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                      کد مرسوله
                    </Text>
                    <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                      {item.barcode}
                    </Text>
                  </View>
                )}

                {item.state !== 2 && (
                  <CustomButton
                    title="پیگیری"
                    height="h-10"
                    isLoading={isOrderLoading}
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
