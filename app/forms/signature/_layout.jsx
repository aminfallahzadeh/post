// EXPO IMPORTS
import { Stack } from "expo-router";

const SignatureLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SignatureLayout;
