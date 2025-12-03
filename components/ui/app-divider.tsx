import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { View, ViewStyle } from "react-native";
import AppSpace from "./app-space";
import AppText from "./app-text";

type DividerOrientation = "horizontal" | "vertical";
type DividerVariant = "solid" | "dashed" | "dotted";
type SpacingKey = keyof typeof AppTheme.spacing;
type HeadingVariant = "xl" | "l" | "m" | "s" | "xs";
type TextVariant = "xl" | "l" | "m" | "s" | "xs";

interface AppDividerProps {
  orientation?: DividerOrientation;
  thickness?: number;
  color?: keyof ReturnType<typeof useTheme>;
  variant?: DividerVariant;
  text?: string;
  textVariant?: TextVariant;
  textHeading?: HeadingVariant;
  textColor?: string;
  margin?: SpacingKey;
  style?: ViewStyle;
}

export default function AppDivider({
  orientation = "horizontal",
  thickness = 1,
  color,
  variant = "solid",
  text,
  textVariant = "s",
  textHeading,
  textColor,
  margin,
  style,
}: AppDividerProps) {
  const theme = useTheme();
  const isHorizontal = orientation === "horizontal";
  const { spacing } = AppTheme;

  const resolvedMargin = margin ? spacing[margin] : 0;
  const dividerColor = getBackgroundColor(theme, color!) ?? theme.divider;

  const baseStyle: ViewStyle = {
    backgroundColor: dividerColor,
    ...(variant === "dashed" && {
      borderStyle: "dashed",
      borderWidth: thickness,
      borderColor: dividerColor,
      backgroundColor: "transparent",
    }),
    ...(variant === "dotted" && {
      borderStyle: "dotted",
      borderWidth: thickness,
      borderColor: dividerColor,
      backgroundColor: "transparent",
    }),
  };

  if (text) {
    return (
      <View
        style={[
          {
            flexDirection: isHorizontal ? "row" : "column",
            alignItems: "center",
          },
          isHorizontal
            ? { marginVertical: resolvedMargin }
            : { marginHorizontal: resolvedMargin },
        ]}
      >
        <View
          style={[
            { flex: 1 },
            baseStyle,
            isHorizontal ? { height: thickness } : { width: thickness },
          ]}
        />
        <AppSpace
          horizontal={isHorizontal ? "md" : undefined}
          vertical={!isHorizontal ? "md" : undefined}
        />
        <AppText
          heading={textHeading}
          text={textVariant}
          color={textColor ?? theme.text.secondary}
        >
          {text}
        </AppText>
        <AppSpace
          horizontal={isHorizontal ? "md" : undefined}
          vertical={!isHorizontal ? "md" : undefined}
        />
        <View
          style={[
            { flex: 1 },
            baseStyle,
            isHorizontal ? { height: thickness } : { width: thickness },
          ]}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        isHorizontal
          ? { height: thickness, marginVertical: resolvedMargin }
          : { width: thickness, marginHorizontal: resolvedMargin },
        baseStyle,
        style,
      ]}
    />
  );
}

function getBackgroundColor(
  theme: ReturnType<typeof useTheme>,
  key: string
): string {
  const value = (theme as any)[key];

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value.DEFAULT) {
    return value.DEFAULT;
  }

  return theme.border;
}
