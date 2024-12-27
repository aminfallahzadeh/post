// EXPO IMPORTS
import { Stack } from "expo-router";

const CompliantLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="new-complaint-1" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default CompliantLayout;
