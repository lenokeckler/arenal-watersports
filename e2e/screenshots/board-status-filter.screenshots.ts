import { BOARD_UNIT_FILTER } from "@/app/constants";
import { CATEGORY_UNITS_COPY } from "@/app/features/board/category-units/constants/CategoryUnitsCopy.constants";
import { E2E_BOARD_FILTER_SCREENSHOT_BASENAME } from "../constants/E2eEquipment.constants";
import { createBoardStatusFilterPage } from "../pages/BoardStatusFilter.page";
import { captureFullPage } from "../support/captureFullPage";
import { captureViewport } from "../support/captureViewport";
import { resolveDeviceScreenshotFileName } from "../constants/E2eScreenshot.constants";
import { expect, test } from "../support/dispatchSheetTest";

test.describe("Board status filter screenshots", () => {
  test("captures the filtered board, the filtered category and a unit panel", async ({
    boardMotorDispatchSheet: dispatchSheet,
    signedInPage: page,
  }, testInfo) => {
    const filter = createBoardStatusFilterPage(page);
    const [, damagedUnit] = dispatchSheet.unitCodes;
    const capture = (name: string): Promise<void> =>
      captureFullPage(page, name, testInfo.project.name);

    await dispatchSheet.makeMaintenanceNeeds();
    await filter.goTo();
    await filter.choose(BOARD_UNIT_FILTER.DAMAGED);
    await expect(page).toHaveURL(/status=damaged/);
    await capture(
      E2E_BOARD_FILTER_SCREENSHOT_BASENAME.BOARD
    );

    await filter
      .getCategoryCard(dispatchSheet.categoryName)
      .click();
    await expect(filter.getUnit(damagedUnit)).toBeVisible();
    await capture(
      E2E_BOARD_FILTER_SCREENSHOT_BASENAME.CATEGORY
    );

    await filter.openUnit(damagedUnit);
    await expect(
      filter.getAccessLink(
        CATEGORY_UNITS_COPY.ACCESS_HISTORY
      )
    ).toBeVisible();
    await captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        E2E_BOARD_FILTER_SCREENSHOT_BASENAME.PANEL,
        testInfo.project.name
      )
    );
  });
});
