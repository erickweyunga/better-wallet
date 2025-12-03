import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import {
  Animated,
  DimensionValue,
  Easing,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface AppSkeletonProps {
  circle?: boolean;
  width?: number | string;
  height?: number | string;
  radius?: keyof typeof AppTheme.radius;
  style?: ViewStyle;
  duration?: number;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function AppSkeleton({
  circle,
  width,
  height,
  radius,
  style,
  duration = 1400,
  loading = true,
  children,
}: AppSkeletonProps) {
  const theme = useTheme();
  const opacity = React.useMemo(() => new Animated.Value(0.3), []);

  React.useEffect(() => {
    if (!loading) return;

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: duration * 0.6,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: duration * 0.4,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();
    return () => pulse.stop();
  }, [opacity, duration, loading]);

  if (!loading) return <>{children}</>;

  const resolvedRadius = circle
    ? 9999
    : radius
      ? AppTheme.radius[radius]
      : AppTheme.radius.md;

  const normalizeDimension = (
    value: number | string | undefined,
  ): DimensionValue | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      if (value.endsWith("%") || value === "auto")
        return value as DimensionValue;
      const num = parseFloat(value);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  };

  const normalizedWidth = normalizeDimension(width);
  const normalizedHeight = normalizeDimension(height);

  const baseStyle: ViewStyle = {
    backgroundColor: theme.neutral[300],
    borderRadius: resolvedRadius,
    width: circle
      ? (normalizedWidth ?? normalizedHeight ?? 48)
      : (normalizedWidth ?? "100%"),
    height: circle
      ? (normalizedWidth ?? normalizedHeight ?? 48)
      : (normalizedHeight ?? 20),
  };

  return (
    <View style={[baseStyle, style]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: theme.neutral[400],
          opacity,
          borderRadius: resolvedRadius,
        }}
      />
    </View>
  );
}
