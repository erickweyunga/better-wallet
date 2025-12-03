import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Pressable, View, ViewStyle } from "react-native";
import AppIcon from "./app-icon";
import AppText from "./app-text";

type SpacingKey = keyof typeof AppTheme.spacing;
type RadiusKey = keyof typeof AppTheme.radius;

interface AppChipProps {
  label: string;
  variant?: "filled" | "outlined";
  selected?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  removable?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  background?: string;
  selectedBackground?: string;
  textColor?: string;
  selectedTextColor?: string;
  borderColor?: string;
  padding?: SpacingKey;
  radius?: RadiusKey;
  style?: ViewStyle;
}

export default function AppChip({
  label,
  variant = "filled",
  selected = false,
  disabled = false,
  leftIcon,
  rightIcon,
  removable = false,
  onPress,
  onRemove,
  background,
  selectedBackground,
  textColor,
  selectedTextColor,
  borderColor,
  padding = "sm",
  radius = "full",
  style,
}: AppChipProps) {
  const theme = useTheme();
  const { spacing, radius: radiusValues } = AppTheme;

  const backgroundColor = selected
    ? (selectedBackground ?? theme.primary.DEFAULT)
    : (background ??
      (variant === "filled" ? theme.neutral[200] : "transparent"));

  const color = selected
    ? (selectedTextColor ?? theme.neutral[0])
    : (textColor ?? theme.text.primary);

  const chipStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[padding],
    paddingVertical: spacing[padding],
    borderRadius: radiusValues[radius],
    backgroundColor,
    gap: spacing.xs,
    ...(variant === "outlined" && {
      borderWidth: 1,
      borderColor: borderColor ?? theme.border,
    }),
    ...(disabled && { opacity: 0.5 }),
  };

  const content = (
    <>
      {leftIcon && <View>{leftIcon}</View>}
      <AppText text="s" weight="medium" color={color}>
        {label}
      </AppText>
      {rightIcon && <View>{rightIcon}</View>}
      {removable && (
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          hitSlop={8}
          disabled={disabled}
        >
          <AppIcon name="XMark" size={14} color={color} />
        </Pressable>
      )}
    </>
  );

  if (onPress && !disabled) {
    return (
      <Pressable onPress={onPress} style={[chipStyle, style]}>
        {content}
      </Pressable>
    );
  }

  return <View style={[chipStyle, style]}>{content}</View>;
}
