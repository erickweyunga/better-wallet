const Spacings = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

const Typography = {
  fontFamily: "e-Ukraine",

  heading: {
    xl: {
      regular: {
        fontSize: 56,
        lineHeight: 64,
        letterSpacing: -1,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 56,
        lineHeight: 64,
        letterSpacing: -1,
        fontWeight: "500" as const,
      },
    },
    l: {
      regular: {
        fontSize: 48,
        lineHeight: 56,
        letterSpacing: -1,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 48,
        lineHeight: 56,
        letterSpacing: -1,
        fontWeight: "500" as const,
      },
    },
    m: {
      regular: {
        fontSize: 40,
        lineHeight: 48,
        letterSpacing: -1,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 40,
        lineHeight: 48,
        letterSpacing: -1,
        fontWeight: "500" as const,
      },
    },
    s: {
      regular: {
        fontSize: 36,
        lineHeight: 40,
        letterSpacing: -1,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 36,
        lineHeight: 40,
        letterSpacing: -1,
        fontWeight: "500" as const,
      },
    },
    xs: {
      regular: {
        fontSize: 32,
        lineHeight: 36,
        letterSpacing: -1,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 32,
        lineHeight: 36,
        letterSpacing: -1,
        fontWeight: "300" as const,
      },
    },
  },

  text: {
    xl: {
      regular: {
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
        fontWeight: "500" as const,
      },
    },
    l: {
      regular: {
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: 0,
        fontWeight: "500" as const,
      },
    },
    m: {
      regular: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0,
        fontWeight: "500" as const,
      },
    },
    s: {
      regular: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        fontWeight: "400" as const,
      },
      medium: {
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
        fontWeight: "500" as const,
      },
    },
    xs: {
      regular: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0,
        fontWeight: "300" as const,
      },
      medium: {
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0,
        fontWeight: "400" as const,
      },
    },
  },

  button: {
    cta1: {
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0,
      fontWeight: "500" as const,
    },
  },
} as const;

const Radius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

const BorderWidth = {
  none: 0,
  hairline: 0.5,
  thin: 1,
  md: 2,
  thick: 4,
} as const;

