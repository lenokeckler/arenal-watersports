import { expect, test } from "@playwright/test";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { createReservationFormNegativeInputPage } from "../pages/ReservationFormNegativeInput.page";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

test.describe("Reservation form negative numeric input", () => {
  test.beforeEach(async ({ page }) => {
    await signInAsSeededWorker(page);
  });

  test("preserves a positive people count after a negative attempt", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormNegativeInputPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.enterPeopleCount();
    await reservationFormPage.attemptNegativePeopleCount();

    await expect(
      reservationFormPage.getPeopleCountInput()
    ).toHaveValue(
      E2E_RESERVATION_FORM_COPY.VALID_PEOPLE_COUNT
    );
  });

  test("preserves a positive equipment quantity after a negative attempt", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormNegativeInputPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.enterEquipmentQuantity();
    await reservationFormPage.attemptNegativeEquipmentQuantity();

    await expect(
      reservationFormPage.getEquipmentQuantityInput()
    ).toHaveValue(
      E2E_RESERVATION_FORM_COPY.VALID_EQUIPMENT_QUANTITY
    );
  });

  test("keeps blank custom duration blank after a negative attempt", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormNegativeInputPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.selectCustomDuration();
    await reservationFormPage.attemptNegativeCustomDuration();

    await expect(
      reservationFormPage.getCustomDurationInput()
    ).toHaveValue("");
  });

  test("preserves a positive custom duration after a negative attempt", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormNegativeInputPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.selectCustomDuration();
    await reservationFormPage.enterCustomDuration();
    await reservationFormPage.attemptNegativeCustomDuration();

    await expect(
      reservationFormPage.getCustomDurationInput()
    ).toHaveValue(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_HOURS
    );
  });
});
