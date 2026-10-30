import { PATHS, STRING } from "@/app/constants";
import { expect, test } from "../support/activeWorkerTest";
import {
  E2E_RESERVATION_DURATION_PRESET,
  E2E_RESERVATION_FORM_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { createWorkModePage } from "../pages/WorkMode.page";
import { E2E_RESERVATIONS_AREA_LABEL } from "../constants/E2eWorkMode.constants";
import { addReservationsArea } from "../support/addReservationsArea";
import { submitActiveWorkerSignIn } from "../support/submitActiveWorkerSignIn";
import { removeReservationsForWorker } from "../support/removeReservationsForWorker";

test.describe("Reservation form", () => {
  test.afterEach(async ({ activeWorker }) => {
    await removeReservationsForWorker(activeWorker);
  });

  test.beforeEach(async ({ activeWorker, page }) => {
    await addReservationsArea(activeWorker.id);
    await submitActiveWorkerSignIn(page, activeWorker);
    await expect(page).toHaveURL(PATHS.MODE);
    await createWorkModePage(page)
      .getCard(E2E_RESERVATIONS_AREA_LABEL)
      .click();
    await expect(page).toHaveURL(PATHS.HOME);
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
      reservationFormPage.getCategoryCard(
        E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
      )
    ).toBeVisible();
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
    );
    await expect(
      reservationFormPage.getSelectedCategoryOption()
    ).toHaveText(E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION);
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

  test("submits a valid custom duration with decimal precision", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.submitCustomDurationReservation(
      E2E_RESERVATION_FORM_COPY.CUSTOM_DURATION_PRECISION_CASE
    );

    await expect(
      reservationFormPage.getSuccessMessage()
    ).toBeVisible();
  });

  test("prevents a second submission after reservation creation", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await expect(
      reservationFormPage.getCategorySelect()
    ).toHaveValue(STRING.Empty);
    await reservationFormPage.submitReservation();

    await expect(
      reservationFormPage.getSuccessMessage()
    ).toBeVisible();
    await expect(
      reservationFormPage.getSubmitButton()
    ).toBeDisabled();
    await reservationFormPage.attemptSubmit();
    await expect(
      reservationFormPage.getSuccessMessage()
    ).toHaveCount(1);
  });

  test("offers an available concrete unit for Lancha", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
    );

    await expect(
      reservationFormPage.getQuantityInput()
    ).toBeHidden();
    await expect(
      reservationFormPage.getUnitSelect()
    ).toBeVisible();
    await reservationFormPage.selectUnit(
      E2E_RESERVATION_FORM_COPY.UNIT_OPTION
    );
    await expect(
      reservationFormPage.getUnitSelect()
    ).toHaveValue(/.+/);
  });
});
