import Header from "@/components/layout/header";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: ({ navigation }) => (
            <Header
              title=""
              showBackButton
              onBackPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="verify-otp"
        options={{
          header: ({ navigation }) => (
            <Header
              title=""
              showBackButton
              onBackPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </Stack>
  );
}
