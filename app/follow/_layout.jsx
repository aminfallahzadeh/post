// EXPO
import { Stack } from "expo-router";

const FollowLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="order" options={{ headerShown: false }} />
      <Stack.Screen name="complaint" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FollowLayout;
