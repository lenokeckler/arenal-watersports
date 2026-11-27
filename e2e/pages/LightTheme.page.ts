import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, type Theme } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import {
  E2E_LIGHT_THEME_COLORS,
  E2E_LIGHT_THEME_COLOR_VARIABLE_PREFIX,
  E2E_LIGHT_THEME_ROOT_SELECTOR,
  E2E_LIGHT_THEME_STORAGE,
} from "../constants/E2eLightTheme.constants";
import { SESSION_CONTROLS_COPY } from "@/app/features/access/session-bar/constants/SessionControlsCopy.constants";
import { SYSTEM_NAVIGATION_COPY } from "@/app/features/access/system-navigation/constants/SystemNavigationCopy.constants";
import { E2E_LOGOUT_COPY } from "../constants/E2eLogout.constants";
import { createSystemNavigationPage } from "./SystemNavigation.page";

export const createLightThemePage = (page: Page) => {
  const getRoot = (): Locator =>
    page.locator(E2E_LIGHT_THEME_ROOT_SELECTOR);

  const navigation = createSystemNavigationPage(page);
  const getThemeOption = (theme: Theme): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: SESSION_CONTROLS_COPY.THEMES[theme],
      exact: true,
    });

  return {
    getRoot,
    getThemeOption,
    openMenu: navigation.openMenu,
    closeMenu: (): Promise<void> =>
      page
        .getByRole(ARIA_ROLE.BUTTON, {
          name: SYSTEM_NAVIGATION_COPY.CLOSE_MENU,
        })
        .click(),
    signOutFromMenu: async (): Promise<void> => {
      for (const name of [
        E2E_LOGOUT_COPY.BUTTON,
        E2E_LOGOUT_COPY.CONFIRM,
      ]) {
        await page
          .getByRole(ARIA_ROLE.BUTTON, { name })
          .click();
      }
    },
    chooseTheme: (theme: Theme): Promise<void> =>
      getThemeOption(theme).click(),
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
