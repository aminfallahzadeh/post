// IMPORTS
import { Stack } from "expo-router";

const NewPostFormLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="nerkhname-step-1" options={{ headerShown: false }} />
      <Stack.Screen name="nerkhname-step-2" options={{ headerShown: false }} />
      <Stack.Screen name="nerkhname-step-3" options={{ headerShown: false }} />
      <Stack.Screen name="nerkhname-step-4" options={{ headerShown: false }} />
      <Stack.Screen name="nerkhname-step-5" options={{ headerShown: false }} />
    </Stack>
  );
};

export default NewPostFormLayout;
