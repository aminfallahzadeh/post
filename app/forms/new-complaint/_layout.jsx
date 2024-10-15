// EXPO IMPORTS
import { Stack } from "expo-router";

const CompliantLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="step1" options={{ headerShown: false }} />
      <Stack.Screen name="step2" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CompliantLayout;
