import { THEME } from "@/app/constants";

export const THEME_TOGGLE_COPY = {
  [THEME.DARK]: "Oscuro → claro",
  [THEME.LIGHT]: "Claro → oscuro",
} as const;

export const THEME_TOGGLE_ACCESSIBLE_COPY = {
  [THEME.DARK]: "Tema activo oscuro. Cambiar a tema claro",
  [THEME.LIGHT]: "Tema activo claro. Cambiar a tema oscuro",
} as const;
