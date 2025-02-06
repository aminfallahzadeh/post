// IMPORTS
import { Stack } from "expo-router";

const SurveyLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SurveyLayout;
