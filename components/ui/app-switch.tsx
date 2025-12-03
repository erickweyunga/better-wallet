import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { Pressable, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import AppText from "./app-text";

type SwitchSize = "sm" | "md" | "lg";

interface AppSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: SwitchSize;
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  label?: string;
  labelPosition?: "left" | "right";
  haptic?: boolean;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { width: 40, height: 24, thumb: 18 },
  md: { width: 50, height: 30, thumb: 24 },
  lg: { width: 60, height: 36, thumb: 30 },
};

export default function AppSwitch({
  value,
  onValueChange,
  disabled = false,
  size = "md",
  activeColor,
  inactiveColor,
  thumbColor,
  label,
  labelPosition = "right",
  haptic = true,
  style,
}: AppSwitchProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const translateX = useSharedValue(
    value ? config.width - config.thumb - 4 : 2,
  );

  React.useEffect(() => {
    translateX.value = withSpring(value ? config.width - config.thumb - 4 : 2, {
      damping: 15,
      stiffness: 300,
    });
  }, [value, config.width, config.thumb, translateX]);

  const handlePress = () => {
    if (disabled) return;
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onValueChange(!value);
  };

  const trackStyle: ViewStyle = {
    width: config.width,
    height: config.height,
    borderRadius: config.height / 2,
    backgroundColor: value
      ? (activeColor ?? theme.primary.DEFAULT)
      : (inactiveColor ?? theme.neutral[300]),
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  };

  const thumbStyle = useAnimatedStyle(() => ({
    width: config.thumb,
    height: config.thumb,
    borderRadius: config.thumb / 2,
    backgroundColor: thumbColor ?? theme.neutral[0],
    transform: [{ translateX: translateX.value }],
  }));

  const switchElement = (
    <Pressable onPress={handlePress} disabled={disabled}>
      <View style={trackStyle}>
        <Animated.View style={thumbStyle} />
      </View>
    </Pressable>
  );

  if (!label) {
    return <View style={style}>{switchElement}</View>;
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: AppTheme.spacing.md,
        },
        style,
      ]}
    >
      {labelPosition === "left" && (
        <AppText
          text="m"
          color={disabled ? theme.text.disabled : theme.text.primary}
        >
          {label}
        </AppText>
      )}
      {switchElement}
      {labelPosition === "right" && (
        <AppText
          text="m"
          color={disabled ? theme.text.disabled : theme.text.primary}
        >
          {label}
        </AppText>
      )}
    </Pressable>
  );
}
