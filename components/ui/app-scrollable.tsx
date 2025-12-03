import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import {
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  keyboardAware?: boolean;
  bottomOffset?: number;
  safeTop?: boolean;
  safeBottom?: boolean;
}

export default function AppScrollable({
  children,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  background = "background",
  refreshControl,
  stickyHeaderIndices,
  showsVerticalScrollIndicator = false,
  keyboardAware = false,
  bottomOffset = 0,
  safeTop = false,
  safeBottom = false,
  style,
  contentContainerStyle,
  ...rest
}: AppScrollableProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { spacing } = AppTheme;

  const contentPaddingStyle: ViewStyle = {
    ...(padding && { padding: spacing[padding] }),
    ...(paddingHorizontal && { paddingHorizontal: spacing[paddingHorizontal] }),
    ...(paddingVertical && { paddingVertical: spacing[paddingVertical] }),
    ...(paddingTop && { paddingTop: spacing[paddingTop] }),
    ...(paddingBottom && { paddingBottom: spacing[paddingBottom] }),
    ...(safeTop && {
      paddingTop: (spacing[paddingTop as SpacingKey] || 0) + insets.top,
    }),
    ...(safeBottom && {
      paddingBottom:
        (spacing[paddingBottom as SpacingKey] || 0) + insets.bottom,
    }),
  };

  const backgroundColor = background
    ? getBackgroundColor(theme, background)
    : undefined;

  const commonProps = {
    showsVerticalScrollIndicator,
    stickyHeaderIndices,
    refreshControl,
    keyboardShouldPersistTaps: "handled" as const,
    style: [{ flex: 1 }, backgroundColor && { backgroundColor }, style],
    contentContainerStyle: [contentPaddingStyle, contentContainerStyle],
    ...rest,
  };

  if (keyboardAware) {
    return (
      <KeyboardAwareScrollView bottomOffset={bottomOffset} {...commonProps}>
        {children}
      </KeyboardAwareScrollView>
    );
  }

  return <ScrollView {...commonProps}>{children}</ScrollView>;
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
