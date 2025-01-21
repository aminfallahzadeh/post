// IMPORTS
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { router } from "expo-router";
import images from "@/constants/images";

export const PostCertificateCard = ({ item, containerStyles }) => {
  const download = () => {
    const url = item?.url;
    router.push(url);
  };

  return (
    <Pressable
      onPress={download}
      className={`bg-white rounded-md px-5 py-2 w-full ${containerStyles}`}
    >
      <View className="justify-center items-center w-full flex-row">
        <Text className="font-isansregular text-grey2 text-sm">دانلود</Text>
        <Image source={images.pdf} className="w-10 h-10" />
      </View>
      <View className="flex-row-reverse justify-between items-center w-full mb-2">
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
          نوع گواهی :
        </Text>
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
          {item.certificateType}
        </Text>
      </View>

      <View style={styles.line} />

      <View className="flex-row-reverse justify-between items-center w-full mt-2 mb-2">
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm">
          کد پستی :
        </Text>
        <Text className="font-isansdemibold leading-none text-grey2 mr-2 items-center justify-center text-sm py-1">
          {item.postcode}
        </Text>
      </View>
    </Pressable>
  );
};

export default PostCertificateCard;

const styles = StyleSheet.create({
  container: {
    columnGap: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  status: {
    height: 12,
    width: 12,
    borderRadius: 50,
  },
  line: {
    alignSelf: "center",
    backgroundColor: "#c4c4c4",
    height: 1,
    borderRadius: 50,
    marginVertical: 5,
    width: "100%",
  },
});
