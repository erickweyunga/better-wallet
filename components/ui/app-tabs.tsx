import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import {
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AppText from "./app-text";

type TextVariant = "xl" | "l" | "m" | "s" | "xs";
type SpacingKey = keyof typeof AppTheme.spacing;
type RadiusKey = keyof typeof AppTheme.radius;

export interface TabItem {
  key: string;
  label: string | ((props: { isActive: boolean }) => React.ReactNode);
}

export interface TabRenderProps {
  tab: TabItem;
  isActive: boolean;
  index: number;
}

interface AppTabsProps {
  tabs: readonly TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  textVariant?: TextVariant;
  fullWidth?: boolean;
  variant?: "default" | "pills" | "underline";
  showIndicator?: boolean;
  scrollable?: boolean;
  background?: string;
  indicatorColor?: string;
  activeBackground?: string;
  padding?: SpacingKey;
  radius?: RadiusKey;
  gap?: SpacingKey;
  style?: ViewStyle;
  tabStyle?: ViewStyle | ((props: TabRenderProps) => ViewStyle);
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  renderTab?: (props: TabRenderProps) => React.ReactNode;
}

export default function AppTabs({
  tabs,
  activeKey,
  onChange,
  textVariant = "m",
  fullWidth = true,
  variant = "default",
  showIndicator = false,
  scrollable = true,
  background,
  indicatorColor,
  activeBackground,
  padding = "md",
  radius = "lg",
  gap,
  style,
  tabStyle,
  justifyContent = "flex-start",
  renderTab,
}: AppTabsProps) {
  const theme = useTheme();
  const { spacing, radius: radiusValues } = AppTheme;

  const tabLayouts = React.useRef<number[]>([]);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const translateX = useSharedValue(0);
  const scaleX = useSharedValue(1);

  const activeIndex = tabs.findIndex((tab) => tab.key === activeKey);

  const onContainerLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  const onTabLayout = (e: LayoutChangeEvent, index: number) => {
    const { width } = e.nativeEvent.layout;
    tabLayouts.current[index] = width;

    if (index === activeIndex && showIndicator) {
      updateIndicator(width);
    }
  };

  const updateIndicator = (activeTabWidth: number) => {
    if (
      !showIndicator ||
      tabLayouts.current.length === 0 ||
      containerWidth === 0
    )
      return;

    let left = 0;
    for (let i = 0; i < activeIndex; i++) {
      left += tabLayouts.current[i] || 0;
    }

    const paddingValue = spacing[padding] * 2;
    const indicatorWidth = fullWidth
      ? activeTabWidth
      : activeTabWidth - paddingValue;

    translateX.value = withTiming(left + (fullWidth ? 0 : paddingValue / 2), {
      duration: 300,
    });
    scaleX.value = withTiming(indicatorWidth / activeTabWidth || 1, {
      duration: 300,
    });
  };

  React.useEffect(() => {
    if (showIndicator && activeIndex >= 0 && tabLayouts.current[activeIndex]) {
      updateIndicator(tabLayouts.current[activeIndex]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, containerWidth, fullWidth, showIndicator]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scaleX: scaleX.value }],
  }));

  const containerBackground =
    background || (variant === "pills" ? theme.surface : "transparent");

  const Content = scrollable ? ScrollView : View;

  return (
    <View
      style={[
        {
          overflow: "hidden",
          backgroundColor: containerBackground,
          borderRadius: variant === "pills" ? radiusValues[radius] : 0,
        },
        style,
      ]}
      onLayout={onContainerLayout}
    >
      <Content horizontal={scrollable} showsHorizontalScrollIndicator={false}>
        <View
          style={[
            {
              flexDirection: "row",
              position: "relative",
              width: "100%",
              ...(gap && { gap: spacing[gap] }),
            },
            !scrollable && { justifyContent },
          ]}
        >
          {tabs.map((tab, index) => {
            const isActive = tab.key === activeKey;
            const renderProps: TabRenderProps = { tab, isActive, index };

            if (renderTab) {
              return (
                <Pressable
                  key={tab.key}
                  onLayout={(e) => onTabLayout(e, index)}
                  style={[
                    {
                      padding: spacing[padding],
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    fullWidth && { flex: 1 },
                    typeof tabStyle === "function"
                      ? tabStyle(renderProps)
                      : tabStyle,
                  ]}
                  onPress={() => onChange(tab.key)}
                >
                  {renderTab(renderProps)}
                </Pressable>
              );
            }

            return (
              <Pressable
                key={tab.key}
                onLayout={(e) => onTabLayout(e, index)}
                style={[
                  {
                    padding: spacing[padding],
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  fullWidth && { flex: 1 },
                  variant === "pills" && {
                    borderRadius: radiusValues[radius],
                  },
                  variant === "pills" &&
                    isActive && {
                      backgroundColor:
                        activeBackground ?? theme.primary.DEFAULT + "15",
                    },
                  typeof tabStyle === "function"
                    ? tabStyle(renderProps)
                    : tabStyle,
                ]}
                onPress={() => onChange(tab.key)}
              >
                {typeof tab.label === "function" ? (
                  tab.label({ isActive })
                ) : (
                  <AppText
                    text={textVariant}
                    weight={isActive ? "medium" : "regular"}
                    color={
                      isActive ? theme.primary.DEFAULT : theme.text.secondary
                    }
                  >
                    {tab.label}
                  </AppText>
                )}
              </Pressable>
            );
          })}

          {variant === "underline" && showIndicator && containerWidth > 0 && (
            <Animated.View
              style={[
                {
                  position: "absolute",
                  bottom: 0,
                  height: 3,
                  width: 100,
                  borderRadius: 2,
                  backgroundColor: indicatorColor ?? theme.primary.DEFAULT,
                },
                animatedStyle,
              ]}
            />
          )}
        </View>
      </Content>
    </View>
  );
}
