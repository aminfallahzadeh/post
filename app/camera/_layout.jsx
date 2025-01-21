// // EXPO
import { Stack } from "expo-router";

const CameraLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default CameraLayout;
