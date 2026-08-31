export const mainTheme = {
  colors: {
    /* Principais */
    azulMarinho: "#1F2B45",
    salmao: "#C57A67",
    rosaSalmao: "#FFA38C",
    branco: "#ffffff",
    cinza: "#4D4D4D",

    /* Derivados com opacidade (uso em backgrounds) */
    azulMarinho10: "rgba(31, 43, 69, 0.1)",
    salmao25: "rgba(197, 122, 103, 0.25)",
    cinza50: "rgba(77, 77, 77, 0.5)",

    /* Feedback */
    sucesso: "#22c55e",
    aviso: "#f59e0b",
    erro: "#ef4444",

    /* Aliases para compatibilidade */
    bg: "#f7f7f8",
    cardBg: "#ffffff",
    white: "#ffffff",
    text: "#1F2B45",
    muted: "#4D4D4D",
    border: "rgba(31, 43, 69, 0.12)",
    blue: "#1F2B45",
    gold: "#C57A67",
    danger: "#ef4444",
    success: "#22c55e",
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
