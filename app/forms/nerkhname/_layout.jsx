// IMPORTS
import { Stack } from "expo-router";

const NerkhnameLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="nerkhname-step-2" options={{ headerShown: false }} />
    </Stack>
  );
};

export default NerkhnameLayout;
