// IMPORTS
import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import { getRequestBulk } from "@/api/request";
import { PostCodeCard } from "@/components/PostCodeCard/PostCodeCard";
import * as SecureStore from "expo-secure-store";

const MyPostcode = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Background>
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
            <Text className="font-isansdemibold text-grey2 text-[30px] mt-20">
              موردی یافت نشد!
            </Text>
          ) : (
            data.map((item, index) => (
              <View className="w-full" key={index}>
                <PostCodeCard item={item} />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyPostcode;
