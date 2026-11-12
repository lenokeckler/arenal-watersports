import type { Locator, Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "@/app/features/access/system-navigation/constants/SystemNavigationCopy.constants";
import {
  E2E_SYSTEM_NAVIGATION_ARIA,
  E2E_SYSTEM_NAVIGATION_MEASUREMENT,
  resolveSystemNavigationScreenshotName,
} from "../constants/E2eSystemNavigation.constants";
import { failE2eOperation } from "../support/failE2eOperation";
import { captureViewport } from "../support/captureViewport";
import type { SystemNavigationMode } from "../models/SystemNavigationMode.type";
import {
  E2E_DESKTOP_VIEWPORT,
  E2E_VIEWPORT,
} from "../constants/E2eRuntime.constants";
import type { SystemNavigationViewport } from "../models/SystemNavigationViewport.type";
import type { SystemNavigationPage } from "../models/SystemNavigationPage.type";

export const createSystemNavigationPage = (
  page: Page
): SystemNavigationPage => {
  const testViewport = (): SystemNavigationViewport =>
    page.viewportSize()?.width ===
    E2E_DESKTOP_VIEWPORT.width
      ? E2E_VIEWPORT.DESKTOP
      : E2E_VIEWPORT.MOBILE;

  const getNavigation = (): Locator =>
    page.getByRole(E2E_SYSTEM_NAVIGATION_ARIA.NAVIGATION, {
      name: SYSTEM_NAVIGATION_COPY.LABEL,
    });

  const getLink = (label: string): Locator =>
    getNavigation().getByRole(
      E2E_SYSTEM_NAVIGATION_ARIA.LINK,
      { name: label }
    );

  const getLinks = (): Locator =>
    getNavigation().getByRole(
      E2E_SYSTEM_NAVIGATION_ARIA.LINK
    );

  const getLinkHrefs = (): Promise<string[]> =>
    getLinks().evaluateAll((links) =>
      links.map(
        (link) =>
          new URL(
            link.getAttribute("href") ?? "",
            window.location.href
          ).pathname
      )
    );

  const getMenuButton = (): Locator =>
    getNavigation().getByRole(
      E2E_SYSTEM_NAVIGATION_ARIA.BUTTON,
      { name: SYSTEM_NAVIGATION_COPY.MENU }
    );

  const getItemSpacingDifference =
    async (): Promise<number> => {
      const navigation = getNavigation();
      const itemLocators = await navigation
        .getByRole(E2E_SYSTEM_NAVIGATION_ARIA.LINK)
        .all();
      const menuButton = navigation.getByRole(
        E2E_SYSTEM_NAVIGATION_ARIA.BUTTON,
        { name: SYSTEM_NAVIGATION_COPY.MENU }
      );
      itemLocators.push(menuButton);
      const itemBounds = await Promise.all(
        itemLocators.map((item) => item.boundingBox())
      );

      const itemCenters = itemBounds.map((bounds) => {
        if (!bounds) {
          return failE2eOperation(
            E2E_SYSTEM_NAVIGATION_MEASUREMENT.ITEM_SPACING,
            E2E_SYSTEM_NAVIGATION_MEASUREMENT.NOT_LAID_OUT
          );
        }

        return bounds.x + bounds.width / 2;
      });

      if (itemCenters.length < 2) {
        return failE2eOperation(
          E2E_SYSTEM_NAVIGATION_MEASUREMENT.ITEM_SPACING,
          E2E_SYSTEM_NAVIGATION_MEASUREMENT.NOT_ENOUGH_ITEMS
        );
      }

      const itemSpacings = itemCenters
        .slice(1)
        .map(
          (center, index) => center - itemCenters[index]
        );

      return (
        Math.max(...itemSpacings) -
        Math.min(...itemSpacings)
      );
    };

  const goTo = async (): Promise<void> => {
    await page.goto(PATHS.BOARD);
  };

  const capture = (
    mode: SystemNavigationMode
  ): Promise<void> =>
    captureViewport(
      page,
      resolveSystemNavigationScreenshotName(
        mode,
        testViewport()
      )
    );

  return {
    capture,
    getItemSpacingDifference,
    getLink,
    getLinkHrefs,
    getLinks,
    getMenuButton,
    getNavigation,
    goTo,
  };
};
