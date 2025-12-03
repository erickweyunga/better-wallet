import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { CountryCode } from "@perttu/react-native-country-picker-modal";
import PhoneInput from "@perttu/react-native-phone-number-input";
import React, { forwardRef, useState } from "react";
import { useColorScheme, View, ViewStyle } from "react-native";
import AppSpace from "./app-space";
import AppText from "./app-text";

type SpacingKey = keyof typeof AppTheme.spacing;
type RadiusKey = keyof typeof AppTheme.radius;
type TextVariant = "xl" | "l" | "m" | "s" | "xs";

interface AppPhoneInputProps {
  label?: string;
  labelVariant?: TextVariant;
  error?: string;
  errorVariant?: TextVariant;
  defaultCode?: CountryCode;
  defaultValue?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onChangeFormattedText?: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  padding?: SpacingKey;
  radius?: RadiusKey;
  background?: string;
  borderColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
  textColor?: string;
  textVariant?: TextVariant;
}

export interface AppPhoneInputRef {
  getCountryCode: () => CountryCode;
  getCallingCode: () => string | undefined;
  getNumberAfterPossiblyEliminatingZero: () => {
    number: string;
    formattedNumber: string;
  };
  isValidNumber: (number: string) => boolean;
}

const AppPhoneInput = forwardRef<PhoneInput, AppPhoneInputProps>(
  (
    {
      label,
      labelVariant = "s",
      error,
      errorVariant = "s",
      defaultCode = "TZ",
      defaultValue,
      value,
      onChangeText,
      onChangeFormattedText,
      disabled = false,
      placeholder = "Phone number",
      padding = "xs",
      radius = "lg",
      background,
      borderColor,
      focusBorderColor,
      errorBorderColor,
      textColor,
      textVariant = "m",
    },
    ref
  ) => {
    const theme = useTheme();
    const color = useColorScheme();
    const { spacing, radius: radiusValues, typography } = AppTheme;
    const [isFocused, setIsFocused] = useState(false);

    const is_dark = color === "dark";

    const resolvedBorderColor = error
      ? errorBorderColor ?? theme.error.DEFAULT
      : isFocused
      ? focusBorderColor ?? theme.primary.DEFAULT
      : borderColor ?? theme.inputBorder;

    const backgroundColor = background ?? "transparent";
    const inputTextStyle = typography.text[textVariant].regular;

    const containerStyle: ViewStyle = {
      width: "100%",
      borderRadius: radiusValues[radius],
      paddingHorizontal: spacing[padding],
      minHeight: 56,
      backgroundColor,
      borderWidth: 1.5,
      borderColor: resolvedBorderColor,
      justifyContent: "center",
    };

    const textContainerStyle: ViewStyle = {
      flex: 1,
      backgroundColor: "transparent",
      paddingVertical: 0,
    };

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

        <PhoneInput
          ref={ref}
          defaultCode={defaultCode}
          defaultValue={defaultValue}
          value={value}
          layout="second"
          onChangeText={onChangeText}
          onChangeFormattedText={onChangeFormattedText}
          disabled={disabled}
          placeholder={placeholder}
          containerStyle={containerStyle}
          textContainerStyle={textContainerStyle}
          textInputStyle={{
            fontFamily: typography.fontFamily,
            fontSize: inputTextStyle.fontSize,
            lineHeight: inputTextStyle.lineHeight,
            fontWeight: inputTextStyle.fontWeight,
            color: textColor ?? theme.text.primary,
            paddingVertical: spacing.md,
            height: "auto",
          }}
          codeTextStyle={{
            fontFamily: typography.fontFamily,
            fontSize: inputTextStyle.fontSize,
            lineHeight: inputTextStyle.lineHeight,
            fontWeight: inputTextStyle.fontWeight,
            color: textColor ?? theme.text.primary,
            height: "auto",
          }}
          flagButtonStyle={{
            paddingVertical: 0,
          }}
          textInputProps={{
            placeholderTextColor: theme.text.tertiary,
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
          }}
          withShadow
          disableArrowIcon
          withDarkTheme={is_dark}
        />

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
  }
);

AppPhoneInput.displayName = "AppPhoneInput";

export default AppPhoneInput;
export type { CountryCode };
