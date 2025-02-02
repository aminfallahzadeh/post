// IMPORTS
import { Stack } from "expo-router";

const PostalCodeGeoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="geo-step-1" options={{ headerShown: false }} />
      <Stack.Screen name="geo-step-2" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PostalCodeGeoLayout;
