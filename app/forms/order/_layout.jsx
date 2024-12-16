// IMPORTS
import { Stack } from "expo-router";

const OrderLayout = () => {
  return (
    <Stack options={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="order-step-1" options={{ headerShown: false }} />
      <Stack.Screen name="order-step-2" options={{ headerShown: false }} />
      <Stack.Screen name="order-step-3" options={{ headerShown: false }} />
      <Stack.Screen name="order-step-4" options={{ headerShown: false }} />
      <Stack.Screen name="order-step-5" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OrderLayout;
