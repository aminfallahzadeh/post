// NATIVE IMPORTS
import { Stack } from "expo-router";

const PostalCodeCertificateLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="yafte-step-1" options={{ headerShown: false }} />
      <Stack.Screen name="yafte-step-2" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PostalCodeCertificateLayout;
