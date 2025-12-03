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

type RadioSize = "sm" | "md" | "lg";

interface AppRadioProps {
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
  size?: RadioSize;
  activeColor?: string;
  inactiveColor?: string;
  label?: string;
  description?: string;
  labelPosition?: "left" | "right";
  haptic?: boolean;
  style?: ViewStyle;
}

const sizeConfig = {
  sm: { outer: 18, inner: 8 },
  md: { outer: 22, inner: 10 },
  lg: { outer: 26, inner: 12 },
};

export default function AppRadio({
  selected,
  onPress,
  disabled = false,
  size = "md",
  activeColor,
  inactiveColor,
  label,
  description,
  labelPosition = "right",
  haptic = true,
  style,
}: AppRadioProps) {
  const theme = useTheme();
  const config = sizeConfig[size];

  const scale = useSharedValue(selected ? 1 : 0);
  const opacity = useSharedValue(selected ? 1 : 0);

  React.useEffect(() => {
    scale.value = withSpring(selected ? 1 : 0, {
      damping: 15,
      stiffness: 300,
    });
    opacity.value = withSpring(selected ? 1 : 0, {
      damping: 15,
      stiffness: 300,
    });
  }, [selected, scale, opacity]);

  const handlePress = () => {
    if (disabled) return;
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const outerStyle: ViewStyle = {
    width: config.outer,
    height: config.outer,
    borderRadius: config.outer / 2,
    borderWidth: 2,
    borderColor: selected
      ? (activeColor ?? theme.primary.DEFAULT)
      : (inactiveColor ?? theme.neutral[400]),
    justifyContent: "center",
    alignItems: "center",
    opacity: disabled ? 0.5 : 1,
  };

  const innerStyle = useAnimatedStyle(() => ({
    width: config.inner,
    height: config.inner,
    borderRadius: config.inner / 2,
    backgroundColor: activeColor ?? theme.primary.DEFAULT,
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const radioElement = (
    <Pressable onPress={handlePress} disabled={disabled} hitSlop={8}>
      <View style={outerStyle}>
        <Animated.View style={innerStyle} />
      </View>
    </Pressable>
  );

  if (!label && !description) {
    return <View style={style}>{radioElement}</View>;
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        {
          flexDirection: "row",
          alignItems: description ? "flex-start" : "center",
          gap: AppTheme.spacing.md,
        },
        style,
      ]}
    >
      {labelPosition === "left" && (
        <View style={{ flex: 1 }}>
          {label && (
            <AppText
              text="m"
              weight="medium"
              color={disabled ? theme.text.disabled : theme.text.primary}
            >
              {label}
            </AppText>
          )}
          {description && (
            <AppText
              text="s"
              color={disabled ? theme.text.disabled : theme.text.secondary}
              style={{ marginTop: AppTheme.spacing.xs }}
            >
              {description}
            </AppText>
          )}
        </View>
      )}
      {radioElement}
      {labelPosition === "right" && (
        <View style={{ flex: 1 }}>
          {label && (
            <AppText
              text="m"
              weight="medium"
              color={disabled ? theme.text.disabled : theme.text.primary}
            >
              {label}
            </AppText>
          )}
          {description && (
            <AppText
              text="s"
              color={disabled ? theme.text.disabled : theme.text.secondary}
              style={{ marginTop: AppTheme.spacing.xs }}
            >
              {description}
            </AppText>
          )}
        </View>
      )}
    </Pressable>
  );
}

interface RadioOption<T = string> {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface AppRadioGroupProps<T = string> {
  options: RadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  size?: RadioSize;
  activeColor?: string;
  inactiveColor?: string;
  gap?: keyof typeof AppTheme.spacing;
  style?: ViewStyle;
}

export function AppRadioGroup<T = string>({
  options,
  value,
  onChange,
  disabled = false,
  size = "md",
  activeColor,
  inactiveColor,
  gap = "md",
  style,
}: AppRadioGroupProps<T>) {
  const { spacing } = AppTheme;

  return (
    <View style={[{ gap: spacing[gap] }, style]}>
      {options.map((option) => (
        <AppRadio
          key={String(option.value)}
          selected={value === option.value}
          onPress={() => onChange(option.value)}
          disabled={disabled || option.disabled}
          size={size}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
          label={option.label}
          description={option.description}
        />
      ))}
    </View>
  );
}
