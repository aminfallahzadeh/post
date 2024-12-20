// IMPORTS
import { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const Index = () => {
  const mapRef = useRef(null);
  const navigation = useNavigation();

  const focusMap = () => {};

  return (
    <SafeAreaView className="h-full">
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
});
