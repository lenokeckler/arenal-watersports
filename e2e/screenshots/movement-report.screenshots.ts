import { expect, test } from "@playwright/test";
import {
  E2E_MOVEMENT_REPORT,
  E2E_MOVEMENT_REPORT_SCREENSHOT_BASENAME,
} from "../constants/E2eMovementReport.constants";
import { createMovementReportPage } from "../pages/MovementReport.page";
import { captureFullPage } from "../support/captureFullPage";
import { createMovementReservationFixture } from "../support/createMovementReservationFixture";
import { deleteMovementReservationFixture } from "../support/deleteMovementReservationFixture";

test("captures the movement report", async ({
  page,
}, testInfo) => {
  await createMovementReservationFixture(
    E2E_MOVEMENT_REPORT.CUSTOMER
  );
  const reportPage = createMovementReportPage(page);

  try {
    await reportPage.goTo();
    await expect(reportPage.getMonthChart()).toBeVisible();
    await captureFullPage(
      page,
      E2E_MOVEMENT_REPORT_SCREENSHOT_BASENAME.REPORT,
      testInfo.project.name
    );
  } finally {
    await deleteMovementReservationFixture(
      E2E_MOVEMENT_REPORT.CUSTOMER
    );
  }
});
