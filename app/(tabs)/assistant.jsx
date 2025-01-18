// IMPORTS
import { useEffect } from "react";
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useUserStore } from "@/store";

const Assistant = () => {
  const userData = useUserStore((state) => state.userData);
  const mobile = SecureStore.getItem("mobile");

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://newpostkhoone.post.ir/bot?mobile=${mobile}&name=${
            userData.name ? userData.name : ""
          }`,
        }}
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
