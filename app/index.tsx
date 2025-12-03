import AppScrollable from "@/components/ui/app-scrollable";
import AppText from "@/components/ui/app-text";
import AppView from "@/components/ui/app-view";
import React from "react";

export default function Index() {
  return (
    <AppScrollable contentContainerStyle={{ flex: 1 }}>
      <AppView flex>
        <AppText>Hello</AppText>
      </AppView>
    </AppScrollable>
  );
}
