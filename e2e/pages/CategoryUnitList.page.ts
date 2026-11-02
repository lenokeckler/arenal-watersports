import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE, STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { UNIT_LIST_COPY } from "@/app/features/administration/unit-catalog/constants/UnitListCopy.constants";
import type { UnitEffectiveStatus } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import { UNIT_STATUS_LABEL } from "@/app/features/administration/unit-catalog/constants/UnitStatusLabel.constants";
import { resolveCategoryUnitsPath } from "@/app/features/administration/unit-catalog/utils/resolveUnitPaths";
import { E2E_NEXT_NOT_FOUND_MESSAGE } from "../constants/E2eCategoryBehavior.constants";
import { HEADING_LEVEL } from "../constants/E2eRuntime.constants";

export const createCategoryUnitListPage = (page: Page) => {
  const goTo = async (
    categoryId: string
  ): Promise<void> => {
    await page.goto(resolveCategoryUnitsPath(categoryId));
  };

  const getUnitsLink = (categoryCard: Locator): Locator =>
    categoryCard.getByRole(ARIA_ROLE.LINK, {
      name: CATEGORY_CATALOG_COPY.UNITS_LINK,
    });

  const clickUnitsLink = async (
    categoryCard: Locator
  ): Promise<void> => {
    await getUnitsLink(categoryCard).click();
  };

  const getHeading = (categoryName: string): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      level: HEADING_LEVEL.PAGE,
      name: [
        UNIT_LIST_COPY.LIST_TITLE_PREFIX,
        categoryName,
      ].join(STRING.SPACE),
    });

  const getAddLink = (): Locator =>
    page.getByRole(ARIA_ROLE.LINK, {
      name: UNIT_LIST_COPY.ADD_LINK,
    });

  const getEmptyStateTitle = (): Locator =>
    page.getByRole(ARIA_ROLE.HEADING, {
      name: UNIT_LIST_COPY.EMPTY_STATE_TITLE,
    });

  const getUnitCard = (code: string): Locator =>
    page.getByRole(ARIA_ROLE.GROUP, { name: code });

  const getUnitStatus = (
    code: string,
    status: UnitEffectiveStatus
  ): Locator =>
    getUnitCard(code).getByText(UNIT_STATUS_LABEL[status]);

  const getEditLink = (code: string): Locator =>
    getUnitCard(code).getByRole(ARIA_ROLE.LINK, {
      name: UNIT_LIST_COPY.EDIT_LINK,
    });

  const getNotFoundMessage = (): Locator =>
    page.getByText(E2E_NEXT_NOT_FOUND_MESSAGE);

  return {
    goTo,
    clickUnitsLink,
    getUnitsLink,
    getHeading,
    getAddLink,
    getEmptyStateTitle,
    getUnitCard,
    getUnitStatus,
    getEditLink,
    getNotFoundMessage,
  };
};
