import {
  expect,
  test,
  type Page,
  type TestInfo,
} from "@playwright/test";
import {
  E2E_RESERVATION_MONEY_MOVEMENTS_COPY as copy,
  E2E_RESERVATION_MONEY_MOVEMENTS_SCREENSHOT as screenshot,
} from "../constants/E2eReservationMoneyMovements.constants";
import {
  E2E_NEXT_DEV_INDICATOR_SELECTOR,
  E2E_SCREENSHOT_FULL_PAGE,
  resolveDeviceScreenshotFileName,
} from "../constants/E2eScreenshot.constants";
import { createReservationMoneyMovementsPage } from "../pages/ReservationMoneyMovements.page";
import { captureViewport } from "../support/captureViewport";
import { createReservationDetailFixture } from "../support/createReservationDetailFixture";
import { seedReservationMoneyMovements } from "../support/seedReservationMoneyMovements";
import { signInWithCredentials } from "../support/signInWithCredentials";

const removeDevIndicator = (page: Page): Promise<void[]> =>
  page
    .locator(E2E_NEXT_DEV_INDICATOR_SELECTOR)
    .evaluateAll((indicators) =>
      indicators.map((indicator) => indicator.remove())
    );

const captureState = (
  page: Page,
  testInfo: TestInfo,
  basename: string
): Promise<void> =>
  captureViewport(
    page,
    resolveDeviceScreenshotFileName(
      basename,
      testInfo.project.name
    ),
    E2E_SCREENSHOT_FULL_PAGE
  );

const captureFoldedAndOpen = async (
  page: Page,
  testInfo: TestInfo
): Promise<void> => {
  const movements =
    createReservationMoneyMovementsPage(page);
  const showToggle = movements.getToggle(
    copy.MOVEMENTS_SHOW
  );
  await expect(showToggle).toBeVisible();
  await removeDevIndicator(page);
  await showToggle.scrollIntoViewIfNeeded();
  await captureState(
    page,
    testInfo,
    screenshot.FOLDED_BASENAME
  );
  await showToggle.click();
  await expect(movements.getRows().first()).toBeVisible();
  await movements.getPanel().scrollIntoViewIfNeeded();
  await captureState(
    page,
    testInfo,
    screenshot.OPEN_BASENAME
  );
};

const captureEmpty = async (
  page: Page,
  testInfo: TestInfo
): Promise<void> => {
  const empty =
    createReservationMoneyMovementsPage(page).getEmpty();
  await expect(empty).toBeVisible();
  await removeDevIndicator(page);
  await empty.scrollIntoViewIfNeeded();
  await captureState(
    page,
    testInfo,
    screenshot.EMPTY_BASENAME
  );
};

test("captures the money movements states", async ({
  page,
}, testInfo) => {
  const reservationFixture =
    await createReservationDetailFixture();
  const detailPage =
    createReservationMoneyMovementsPage(page).detailPage;

  try {
    await signInWithCredentials(
      page,
      reservationFixture.workerUsername,
      reservationFixture.workerPassword
    );
    await reservationFixture.clearDetails();
    await seedReservationMoneyMovements(
      reservationFixture.id
    );
    await detailPage.goTo(reservationFixture.id);
    await captureFoldedAndOpen(page, testInfo);
    await reservationFixture.clearDetails();
    await detailPage.goTo(reservationFixture.id);
    await captureEmpty(page, testInfo);
  } finally {
    await reservationFixture.cleanup();
  }
});
