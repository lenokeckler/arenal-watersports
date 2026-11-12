import { expect, test } from "@playwright/test";
import { ARIA_CURRENT } from "@/app/constants";
import {
  E2E_ARIA_CURRENT_ATTRIBUTE,
  E2E_BOARD_CATEGORY_URL_PATTERN,
  E2E_BOARD_CUADRACICLO,
  E2E_BOARD_GROUP,
  E2E_BOARD_KAYAK_SWITCH,
} from "../constants/E2eBoard.constants";
import { E2E_COUNT } from "../constants/E2eRuntime.constants";
import { createBoardPage } from "../pages/Board.page";
import { createBoardCategoryUnitsPage } from "../pages/BoardCategoryUnits.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Board card links", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
    const boardPage = createBoardPage(page);

    await boardPage.goTo();
    await expect(boardPage.getGrid()).toBeVisible();
  });

  test("opens the units screen of a plain card with its seeded units", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);
    const unitsPage = createBoardCategoryUnitsPage(page);

    await boardPage.clickCard(E2E_BOARD_CUADRACICLO.LABEL);

    await expect(page).toHaveURL(
      E2E_BOARD_CATEGORY_URL_PATTERN
    );
    await expect(
      unitsPage.getHeading(E2E_BOARD_CUADRACICLO.LABEL)
    ).toBeVisible();

    for (const unitCode of E2E_BOARD_CUADRACICLO.UNIT_CODES) {
      await expect(
        unitsPage.getUnitHeading(unitCode)
      ).toBeVisible();
    }
  });

  test("opens the first member of a grouped card and switches to its sibling", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);
    const unitsPage = createBoardCategoryUnitsPage(page);
    const { FIRST, SECOND } = E2E_BOARD_KAYAK_SWITCH;

    await boardPage.clickCard(E2E_BOARD_GROUP.LABEL);

    await expect(
      unitsPage.getHeading(FIRST.name)
    ).toBeVisible();
    await expect(
      unitsPage.getSwitchLink(FIRST.name)
    ).toHaveAttribute(
      E2E_ARIA_CURRENT_ATTRIBUTE,
      ARIA_CURRENT.PAGE
    );
    await expect(
      unitsPage.getSwitchLink(SECOND.name)
    ).toBeVisible();

    await unitsPage.clickSwitchLink(SECOND.name);

    await expect(
      unitsPage.getHeading(SECOND.name)
    ).toBeVisible();
    await expect(
      unitsPage.getUnitHeading(SECOND.unitCode)
    ).toBeVisible();
    await expect(
      unitsPage.getSwitchLink(SECOND.name)
    ).toHaveAttribute(
      E2E_ARIA_CURRENT_ATTRIBUTE,
      ARIA_CURRENT.PAGE
    );
  });

  test("shows no group switch on a category without a group", async ({
    page,
  }) => {
    const boardPage = createBoardPage(page);
    const unitsPage = createBoardCategoryUnitsPage(page);

    await boardPage.clickCard(E2E_BOARD_CUADRACICLO.LABEL);

    await expect(
      unitsPage.getHeading(E2E_BOARD_CUADRACICLO.LABEL)
    ).toBeVisible();
    await expect(unitsPage.getGroupSwitch()).toHaveCount(
      E2E_COUNT.NONE
    );
  });
});
