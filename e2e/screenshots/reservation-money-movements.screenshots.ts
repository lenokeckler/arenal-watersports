import { expect, test } from "@playwright/test";
import {
  E2E_RESERVATION_MONEY_MOVEMENTS_COPY as copy,
  E2E_RESERVATION_MONEY_MOVEMENTS_SCREENSHOT as screenshot,
} from "../constants/E2eReservationMoneyMovements.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationMoneyMovementsPage } from "../pages/ReservationMoneyMovements.page";
import { captureViewport } from "../support/captureViewport";
import { createReservationDetailFixture } from "../support/createReservationDetailFixture";
import { insertReservationMoneyMovements } from "../support/insertReservationMoneyMovements";
import { signInWithCredentials } from "../support/signInWithCredentials";
import { createServiceRoleSupabaseClient } from "@/app/services/supabase";

test("captures the money movements states", async ({
  page,
}, testInfo) => {
  const reservationFixture =
    await createReservationDetailFixture();
  const movements =
    createReservationMoneyMovementsPage(page);
  const capture = (basename: string): Promise<void> =>
    captureViewport(
      page,
      resolveDeviceScreenshotFileName(
        basename,
        testInfo.project.name
      )
    );
  const removeDevIndicator = (): Promise<void[]> =>
    page
      .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
      .evaluateAll((indicators) =>
        indicators.map((indicator) => indicator.remove())
      );

  try {
    await signInWithCredentials(
      page,
      reservationFixture.workerUsername,
      reservationFixture.workerPassword
    );
    await reservationFixture.clearDetails();
    const supabase = createServiceRoleSupabaseClient();
    try {
      await insertReservationMoneyMovements(
        supabase,
        reservationFixture.id
      );
    } finally {
      await supabase.removeAllChannels();
    }
    await movements.detailPage.goTo(reservationFixture.id);
    const showToggle = movements.getToggle(
      copy.MOVEMENTS_SHOW
    );
    await expect(showToggle).toBeVisible();
    await removeDevIndicator();
    await showToggle.scrollIntoViewIfNeeded();
    await capture(screenshot.FOLDED_BASENAME);
    await showToggle.click();
    await expect(movements.getRows().first()).toBeVisible();
    await movements.getPanel().scrollIntoViewIfNeeded();
    await capture(screenshot.OPEN_BASENAME);
    await reservationFixture.clearDetails();
    await movements.detailPage.goTo(reservationFixture.id);
    await expect(movements.getEmpty()).toBeVisible();
    await removeDevIndicator();
    await movements.getEmpty().scrollIntoViewIfNeeded();
    await capture(screenshot.EMPTY_BASENAME);
  } finally {
    await reservationFixture.cleanup();
  }
});
