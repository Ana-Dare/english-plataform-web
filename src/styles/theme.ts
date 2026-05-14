export const mainTheme = {
  colors: {
    bg: "#f5f5f7",
    cardBg: "#f7f3f3",
    white: "#ffffff",
    text: "#0f172a",
    muted: "#64748b",
    border: "#e2e8f0",
    blue: "#1e3a8a",
    gold: "#C9A227",
    danger: "#970e0e",
    success: "#045421",
  },
  spacings: {
    none: "0px",
    xxsmall: "4px",
    xsmall: "8px",
    small: "12px",
    medium: "16px",
    large: "24px",
    xlarge: "32px",
    xxlarge: "48px",
    huge: "64px",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    circle: "50%",
  },
  sizes: {
    title: "1.25rem",
    subtitle: "1rem",
    text: "0.875rem",
    smallText: "0.75rem",
  },
} as const;

export type ThemeType = typeof mainTheme;
