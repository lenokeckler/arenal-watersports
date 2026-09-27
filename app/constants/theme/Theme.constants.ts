export const THEME = {
  DARK: "dark",
  LIGHT: "light",
} as const;

export type Theme = (typeof THEME)[keyof typeof THEME];

export const DEFAULT_THEME: Theme = THEME.DARK;

export const THEME_ATTRIBUTE = "data-theme";

export const THEME_STORAGE_KEY = "arenal-ops-theme";
