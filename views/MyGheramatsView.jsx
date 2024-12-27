// IMPORTS
import { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useFocusEffect } from "expo-router";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import { trackingGheramat } from "@/api/gheramat";
import * as SecureStore from "expo-secure-store";
import { GheramatTrackCard } from "@/components/GheramatTrackCard";

const MyGheramatsView = () => {
  // STATES
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");
  const fadeAnimRefs = useRef([]);

  // FETCH
  const fetchGheramatList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await trackingGheramat(mobile);
      console.log("GHERAMAT LIST RESPONSE: ", response.data.itemList);
      setList(response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, [mobile]);

  useFocusEffect(
    useCallback(() => {
      fetchGheramatList();
      return () => {
        setList([]);
      };
    }, [fetchGheramatList])
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
    <Background className="flex justify-center items-center w-full h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ rowGap: 10 }}
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
                  <GheramatTrackCard item={item} />
                </Animated.View>
              );
            })
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyGheramatsView;
