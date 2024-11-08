// NATIVE IMPORTS
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";

// EXPO
import * as FileSystem from "expo-file-system";

// ASSETS
import images from "@/constants/images";

export const PostCertificateCard = ({ item, containerStyles }) => {
  // const downloadPdf = async () => {
  // const pdfUrl = item?.url;
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
  // const download = async () => {
  //   const url = "https://www.orimi.com/pdf-test.pdf";
  //   const fileName = "test.pdf";
  //   const fileUri = FileSystem.documentDirectory + item?.postcode;

  //   const result = await FileSystem.downloadAsync(
  //     url,
  //     FileSystem.documentDirectory + fileName
  //   );
  //   console.log(result);

  //   save(result.uri, fileName, result.headers["content-type"]);
  // };

  const download = async () => {
    // TEST
    // const url = "https://www.orimi.com/pdf-test.pdf";
    // const fileName = "test.pdf";
    const url = item?.url;
    const fileName = item?.postcode;
    const fileUri = FileSystem.documentDirectory + fileName;

    try {
      const result = await FileSystem.downloadAsync(url, fileUri);
      console.log("File downloaded to:", result.uri);
      alert("Download complete! File saved to app storage.");
    } catch (error) {
      console.log("Error downloading file:", error);
    }
  };

  // const save = async (uri, filename, mimetype) => {
  //   if (Platform.OS === "android") {
  //     const permissions =
  //       await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  //     if (permissions.granted) {
  //       const base64 = await FileSystem.readAsStringAsync(uri, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });
  //       await FileSystem.StorageAccessFramework.createFileAsync(
  //         permissions.directoryUri,
  //         filename,
  //         mimetype
  //       )
  //         .then(async (uri) => {
  //           await FileSystem.writeAsStringAsync(uri, base64, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //         })
  //         .catch((e) => console.log(e));
  //     } else {
  //       alert("Not Supported on IOS");
  //     }
  //   } else {
  //     return;
  //   }
  // };

  return (
    <Pressable
      onPress={download}
      className={`bg-white rounded-md px-5 py-2 w-full ${containerStyles}`}
    >
      <View className="justify-center items-center w-full">
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
