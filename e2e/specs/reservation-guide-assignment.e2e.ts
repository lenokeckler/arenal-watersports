import { expect, test } from "@playwright/test";
import { E2E_RESERVATION_GUIDES } from "../constants/E2eReservationForm.constants";
import { E2E_RESERVATION_TYPE_COPY } from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation guide assignment", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
    await createReservationFormPage(page).goTo();
    await createReservationFormPage(
      page
    ).selectReservationType(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
  });

  test("lists marked guides and allows selecting multiple guides", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await expect(
      reservationFormPage.getGuideCheckbox(
        E2E_RESERVATION_GUIDES.FIRST_NAME
      )
    ).toBeVisible();
    await expect(
      reservationFormPage.getGuideCheckbox(
        E2E_RESERVATION_GUIDES.SECOND_NAME
      )
    ).toBeVisible();
    await expect(
      reservationFormPage.getGuideCheckbox(
        E2E_RESERVATION_GUIDES.UNMARKED_WORKER_NAME
      )
    ).toHaveCount(0);

    await reservationFormPage.selectGuide(
      E2E_RESERVATION_GUIDES.FIRST_NAME
    );
    await reservationFormPage.selectGuide(
      E2E_RESERVATION_GUIDES.SECOND_NAME
    );

    await expect(
      reservationFormPage.getGuideCheckbox(
        E2E_RESERVATION_GUIDES.FIRST_NAME
      )
    ).toBeChecked();
    await expect(
      reservationFormPage.getGuideCheckbox(
        E2E_RESERVATION_GUIDES.SECOND_NAME
      )
    ).toBeChecked();
  });
});
