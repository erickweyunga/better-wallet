import React from "react";
import {
  Pressable,
  PressableProps,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";

type HapticType = "light" | "medium" | "heavy" | "selection" | "none";
type PressEffect = "opacity" | "scale" | "none";

interface AppPressableProps extends Omit<PressableProps, "style"> {
  children: React.ReactNode;
  haptic?: HapticType;
  effect?: PressEffect;
  scaleValue?: number;
  opacityValue?: number;
  disabled?: boolean;
  debounce?: number;
  style?: ViewStyle | ((state: { pressed: boolean }) => ViewStyle);
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AppPressable({
  children,
  haptic = "none",
  effect = "opacity",
  scaleValue = 0.95,
  opacityValue = 0.7,
  disabled = false,
  debounce = 0,
  onPress,
  style,
  ...rest
}: AppPressableProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const lastPressTime = React.useRef(0);

  const triggerHaptic = () => {
    if (haptic === "none") return;

    switch (haptic) {
      case "light":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case "medium":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case "heavy":
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case "selection":
        Haptics.selectionAsync();
        break;
    }
  };

  const handlePressIn = () => {
    if (effect === "scale") {
      scale.value = withSpring(scaleValue, { damping: 15, stiffness: 300 });
    } else if (effect === "opacity") {
      opacity.value = withTiming(opacityValue, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (effect === "scale") {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    } else if (effect === "opacity") {
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  const handlePress = (event: any) => {
    if (disabled) return;

    const now = Date.now();
    if (debounce > 0 && now - lastPressTime.current < debounce) {
      return;
    }
    lastPressTime.current = now;

    triggerHaptic();
    onPress?.(event);
  };

  const animatedStyle = useAnimatedStyle(() => {
    if (effect === "scale") {
      return { transform: [{ scale: scale.value }] };
    } else if (effect === "opacity") {
      return { opacity: opacity.value };
    }
    return {};
  });

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      style={[animatedStyle, typeof style === "function" ? undefined : style]}
      {...rest}
    >
      {({ pressed }) => (
        typeof style === "function" ? (
          <Animated.View style={style({ pressed })}>
            {children}
          </Animated.View>
        ) : (
          children
        )
      )}
    </AnimatedPressable>
  );
}
