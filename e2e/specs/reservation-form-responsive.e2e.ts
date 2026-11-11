import { expect, test } from "../support/activeWorkerTest";
import type { Page } from "@playwright/test";
import {
  E2E_CSS_POSITION,
  E2E_PROJECT,
} from "../constants/E2eRuntime.constants";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_TYPE_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const expectNoHorizontalOverflow = async (
  page: Page
): Promise<void> => {
  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      window.innerWidth
  );
  expect(hasHorizontalOverflow).toBe(false);
};

test.describe("Reservation form responsive layout", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test("keeps the form readable and submit reachable", async ({
    page,
  }, testInfo) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.selectReservationType(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
    );
    await expect(
      reservationFormPage.getUnitSelect()
    ).toBeVisible();

    await expectNoHorizontalOverflow(page);
    await expect(
      reservationFormPage.getBackButton()
    ).toBeVisible();
    await expect(
      reservationFormPage.getSubmitButton()
    ).toBeVisible();
    const expectedActionBarPosition =
      testInfo.project.name === E2E_PROJECT.MOBILE
        ? E2E_CSS_POSITION.STICKY
        : E2E_CSS_POSITION.STATIC;
    await expect(
      reservationFormPage.getSubmitActionBar()
    ).toHaveCSS("position", expectedActionBarPosition);
  });
});
