import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Text, TextProps, TextStyle } from "react-native";

type HeadingVariant = "xl" | "l" | "m" | "s" | "xs";
type TextVariant = "xl" | "l" | "m" | "s" | "xs";
type FontWeight = "regular" | "medium";
type TextAlign = "auto" | "left" | "right" | "center" | "justify";
type VerticalAlign = "top" | "middle" | "bottom";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  heading?: HeadingVariant;
  text?: TextVariant;
  weight?: FontWeight;
  color?: string;
  align?: TextAlign;
  vAlign?: VerticalAlign;
}

export default function AppText({
  children,
  heading,
  text = "m",
  weight = "regular",
  color,
  align,
  vAlign,
  style,
  ...rest
}: AppTextProps) {
  const theme = useTheme();
  const { typography } = AppTheme;

  const getTextStyle = (): TextStyle => {
    const variant = heading
      ? typography.heading[heading][weight]
      : typography.text[text][weight];

    return {
      fontFamily: typography.fontFamily,
      fontSize: variant.fontSize,
      lineHeight: variant.lineHeight,
      letterSpacing: variant.letterSpacing,
      fontWeight: variant.fontWeight,
    };
  };

  const getVerticalAlign = (): TextStyle | undefined => {
    if (!vAlign) return undefined;

    switch (vAlign) {
      case "top":
        return { textAlignVertical: "top" };
      case "middle":
        return { textAlignVertical: "center" };
      case "bottom":
        return { textAlignVertical: "bottom" };
    }
  };

  return (
    <Text
      style={[
        getTextStyle(),
        { color: color ?? theme.text.primary },
        align && { textAlign: align },
        getVerticalAlign(),
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
