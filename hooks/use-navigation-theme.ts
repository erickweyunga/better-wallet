import AppTheme from "@/constants/theme";
import type { Theme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export const useNavigationTheme = (): Theme => {
  const isDark = useColorScheme() === "dark";
  const colors = isDark ? AppTheme.colours.dark : AppTheme.colours.light;

  return {
    dark: isDark,
    colors: {
      primary: colors.primary.DEFAULT,
      background: colors.background,
      card: colors.surface,
      text: colors.text.primary,
      border: colors.border,
      notification: colors.secondary.DEFAULT,
    },
    fonts: {
      regular: {
        fontFamily: AppTheme.typography.fontFamily,
        fontWeight: "400",
      },
      medium: {
        fontFamily: AppTheme.typography.fontFamily,
        fontWeight: "500",
      },
      bold: {
        fontFamily: AppTheme.typography.fontFamily,
        fontWeight: "700",
      },
      heavy: {
        fontFamily: AppTheme.typography.fontFamily,
        fontWeight: "800",
      },
    },
  } satisfies Theme;
};
