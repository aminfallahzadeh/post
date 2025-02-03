import React, { useState, useRef, useEffect } from "react";
import { Pressable, Animated, StyleSheet } from "react-native";

const CustomSwitch = ({ value = false, onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(value);
  const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isEnabled ? 20 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isEnabled, translateX]);

  const toggleSwitch = () => {
    setIsEnabled((prev) => !prev);
    if (onToggle) onToggle(!isEnabled);
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      style={[styles.switch, isEnabled && styles.enabled]}
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
    backgroundColor: "#fcd900",
    justifyContent: "center",
    padding: 2,
  },
  enabled: {
    backgroundColor: "#164194",
  },
  knob: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});

export default CustomSwitch;
