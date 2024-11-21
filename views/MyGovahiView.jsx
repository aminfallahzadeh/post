// IMPORTS
import { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, ScrollView, Animated } from "react-native";
import { useFocusEffect } from "expo-router";
import { showMessage } from "react-native-flash-message";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import PostCertificateCard from "@/components/PostCertificateCard";
import { useUserStore } from "@/store";
import { getCertificate } from "@/api/gnaf";
import { toastStyles } from "@/constants/styles";

const MyGovahiView = () => {
  // LIST DATA
  const [list, setList] = useState([]);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // GLOBAL STATE
  const mobile = useUserStore((state) => state.mobile);

  // ANIMATION REFERENCES
  const fadeAnimRefs = useRef([]);

  const fetchCertificateList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCertificate(mobile);
      console.log("CERTIFICATE LIST RESPONSE: ", response.data.itemList);
      setList(response.data.itemList);
    } catch (error) {
      console.log("CERTIFICATE LIST ERROR:", error.response);
      showMessage({
        message: error.response?.data?.message || error.message,
        type: "danger",
        titleStyle: toastStyles,
      });
    } finally {
      setIsLoading(false);
    }
  }, [mobile]);

  useFocusEffect(
    useCallback(() => {
      fetchCertificateList();
      return () => {
        setList([]);
      };
    }, [fetchCertificateList])
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
                  <PostCertificateCard item={item} />
                </Animated.View>
              );
            })
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyGovahiView;
