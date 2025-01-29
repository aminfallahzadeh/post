// NATIVE IMPORTS
import { Stack } from "expo-router";

const RedistributionLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RedistributionLayout;
