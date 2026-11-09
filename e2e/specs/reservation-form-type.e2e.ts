import { expect, test } from "@playwright/test";
import { E2E_RESERVATION_TYPE_COPY } from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation form type", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("defaults to rental and excludes guide-only categories", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();

    await expect(
      reservationFormPage.getReservationTypeRadio(
        E2E_RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
      )
    ).toBeChecked();
    for (const category of E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_CATEGORY_OPTIONS) {
      await expect(
        reservationFormPage.getCategoryOption(category)
      ).toHaveCount(0);
    }
  });

  test("shows the rental description", async ({ page }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();

    await expect(
      reservationFormPage.getReservationTypeDescription(
        E2E_RESERVATION_TYPE_COPY.OPTIONS.RENTAL.description
      )
    ).toBeVisible();
  });

  test("shows the tour description", async ({ page }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();

    await expect(
      reservationFormPage.getReservationTypeDescription(
        E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.description
      )
    ).toBeVisible();
  });

  test("shows the combo description", async ({ page }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();

    await expect(
      reservationFormPage.getReservationTypeDescription(
        E2E_RESERVATION_TYPE_COPY.OPTIONS.COMBO.description
      )
    ).toBeVisible();
  });

  test("offers guide-only categories for a tour", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.selectReservationType(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );

    for (const category of E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_CATEGORY_OPTIONS) {
      await expect(
        reservationFormPage.getCategoryOption(category)
      ).toHaveCount(1);
    }
  });
});
