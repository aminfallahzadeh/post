// NATIVE IMPORTS
import { Stack } from "expo-router";

const PostalCodeCertificateLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="certificate-step-1"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="certificate-step-2"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default PostalCodeCertificateLayout;
