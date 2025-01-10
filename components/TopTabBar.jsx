// IMPORTS
import React, { useRef, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  Platform,
} from "react-native";

const TopTabBar = ({ state, descriptors, navigation, position }) => {
  const scrollViewRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    if (scrollViewRef.current) {
      const activeTabIndex = state.index;
      const tabWidth = 30;
      const offset = activeTabIndex * tabWidth;

      scrollViewRef.current.scrollTo({ x: offset, animated: true });
    }
  }, [state.index]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        backgroundColor: "#fff",
        paddingVertical: 4,
        maxHeight: 60,
        direction: Platform.OS === "ios" ? "rtl" : "ltr",
      }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flexDirection: Platform.OS === "ios" ? "row-reverse" : "row",
          height: 50,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                paddingVertical: 10,
                backgroundColor: "transparent",
                paddingHorizontal: 20,
              }}
            >
              {options.tabBarIcon && (
                <View style={{ transform: [{ scaleX: -1 }], marginBottom: 2 }}>
                  {options.tabBarIcon(isFocused ? "#164194" : "#333")}
                </View>
              )}
              <Animated.Text
                style={{
                  color: isFocused ? "#164194" : "#333",
                  borderBottomWidth: 2,
                  borderBottomColor: isFocused ? "#fec900" : "transparent",
                  height: "100%",
                  width: "100%",
                  opacity: 1,
                  fontFamily: "IranSans-Regular",
                  transform: [{ scaleX: -1 }],
                }}
              >
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default TopTabBar;
