// REACT IMPORTS
import { useState, useEffect, useCallback, useRef } from "react";

// NATIVE IMPORTS
import { View, Text, ScrollView, Animated } from "react-native";
import { useFocusEffect } from "expo-router";

// LIBRARIES
import { showMessage } from "react-native-flash-message";
import { Chase } from "react-native-animated-spinkit";

// COMPONENTS
import Background from "@/components/Background";
import ComplaintCard from "@/components/ComplaintCard";

// STATE
import { useUserStore } from "@/store";

// AXIOS
import { eopList } from "@/api/eop";

// ASSETS
import { toastStyles } from "@/constants/styles";

const MyComplaintsView = () => {
  // LIST DATA
  const [list, setList] = useState([]);

  // LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // GLOBAL STATE
  const mobile = useUserStore((state) => state.mobile);

  // ANIMATION REFERENCES
  const fadeAnimRefs = useRef([]);

  const fetchEopList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await eopList(mobile);
      console.log("EOP LIST RESPONSE: ", response.data.itemList);
      setList(response.data.itemList);
    } catch (error) {
      console.log("EOP LIST ERROR:", error.response);
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
      fetchEopList();
      return () => {
        setList([]);
      };
    }, [fetchEopList])
  );

  useEffect(() => {
    if (list.length > 0) {
      list.forEach((_, index) => {
        fadeAnimRefs.current[index] = new Animated.Value(0); // Initialize fade-in value to 0 (invisible)
      });

      // Animate each card with a staggered effect
      list.forEach((_, index) => {
        Animated.timing(fadeAnimRefs.current[index], {
          toValue: 1, // Fade in to full visibility
          duration: 500, // Duration for each animation
          delay: index * 300, // Delay each card animation
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
            list.map((item, index) => (
              <Animated.View
                key={index}
                style={{
                  opacity: fadeAnimRefs.current[index],

                  transform: [
                    {
                      translateY: fadeAnimRefs.current[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0], // Start 50px lower, move to original position
                      }),
                    },
                  ],
                }}
              >
                <ComplaintCard item={item} />
              </Animated.View>
            ))
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyComplaintsView;
