import { useState, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Chase } from "react-native-animated-spinkit";
import { trackingOrders } from "@/api/tracking";
import { useUserStore } from "@/store";
import * as SecureStore from "expo-secure-store";
import ParcelCard from "@/components/my-post/ParcelCard";

const Index = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
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

  // FETCH DATA
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
            <ParcelCard
              key={index}
              item={item}
              loadingStates={loadingStates}
              setLoadingStates={setLoadingStates}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
