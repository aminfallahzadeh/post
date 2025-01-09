// IMPORTS
import { useState, useCallback } from "react";
import { View, Text, ScrollView } from "react-native";
import { Chase } from "react-native-animated-spinkit";
import { useFocusEffect } from "@react-navigation/native";
import PostCertificateCard from "@/components/PostCertificateCard";
import { getCertificate } from "@/api/gnaf";
import * as SecureStore from "expo-secure-store";

const MyGovahi = () => {
  // STATES
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // CONSTS
  const mobile = SecureStore.getItem("mobile");

  // FETCH
  const fetchCertificateList = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getCertificate(mobile);
      console.log("CERTIFICATE LIST RESPONSE: ", response.data.itemList);
      setList(response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, [mobile]);

  useFocusEffect(
    useCallback(() => {
      fetchCertificateList();

      return () => {};
    }, [fetchCertificateList])
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
        ) : list.length === 0 ? (
          <Text className="font-isansdemibold text-grey2 text-lg mt-20">
            موردی یافت نشد!
          </Text>
        ) : (
          list.map((item, index) => (
            <View className="w-full" key={index}>
              <PostCertificateCard item={item} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default MyGovahi;
