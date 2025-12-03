import Header from "@/components/layout/header";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header title="Messages" />,
        }}
      />
    </Stack>
  );
}
