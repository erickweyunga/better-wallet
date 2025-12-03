import AppTheme from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import AppDivider from "./app-divider";

type Direction = "row" | "column";
type Align = "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
type Justify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
type Wrap = "wrap" | "nowrap" | "wrap-reverse";
type SpacingKey = keyof typeof AppTheme.spacing;

interface AppFlexProps extends ViewProps {
  direction?: Direction;
  gap?: SpacingKey;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
  flex?: boolean | number;
  divider?: boolean;
  dividerColor?: keyof ReturnType<typeof useTheme>;
  style?: ViewStyle;
  children: React.ReactNode;
}

export default function AppFlex({
  direction = "column",
  gap,
  align,
  justify,
  wrap,
  flex,
  divider = false,
  dividerColor,
  style,
  children,
  ...rest
}: AppFlexProps) {
  const { spacing } = AppTheme;
  const childrenArray = React.Children.toArray(children);

  const flexValue = typeof flex === "number" ? flex : flex ? 1 : undefined;
  const gapValue = gap ? spacing[gap] : undefined;

  return (
    <View
      style={[
        {
          flexDirection: direction,
          gap: divider ? undefined : gapValue,
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap,
          flex: flexValue,
        },
        style,
      ]}
      {...rest}
    >
      {divider
        ? childrenArray.map((child, index) => (
            <React.Fragment key={index}>
              {child}
              {index < childrenArray.length - 1 && (
                <AppDivider
                  orientation={direction === "row" ? "vertical" : "horizontal"}
                  color={dividerColor}
                  margin={gap}
                />
              )}
            </React.Fragment>
          ))
        : children}
    </View>
  );
}

export function AppRow(props: Omit<AppFlexProps, "direction">) {
  return <AppFlex direction="row" {...props} />;
}

export function AppColumn(props: Omit<AppFlexProps, "direction">) {
  return <AppFlex direction="column" {...props} />;
}
