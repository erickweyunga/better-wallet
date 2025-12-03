import type { Theme } from "@/constants/theme";

declare module "styled-components" {
  export type DefaultTheme = Theme;
}
