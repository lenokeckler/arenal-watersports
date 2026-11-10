import { expect, test } from "@playwright/test";
import { PATHS } from "@/app/constants";
import { E2E_BOARD_CUADRACICLO } from "../constants/E2eBoard.constants";
import {
  E2E_MALFORMED_CATEGORY_ID,
  E2E_UNKNOWN_CATEGORY_ID,
} from "../constants/E2eCategoryBehavior.constants";
import { createBoardPage } from "../pages/Board.page";
import { createBoardCategoryUnitsPage } from "../pages/BoardCategoryUnits.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Board category units screen", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("the back link returns to the board", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);
    const unitsPage = createBoardCategoryUnitsPage(page);

    await boardPage.goTo();
    await boardPage.clickCard(E2E_BOARD_CUADRACICLO.LABEL);
    await unitsPage.getBackLink().click();

    await expect(page).toHaveURL(PATHS.BOARD);
    await expect(boardPage.getGrid()).toBeVisible();
  });

  test("an unknown category id shows the Spanish not-found", async ({
    page,
  }) => {
    const unitsPage = createBoardCategoryUnitsPage(page);

    await unitsPage.goTo(E2E_UNKNOWN_CATEGORY_ID);

    await expect(
      unitsPage.getNotFoundTitle()
    ).toBeVisible();
  });

  test("a malformed category id shows the Spanish not-found", async ({
    page,
  }) => {
    const unitsPage = createBoardCategoryUnitsPage(page);

    await unitsPage.goTo(E2E_MALFORMED_CATEGORY_ID);

    await expect(
      unitsPage.getNotFoundTitle()
    ).toBeVisible();
  });
});
