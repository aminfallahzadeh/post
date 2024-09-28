// NATIVE IMPROTS
import {
  View,
  Platform,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";

// EXPO IMPORTS
import { Stack, router } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

const { width, height } = Dimensions.get("screen");
const NewPostFormLayout = () => {
  return (
    <>
      <View
        style={styles.topBar}
        className={Platform.OS === "ios" ? "mt-10 px-6" : ""}
      >
        <TouchableOpacity onPress={() => router.replace("/services")}>
          <Feather name="home" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Stack options={{ headerShown: false }}>
        <Stack.Screen name="type" options={{ headerShown: false }} />
        <Stack.Screen name="pishtaz/step1" options={{ headerShown: false }} />
        <Stack.Screen name="amanat/step1" options={{ headerShown: false }} />
        <Stack.Screen name="amanat/step2" options={{ headerShown: false }} />
        <Stack.Screen name="amanat/step3" options={{ headerShown: false }} />
        <Stack.Screen name="amanat/step4" options={{ headerShown: false }} />
        <Stack.Screen name="amanat/step5" options={{ headerShown: false }} />
        <Stack.Screen name="amanat/step6" options={{ headerShown: false }} />
        <Stack.Screen name="amanat/step7" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default NewPostFormLayout;

const styles = {
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "transparent",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { height: 2, width: 0 },
    position: "absolute",
    zIndex: 1,
    top: StatusBar.currentHeight + 20,
  },
  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: "#fff",
    zIndex: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
};
