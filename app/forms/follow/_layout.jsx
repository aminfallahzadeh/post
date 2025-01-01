// EXPO
import { Stack } from "expo-router";

const FollowLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default FollowLayout;
