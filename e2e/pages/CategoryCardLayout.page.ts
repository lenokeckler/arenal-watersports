import type { Page } from "@playwright/test";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createCategoryListPage } from "./CategoryList.page";

export const createCategoryCardLayoutPage = (
  page: Page
) => {
  const categoryListPage = createCategoryListPage(page);

  const hasContentOutsideCard = (
    categoryName: string
  ): Promise<boolean> =>
    categoryListPage
      .getCategoryCard(categoryName)
      .evaluate((card) => {
        const cardBox = card.getBoundingClientRect();

        return [...card.querySelectorAll("*")].some(
          (content) => {
            const contentBox =
              content.getBoundingClientRect();

            return (
              contentBox.width > 0 &&
              (contentBox.left < cardBox.left - 1 ||
                contentBox.right > cardBox.right + 1)
            );
          }
        );
      });

  const getCardHeight = async (
    categoryName: string
  ): Promise<number> => {
    const cardBox = await categoryListPage
      .getCategoryCard(categoryName)
      .boundingBox();

    return cardBox?.height ?? E2E_COUNT.NONE;
  };

  return {
    ...categoryListPage,
    getCardHeight,
    hasContentOutsideCard,
  };
};
