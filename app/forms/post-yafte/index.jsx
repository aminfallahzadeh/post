// IMPORTS
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/store";
import { getAllPostYafte } from "@/api/yafte";
import { router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "@/components/CustomButton";
import Background from "@/components/Background";
import { PostYafteCard } from "@/components/PostYafteCard/PostYafteCard";
import { POST_YAFTE, SELECT_ALL } from "@/constants/consts";
import { Chase } from "react-native-animated-spinkit";
import { Title } from "@/components/Title";

const Index = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  // CONSTS
  const setFoundDocIds = useUserStore((state) => state.setFoundDocIds);

  // FETCHERS
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllPostYafte({
        nationalID: "0064551751",
        firstName: "test1",
        lastName: "test1",
      });
      setData(response.data?.itemList[0]?.data?.docs);
      console.log("POST YAFTE RESPONSE:", response);
    } finally {
      setIsLoading(false);
    }
  };

  // HANDLERS
  const handleSelect = (item) => {
    setSelectedItems((prev) =>
      prev.find((c) => c.id === item.id)
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item]
    );
  };

  const handleSelectAll = () => {
    const validItems = data?.filter((c) => c.canRequest === true) || [];
    if (selectedItems.length === validItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.filter((c) => c.canRequest === true));
    }
  };

  const onSubmit = async () => {
    await setFoundDocIds(selectedItems);

    router.push("forms/post-yafte/step2");
  };

  // EFFECT
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const validItems = data?.filter((c) => c.canRequest === true) || [];
    if (selectedItems?.length === validItems?.length) {
      setIsSelectedAll(true);
    } else {
      setIsSelectedAll(false);
    }
  }, [selectedItems?.length, data]);

  return (
    <Background>
      <SafeAreaView className="h-full">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER SECTION */}
          <Title title={POST_YAFTE} progress={33} home={false} />

          {isLoading ? (
            <View className="w-full justify-center items-center">
              <Chase size={50} color="#164194" className="mt-20" />
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={handleSelectAll}
                className="mt-5 flex-row-reverse justify-center items-center self-end px-2 rounded-md mr-5"
              >
                {isSelectedAll ? (
                  <Feather name="check-circle" size={24} color="green" />
                ) : (
                  <Feather name="circle" size={24} color="black" />
                )}

                <Text className="text-grey2 text-[15px] font-isansbold mr-2">
                  {SELECT_ALL}
                </Text>
              </TouchableOpacity>

              {/* RESULT LIST */}
              <View className="w-full px-5">
                {data?.map((item, index) => (
                  <View key={index} className="mt-5">
                    <PostYafteCard
                      item={item}
                      isSelected={selectedItems.find((c) => c.id === item.id)}
                      onSelect={() => handleSelect(item)}
                    />
                  </View>
                ))}
              </View>
            </>
          )}
        </ScrollView>

        {/* BOTTOM SECTION */}
        <View className="w-full z-10 px-4 bg-gray-100 py-4">
          <CustomButton
            title="ادامه"
            handlePress={onSubmit}
            disabled={selectedItems.length === 0}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Index;
