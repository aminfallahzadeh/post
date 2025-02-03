import React, { useRef, useEffect } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";

const CustomSwitch = ({ value, onToggle, disabled }) => {
  //   const [isEnabled, setIsEnabled] = useState(value);
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: value ? 20 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, translateX]);

  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.switch,
        value && styles.enabled,
        disabled && styles.disabled,
      ]}
      disabled={disabled}
    >
      <Animated.View style={[styles.knob, { transform: [{ translateX }] }]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#164194",
    justifyContent: "center",
    padding: 2,
  },
  enabled: {
    backgroundColor: "#164194",
  },
  disabled: {
    opacity: 0.5,
  },
  knob: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});

export default CustomSwitch;
