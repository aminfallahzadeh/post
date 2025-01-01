// NATIVE IMPORTS
import { Stack } from "expo-router";

const PostalCodeGeoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="postcode-request-step-1"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="postcode-request-step-2"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default PostalCodeGeoLayout;
