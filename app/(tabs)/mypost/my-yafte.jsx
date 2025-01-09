// IMPORTS
import { useState, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import { Chase } from "react-native-animated-spinkit";
import { useFocusEffect } from "@react-navigation/native";
import { useUserStore } from "@/store";
import { getRequestPostYafte } from "@/api/request";
import { requestPayment } from "@/api/payment";
import CustomButton from "@/components/CustomButton";
import * as SecureStore from "expo-secure-store";

const MyYafte = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [data, setData] = useState([]);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const setFactor = useUserStore((state) => state.setFactor);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getRequestPostYafte(mobile);
      console.log("POST YAFTE RESPONSE:", response.data);
      setData(response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, [mobile]);

  // HANDLERS
  const onSubmit = async (item) => {
    setIsRequestLoading(true);
    try {
      const response = await requestPayment({
        clientOrderID: "",
        mobile,
        paymentTypeID: "",
        postUnitID: 0,
        income: item.amount,
        tax: item.tax,
        escrow: item.escrow,
        callBackUrl: "",
        additionalData: "",
        requestID: item.id,
      });
      console.log("REQUEST PAYMENT RESPONSE:", response.data);
      console.log(response.data.itemList[0].data.paymentUrl);
      setFactor({
        ...item,
        paymentUrl: response.data.itemList[0].data.paymentUrl,
      });
      router.push(`/factor/${item.id}`);
    } finally {
      setIsRequestLoading(false);
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
        ) : data.length === 0 ? (
          <Text className="font-isansdemibold text-grey2 text-lg mt-20">
            موردی یافت نشد!
          </Text>
        ) : (
          data.map((item, index) => (
            <View className="w-full" key={index}>
              <View className="bg-white rounded-md px-5 py-2 w-full">
                <View className="flex-row-reverse justify-between items-center w-full mb-2">
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                    وضعیت :
                  </Text>
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                    {item.statusCodeDesc}
                  </Text>
                </View>

                <View className="flex-row-reverse justify-between items-center w-full mb-2">
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                    شماره پیگیری :
                  </Text>
                  <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                    {item.trackingID}
                  </Text>
                </View>

                <CustomButton
                  title="پرداخت"
                  height="h-10"
                  disabled={!item.canPay}
                  isLoading={isRequestLoading}
                  handlePress={() => onSubmit(item)}
                />
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default MyYafte;
