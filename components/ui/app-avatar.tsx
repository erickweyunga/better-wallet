import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Image, ImageSourcePropType, View, ViewStyle } from "react-native";
import AppText from "./app-text";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AppAvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize | number;
  background?: string;
  textColor?: string;
  online?: boolean;
  onlineColor?: string;
  style?: ViewStyle;
}

const sizeMap: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const textSizeMap: Record<AvatarSize, "xs" | "s" | "m" | "l" | "xl"> = {
  xs: "xs",
  sm: "xs",
  md: "s",
  lg: "m",
  xl: "l",
};

export default function AppAvatar({
  source,
  name,
  size = "md",
  background,
  textColor,
  online,
  onlineColor,
  style,
}: AppAvatarProps) {
  const theme = useTheme();

  const avatarSize = typeof size === "number" ? size : sizeMap[size];
  const textVariant = typeof size === "number" ? "m" : textSizeMap[size];

  const getInitials = (name?: string): string => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const avatarStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: background ?? theme.neutral[300],
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  const onlineIndicatorSize = avatarSize * 0.25;
  const onlineIndicatorStyle: ViewStyle = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: onlineIndicatorSize,
    height: onlineIndicatorSize,
    borderRadius: onlineIndicatorSize / 2,
    backgroundColor: onlineColor ?? theme.success.DEFAULT,
    borderWidth: 2,
    borderColor: theme.background,
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={[avatarStyle, style]}>
        {source ? (
          <Image
            source={source}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        ) : (
          <AppText
            text={textVariant}
            weight="medium"
            color={textColor ?? theme.text.primary}
          >
            {getInitials(name)}
          </AppText>
        )}
      </View>
      {online && <View style={onlineIndicatorStyle} />}
    </View>
  );
}

interface AppAvatarGroupProps {
  avatars: {
    source?: ImageSourcePropType;
    name?: string;
  }[];
  max?: number;
  size?: AvatarSize | number;
  overlap?: number;
  style?: ViewStyle;
}

export function AppAvatarGroup({
  avatars,
  max = 3,
  size = "md",
  overlap = 8,
  style,
}: AppAvatarGroupProps) {
  const theme = useTheme();
  const displayAvatars = avatars.slice(0, max);
  const remaining = Math.max(0, avatars.length - max);

  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      {displayAvatars.map((avatar, index) => (
        <View
          key={index}
          style={{
            marginLeft: index > 0 ? -overlap : 0,
            zIndex: displayAvatars.length - index,
          }}
        >
          <AppAvatar
            source={avatar.source}
            name={avatar.name}
            size={size}
            style={{
              borderWidth: 2,
              borderColor: theme.background,
            }}
          />
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={{
            marginLeft: -overlap,
            zIndex: 0,
          }}
        >
          <AppAvatar
            name={`+${remaining}`}
            size={size}
            background={theme.neutral[400]}
            textColor={theme.neutral[0]}
            style={{
              borderWidth: 2,
              borderColor: theme.background,
            }}
          />
        </View>
      )}
    </View>
  );
}
