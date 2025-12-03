import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppText from "./app-text";

type BadgeVariant = "dot" | "numeric" | "text";
type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";
type SpacingKey = keyof typeof AppTheme.spacing;

interface AppBadgeProps {
  children?: React.ReactNode;
  variant?: BadgeVariant;
  content?: string | number;
  max?: number;
  background?: string;
  textColor?: string;
  size?: number;
  position?: BadgePosition;
  offset?: SpacingKey;
  show?: boolean;
  style?: ViewStyle;
}

export default function AppBadge({
  children,
  variant = "numeric",
  content,
  max = 99,
  background,
  textColor,
  size = 20,
  position = "top-right",
  offset = "xs",
  show = true,
  style,
}: AppBadgeProps) {
  const theme = useTheme();
  const { spacing } = AppTheme;

  if (!show) {
    return <>{children}</>;
  }

  const backgroundColor = background ?? theme.error.DEFAULT;
  const color = textColor ?? theme.neutral[0];

  const displayContent = (() => {
    if (variant === "dot") return null;
    if (typeof content === "number" && content > max) return `${max}+`;
    return content?.toString() ?? "";
  })();

  const badgeSize = variant === "dot" ? size * 0.4 : size;

  const positionStyles: ViewStyle = (() => {
    const offsetValue = spacing[offset];
    switch (position) {
      case "top-right":
        return { top: -offsetValue, right: -offsetValue };
      case "top-left":
        return { top: -offsetValue, left: -offsetValue };
      case "bottom-right":
        return { bottom: -offsetValue, right: -offsetValue };
      case "bottom-left":
        return { bottom: -offsetValue, left: -offsetValue };
    }
  })();

  const badgeStyle: ViewStyle = {
    position: "absolute",
    backgroundColor,
    minWidth: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: variant === "text" ? spacing.xs : 0,
    ...positionStyles,
  };

  if (!children) {
    return (
      <View style={[badgeStyle, style]}>
        {displayContent && (
          <AppText
            text="xs"
            weight="medium"
            color={color}
            style={{ fontSize: size * 0.5, lineHeight: size * 0.6 }}
          >
            {displayContent}
          </AppText>
        )}
      </View>
    );
  }

  return (
    <View style={{ position: "relative" }}>
      {children}
      <View style={[badgeStyle, style]}>
        {displayContent && (
          <AppText
            text="xs"
            weight="medium"
            color={color}
            style={{ fontSize: size * 0.5, lineHeight: size * 0.6 }}
          >
            {displayContent}
          </AppText>
        )}
      </View>
    </View>
  );
}
