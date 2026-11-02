import { expect, test } from "@playwright/test";
import { RESERVATION_FORM_UI_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationFormUiCopy.constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { createReservationCategoryAvailabilityPage } from "../pages/ReservationCategoryAvailability.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test("shows category availability for the selected future interval", async ({
  page,
}) => {
  await signInAsSeededWorker(page);
  const reservationPage =
    createReservationCategoryAvailabilityPage(page);

  await reservationPage.prepareInterval();

  await expect(
    reservationPage.getAvailabilityPanel()
  ).toBeVisible();
  await expect(
    reservationPage.getAvailabilityPanel()
  ).toContainText(
    E2E_RESERVATION_FORM_COPY.CATEGORY_AVAILABILITY_OPTION
  );
  await expect(
    reservationPage.getAvailabilityPanel()
  ).toContainText(
    E2E_RESERVATION_FORM_COPY.CATEGORY_AVAILABILITY_TIME
  );
  await expect(
    reservationPage.getAvailabilityStatus()
  ).toContainText(
    RESERVATION_FORM_UI_COPY.CATEGORY_AVAILABILITY_AVAILABLE
  );
  await expect(
    reservationPage.getAvailabilityCount()
  ).toHaveText(
    E2E_RESERVATION_FORM_COPY.CATEGORY_AVAILABILITY_EXPECTED_COUNT
  );
});
