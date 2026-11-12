import { expect, test } from "@playwright/test";
import { E2E_MOVEMENT_REPORT } from "../constants/E2eMovementReport.constants";
import { createMovementReportPage } from "../pages/MovementReport.page";
import { createMovementReservationFixture } from "../support/createMovementReservationFixture";
import { deleteMovementReservationFixture } from "../support/deleteMovementReservationFixture";

test("administration compares the departures by month and by weekday in charts", async ({
  page,
}) => {
  await createMovementReservationFixture(
    E2E_MOVEMENT_REPORT.CUSTOMER
  );
  const reportPage = createMovementReportPage(page);

  try {
    await reportPage.goTo();

    await expect(reportPage.getHeading()).toBeVisible();
    await expect(reportPage.getMonthChart()).toBeVisible();
    await expect(reportPage.getWeekdayRows()).toHaveCount(
      E2E_MOVEMENT_REPORT.WEEKDAY_ROWS
    );
  } finally {
    await deleteMovementReservationFixture(
      E2E_MOVEMENT_REPORT.CUSTOMER
    );
  }
});
