import {
  DEFAULT_THEME,
  THEME,
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/app/constants";

const isTheme = (value: unknown): value is Theme =>
  value === THEME.DARK || value === THEME.LIGHT;

const ignoreThemePersistFailure = (): void => undefined;

export const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }

  try {
    const storedValue = window.localStorage.getItem(
      THEME_STORAGE_KEY
    );
    return isTheme(storedValue)
      ? storedValue
      : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

export const persistTheme = (theme: Theme): void => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    ignoreThemePersistFailure();
  }
};

export const applyThemeAttribute = (theme: Theme): void => {
  if (theme === THEME.LIGHT) {
    document.documentElement.setAttribute(
      THEME_ATTRIBUTE,
      THEME.LIGHT
    );
    return;
  }
  document.documentElement.removeAttribute(THEME_ATTRIBUTE);
};

export const buildThemeInitScript = (): string => {
  const storageKey = JSON.stringify(THEME_STORAGE_KEY);
  const lightTheme = JSON.stringify(THEME.LIGHT);
  const attributeName = JSON.stringify(THEME_ATTRIBUTE);

  return `(function(){try{if(window.localStorage.getItem(${storageKey})===${lightTheme}){document.documentElement.setAttribute(${attributeName},${lightTheme});}}catch(error){}})();`;
};
