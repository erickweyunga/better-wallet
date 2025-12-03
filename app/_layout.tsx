import { useSessionStore } from "@/stores/auth.store";
import { Stack } from "expo-router";

export default function RootLayout() {
  const session = useSessionStore();

  return (
    <Stack>
      <Stack.Protected guard={session.is_logged_in}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session.is_logged_in}>
        <Stack.Screen
          name="(account-verification)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session.is_logged_in}>
        <Stack.Screen
          name="(registration)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session.is_logged_in}>
        <Stack.Screen
          name="(onboarding)"
          options={{
            headerShown: false,
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
