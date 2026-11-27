import {
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
} from "@/app/constants";

export const E2E_LIGHT_THEME_ROOT_SELECTOR = "html";

export const E2E_LIGHT_THEME_SCREENSHOT_EXTENSION = ".png";

export const E2E_LIGHT_THEME_COLOR_VARIABLE_PREFIX =
  "--color-";

export const E2E_LIGHT_THEME_COLORS = [
  "on-surface",
  "on-surface-variant",
  "primary",
  "secondary",
  "tertiary",
  "warning",
  "error",
  "outline-variant",
  "background",
  "surface",
  "surface-container-low",
  "surface-container",
  "surface-container-high",
  "surface-container-highest",
] as const;

export const E2E_LIGHT_THEME_TEXT_ROLES = [
  "on-surface",
  "on-surface-variant",
  "primary",
  "secondary",
  "tertiary",
  "warning",
  "error",
] as const;

export const E2E_LIGHT_THEME_SURFACE_ROLES = [
  "background",
  "surface",
  "surface-container-low",
  "surface-container",
  "surface-container-high",
  "surface-container-highest",
] as const;

export const E2E_LIGHT_THEME_MINIMUM_CONTRAST_RATIO = 7;

export const E2E_LIGHT_THEME_BORDER_ROLES = [
  "outline-variant",
] as const;

export const E2E_LIGHT_THEME_MINIMUM_BORDER_CONTRAST_RATIO = 3;

export const E2E_LIGHT_THEME_STORAGE = {
  ATTRIBUTE: THEME_ATTRIBUTE,
  KEY: THEME_STORAGE_KEY,
} as const;

export const E2E_LIGHT_THEME_SCREENSHOT = {
  DARK: "01-light-theme-calendar-dark",
  LIGHT: "02-light-theme-calendar-light",
} as const;
