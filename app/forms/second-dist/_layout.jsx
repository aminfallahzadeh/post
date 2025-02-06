// IMPORTS
import { Stack } from "expo-router";

const SecondDistLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SecondDistLayout;
