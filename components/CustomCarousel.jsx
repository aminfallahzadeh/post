// IMPORTS
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from "react-native";

const { width } = Dimensions.get("screen");

const CarouselImages = [
  { id: "1", image: require("@/assets/images/car-1.jpg") },
  { id: "2", image: require("@/assets/images/car-2.jpeg") },
];

const CustomCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const renderItem = ({ item }) => (
    <View style={styles.carouselItem} key={item.id}>
      {/* <CarouselItem item={item} /> */}
      <Image
        source={item.image}
        resizeMode="contain"
        style={{ width, height: 180 }}
      />
    </View>
  );

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % CarouselImages.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={CarouselImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      <View style={styles.pagination}>
        {CarouselImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  carouselItem: {
    width,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: Platform.OS === "android" ? "row" : "row-reverse",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 2,
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#fcd900",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});

export default CustomCarousel;
