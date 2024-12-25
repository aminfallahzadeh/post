// IMPORTS
import { useEffect, useRef, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getNearestPostOffice } from "@/api/customer";

import { Title } from "@/components/Title";

const Index = () => {
  // STATES
  const [nearLocs, setNearLocs] = useState([]);
  const [permission, setPermission] = useState(false);
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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

  const fetchLocations = useCallback(async (lat, long) => {
    setIsLoading(true);

    try {
      const response = await getNearestPostOffice(lat, long);
      setNearLocs(response.data.itemList);
      console.log("LOCATIONS RESPONSE: ", response.data.itemList);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (permission && location) {
      fetchLocations(location.coords.latitude, location.coords.longitude);
    }
  }, [permission, fetchLocations, location]);

  //   const getPermissions = useCallback(async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();
  //     console.log("Permission status:", status);
  //     if (status !== "granted") {
  //       alert("دسترسی موقعیت یابی را فعال کنید");
  //       return;
  //     }
  //   }, []);

  //   const focusMap = async () => {
  //     if (!permission) {
  //       return;
  //       //   getPermissions();
  //     }

  //     // Animate the map to the user's location
  //     mapRef.current.animateToRegion(
  //       {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude,
  //         latitudeDelta: 0.01,
  //         longitudeDelta: 0.01,
  //       },
  //       1000
  //     );
  //   };

  //   useEffect(() => {
  //     if (!permission) {
  //       getPermissions();
  //     }
  //   }, [permission, getPermissions]);

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
          {nearLocs.length > 0 &&
            nearLocs.map((item) => (
              <Marker
                key={item.id}
                coordinate={{
                  latitude: item.lat,
                  longitude: item._long,
                }}
              />
            ))}
        </MapView>

        {/* Current Location Button */}
        {/* <TouchableOpacity style={styles.button} onPress={focusMap}>
          <MaterialIcons name="my-location" size={24} color="yellow" />
        </TouchableOpacity> */}
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

// import { useState, useEffect } from "react";
// import { Platform, Text, View, StyleSheet } from "react-native";

// import * as Location from "expo-location";

// export default function App() {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     async function getCurrentLocation() {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     }

//     getCurrentLocation();
//   }, [setErrorMsg, setLocation]);

//   let text = "Waiting...";
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{text}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: "center",
//   },
// });
