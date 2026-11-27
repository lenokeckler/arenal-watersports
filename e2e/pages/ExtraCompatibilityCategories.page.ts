import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { EXTRA_COMPATIBILITY_COPY } from "@/app/features/administration/extra-catalog/constants/ExtraCompatibilityCopy.constants";
import { resolveExtraCompatibilityPath } from "@/app/features/administration/extra-catalog/utils/resolveExtraCompatibilityPath";
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
      name: EXTRA_COMPATIBILITY_COPY.CATEGORIES_TITLE,
    });

  const getCategoryLink = (categoryName: string): Locator =>
    page
      .getByRole(ARIA_ROLE.LINK)
      .filter({ hasText: categoryName });

  const getCategoryProgress = (
    categoryName: string,
    progressLabel: string
  ): Locator =>
    getCategoryLink(categoryName).getByText(progressLabel, {
      exact: true,
    });

  const getBackLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: EXTRA_COMPATIBILITY_COPY.BACK_TO_EXTRAS_LINK,
    });

  return {
    goTo,
    getBackLink,
    getCategoryLink,
    getCategoryProgress,
    getHeading,
  };
};
