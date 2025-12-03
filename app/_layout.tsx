import { useSessionStore } from "@/stores/auth.store";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  const session = useSessionStore();

  const isAuthenticated = session.is_logged_in;
  const hasCompletedOnboarding = session.has_completed_onboarding;

  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Protected guard={isAuthenticated && hasCompletedOnboarding}>
          <Stack.Screen
            name="(protected)"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Protected>

        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen
            name="(onboarding)"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated && hasCompletedOnboarding}>
          <Stack.Screen
            name="(account-verification)"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated && hasCompletedOnboarding}>
          <Stack.Screen
            name="(registration)"
            options={{
              headerShown: false,
            }}
          />
        </Stack.Protected>

        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </KeyboardProvider>
  );
}
