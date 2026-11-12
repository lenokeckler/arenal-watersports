import type { Locator } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryCardOptionsPage } from "./CategoryCardOptions.page";

export const createCategoryBehaviorLinkPage = () => {
  const categoryCardOptionsPage =
    createCategoryCardOptionsPage();

  const clickBehaviorLink = async (
    categoryCard: Locator
  ): Promise<void> => {
    await categoryCardOptionsPage.openOptions(categoryCard);
    await categoryCard
      .getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_CATALOG_COPY.BEHAVIOR_LINK,
      })
      .click();
  };

  return { clickBehaviorLink };
};
