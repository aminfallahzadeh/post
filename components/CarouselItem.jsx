// IMPORTS
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("screen");

const CarouselItem = ({ item }) => {
  return (
    <View
      className="items-center justify-between rounded-[12px]"
      style={[
        styles.androidFlexDirection,
        { backgroundColor: item.bg, width: width - 12, height: 240 },
      ]}
    >
      <View className="flex-col mr-5">
        <Text
          className="font-isansdemibold text-white w-56 text-[20px]"
          style={styles.androidTextAlign}
        >
          {item.title}
        </Text>
        <Text
          className="w-56 mt-2 text-white font-isansregular"
          style={styles.androidTextAlign}
        >
          {item.description}
        </Text>
      </View>

      <Image source={item.image} />
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  androidTextAlign: {
    textAlign: Platform.OS === "android" ? "right" : "left",
  },
  androidFlexDirection: {
    paddingHorizontal: Platform.OS === "ios" ? 10 : undefined,
    flexDirection: Platform.OS === "android" ? "row-reverse" : "row",
  },
});
