// IMPORTS
import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import Background from "@/components/Background";
import ComplaintCard from "@/components/ComplaintCard";
import { eopList } from "@/api/eop";
import * as SecureStore from "expo-secure-store";

const MyComplaint = () => {
  // STATES
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  useEffect(() => {
    fetchEopList();
  }, [fetchEopList]);

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
          ) : list.length === 0 ? (
            <Text className="font-isansdemibold text-grey2 text-[30px] mt-20">
              موردی یافت نشد!
            </Text>
          ) : (
            list.map((item, index) => (
              <View className="w-full" key={index}>
                <ComplaintCard item={item} />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </Background>
  );
};

export default MyComplaint;
