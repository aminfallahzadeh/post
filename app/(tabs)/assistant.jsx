// IMPORTS
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";
import React from "react";

const Assistant = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://newpostkhoone.post.ir" }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the View takes up the full screen
  },
  webview: {
    flex: 1, // Ensures the WebView fills the parent View
  },
});

export default Assistant;
