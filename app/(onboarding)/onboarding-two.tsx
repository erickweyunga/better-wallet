import AppButton from "@/components/ui/app-button";
import AppDivider from "@/components/ui/app-divider";
import AppIcon from "@/components/ui/app-icon";
import AppText from "@/components/ui/app-text";
import AppView from "@/components/ui/app-view";
import { useSessionStore } from "@/stores/auth.store";
import React from "react";
import { Image } from "react-native";

export default function Index() {
  const session = useSessionStore();

  return (
    <AppView background="background" flex padding="lg">
      <AppView flex justify="center" align="center" paddingTop="huge">
        <Image source={require("@assets/images/illustration-two.png")} />
      </AppView>
      <AppView paddingVertical="xl" gap="md">
        <AppText heading="m">Easy banking.</AppText>
        <AppText text="m">
          Forget everything you know about the chaotic world of finance. It can
          be easy.
        </AppText>

        <AppView row align="center" justify="space-between">
          <AppView row align="center" justify="space-between" gap="xs">
            <AppDivider
              thickness={10}
              style={{ width: 20, borderRadius: 100 }}
            />
            <AppDivider
              thickness={10}
              style={{ width: 20, borderRadius: 100 }}
            />
            <AppDivider
              thickness={10}
              color="primary"
              style={{ width: 50, borderRadius: 100 }}
            />
          </AppView>
          <AppButton
            style={{ height: 44, width: 44 }}
            onPress={() => session.complete_onboarding()}
          >
            <AppIcon name="ChevronForward" />
          </AppButton>
        </AppView>
      </AppView>
    </AppView>
  );
}
