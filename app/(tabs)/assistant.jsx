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
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default Assistant;