const Colours = {
  light: {
    primary: {
      50: "#f5f8fe",
      100: "#eaeeff",
      200: "#dee5ff",
      300: "#a2b7ff",
      400: "#6688ff",
      500: "#4d72f5",
      600: "#365ff1",
      700: "#004ee4",
      800: "#0040de",
      900: "#0036d9",
      DEFAULT: "#365ff1",
    },

    secondary: {
      50: "#feffe8",
      100: "#feffd8",
      200: "#feffca",
      300: "#fdff96",
      400: "#fcff76",
      500: "#fff857",
      600: "#fcf31a",
      700: "#f5ec07",
      800: "#eee50f",
      900: "#e8df0a",
      DEFAULT: "#fcf31a",
    },

    neutral: {
      0: "#ffffff",
      100: "#fafafb",
      200: "#f2f2f2",
      300: "#e6e6e6",
      400: "#bfbfbf",
      500: "#a0a0a0",
      600: "#575757",
      700: "#404040",
      800: "#191a1d",
      900: "#000000",
    },

    error: {
      50: "#fef8f9",
      100: "#ffe8ed",
      200: "#ffd4e0",
      300: "#ffa3b6",
      400: "#eb6c86",
      500: "#e53d60",
      600: "#e01c52",
      700: "#d30f45",
      800: "#c60a33",
      900: "#b6041d",
      DEFAULT: "#e01c52",
    },

    warning: {
      50: "#fff9f6",
      100: "#ffeee4",
      200: "#ffe1d0",
      300: "#ffbc97",
      400: "#fda270",
      500: "#f98646",
      600: "#f77337",
      700: "#f6662d",
      800: "#f55620",
      900: "#f34613",
      DEFAULT: "#f77337",
    },

    success: {
      50: "#f5faf8",
      100: "#ecf6f1",
      200: "#b3dac7",
      300: "#70ba95",
      400: "#4aa879",
      500: "#118c4f",
      600: "#0c793f",
      700: "#096c34",
      800: "#055d26",
      900: "#014d18",
      DEFAULT: "#0c793f",
    },

    overlay: {
      light: "#a0a0a059",
      dark: "#000000a6",
    },

    background: "#ffffff",
    surface: "#fafafb",
    border: "#e6e6e6",
    inputBorder: "#bfbfbf",
    divider: "#f2f2f2",

    text: {
      primary: "#191a1d",
      secondary: "#575757",
      tertiary: "#a0a0a0",
      disabled: "#bfbfbf",
    },
  },

  dark: {
    primary: {
      50: "#f5f8fe",
      100: "#eaeeff",
      200: "#dee5ff",
      300: "#a2b7ff",
      400: "#6688ff",
      500: "#4d72f5",
      600: "#365ff1",
      700: "#004ee4",
      800: "#0040de",
      900: "#0036d9",
      DEFAULT: "#4d72f5",
    },

    secondary: {
      50: "#feffe8",
      100: "#feffd8",
      200: "#feffca",
      300: "#fdff96",
      400: "#fcff76",
      500: "#fff857",
      600: "#fcf31a",
      700: "#f5ec07",
      800: "#eee50f",
      900: "#e8df0a",
      DEFAULT: "#fff857",
    },

    neutral: {
      0: "#ffffff",
      100: "#fafafb",
      200: "#f2f2f2",
      300: "#e6e6e6",
      400: "#bfbfbf",
      500: "#a0a0a0",
      600: "#575757",
      700: "#404040",
      800: "#191a1d",
      900: "#000000",
    },

    error: {
      50: "#fef8f9",
      100: "#ffe8ed",
      200: "#ffd4e0",
      300: "#ffa3b6",
      400: "#eb6c86",
      500: "#e53d60",
      600: "#e01c52",
      700: "#d30f45",
      800: "#c60a33",
      900: "#b6041d",
      DEFAULT: "#e53d60",
    },

    warning: {
      50: "#fff9f6",
      100: "#ffeee4",
      200: "#ffe1d0",
      300: "#ffbc97",
      400: "#fda270",
      500: "#f98646",
      600: "#f77337",
      700: "#f6662d",
      800: "#f55620",
      900: "#f34613",
      DEFAULT: "#f98646",
    },

    success: {
      50: "#f5faf8",
      100: "#ecf6f1",
      200: "#b3dac7",
      300: "#70ba95",
      400: "#4aa879",
      500: "#118c4f",
      600: "#0c793f",
      700: "#096c34",
      800: "#055d26",
      900: "#014d18",
      DEFAULT: "#4aa879",
    },

    overlay: {
      light: "#a0a0a059",
      dark: "#000000a6",
    },

    background: "#000000",
    surface: "#191a1d",
    border: "#404040",
    inputBorder: "#575757",
    divider: "#404040",

    text: {
      primary: "#ffffff",
      secondary: "#e6e6e6",
      tertiary: "#a0a0a0",
      disabled: "#575757",
    },
  },
} as const;

const Shadows = {
  light: {
    lg: {
      shadowColor: "#191a1d",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  dark: {
    lg: {
      shadowColor: "#404040",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 8,
    },
  },
} as const;

export type RadiusKey = keyof typeof Radius;
export type BorderWidthKey = keyof typeof BorderWidth;
export type TTypography = typeof Typography;
export type Spacing = (typeof Spacings)[keyof typeof Spacings];
export type Theme = typeof Colours.light;
export type ThemeKey = keyof typeof Colours;

const AppTheme = {
  colours: Colours,
  spacing: Spacings,
  typography: Typography,
  radius: Radius,
  borderWidth: BorderWidth,
  shadows: Shadows,
} as const;

export default AppTheme;
