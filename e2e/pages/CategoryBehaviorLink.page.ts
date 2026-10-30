import type { Locator } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/components/category-catalog/constants/CategoryCatalogCopy.constants";

export const createCategoryBehaviorLinkPage = () => {
  const clickBehaviorLink = async (
    categoryCard: Locator
  ): Promise<void> => {
    await categoryCard
      .getByRole(ARIA_ROLE.LINK, {
        name: CATEGORY_CATALOG_COPY.BEHAVIOR_LINK,
      })
      .click();
  };

  return { clickBehaviorLink };
};
