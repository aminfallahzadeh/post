// IMPORTS
import { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useFocusEffect } from "expo-router";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import ComplaintCard from "@/components/ComplaintCard";
import { eopList } from "@/api/eop";
import * as SecureStore from "expo-secure-store";

const MyComplaintsView = () => {
  // STATES
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnimRefs = useRef([]);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");

  const fetchEopList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await eopList(mobile);
      console.log("EOP LIST RESPONSE: ", response.data.itemList);
      setList(response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, [mobile]);

  useFocusEffect(
    useCallback(() => {
      fetchEopList();
      return () => {
        setList([]);
      };
    }, [fetchEopList])
  );

  useEffect(() => {
    if (list.length > 0) {
      list.forEach((_, index) => {
        if (!fadeAnimRefs.current[index]) {
          fadeAnimRefs.current[index] = new Animated.Value(0);
        }
      });

      list.forEach((_, index) => {
        Animated.timing(fadeAnimRefs.current[index], {
          toValue: 1,
          duration: 500,
          delay: index * 300,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [list]);

  return (
    <Background>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ transform: [{ scaleX: -1 }], rowGap: 10 }}
          className="justify-normal items-center mt-5 px-10 h-full pb-32"
        >
          {isLoading ? (
            <Chase size={50} color="#164194" className="mt-20" />
          ) : list.length === 0 ? (
            <Text className="font-isansdemibold text-grey2 text-[30px] mt-20">
              موردی یافت نشد!
            </Text>
          ) : (
            list.map((item, index) => {
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
                  <ComplaintCard item={item} />
                </Animated.View>
              );
            })
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyComplaintsView;
