import { expect, test } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation extras", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("shows only extras compatible with the selected seeded boat", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);
    await reservationFormPage.goTo();
    await reservationFormPage.selectReservationType(
      RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
    );
    await reservationFormPage.waitForUnitOption(
      E2E_RESERVATION_FORM_COPY.UNIT_OPTION
    );
    await reservationFormPage.selectUnit(
      E2E_RESERVATION_FORM_COPY.UNIT_OPTION
    );
    await expect(
      reservationFormPage.getExtrasHeading()
    ).toBeVisible();
    await expect(
      reservationFormPage.getExtraOption(
        E2E_RESERVATION_FORM_COPY.EXTRA_PONTOON_OPTION
      )
    ).toBeVisible();
    await expect(
      reservationFormPage.getExtraOption(
        E2E_RESERVATION_FORM_COPY.EXTRA_BENNINGTON_OPTION
      )
    ).toHaveCount(0);
    await expect(
      reservationFormPage.getQuoteTitle()
    ).toBeVisible();
    await expect(
      reservationFormPage.getQuoteMissingTariff()
    ).toBeVisible();
  });
});
