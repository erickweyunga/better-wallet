import { useTheme } from "@/hooks/use-theme";
import { Link, useRouter } from "expo-router";
import React, { forwardRef } from "react";
import {
  GestureResponderEvent,
  Linking,
  Platform,
  Text,
  TextStyle,
} from "react-native";
import AppText from "./app-text";

type HeadingVariant = "xl" | "l" | "m" | "s" | "xs";
type TextVariant = "xl" | "l" | "m" | "s" | "xs";
type FontWeight = "regular" | "medium";

interface AppLinkProps {
  children: React.ReactNode;
  url: string;
  params?: Record<string, string | number | boolean>;
  replace?: boolean;
  push?: boolean;
  asChild?: boolean;
  heading?: HeadingVariant;
  text?: TextVariant;
  weight?: FontWeight;
  color?: string;
  newTab?: boolean;
  onPress?: () => void;
  underline?: boolean;
}

const isInternalRoute = (url: string) =>
  url.startsWith("/") && !url.startsWith("http");

const AppLink = forwardRef<any, AppLinkProps>(
  (
    {
      children,
      url,
      params,
      replace = false,
      push = false,
      asChild = false,
      heading,
      text = "m",
      weight = "regular",
      color,
      newTab = false,
      onPress,
      underline = false,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const router = useRouter();

    const isInternal = isInternalRoute(url);
    const linkColor = color ?? theme.primary.DEFAULT;

    const href: any = isInternal
      ? params && Object.keys(params).length > 0
        ? { pathname: url, params }
        : url
      : undefined;

    const handleExternal = async (e?: GestureResponderEvent) => {
      onPress?.();
      if (e) e.preventDefault();

      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        console.warn("Cannot open URL:", url);
        return;
      }

      if (Platform.OS === "web" && newTab) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        await Linking.openURL(url);
      }
    };

    const handleInternal = () => {
      onPress?.();
      if (replace) router.replace(href);
      else if (push) router.push(href);
      else router.push(href);
    };

    const handlePress = isInternal ? handleInternal : handleExternal;

    if (asChild) {
      return (
        <Link
          href={href ?? url}
          replace={replace}
          push={push}
          asChild
          ref={ref}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    const textStyle: TextStyle = {
      ...(underline && { textDecorationLine: "underline" }),
      textDecorationColor: linkColor,
    };

    return (
      <Text
        onPress={handlePress}
        style={textStyle}
        accessibilityRole="link"
        accessibilityHint={`Navigates to ${url}`}
        {...rest}
      >
        <AppText
          heading={heading}
          text={text}
          weight={weight}
          color={linkColor}
          style={textStyle}
        >
          {children}
        </AppText>
      </Text>
    );
  },
);

AppLink.displayName = "AppLink";

export default AppLink;
