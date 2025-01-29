// NATIVE IMPORTS
import { Stack } from "expo-router";

const ReturnLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ReturnLayout;
