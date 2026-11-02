import { useEffect, useSyncExternalStore } from "react";
import {
  BROWSER_EVENTS,
  DEFAULT_THEME,
  THEME,
  type Theme,
} from "@/app/constants";
import {
  applyThemeAttribute,
  getStoredTheme,
  persistTheme,
} from "@/app/utils/theme/Theme";
import { THEME_CHANGE_EVENT_NAME } from "../constants/ThemeChangeEvent.constants";
import type { ThemeViewModel } from "../models/ThemeViewModel.interface";

const resolveNextTheme = (theme: Theme): Theme =>
  theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;

let themeSnapshot = getStoredTheme();
let themeWriteFailed = false;

const getThemeSnapshot = (): Theme => {
  if (!themeWriteFailed) {
    themeSnapshot = getStoredTheme();
  }
  return themeSnapshot;
};

const notifyThemeSubscribers = (): void => {
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT_NAME));
};

const subscribeToThemeChanges = (
  onThemeChange: () => void
) => {
  const handleStorageChange = (): void => {
    themeSnapshot = getStoredTheme();
    themeWriteFailed = false;
    onThemeChange();
  };

  window.addEventListener(
    THEME_CHANGE_EVENT_NAME,
    onThemeChange
  );
  window.addEventListener(
    BROWSER_EVENTS.STORAGE,
    handleStorageChange
  );

  return () => {
    window.removeEventListener(
      THEME_CHANGE_EVENT_NAME,
      onThemeChange
    );
    window.removeEventListener(
      BROWSER_EVENTS.STORAGE,
      handleStorageChange
    );
  };
};

export const useThemeViewModel = (): ThemeViewModel => {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeSnapshot,
    () => DEFAULT_THEME
  );

  useEffect(() => {
    applyThemeAttribute(theme);
  }, [theme]);

  const handleToggle = (): void => {
    const nextTheme = resolveNextTheme(theme);
    themeSnapshot = nextTheme;
    applyThemeAttribute(nextTheme);
    persistTheme(nextTheme);
    themeWriteFailed = getStoredTheme() !== nextTheme;
    notifyThemeSubscribers();
  };

  return { theme, handleToggle };
};
