// IMPORTS
import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { CameraView } from "expo-camera";
import { Overlay } from "./Overlay";
import { Stack } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  AppState,
} from "react-native";

const Index = () => {
  // STATES
  const appState = useRef(AppState.currentState);
  const qrLock = useRef(false);

  // HANDLERS
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onSubmit = (data) => {
    router.push({
      pathname: "forms/follow",
      params: {
        barcode: data,
      },
    });
  };
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "اسکن بارکد",
          headerTitleStyle: {
            fontFamily: "IranSans-Regular",
            color: "#164194",
          },
          //   headerShown: false,
        }}
      />

      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing={"back"}
        barcodeScannerSettings={{ barcodeTypes: ["code128"] }}
        onBarcodeScanned={({ data }) => {
          onSubmit(data);
        }}
      />

      <Overlay />
    </SafeAreaView>
  );
};

export default Index;
