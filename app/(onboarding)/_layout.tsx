import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding-one" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding-two" options={{ headerShown: false }} />
    </Stack>
  );
}
