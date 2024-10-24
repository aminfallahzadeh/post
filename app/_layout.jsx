// REACT IMPORTS
import { useEffect } from "react";

// EXPO
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

// LIBRARIES
import FlashMessage from "react-native-flash-message";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // IMPLEMENT FONTS
  const [fontsLoaded, error] = useFonts({
    "IranSans-Black": require("../assets/fonts/IRANSansX-Black.ttf"),
    "IranSans-Bold": require("../assets/fonts/IRANSansX-Bold.ttf"),
    "IranSans-DemiBold": require("../assets/fonts/IRANSansX-DemiBold.ttf"),
    "IranSans-ExtraBlack": require("../assets/fonts/IRANSansX-ExtraBlack.ttf"),
    "IranSans-ExtraBold": require("../assets/fonts/IRANSansX-ExtraBold.ttf"),
    "IranSans-Heavy": require("../assets/fonts/IRANSansX-Heavy.ttf"),
    "IranSans-Light": require("../assets/fonts/IRANSansX-Light.ttf"),
    "IranSans-Medium": require("../assets/fonts/IRANSansX-Medium.ttf"),
    "IranSans-Regular": require("../assets/fonts/IRANSansX-Regular.ttf"),
    "IranSans-Thin": require("../assets/fonts/IRANSansX-Thin.ttf"),
    "IranSans-UltraLight": require("../assets/fonts/IRANSansX-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/(new-post)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/new-complaint"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="profile/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="follow" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/postalcode-certificate"
          options={{ headerShown: false }}
        />
      </Stack>
      <FlashMessage position={"top"} />
    </>
  );
};

export default RootLayout;
