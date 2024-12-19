// IMPORTS
import { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import { useUserStore } from "@/store";
import { getAllPostYafte } from "@/api/yafte";
import { requestPayment } from "@/api/payment";
import CustomButton from "@/components/CustomButton";
import * as SecureStore from "expo-secure-store";

const MyPostYafteView = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [data, setData] = useState([]);
  const fadeAnimRefs = useRef([]);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const userData = useUserStore((state) => state.userData);
  const setFactor = useUserStore((state) => state.setFactor);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllPostYafte({
        nationalID: userData.nationalCode || "",
        firstName: userData.name || "",
        lastName: userData.lastName || "",
      });
      console.log("POST YAFTE RESPONSE:", response.data);
      setData(response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, [userData]);

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

  // EFFECTS
  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {
        setData([]);
      };
    }, [fetchData])
  );

  useEffect(() => {
    if (data.length > 0) {
      data.forEach((_, index) => {
        if (!fadeAnimRefs.current[index]) {
          fadeAnimRefs.current[index] = new Animated.Value(0);
        }
      });

      data.forEach((_, index) => {
        Animated.timing(fadeAnimRefs.current[index], {
          toValue: 1,
          duration: 500,
          delay: index * 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [data]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ transform: [{ scaleX: -1 }], rowGap: 10 }}
          className="justify-normal items-center mt-5 px-10 h-full pb-32"
        >
          {isLoading ? (
            <Chase size={50} color="#164194" className="mt-20" />
          ) : data.length === 0 ? (
            <Text className="font-isansdemibold text-grey2 text-[30px] mt-20">
              موردی یافت نشد!
            </Text>
          ) : (
            data.map((item, index) => {
              if (!fadeAnimRefs.current[index]) {
                fadeAnimRefs.current[index] = new Animated.Value(0);
              }
              return (
                <Animated.View
                  key={index}
                  style={{
                    opacity: fadeAnimRefs.current[index],
                    width: "100%",
                    transform: [
                      {
                        translateY: fadeAnimRefs.current[index].interpolate({
                          inputRange: [0, 1],
                          outputRange: [50, 0],
                        }),
                      },
                    ],
                  }}
                >
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
                      bgColor="bg-blue-500"
                      titleColor="text-white"
                      height="h-10"
                      disabled={!item.canPay}
                      isLoading={isRequestLoading}
                      handlePress={() => onSubmit(item)}
                    />
                  </View>
                </Animated.View>
              );
            })
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyPostYafteView;
