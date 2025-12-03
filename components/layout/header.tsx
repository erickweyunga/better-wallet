import React from "react";
import AppButton from "../ui/app-button";
import AppIcon from "../ui/app-icon";
import AppText from "../ui/app-text";
import AppView from "../ui/app-view";

interface HeaderProps {
  title?: string;
  leadingElement?: React.ReactNode;
  trailingElement?: React.ReactNode;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

export default function Header({
  title = "Header",
  leadingElement,
  trailingElement,
  onBackPress,
  showBackButton = false,
}: HeaderProps) {
  const renderLeading = () => {
    if (leadingElement !== undefined) {
      return leadingElement;
    }

    if (showBackButton) {
      return (
        <AppButton
          radius="full"
          variant="ghost"
          onPress={onBackPress}
          style={{ height: 44, width: 44 }}
          padding="sm"
        >
          <AppIcon name="ArrowLeft" />
        </AppButton>
      );
    }

    return <AppView style={{ width: 44, height: 44 }} />;
  };

  const renderTrailing = () => {
    if (trailingElement !== undefined) {
      return trailingElement;
    }

    return <AppView style={{ width: 44, height: 44 }} />;
  };

  return (
    <AppView
      background="background"
      align="flex-end"
      justify="space-between"
      style={{
        justifyContent: "flex-end",
        minHeight: 96,
      }}
    >
      <AppView
        row
        align="center"
        justify="space-between"
        paddingHorizontal="xs"
      >
        {renderLeading()}

        <AppText
          text="l"
          weight="medium"
          align="center"
          style={{
            flex: 1,
            height: 24,
          }}
          numberOfLines={1}
        >
          {title}
        </AppText>

        {renderTrailing()}
      </AppView>
    </AppView>
  );
}
