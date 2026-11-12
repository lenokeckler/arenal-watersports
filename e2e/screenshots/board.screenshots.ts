import { expect, test } from "@playwright/test";
import { E2E_BOARD_SCREENSHOT_BASENAME } from "../constants/E2eBoard.constants";
import { createBoardPage } from "../pages/Board.page";
import { captureFullPage } from "../support/captureFullPage";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Equipment board screenshots", () => {
  test("captures the board with the seeded equipment", async ({
    page,
  }, testInfo) => {
    await signInAsSeededWorker(page);
    const boardPage = createBoardPage(page);

    await boardPage.goTo();
    await expect(boardPage.getGrid()).toBeVisible();
    await expect(
      boardPage.getCards().first()
    ).toBeVisible();

    await captureFullPage(
      page,
      E2E_BOARD_SCREENSHOT_BASENAME,
      testInfo.project.name
    );
  });
});
