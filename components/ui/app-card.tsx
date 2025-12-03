import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Platform, TouchableOpacity, View, ViewStyle } from "react-native";

type SpacingKey = keyof typeof AppTheme.spacing;
type RadiusKey = keyof typeof AppTheme.radius;

interface AppCardProps {
  children?: React.ReactNode;
  elevated?: boolean;
  outlined?: boolean;
  background?: keyof ReturnType<typeof useTheme>;
  padding?: SpacingKey;
  paddingHorizontal?: SpacingKey;
  paddingVertical?: SpacingKey;
  margin?: SpacingKey;
  marginHorizontal?: SpacingKey;
  marginVertical?: SpacingKey;
  radius?: RadiusKey;
  borderColor?: string;
  borderWidth?: keyof typeof AppTheme.borderWidth;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export default function AppCard({
  children,
  elevated = false,
  outlined = false,
  background = "surface",
  padding,
  paddingHorizontal,
  paddingVertical,
  margin,
  marginHorizontal,
  marginVertical,
  radius = "lg",
  borderColor,
  borderWidth = "thin",
  onPress,
  disabled = false,
  style,
  ...rest
}: AppCardProps) {
  const theme = useTheme();
  const {
    spacing,
    radius: radiusValues,
    borderWidth: borderWidthValues,
  } = AppTheme;

  const backgroundColor = getBackgroundColor(theme, background);

  const cardStyle: ViewStyle = {
    borderRadius: radiusValues[radius],
    backgroundColor,
    ...(padding && { padding: spacing[padding] }),
    ...(paddingHorizontal && { paddingHorizontal: spacing[paddingHorizontal] }),
    ...(paddingVertical && { paddingVertical: spacing[paddingVertical] }),
    ...(margin && { margin: spacing[margin] }),
    ...(marginHorizontal && { marginHorizontal: spacing[marginHorizontal] }),
    ...(marginVertical && { marginVertical: spacing[marginVertical] }),
    ...(outlined && {
      borderWidth: borderWidthValues[borderWidth],
      borderColor: borderColor ?? theme.border,
    }),
    ...(elevated && {
      ...Platform.select({
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
        },
        android: {
          elevation: 8,
        },
      }),
    }),
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[cardStyle, style]}
      {...rest}
    >
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
