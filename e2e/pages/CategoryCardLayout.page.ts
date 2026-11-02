import type { Page } from "@playwright/test";
import { createCategoryListPage } from "./CategoryList.page";

export const createCategoryCardLayoutPage = (
  page: Page
) => {
  const categoryListPage = createCategoryListPage(page);

  const hasActionOutsideCard = (
    categoryName: string
  ): Promise<boolean> =>
    categoryListPage
      .getCategoryCard(categoryName)
      .evaluate((card) => {
        const cardBox = card.getBoundingClientRect();

        return [...card.querySelectorAll("a, button")].some(
          (action) => {
            const actionBox =
              action.getBoundingClientRect();

            return (
              actionBox.left < cardBox.left - 1 ||
              actionBox.right > cardBox.right + 1
            );
          }
        );
      });

  return { ...categoryListPage, hasActionOutsideCard };
};
