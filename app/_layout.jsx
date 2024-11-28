// IMPORTS
import { useEffect, useMemo } from "react";
import * as Linking from "expo-linking";
import { SplashScreen, Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import { toastConfig } from "@/config/toast-config";

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

  const ToastProvider = useMemo(() => toastConfig.registerProvider, []);

  // HANDLE DEEP LINK
  useEffect(() => {
    const handleUrl = (event) => {
      const { url } = event;
      console.log("URL received:", url);

      // Parse the URL and extract parameters
      const parsedUrl = new URL(url);
      const requestID = parsedUrl.searchParams.get("requestID");
      const success = parsedUrl.searchParams.get("success");
      const type = parsedUrl.searchParams.get("type");

      if (requestID && success) {
        // Navigate to the dynamic route with both parameters
        router.push({
          pathname: `/result/${requestID}`,
          params: { success, type },
        });
      }
    };

    // Add the event listener for handling URLs
    const listener = Linking.addEventListener("url", handleUrl);

    // Cleanup the listener on component unmount
    return () => {
      listener.remove();
    };
  }, []);

  // HANDLE FONTS
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
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="follow" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/postalcode-certificate"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/postalcode-geo"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/postalcode-request"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/post-yafte"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="result" options={{ headerShown: false }} />
      </Stack>
      <ToastProvider />
    </>
  );
};

export default RootLayout;
