import { expect, test } from "@playwright/test";
import {
  E2E_BOARD_CARDS_PER_ROW,
  E2E_BOARD_GROUP,
  E2E_BOARD_HIDDEN_CATEGORY_NAMES,
  E2E_BOARD_STANDALONE_CARDS,
  resolveBoardFreeText,
  resolveBoardUsageText,
} from "../constants/E2eBoard.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createBoardPage } from "../pages/Board.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Equipment board", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
    const boardPage = createBoardPage(page);

    await boardPage.goTo();
    await expect(boardPage.getGrid()).toBeVisible();
  });

  test("shows one card per reservable category with its free, in use and total counts", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);

    for (const seeded of E2E_BOARD_STANDALONE_CARDS) {
      const card = boardPage.getCard(seeded.label);

      await expect(card).toHaveCount(E2E_COUNT.ONE);
      await expect(
        boardPage.getCardText(
          card,
          resolveBoardFreeText(seeded.totalCount)
        )
      ).toHaveCount(E2E_COUNT.ONE);
      await expect(
        boardPage.getCardText(
          card,
          resolveBoardUsageText(seeded.totalCount)
        )
      ).toHaveCount(E2E_COUNT.ONE);
    }
  });

  test("shows the grouped categories as one card with summed totals and each member listed with its own counts", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);
    const groupCard = boardPage.getCard(
      E2E_BOARD_GROUP.LABEL
    );

    await expect(groupCard).toHaveCount(E2E_COUNT.ONE);
    await expect(
      boardPage.getCardText(
        groupCard,
        resolveBoardFreeText(E2E_BOARD_GROUP.TOTAL_COUNT)
      )
    ).toHaveCount(E2E_COUNT.ONE);
    await expect(
      boardPage.getCardText(
        groupCard,
        resolveBoardUsageText(E2E_BOARD_GROUP.TOTAL_COUNT)
      )
    ).toHaveCount(E2E_COUNT.ONE);

    for (const member of E2E_BOARD_GROUP.MEMBERS) {
      const line = boardPage.getMemberLine(
        groupCard,
        member.name
      );

      await expect(line).toHaveCount(E2E_COUNT.ONE);
      await expect(
        boardPage.getCardText(
          line,
          resolveBoardFreeText(member.totalCount)
        )
      ).toHaveCount(E2E_COUNT.ONE);
      await expect(
        boardPage.getCardText(
          line,
          resolveBoardUsageText(member.totalCount)
        )
      ).toHaveCount(E2E_COUNT.ONE);
      await expect(
        boardPage.getCard(member.name)
      ).toHaveCount(E2E_COUNT.NONE);
    }
  });

  test("leaves the inventory-only equipment off the board", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);

    for (const categoryName of E2E_BOARD_HIDDEN_CATEGORY_NAMES) {
      await expect(
        boardPage.getTextInMain(categoryName)
      ).toHaveCount(E2E_COUNT.NONE);
    }
  });

  test("places the cards of the project width side by side in the first row", async ({
    page,
  }, testInfo) => {
    const boardPage = createBoardPage(page);

    await expect(
      boardPage.getCards().first()
    ).toBeVisible();

    expect(await boardPage.countCardsInFirstRow()).toBe(
      E2E_BOARD_CARDS_PER_ROW[testInfo.project.name]
    );
  });
});
