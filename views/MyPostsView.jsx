// IMPORTS
import { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useFocusEffect, router } from "expo-router";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import CustomButton from "@/components/CustomButton";
import { trackingOrderByNID, trackingOrder } from "@/api/tracking";

const MyPostsView = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [data, setData] = useState([]);
  const fadeAnimRefs = useRef([]);

  // CONSTS
  const nationalCode = "2640040804";

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await trackingOrderByNID(nationalCode);
      console.log("TRACKING ORDER RESPONSE:", response.data);
      setData(response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // HANDLERS
  const onSubmit = async (barcode) => {
    setIsOrderLoading(true);
    try {
      const response = await trackingOrder("120920324900026700000114");
      console.log("TRACKING ORDER RESPONSE:", response.data);
      router.push(`/follow/order?barcode=120920324900026700000114`);
    } finally {
      setIsOrderLoading(false);
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
                        نوع پیگیری :
                      </Text>
                      <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                        {item.stateName}
                      </Text>
                    </View>

                    <View className="flex-row-reverse justify-between items-center w-full mb-2">
                      <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
                        بارکد پستی :
                      </Text>
                      <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
                        {item.barcode}
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

                    <CustomButton
                      title="پیگیری"
                      bgColor="bg-green-500"
                      titleColor="text-white"
                      height="h-10"
                      isLoading={isOrderLoading}
                      handlePress={() => onSubmit(item.barcode)}
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

export default MyPostsView;
