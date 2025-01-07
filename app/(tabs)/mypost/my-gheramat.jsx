// IMPORTS
import { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import { trackingGheramat } from "@/api/gheramat";
import * as SecureStore from "expo-secure-store";
import { GheramatTrackCard } from "@/components/GheramatTrackCard";

const MyGheramat = () => {
  // STATES
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");

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

  useEffect(() => {
    fetchGheramatList();
  }, [fetchGheramatList]);

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
        ) : list.length === 0 ? (
          <Text className="font-isansdemibold text-grey2 text-lg mt-20">
            موردی یافت نشد!
          </Text>
        ) : (
          list.map((item, index) => (
            <View className="w-full" key={index}>
              <GheramatTrackCard item={item} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default MyGheramat;
