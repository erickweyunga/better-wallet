import AppTheme, { TTypography } from "@/constants/theme";
import { useColorScheme } from "react-native";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return AppTheme.colours[colorScheme === "dark" ? "dark" : "light"];
};

export const useTypography = (): TTypography => {
  return AppTheme.typography;
};

export const useAppTheme = () => AppTheme;

export type Theme = ReturnType<typeof useTheme>;
