import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, type Theme } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import {
  E2E_LIGHT_THEME_COLORS,
  E2E_LIGHT_THEME_COLOR_VARIABLE_PREFIX,
  E2E_LIGHT_THEME_ROOT_SELECTOR,
  E2E_LIGHT_THEME_STORAGE,
  E2E_LIGHT_THEME_TOGGLE_LABEL,
  E2E_LIGHT_THEME_TOGGLE_SOURCE,
} from "../constants/E2eLightTheme.constants";

export const createLightThemePage = (page: Page) => {
  const getRoot = (): Locator =>
    page.locator(E2E_LIGHT_THEME_ROOT_SELECTOR);

  const getToggleButton = (theme: Theme): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: E2E_LIGHT_THEME_TOGGLE_LABEL[theme],
      exact: true,
    });

  return {
    getRoot,
    getToggleButton,
    clickToggleForTheme: (theme: Theme): Promise<void> =>
      getToggleButton(
        E2E_LIGHT_THEME_TOGGLE_SOURCE[theme]
      ).click(),
    readStoredTheme: (): Promise<NullableRef<string>> =>
      page.evaluate(
        (storageKey) =>
          window.localStorage.getItem(storageKey),
        E2E_LIGHT_THEME_STORAGE.KEY
      ),
    readColorTokens: (): Promise<Record<string, string>> =>
      getRoot().evaluate(
        (element, colorNames) => {
          const computedStyle =
            window.getComputedStyle(element);
          return Object.fromEntries(
            colorNames.names.map((colorName) => [
              colorName,
              computedStyle
                .getPropertyValue(
                  `${colorNames.variablePrefix}${colorName}`
                )
                .trim(),
            ])
          );
        },
        {
          names: E2E_LIGHT_THEME_COLORS,
          variablePrefix:
            E2E_LIGHT_THEME_COLOR_VARIABLE_PREFIX,
        }
      ),
  };
};
