import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React, { useState } from "react";
import {
  DimensionValue,
  Image,
  ImageProps,
  ImageStyle,
  View,
  ViewStyle,
} from "react-native";
import AppIcon from "./app-icon";
import AppSkeleton from "./app-skeleton";
import AppText from "./app-text";

type RadiusKey = keyof typeof AppTheme.radius;
type AspectRatio = "square" | "video" | "portrait" | "landscape" | number;

interface AppImageProps
  extends Omit<ImageProps, "source" | "width" | "height"> {
  source: ImageProps["source"];
  width?: DimensionValue;
  height?: DimensionValue;
  aspectRatio?: AspectRatio;
  radius?: RadiusKey;
  background?: string;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  fallbackIcon?: React.ReactNode;
  onLoad?: () => void;
  onError?: () => void;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
}

const aspectRatioMap: Record<string, number> = {
  square: 1,
  video: 16 / 9,
  portrait: 3 / 4,
  landscape: 4 / 3,
};

export default function AppImage({
  source,
  width = "100%",
  height,
  aspectRatio,
  radius = "md",
  background,
  loading: externalLoading,
  error: externalError,
  errorMessage,
  fallbackIcon,
  onLoad,
  onError,
  style,
  containerStyle,
  ...rest
}: AppImageProps) {
  const theme = useTheme();
  const { radius: radiusValues } = AppTheme;

  const [internalLoading, setInternalLoading] = useState(true);
  const [internalError, setInternalError] = useState(false);

  const isLoading = externalLoading ?? internalLoading;
  const isError = externalError ?? internalError;

  const handleLoad = () => {
    setInternalLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setInternalLoading(false);
    setInternalError(true);
    onError?.();
  };

  const resolvedAspectRatio =
    typeof aspectRatio === "number"
      ? aspectRatio
      : aspectRatio
        ? aspectRatioMap[aspectRatio]
        : undefined;

  const containerStyles: ViewStyle = {
    width: width as DimensionValue,
    height: height as DimensionValue,
    borderRadius: radiusValues[radius],
    overflow: "hidden",
    backgroundColor: background ?? theme.neutral[200],
    ...(resolvedAspectRatio && !height && { aspectRatio: resolvedAspectRatio }),
  };

  const imageStyles: ImageStyle = {
    width: "100%",
    height: "100%",
    borderRadius: radiusValues[radius],
  };

  if (isError) {
    return (
      <View
        style={[
          containerStyles,
          containerStyle,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {fallbackIcon ?? (
          <>
            <AppIcon name="InfoCircle" size={32} color={theme.text.tertiary} />
            {errorMessage && (
              <AppText
                text="xs"
                color={theme.text.tertiary}
                style={{ marginTop: 8 }}
              >
                {errorMessage}
              </AppText>
            )}
          </>
        )}
      </View>
    );
  }

  return (
    <View style={[containerStyles, containerStyle]}>
      {isLoading && (
        <View style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <AppSkeleton loading width="100%" height="100%" />
        </View>
      )}
      <Image
        source={source}
        onLoad={handleLoad}
        onError={handleError}
        style={[imageStyles, style, isLoading && { opacity: 0 }]}
        {...rest}
      />
    </View>
  );
}
