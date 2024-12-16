// NATIVE IMPORTS
import { View, Dimensions, Image, Text, StyleSheet } from "react-native";

// EXPO IMPORTS
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

// const images = {
//   "announce-5.png": require("../assets/images/announce-5.png"),
//   "announce-2.png": require("../assets/images/announce-2.png"),
//   "announce-3.png": require("../assets/images/announce-3.png"),
//   "announce-4.png": require("../assets/images/announce-4.png"),
// };

export const SliderItem = ({ slideItem }) => {
  return (
    <View style={styles.container}>
      {/* <Image source={images[slideItem.image]} style={styles.image} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      />
      <View style={styles.textContainer}>
        <Text
          style={styles.title}
          numberOfLines={2}
          className="font-isansdemibold"
        >
          {slideItem.title}
        </Text>
        <AntDesign name="checkcircleo" size={20} color="orange" />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: width - 60,
    height: 180,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    borderRadius: 20,
  },
  textContainer: {
    position: "absolute",
    bottom: 5,
    right: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: "white",
  },
});

export default SliderItem;
