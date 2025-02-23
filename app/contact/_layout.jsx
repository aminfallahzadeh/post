// // EXPO
import { Stack } from "expo-router";

const ContactLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ContactLayout;
