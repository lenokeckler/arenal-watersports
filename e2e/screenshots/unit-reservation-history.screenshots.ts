import { UNIT_STATUS } from "@/app/features/administration/unit-catalog/constants/UnitStatus.constants";
import { captureFullPage } from "../support/captureFullPage";
import { test } from "../support/categoryUnitsTest";
import {
  decommissionSeededUnit,
  readUnit,
} from "../support/unitFixtures";
import {
  E2E_UNIT_RESERVATION_SCREENSHOT,
  E2E_UNIT_RESERVATION_SEEDS,
  resolveUnitReservationScreenshotBasename,
} from "../constants/E2eUnitReservationHistory.constants";

test.describe("Unit reservation history screenshots", () => {
  test("captures the rows, the empty state and a decommissioned unit", async ({
    page,
    formPage,
    listPage,
    seedUnitCategory,
    seedUnitReservations,
  }, testInfo) => {
    const {
      categoryId,
      codes: [rowsCode, emptyCode, decommissionedCode],
    } = await seedUnitCategory(
      E2E_UNIT_RESERVATION_SCREENSHOT.SCENARIO,
      {},
      [
        UNIT_STATUS.AVAILABLE,
        UNIT_STATUS.AVAILABLE,
        UNIT_STATUS.AVAILABLE,
      ]
    );
    const rowsUnitId = (await readUnit(rowsCode)).id;
    const emptyUnitId = (await readUnit(emptyCode)).id;
    const decommissionedUnitId = (
      await readUnit(decommissionedCode)
    ).id;
    await seedUnitReservations(
      rowsUnitId,
      E2E_UNIT_RESERVATION_SEEDS
    );
    await seedUnitReservations(
      decommissionedUnitId,
      E2E_UNIT_RESERVATION_SEEDS
    );
    await decommissionSeededUnit(decommissionedCode);
    const capture = async (
      state: string
    ): Promise<void> => {
      await page.evaluate(() => window.scrollTo(0, 0));
      await captureFullPage(
        page,
        resolveUnitReservationScreenshotBasename(state),
        testInfo.project.name
      );
    };

    await formPage.goTo(categoryId, rowsUnitId);
    await formPage.getReservationRows().first().waitFor();
    await capture(
      E2E_UNIT_RESERVATION_SCREENSHOT.STATE.ROWS
    );

    await formPage.goTo(categoryId, emptyUnitId);
    await formPage
      .getReservationHistoryEmptyState()
      .waitFor();
    await capture(
      E2E_UNIT_RESERVATION_SCREENSHOT.STATE.EMPTY
    );

    await listPage.goTo(categoryId);
    await listPage
      .getHistoryLink(decommissionedCode)
      .click();
    await formPage.getDecommissionedNotice().waitFor();
    await formPage.getReservationRows().first().waitFor();
    await capture(
      E2E_UNIT_RESERVATION_SCREENSHOT.STATE.DECOMMISSIONED
    );
  });
});
