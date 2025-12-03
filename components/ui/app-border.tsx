import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";

type BorderRadius = keyof typeof AppTheme.radius;
type BorderWidth = keyof typeof AppTheme.borderWidth;

interface AppBorderProps extends Omit<ViewProps, "style"> {
  children?: React.ReactNode;
  radius?: BorderRadius;
  width?: BorderWidth;
  color?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  dashed?: boolean;
  dotted?: boolean;
  style?: ViewProps["style"];
}

export default function AppBorder({
  children,
  radius = "md",
  width = "hairline",
  color,
  top,
  bottom,
  left,
  right,
  dashed = false,
  dotted = false,
  style,
  ...rest
}: AppBorderProps) {
  const theme = useTheme();
  const { radius: radii, borderWidth } = AppTheme;

  const resolvedRadius = radii[radius];
  const resolvedWidth = borderWidth[width];
  const borderColor = color ?? theme.border;

  const hasSideSpecific =
    top !== undefined ||
    bottom !== undefined ||
    left !== undefined ||
    right !== undefined;

  const borderStyle: ViewStyle = {
    borderRadius: resolvedRadius,
    borderColor,
    ...(dashed && { borderStyle: "dashed" }),
    ...(dotted && { borderStyle: "dotted" }),
    ...(!hasSideSpecific && { borderWidth: resolvedWidth }),
    ...(top && { borderTopWidth: resolvedWidth }),
    ...(bottom && { borderBottomWidth: resolvedWidth }),
    ...(left && { borderLeftWidth: resolvedWidth }),
    ...(right && { borderRightWidth: resolvedWidth }),
  };

  return (
    <View style={[borderStyle, style]} {...rest}>
      {children}
    </View>
  );
}
