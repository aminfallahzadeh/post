// NATIVE IMPROTS
import { Stack } from "expo-router";

const PostalCodeCertificateLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="step2" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PostalCodeCertificateLayout;
