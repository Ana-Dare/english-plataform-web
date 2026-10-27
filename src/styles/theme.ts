export const breakpoints = {
  xs: "374px", // Celulares pequenos: 320–374 px
  sm: "479px", // Celulares comuns: 375–479 px
  md: "767px", // Celulares grandes: 480–767 px
  lg: "1023px", // Tablets: 768–1023 px
  xl: "1439px", // Notebooks e desktops: 1024–1439 px
  xxl: "1440px", // Monitores grandes: 1440 px ou mais
} as const;

export const media = {
  xs: `@media (max-width: ${breakpoints.xs})`,
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
  xxlUp: `@media (min-width: ${breakpoints.xxl})`,
} as const;

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
  breakpoints,
  media,
  typography: {
    fontFamily: '"Rubik", sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    sizes: {
      h1: "clamp(1.5rem, 2vw + 1rem, 2.25rem)",
      h2: "clamp(1.25rem, 1.5vw + 0.95rem, 1.75rem)",
      h3: "clamp(1.125rem, 1vw + 0.875rem, 1.5rem)",
      h4: "clamp(1rem, 0.5vw + 0.9rem, 1.1875rem)",
      body: "1rem",
      auxiliary: "clamp(0.875rem, 0.25vw + 0.825rem, 0.9375rem)",
      label: "0.875rem",
      caption: "0.8125rem",
    },
    lineHeights: {
      tight: 1.25,
      heading: 1.3,
      body: 1.5,
      relaxed: 1.65,
    },
  },
  spacings: {
    none: "0px",
    xxsmall: "0.25rem",
    xsmall: "0.5rem",
    small: "0.75rem",
    medium: "1rem",
    large: "1.5rem",
    xlarge: "2rem",
    xxlarge: "3rem",
    huge: "4rem",
    fluidPage: "clamp(1rem, 2.5vw, 2rem)",
    fluidCard: "clamp(1.25rem, 2.5vw, 2.25rem)",
    fluidGap: "clamp(1rem, 2vw, 1.75rem)",
  },
  borderRadius: {
    small: "4px",
    medium: "8px",
    large: "16px",
    circle: "50%",
  },
  sizes: {
    title: "clamp(1.5rem, 2vw + 1rem, 2.25rem)",
    sectionTitle: "clamp(1.125rem, 1vw + 0.875rem, 1.5rem)",
    subtitle: "1rem",
    text: "0.875rem",
    smallText: "0.8125rem",
  },
} as const;

export type ThemeType = typeof mainTheme;
