// IMPORTS
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Title } from "@/components/Title";

const Index = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const focusMap = async () => {
    // Request permissions to access location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("دسترسی موقعیت یابی را فعال کنید");
      return;
    }

    // Get the user's current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Animate the map to the user's location
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000 // Duration in milliseconds
    );
  };

  return (
    <SafeAreaView className="h-full">
      {/* HEADER SECTION */}
      <Title title="مراکز پستی" home={true} />

      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={mapRef}
          showsMyLocationButton
          showsUserLocation
          region={{
            latitude: 35.6892,
            longitude: 51.389,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          initialRegion={{
            latitude: 35.6892,
            longitude: 51.389,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={{ latitude: 35.6892, longitude: 51.389 }} />
        </MapView>

        {/* Current Location Button */}
        <TouchableOpacity style={styles.button} onPress={focusMap}>
          <MaterialIcons name="my-location" size={24} color="yellow" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

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
    bottom: 20,
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
});
