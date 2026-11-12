import { expect, test } from "@playwright/test";
import {
  E2E_BOARD_LAYOUT,
  E2E_BOARD_LAYOUT_VIEWPORTS,
} from "../constants/E2eBoard.constants";
import { E2E_PROJECT } from "../constants/E2eRuntime.constants";
import { createBoardPage } from "../pages/Board.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Equipment board layout", () => {
  test.beforeEach(async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== E2E_PROJECT.DEFAULT
    );

    await signInAsSeededWorker(page);
  });

  for (const viewport of E2E_BOARD_LAYOUT_VIEWPORTS) {
    test(`shows at least two rows of cards without scrolling at ${viewport.name} ${viewport.width}x${viewport.height}`, async ({
      page,
    }) => {
      const boardPage = createBoardPage(page);

      await page.setViewportSize({
        height: viewport.height,
        width: viewport.width,
      });
      await boardPage.goTo();
      await expect(boardPage.getGrid()).toBeVisible();
      await expect(
        boardPage.getCards().first()
      ).toBeVisible();

      const { fullyVisibleRows, totalRows } =
        await boardPage.measureCardRows();

      expect(fullyVisibleRows).toBeGreaterThanOrEqual(
        Math.min(
          totalRows,
          E2E_BOARD_LAYOUT.MIN_VISIBLE_ROWS
        )
      );
    });
  }
});
