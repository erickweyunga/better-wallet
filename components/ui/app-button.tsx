import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
  ViewStyle,
} from "react-native";
import AppText from "./app-text";

type ButtonVariant = "filled" | "outlined" | "ghost";
type SpacingKey = keyof typeof AppTheme.spacing;
type RadiusKey = keyof typeof AppTheme.radius;

interface AppButtonProps extends Omit<PressableProps, "style"> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  background?: keyof ReturnType<typeof useTheme>;
  textColor?: string;
  borderColor?: string;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  padding?: SpacingKey;
  paddingHorizontal?: SpacingKey;
  paddingVertical?: SpacingKey;
  radius?: RadiusKey;
  fullWidth?: boolean;
  style?: PressableProps["style"];
}

export default function AppButton({
  children,
  variant = "filled",
  background = "primary",
  textColor,
  borderColor,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  padding,
  paddingHorizontal = "xl",
  paddingVertical = "lg",
  radius = "full",
  fullWidth = false,
  style,
  onPress,
  ...rest
}: AppButtonProps) {
  const theme = useTheme();
  const { spacing, radius: radiusValues, typography } = AppTheme;

  const isDisabled = disabled || loading;
  const backgroundColor = getBackgroundColor(theme, background);

  const buttonStyle: ViewStyle = {
    borderRadius: radiusValues[radius],
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    flexDirection: "row",
    ...(fullWidth && { width: "100%" }),
    ...(padding && { padding: spacing[padding] }),
    ...(paddingHorizontal && { paddingHorizontal: spacing[paddingHorizontal] }),
    ...(paddingVertical && { paddingVertical: spacing[paddingVertical] }),
    ...(variant === "filled" && { backgroundColor }),
    ...(variant === "outlined" && {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: borderColor ?? backgroundColor,
    }),
    ...(variant === "ghost" && { backgroundColor: "transparent" }),
  };

  const resolvedTextColor =
    textColor ?? getDefaultTextColor(variant, theme, background);
  const loaderColor = variant === "filled" ? theme.neutral[0] : backgroundColor;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={(state) => [
        buttonStyle,
        {
          opacity: isDisabled ? 0.5 : state.pressed ? 0.8 : 1,
        },
        typeof style === "function" ? style(state) : style,
      ]}
      android_ripple={{
        color: variant === "filled" ? "#ffffff40" : backgroundColor + "40",
      }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} size="small" />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.sm,
          }}
        >
          {leftIcon && <View>{leftIcon}</View>}
          {typeof children === "string" ? (
            <AppText
              text="m"
              weight="medium"
              color={resolvedTextColor}
              style={{
                fontSize: typography.button.cta1.fontSize,
                lineHeight: typography.button.cta1.lineHeight,
                fontWeight: typography.button.cta1.fontWeight,
              }}
            >
              {children}
            </AppText>
          ) : (
            children
          )}
          {rightIcon && <View>{rightIcon}</View>}
        </View>
      )}
    </Pressable>
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

  return theme.primary.DEFAULT;
}

function getDefaultTextColor(
  variant: ButtonVariant,
  theme: ReturnType<typeof useTheme>,
  background: string
): string {
  if (variant === "filled") {
    return theme.neutral[0];
  }

  if (variant === "outlined" || variant === "ghost") {
    return getBackgroundColor(theme, background);
  }

  return theme.text.primary;
}
