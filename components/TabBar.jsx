// REACT IMPORTS
import { useEffect, useState } from "react";

// NATIVE IMPORTS
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

// COMPONETNS
import TabBarButton from "./TabBarButton";

export const TabBar = ({ state, descriptors, navigation }) => {
  // TAB BAR ICONS BACKGROUND STATE
  const [dimensions, setDimensions] = useState({
    height: 20,
    width: 100,
  });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(buttonWidth * state.index);

  useEffect(() => {
    tabPositionX.value = withSpring(buttonWidth * state.index);
  }, [state.index, buttonWidth, tabPositionX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View
      onLayout={onTabbarLayout}
      className="flex-row absolute bottom-[50px] justify-between items-center bg-white mx-[80px] py-[10px] before:rounded-[35px]"
      style={styles.shadow}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            backgroundColor: "#164194",
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 15,
            width: buttonWidth - 25,
          },
          animatedStyle,
        ]}
      />
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
          tabPositionX.value = withSpring(buttonWidth * index);

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
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#fcd900" : "#333"}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
});
