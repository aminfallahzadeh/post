// IMPORTS
import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { icons } from "../constants/icons";

export const FlowTabBarButton = ({
  onPress,
  onLongPress,
  routeName,
  isFocused,
  color,
  label,
}) => {
  // ANIMATION

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    );
  }, [scale, isFocused]);

  // ICON ANIMATION
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  // TEXT ANIMATION
  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);

    return {
      opacity,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 justify-center items-center gap-[3px]"
    >
      <Animated.View style={animatedIconStyle}>
        {icons[routeName]({
          color,
        })}
      </Animated.View>
      <Animated.Text
        style={[
          {
            color,
            fontFamily: "IranSans-Medium",
            fontSize: 13,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export default FlowTabBarButton;
