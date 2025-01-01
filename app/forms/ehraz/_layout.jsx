// IMPORTS
import { Stack } from "expo-router";

const FollowLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ehraz-step-1" options={{ headerShown: false }} />
      <Stack.Screen name="ehraz-step-2" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FollowLayout;
