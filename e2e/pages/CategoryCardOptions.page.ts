import type { Locator } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";

export const createCategoryCardOptionsPage = () => {
  const getEditButton = (
    categoryCard: Locator,
    isExpanded: boolean
  ): Locator =>
    categoryCard.getByRole(ARIA_ROLE.BUTTON, {
      expanded: isExpanded,
      name: CATEGORY_CATALOG_COPY.EDIT_BUTTON,
    });

  const openOptions = async (
    categoryCard: Locator
  ): Promise<void> => {
    const collapsedEditButton = getEditButton(
      categoryCard,
      false
    );

    if (
      (await collapsedEditButton.count()) > E2E_COUNT.NONE
    ) {
      await collapsedEditButton.click();
    }

    await getEditButton(categoryCard, true).waitFor();
  };

  return { getEditButton, openOptions };
};
