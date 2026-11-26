import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_CATALOG_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCatalogCopy.constants";
import { resolveExtraCompatibilityPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraCompatibilityPath";
import {
  E2E_COMPATIBILITY_ATTRIBUTE,
  E2E_COMPATIBILITY_SELECTOR,
} from "../constants/E2eExtraCompatibility.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createExtraCompatibilityCategoriesPage = (
  page: Page
) => {
  const goTo = async (extraId: string): Promise<void> => {
    await page.goto(resolveExtraCompatibilityPath(extraId));
  };

  const getHeading = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
    });

  const getCategorySection = (
    categoryName: string
  ): Locator =>
    page.getByRole(ARIA_ROLE.REGION, {
      name: categoryName,
      exact: true,
    });

  const getCategoryLink = (categoryName: string): Locator =>
    getCategorySection(categoryName).locator(
      E2E_COMPATIBILITY_SELECTOR.SECTION_TOGGLE
    );

  const getCategoryProgress = (
    categoryName: string,
    progressLabel: string
  ): Locator =>
    getCategorySection(categoryName).getByText(
      progressLabel,
      { exact: true }
    );

  const openCategory = async (
    categoryName: string
  ): Promise<void> => {
    const openToggles = page.locator(
      E2E_COMPATIBILITY_SELECTOR.OPEN_SECTION_TOGGLE
    );

    for (const toggle of await openToggles.all()) {
      await toggle.click();
    }

    const toggle = getCategoryLink(categoryName);

    if (
      (await toggle.getAttribute(
        E2E_COMPATIBILITY_ATTRIBUTE.EXPANDED
      )) !== String(true)
    ) {
      await toggle.click();
    }
  };

  const getBackLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: EXTRA_CATALOG_COPY.BACK_BUTTON,
      exact: true,
    });

  return {
    goTo,
    getBackLink,
    getCategoryLink,
    getCategoryProgress,
    getHeading,
    openCategory,
  };
};
