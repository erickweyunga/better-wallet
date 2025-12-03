import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
} from "react-native";

type SpacingKey = keyof typeof AppTheme.spacing;

interface AppScrollableProps extends Omit<ScrollViewProps, "refreshControl"> {
  children: React.ReactNode;
  padding?: SpacingKey;
  paddingHorizontal?: SpacingKey;
  paddingVertical?: SpacingKey;
  paddingTop?: SpacingKey;
  paddingBottom?: SpacingKey;
  background?: keyof ReturnType<typeof useTheme>;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  stickyHeaderIndices?: number[];
  showsVerticalScrollIndicator?: boolean;
  keyboardAvoiding?: boolean;
  safe?: boolean;
}

export default function AppScrollable({
  children,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  background,
  refreshControl,
  stickyHeaderIndices,
  showsVerticalScrollIndicator = false,
  keyboardAvoiding = false,
  safe = false,
  style,
  contentContainerStyle,
  ...rest
}: AppScrollableProps) {
  const theme = useTheme();
  const { spacing } = AppTheme;

  const contentPaddingStyle: ViewStyle = {
    ...(padding && { padding: spacing[padding] }),
    ...(paddingHorizontal && { paddingHorizontal: spacing[paddingHorizontal] }),
    ...(paddingVertical && { paddingVertical: spacing[paddingVertical] }),
    ...(paddingTop && { paddingTop: spacing[paddingTop] }),
    ...(paddingBottom && { paddingBottom: spacing[paddingBottom] }),
  };

  const backgroundColor = background
    ? getBackgroundColor(theme, background)
    : undefined;

  const scrollContent = (
    <ScrollView
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      stickyHeaderIndices={stickyHeaderIndices}
      refreshControl={refreshControl}
      keyboardShouldPersistTaps="handled"
      {...rest}
      style={[{ flex: 1 }, backgroundColor && { backgroundColor }, style]}
      contentContainerStyle={[contentPaddingStyle, contentContainerStyle]}
    >
      {children}
    </ScrollView>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {scrollContent}
      </KeyboardAvoidingView>
    );
  }

  return scrollContent;
}

function getBackgroundColor(
  theme: ReturnType<typeof useTheme>,
  key: string,
): string {
  const value = (theme as any)[key];

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value.DEFAULT) {
    return value.DEFAULT;
  }

  return "transparent";
}
