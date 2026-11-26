import { BOARD_LAYOUT_COLUMNS } from "@/app/constants";
import {
  E2E_BOARD_DEVICE_LAYOUT,
  E2E_BOARD_DEVICE_LAYOUT_SCREENSHOT,
} from "../constants/E2eBoardDeviceLayout.constants";
import { createBoardDeviceLayoutPage } from "../pages/BoardDeviceLayout.page";
import { captureFullPage } from "../support/captureFullPage";
import { expect, test } from "../support/activeWorkerTest";
import { openBoardAsOperationsWorker } from "../support/openBoardAsOperationsWorker";
import { waitForVisualStability } from "../support/waitForVisualStability";

test.describe("Board layout screenshots", () => {
  test("captures the panel, three cards per row and a reordered board", async ({
    activeWorker,
    page,
  }, testInfo) => {
    await openBoardAsOperationsWorker(page, activeWorker);
    const layoutPage = createBoardDeviceLayoutPage(page);
    const initialOrder = await layoutPage.readBoardOrder();

    await layoutPage.openPanel();
    await waitForVisualStability(page);
    await captureFullPage(
      page,
      E2E_BOARD_DEVICE_LAYOUT_SCREENSHOT.PANEL,
      testInfo.project.name
    );

    await layoutPage
      .getColumnsButton(BOARD_LAYOUT_COLUMNS.THREE)
      .click();
    await layoutPage.closePanel();
    await expect
      .poll(() =>
        layoutPage.boardPage.countCardsInFirstRow()
      )
      .toBe(BOARD_LAYOUT_COLUMNS.THREE);
    await waitForVisualStability(page);
    await captureFullPage(
      page,
      E2E_BOARD_DEVICE_LAYOUT_SCREENSHOT.THREE_PER_ROW,
      testInfo.project.name
    );

    await layoutPage.openPanel();
    await layoutPage.dragHandleWithMouse(
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.DRAGGED_INDEX],
      initialOrder[E2E_BOARD_DEVICE_LAYOUT.TARGET_INDEX]
    );
    await layoutPage.closePanel();
    await expect
      .poll(() => layoutPage.readBoardOrder())
      .not.toEqual(initialOrder);
    await waitForVisualStability(page);
    await captureFullPage(
      page,
      E2E_BOARD_DEVICE_LAYOUT_SCREENSHOT.REORDERED_BOARD,
      testInfo.project.name
    );
  });
});
