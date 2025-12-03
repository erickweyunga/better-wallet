import { IconName } from "@/assets/icons/icons";
import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React, { forwardRef, useState } from "react";
import {
  Pressable,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import AppIcon from "./app-icon";
import AppSpace from "./app-space";
import AppText from "./app-text";

type SpacingKey = keyof typeof AppTheme.spacing;
type RadiusKey = keyof typeof AppTheme.radius;
type TextVariant = "xl" | "l" | "m" | "s" | "xs";

interface AppInputProps extends Omit<TextInputProps, "placeholderTextColor"> {
  label?: string;
  labelVariant?: TextVariant;
  error?: string;
  errorVariant?: TextVariant;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  variant?: "outlined" | "filled";
  disabled?: boolean;
  clearable?: boolean;
  padding?: SpacingKey;
  radius?: RadiusKey;
  background?: string;
  borderColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
  textColor?: string;
  textVariant?: TextVariant;
}

const AppInput = forwardRef<TextInput, AppInputProps>(
  (
    {
      label,
      labelVariant = "s",
      error,
      errorVariant = "s",
      leftIcon,
      rightIcon,
      onRightIconPress,
      variant = "outlined",
      disabled = false,
      clearable = true,
      padding = "lg",
      radius = "lg",
      background,
      borderColor,
      focusBorderColor,
      errorBorderColor,
      textColor,
      textVariant = "m",
      value,
      onChangeText,
      secureTextEntry,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const { spacing, radius: radiusValues, typography } = AppTheme;
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const hasValue = value !== undefined && value !== null && value !== "";
    const showClear = clearable && hasValue && !secureTextEntry;
    const showEye = secureTextEntry;

    const resolvedBorderColor = error
      ? (errorBorderColor ?? theme.error.DEFAULT)
      : isFocused
        ? (focusBorderColor ?? theme.primary.DEFAULT)
        : (borderColor ?? theme.inputBorder);

    const backgroundColor =
      background ?? (variant === "filled" ? theme.surface : "transparent");

    const containerStyle: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: radiusValues[radius],
      paddingHorizontal: spacing[padding],
      minHeight: 56,
      backgroundColor,
      ...(variant === "outlined" && {
        borderWidth: 1.5,
        borderColor: resolvedBorderColor,
      }),
      ...(disabled && { opacity: 0.6 }),
    };

    const inputTextStyle = typography.text[textVariant].regular;

    return (
      <View style={{ width: "100%" }}>
        {label && (
          <>
            <AppText
              text={labelVariant}
              weight="medium"
              color={error ? theme.error.DEFAULT : theme.text.primary}
            >
              {label}
            </AppText>
            <AppSpace vertical="xs" />
          </>
        )}

        <View style={containerStyle}>
          {leftIcon && (
            <>
              <AppIcon
                name={leftIcon}
                size={20}
                color={error ? theme.error.DEFAULT : theme.text.secondary}
              />
              <AppSpace horizontal="sm" />
            </>
          )}

          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={theme.text.tertiary}
            secureTextEntry={secureTextEntry && !showPassword}
            editable={!disabled}
            onFocus={(e) => {
              setIsFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              rest.onBlur?.(e);
            }}
            style={{
              flex: 1,
              fontFamily: typography.fontFamily,
              fontSize: inputTextStyle.fontSize,
              lineHeight: inputTextStyle.lineHeight,
              fontWeight: inputTextStyle.fontWeight,
              color: textColor ?? theme.text.primary,
              paddingVertical: spacing.md,
            }}
            {...rest}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.sm,
              paddingLeft: spacing.sm,
            }}
          >
            {showClear && (
              <Pressable onPress={() => onChangeText?.("")} hitSlop={10}>
                <AppIcon name="XMark" size={20} color={theme.text.secondary} />
              </Pressable>
            )}

            {showEye && (
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                hitSlop={10}
              >
                <AppIcon
                  name={showPassword ? "EyeOff" : "EyeOpen"}
                  size={20}
                  color={theme.text.secondary}
                />
              </Pressable>
            )}

            {rightIcon && (
              <Pressable
                onPress={onRightIconPress}
                disabled={!onRightIconPress}
                hitSlop={10}
              >
                <AppIcon
                  name={rightIcon}
                  size={20}
                  color={error ? theme.error.DEFAULT : theme.text.secondary}
                />
              </Pressable>
            )}
          </View>
        </View>

        {error && (
          <>
            <AppSpace vertical="xs" />
            <AppText text={errorVariant} color={theme.error.DEFAULT}>
              {error}
            </AppText>
          </>
        )}
      </View>
    );
  },
);

AppInput.displayName = "AppInput";

export default AppInput;
