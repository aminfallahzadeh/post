// IMPORTS
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import Background from "@/components/Background";

const Map = () => {
  // STATES
  const [permission, setPermission] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  // HANDLERS
  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      setPermission(true);
      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    }
    getCurrentLocation();
  }, []);

  // DEBUG
  useEffect(() => {
    console.log("CURRENT LOCATIONS: ", location);
  }, [location]);

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://newpostkhoone.post.ir/map?latitude=${location?.coords?.latitude}&longitude=${location?.coords?.longitude}`,
        }}
        style={styles.webview}
      />
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  popup: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  popupText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
