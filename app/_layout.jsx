// IMPORTS
import { useEffect, useMemo } from "react";
import * as Linking from "expo-linking";
import { SplashScreen, Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import { toastConfig } from "@/config/toast-config";
import { StatusBar } from "expo-status-bar";
import { TourGuideProvider } from "rn-tourguide";
import { I18nManager } from "react-native";

// Lock the layout direction to LTR
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
// I18nManager.swapLeftAndRightInRTL(false);

try {
  I18nManager.allowRTL(false);
  I18nManager.forceRTL(false);
  //   I18nManager.swapLeftAndRightInRTL(false);
  console.log("RTL LOCKED");
} catch (e) {
  console.log(e);
}

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  //   const shouldBeRTL = false;

  //   if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== "web") {
  //     I18nManager.allowRTL(shouldBeRTL);
  //     I18nManager.forceRTL(shouldBeRTL);
  //     Updates.reloadAsync();
  //   }
  // IMPLEMENT FONTS
  const [fontsLoaded, error] = useFonts({
    "IranSans-Black": require("../assets/fonts/IRANSansXFaNum-Black.ttf"),
    "IranSans-Bold": require("../assets/fonts/IRANSansXFaNum-Bold.ttf"),
    "IranSans-DemiBold": require("../assets/fonts/IRANSansXFaNum-DemiBold.ttf"),
    "IranSans-ExtraBlack": require("../assets/fonts/IRANSansXFaNum-ExtraBlack.ttf"),
    "IranSans-ExtraBold": require("../assets/fonts/IRANSansXFaNum-ExtraBold.ttf"),
    "IranSans-Heavy": require("../assets/fonts/IRANSansXFaNum-Heavy.ttf"),
    "IranSans-Light": require("../assets/fonts/IRANSansXFaNum-Light.ttf"),
    "IranSans-Medium": require("../assets/fonts/IRANSansXFaNum-Medium.ttf"),
    "IranSans-Regular": require("../assets/fonts/IRANSansXFaNum-Regular.ttf"),
    "IranSans-Thin": require("../assets/fonts/IRANSansXFaNum-Thin.ttf"),
    "IranSans-UltraLight": require("../assets/fonts/IRANSansXFaNum-UltraLight.ttf"),
  });

  // CONSTS
  const ToastProvider = useMemo(() => toastConfig.registerProvider, []);

  useEffect(() => {
    const handleUrl = (event) => {
      const { url } = event;

      // Check if the URL starts with 'postapp://'
      if (url.startsWith("postapp://")) {
        // Parse the URL and extract parameters
        const parsedUrl = new URL(url);
        const requestID = parsedUrl.searchParams.get("requestID");
        const success = parsedUrl.searchParams.get("success");
        const type = parsedUrl.searchParams.get("type");

        // Navigate to the appropriate route
        router.push({
          pathname: `/result/${requestID}`,
          params: { success, type },
        });
      } else {
        console.log("Ignoring URL as it doesn't start with postapp://");
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

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <TourGuideProvider
      labels={{
        finish: "بستن",
        skip: "رد کردن",
        next: "بعدی",
        previous: "قبلی",
      }}
      androidStatusBarVisible
    >
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="forms/order" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/order-experimental"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/new-complaint"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="forms/follow" options={{ headerShown: false }} />
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
        <Stack.Screen name="forms/gheramat" options={{ headerShown: false }} />
        <Stack.Screen name="result" options={{ headerShown: false }} />
        <Stack.Screen name="factor" options={{ headerShown: false }} />
        <Stack.Screen name="forms/ehraz" options={{ headerShown: false }} />
        <Stack.Screen name="forms/nerkhname" options={{ headerShown: false }} />
        <Stack.Screen name="waiting" options={{ headerShown: false }} />
        <Stack.Screen name="scanner" options={{ headerShown: false }} />
        <Stack.Screen name="forms/return" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/redistribution"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/edit-address"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="forms/dist-time" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/register-offer"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/second-dist"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="forms/signature" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/appreciation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="forms/delivery-code"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="forms/survey" options={{ headerShown: false }} />
        <Stack.Screen
          name="forms/online-reserve"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="forms/register-info"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="contact" options={{ headerShown: false }} />
      </Stack>
      <ToastProvider />
    </TourGuideProvider>
  );
};

export default RootLayout;
