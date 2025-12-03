import AppTheme from "@/constants/theme";
import React from "react";
import { View, ViewStyle } from "react-native";

type SpacingKey = keyof typeof AppTheme.spacing;

interface AppSpaceProps {
  horizontal?: SpacingKey;
  vertical?: SpacingKey;
  size?: SpacingKey;
  flex?: boolean;
  children?: React.ReactNode;
}

export default function AppSpace({
  horizontal,
  vertical,
  size,
  flex,
  children,
}: AppSpaceProps) {
  const { spacing } = AppTheme;

  const style: ViewStyle = {
    ...(horizontal && { width: spacing[horizontal] }),
    ...(vertical && { height: spacing[vertical] }),
    ...(size &&
      !horizontal &&
      !vertical && {
        width: spacing[size],
        height: spacing[size],
      }),
    ...(flex && { flex: 1 }),
  };

  return <View style={style}>{children}</View>;
}
