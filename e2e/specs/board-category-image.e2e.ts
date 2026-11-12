import { expect, test } from "@playwright/test";
import { E2E_BOARD_IMAGE_SOURCE_ATTRIBUTE } from "../constants/E2eBoard.constants";
import {
  E2E_CATEGORY_IMAGE_STATIC_CARD,
  E2E_CATEGORY_IMAGE_UPLOADED_CARD,
  E2E_CATEGORY_IMAGE_UPLOADED_SOURCE_PATTERN,
} from "../constants/E2eCategoryImage.constants";
import { createBoardPage } from "../pages/Board.page";
import { addCategoryImage } from "../support/addCategoryImage";
import { removeCategoryImage } from "../support/removeCategoryImage";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Board category image", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("shows the uploaded image on the card of its category", async ({
    page,
  }, testInfo) => {
    const boardPage = createBoardPage(page);
    const categoryName =
      E2E_CATEGORY_IMAGE_UPLOADED_CARD[
        testInfo.project.name
      ];

    try {
      await addCategoryImage(categoryName);
      await boardPage.goTo();
      const card = boardPage.getCard(categoryName);

      await expect(
        boardPage.getCardImage(card)
      ).toHaveAttribute(
        E2E_BOARD_IMAGE_SOURCE_ATTRIBUTE,
        E2E_CATEGORY_IMAGE_UPLOADED_SOURCE_PATTERN
      );
      await expect
        .poll(() => boardPage.isCardImageLoaded(card))
        .toBe(true);
    } finally {
      await removeCategoryImage(categoryName);
    }
  });

  test("keeps the static image on a category without an upload", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);

    await boardPage.goTo();
    const card = boardPage.getCard(
      E2E_CATEGORY_IMAGE_STATIC_CARD.LABEL
    );

    await expect(
      boardPage.getCardImage(card)
    ).toHaveAttribute(
      E2E_BOARD_IMAGE_SOURCE_ATTRIBUTE,
      E2E_CATEGORY_IMAGE_STATIC_CARD.SOURCE_PATTERN
    );
  });
});
