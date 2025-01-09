// IMPORTS
import { Pressable, Text, Image } from "react-native";
import { router } from "expo-router";
import images from "@/constants/images";

export const DownloadPDF = ({ item }) => {
  const download = async () => {
    const url = item?.result?.certificateUrl;
    router.push(url);
  };

  return (
    <Pressable
      className="flex-row-reverse justify-center items-center gap-2"
      onPress={download}
    >
      <Image source={images.pdf} className="w-10 h-10" />
      <Text className="text-grey2 font-isansdemibold">
        {item?.postcode || "دانلود"}
      </Text>
    </Pressable>
  );
};

export default DownloadPDF;
