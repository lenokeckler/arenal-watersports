import { expect, test } from "../support/activeWorkerTest";
import {
  E2E_RESERVATION_DURATION_PRESET,
  E2E_RESERVATION_FORM_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test.describe("Reservation form inputs", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test("shows reservation fields in Costa Rica time", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);
    await reservationFormPage.goTo();

    await expect(
      reservationFormPage.getHeading()
    ).toHaveText(E2E_RESERVATION_FORM_COPY.HEADING);
    await expect(
      reservationFormPage.getCustomerNameInput()
    ).toBeVisible();
    await expect(
      reservationFormPage.getPeopleCountInput()
    ).toBeVisible();
    await expect(
      reservationFormPage.getDateInput()
    ).toBeVisible();
    await expect(
      reservationFormPage.getTimeInput()
    ).toBeVisible();
    await expect(
      reservationFormPage.getTimeZoneHint()
    ).toBeVisible();
    await expect(
      reservationFormPage.getCategorySelect()
    ).toBeEnabled();
  });

  test("selects a duration preset and reports required customer name", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);
    await reservationFormPage.goTo();
    await reservationFormPage.selectDuration(
      E2E_RESERVATION_DURATION_PRESET.LABEL
    );

    await expect(
      reservationFormPage.getDurationButton(
        E2E_RESERVATION_DURATION_PRESET.LABEL
      )
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      reservationFormPage.getDurationInput()
    ).toBeHidden();
    await reservationFormPage.submit();
    await expect(
      reservationFormPage.getValidationError()
    ).toBeVisible();
  });

  test("shows the custom duration field only when selected", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);
    await reservationFormPage.goTo();
    await expect(
      reservationFormPage.getDurationInput()
    ).toBeHidden();
    await reservationFormPage.selectDuration(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_OPTION
    );

    await expect(
      reservationFormPage.getDurationInput()
    ).toBeVisible();
    await expect(
      reservationFormPage.getDurationInput()
    ).toHaveValue("");
    await reservationFormPage.typeCustomDuration(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_HOURS
    );
    await expect(
      reservationFormPage.getDurationInput()
    ).toHaveValue(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_HOURS
    );
    await reservationFormPage.selectDuration(
      E2E_RESERVATION_DURATION_PRESET.LABEL
    );
    await expect(
      reservationFormPage.getDurationInput()
    ).toBeHidden();
  });
});
