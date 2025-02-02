// IMPORTS
import { useEffect, useRef } from "react";
import { router } from "expo-router";
import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  AppState,
  View,
} from "react-native";

const Index = () => {
  const FRAME_WIDTH = "100%"; // Adjust the width of the frame
  const FRAME_HEIGHT = "30%"; // Adjust the height of the frame

  const appState = useRef(AppState.currentState);
  const qrLock = useRef(false);

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
        }}
      />

      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      <View style={styles.cameraContainer}>
        <CameraView
          style={[styles.camera, { width: FRAME_WIDTH, height: FRAME_HEIGHT }]}
          facing={"back"}
          barcodeScannerSettings={{ barcodeTypes: ["code128"] }}
          onBarcodeScanned={({ data }) => {
            onSubmit(data);
          }}
        />
        <View style={styles.overlay}>
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    borderColor: "transparent",
    borderWidth: 0,
  },
  overlay: {
    position: "absolute",
    width: "75%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#fff",
    borderWidth: 4,
    borderRadius: 8,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderBottomWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 16,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopRightRadius: 16,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 16,
  },
});

export default Index;
