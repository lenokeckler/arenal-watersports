import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "@/app/features/administration/category-catalog/constants/CategoryCatalogCopy.constants";
import { createCategoryListPage } from "./CategoryList.page";

export const createCategoryReactivatePage = (
  page: Page
) => {
  const categoryListPage = createCategoryListPage(page);

  const getReactivateButton = (
    categoryName: string
  ): Locator =>
    categoryListPage
      .getCategoryCard(categoryName)
      .getByRole(ARIA_ROLE.BUTTON, {
        name: CATEGORY_CATALOG_COPY.REACTIVATE_BUTTON,
      });

  const clickReactivateButton = async (
    categoryName: string
  ): Promise<void> => {
    await categoryListPage.openCategoryOptions(
      categoryName
    );
    await getReactivateButton(categoryName).click();
  };

  return {
    ...categoryListPage,
    clickReactivateButton,
    getReactivateButton,
  };
};
