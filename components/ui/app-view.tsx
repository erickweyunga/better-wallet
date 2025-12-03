import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useHeaderHeight } from "@react-navigation/elements";
import React, { useMemo } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type SpacingKey = keyof typeof AppTheme.spacing;

interface AppViewProps extends ViewProps {
  children?: React.ReactNode;
  flex?: boolean;
  row?: boolean;
  center?: boolean;
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  padding?: SpacingKey;
  paddingHorizontal?: SpacingKey;
  paddingVertical?: SpacingKey;
  paddingTop?: SpacingKey;
  paddingBottom?: SpacingKey;
  paddingLeft?: SpacingKey;
  paddingRight?: SpacingKey;
  margin?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
  marginTop?: SpacingKey;
  marginBottom?: SpacingKey;
  marginLeft?: SpacingKey;
  marginRight?: SpacingKey;
  gap?: SpacingKey;
  radius?: keyof typeof AppTheme.radius;
  background?: keyof ReturnType<typeof useTheme>;
  safe?: boolean;
  safeFromHeader?: boolean;
}

export default function AppView({
  children,
  flex,
  row,
  center,
  justify,
  align,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginHorizontal,
  marginVertical,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  gap,
  radius,
  background,
  safe = false,
  safeFromHeader = false,
  style,
  ...rest
}: AppViewProps) {
  const theme = useTheme();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { spacing, radius: radiusValues } = AppTheme;

  const backgroundColor = useMemo(() => {
    return background ? getBackgroundColor(theme, background) : undefined;
  }, [theme, background]);

  const viewStyle: ViewStyle = useMemo(
    () => ({
      ...(flex && { flex: 1 }),
      ...(row && { flexDirection: "row" }),
      ...(center && { justifyContent: "center", alignItems: "center" }),
      ...(justify && { justifyContent: justify }),
      ...(align && { alignItems: align }),
      ...(padding && { padding: spacing[padding] }),
      ...(paddingHorizontal && {
        paddingHorizontal: spacing[paddingHorizontal],
      }),
      ...(paddingVertical && { paddingVertical: spacing[paddingVertical] }),
      ...(paddingTop && { paddingTop: spacing[paddingTop] }),
      ...(paddingBottom && { paddingBottom: spacing[paddingBottom] }),
      ...(paddingLeft && { paddingLeft: spacing[paddingLeft] }),
      ...(paddingRight && { paddingRight: spacing[paddingRight] }),
      ...(margin && { margin: spacing[margin] }),
      ...(marginHorizontal && { marginHorizontal: spacing[marginHorizontal] }),
      ...(marginVertical && { marginVertical: spacing[marginVertical] }),
      ...(marginTop && { marginTop: spacing[marginTop] }),
      ...(marginBottom && { marginBottom: spacing[marginBottom] }),
      ...(marginLeft && { marginLeft: spacing[marginLeft] }),
      ...(marginRight && { marginRight: spacing[marginRight] }),
      ...(gap && { gap: spacing[gap] }),
      ...(radius && { borderRadius: radiusValues[radius] }),
      ...(backgroundColor && { backgroundColor }),
      ...(safeFromHeader && { paddingTop: headerHeight }),
      ...(safe && safeFromHeader && { paddingBottom: insets.bottom }),
    }),
    [
      flex,
      row,
      center,
      justify,
      align,
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      margin,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      gap,
      radius,
      backgroundColor,
      headerHeight,
      insets.bottom,
      safe,
      safeFromHeader,
      spacing,
      radiusValues,
    ],
  );

  const Container = safe && !safeFromHeader ? SafeAreaView : View;

  return (
    <Container style={[viewStyle, style]} {...rest}>
      {children}
    </Container>
  );
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
