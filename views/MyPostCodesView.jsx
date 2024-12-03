// IMPORTS
import { useState, useRef, useEffect, useCallback } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useFocusEffect } from "expo-router";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import { getRequestBulk } from "@/api/request";
import { PostCodeCard } from "@/components/PostCodeCard/PostCodeCard";
import * as SecureStore from "expo-secure-store";

const MyPostCodesView = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const fadeAnimRefs = useRef([]);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getRequestBulk(mobile);
      console.log("POST YAFTE RESPONSE:", response.data);
      setData(response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, [mobile]);

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
                  <PostCodeCard item={item} />
                </Animated.View>
              );
            })
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyPostCodesView;
