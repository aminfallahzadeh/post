// // EXPO
import { Stack } from "expo-router";

const WaitingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default WaitingLayout;
