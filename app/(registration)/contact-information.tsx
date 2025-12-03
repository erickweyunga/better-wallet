import AppButton from "@/components/ui/app-button";
import AppIcon from "@/components/ui/app-icon";
import AppScrollable from "@/components/ui/app-scrollable";
import AppText from "@/components/ui/app-text";
import AppView from "@/components/ui/app-view";
import { useTheme } from "@/hooks/use-theme";
import { router } from "expo-router";
import React from "react";

export default function Page() {
  const theme = useTheme();

  const handleNext = () => {
    router.push("/(registration)");
  };

  return (
    <AppScrollable
      contentContainerStyle={{ flex: 1 }}
      safeBottom
      paddingHorizontal="lg"
      keyboardAware
    >
      <AppView align="center" gap="sm">
        <AppText heading="s" align="center">
          Enter your contact information
        </AppText>
      </AppView>
      <AppView flex paddingVertical="huge"></AppView>
      <AppView align="center" gap="xl">
        <AppButton
          fullWidth
          rightIcon={<AppIcon name="ArrowRight" color={theme.text.primary} />}
          onPress={handleNext}
        >
          Next
        </AppButton>
      </AppView>
    </AppScrollable>
  );
}
