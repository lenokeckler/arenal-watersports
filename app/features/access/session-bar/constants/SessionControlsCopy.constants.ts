import { THEME } from "@/app/constants";

export const SESSION_CONTROLS_COPY = {
  PREFERENCES: "Preferencias",
  THEMES: {
    [THEME.DARK]: "Oscuro",
    [THEME.LIGHT]: "Claro",
  },
} as const;
