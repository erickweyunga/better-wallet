import AppTheme from "@/constants/theme";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "./use-theme";

type StylesCreator<T extends StyleSheet.NamedStyles<T>> = (
  theme: ReturnType<typeof useTheme>,
  appTheme: typeof AppTheme,
) => T;

export const createThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  creator: StylesCreator<T>,
) => {
  return function useThemedStyles() {
    const theme = useTheme();
    const appTheme = AppTheme;

    return useMemo(() => {
      const styles = creator(theme, appTheme);
      return StyleSheet.create(styles);
    }, [theme, appTheme]);
  };
};
