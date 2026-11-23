import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CONFIGURE_COPY } from "@/app/features/administration/category-catalog/constants/CategoryConfigureCopy.constants";
import { resolveCategoryConfigurePath } from "@/app/features/administration/category-catalog/utils/resolveCategoryConfigurePath";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createCategoryConfigurePage = (page: Page) => {
  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(
      resolveCategoryConfigurePath(categoryId)
    );
  };

  const getHeading = (name: string): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name,
    });

  const getSectionButton = (title: string): Locator =>
    page.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(`^${title}`),
    });

  const getSectionHeadings = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.CARD,
    });

  const getBackLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CONFIGURE_COPY.BACK,
    });

  const getActiveSwitch = (): Locator =>
    page.getByRole(ARIA_ROLE.SWITCH, {
      name: CATEGORY_CONFIGURE_COPY.ACTIVE_LABEL,
    });

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  const toggleSection = async (
    title: string
  ): Promise<void> => {
    await getSectionButton(title).click();
  };

  return {
    goTo,
    getHeading,
    getSectionButton,
    getSectionHeadings,
    getBackLink,
    getActiveSwitch,
    getNotFoundMessage,
    toggleSection,
  };
};
