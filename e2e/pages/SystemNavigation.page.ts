import type { Locator, Page } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { SYSTEM_NAVIGATION_COPY } from "@/app/features/access/system-navigation/constants/SystemNavigationCopy.constants";
import {
  E2E_SYSTEM_NAVIGATION_ARIA,
  resolveSystemNavigationScreenshotName,
} from "../constants/E2eSystemNavigation.constants";
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
    getLink,
    getNavigation,
    goTo,
  };
};
