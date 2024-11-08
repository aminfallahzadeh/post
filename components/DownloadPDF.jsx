// NATIVE IMPROTS
import { Pressable, Text, Image } from "react-native";

// EXPO
import * as FileSystem from "expo-file-system";

// ASSETS
import images from "@/constants/images";

export const DownloadPDF = ({ item }) => {
  // HANDLE PDF DOWNLOAD
  // const donwload = async () => {
  //   const pdfUrl = item?.result?.certificateUrl;
  //   const fileUri = `${FileSystem.documentDirectory}${
  //     item.postcode || "download"
  //   }.pdf`;

  //   try {
  //     // Download the PDF file
  //     await FileSystem.downloadAsync(pdfUrl, fileUri);
  //   } catch (error) {
  //     alert("Error", "دانلود ناموفق");
  //     console.error("Download error:", error);
  //   }
  // };

  const download = async () => {
    const url = item?.result?.certificateUrl;
    const fileName = item?.postcode || "download";
    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      const result = await FileSystem.downloadAsync(url, fileUri);
      console.log("File downloaded to:", result.uri);
      alert("Download complete! File saved to app storage.");
    } catch (error) {
      console.log("Error downloading file:", error);
    }
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
