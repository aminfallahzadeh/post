import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

export function Background({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/background_dot.png")}
      resizeMode="repeat"
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
}

export default Background;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    maxWidth: 340,
    alignSelf: "center",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
