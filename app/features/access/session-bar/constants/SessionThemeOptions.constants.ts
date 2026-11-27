import { THEME } from "@/app/constants";
import { SESSION_CONTROLS_COPY } from "./SessionControlsCopy.constants";
import { THEME_TOGGLE_ICON } from "./ThemeToggleIcon.constants";

export const SESSION_THEME_OPTIONS = [
  {
    icon: THEME_TOGGLE_ICON[THEME.DARK],
    label: SESSION_CONTROLS_COPY.DARK_THEME,
    theme: THEME.DARK,
  },
  {
    icon: THEME_TOGGLE_ICON[THEME.LIGHT],
    label: SESSION_CONTROLS_COPY.LIGHT_THEME,
    theme: THEME.LIGHT,
  },
] as const;
