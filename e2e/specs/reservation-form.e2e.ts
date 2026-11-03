import { expect, test } from "../support/activeWorkerTest";
import { E2E_PROJECT } from "../constants/E2eRuntime.constants";
import {
  E2E_RESERVATION_DURATION_PRESET,
  E2E_RESERVATION_EQUIPMENT_STATUS,
  E2E_RESERVATION_FORM_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { createReservationEquipmentStatusFixture } from "../support/createReservationEquipmentStatusFixture";
import { signInToReservationsMode } from "../support/signInToReservationsMode";
import { removeReservationsForWorker } from "../support/removeReservationsForWorker";

test.describe("Reservation form", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test.afterEach(async ({ activeWorker }) => {
    await removeReservationsForWorker(activeWorker);
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
      reservationFormPage.getSelectedCategoryOption()
    ).toHaveCount(0);
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

  test("creates a reservation using a seeded interchangeable category", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await expect(
      reservationFormPage.getSelectedCategoryOption()
    ).toHaveCount(0);
    await reservationFormPage.submitReservation();

    await expect(
      reservationFormPage.getSuccessMessage()
    ).toBeVisible();
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

  test("removes a committed Lancha from availability for the same window", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await reservationFormPage.goTo();
    await reservationFormPage
      .getDateInput()
      .fill(E2E_RESERVATION_FORM_COPY.SCREENSHOT_DATE);
    await reservationFormPage
      .getCustomerNameInput()
      .fill(E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME_VALID);
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
    );
    await reservationFormPage.waitForUnitOption(
      E2E_RESERVATION_FORM_COPY.UNIT_OPTION
    );
    await reservationFormPage.selectUnit(
      E2E_RESERVATION_FORM_COPY.UNIT_OPTION
    );
    await reservationFormPage.submit();

    await expect(
      reservationFormPage.getSuccessMessage()
    ).toBeVisible();
    await reservationFormPage.goTo();
    await reservationFormPage
      .getDateInput()
      .fill(E2E_RESERVATION_FORM_COPY.SCREENSHOT_DATE);
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
    );
    await expect(
      reservationFormPage.getAvailabilityLoadingMessage()
    ).toBeVisible();
    await expect(
      reservationFormPage.getAvailabilityLoadingMessage()
    ).toBeHidden();
    await expect(
      reservationFormPage.getUnitOption(
        E2E_RESERVATION_FORM_COPY.UNIT_OPTION
      )
    ).toHaveCount(0);
  });

  test("removes a damaged unit after an inventory update", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== E2E_PROJECT.DEFAULT,
      "The inventory mutation runs once to avoid concurrent database writes."
    );
    const equipmentFixture =
      createReservationEquipmentStatusFixture();

    try {
      const initialStatus =
        await equipmentFixture.prepare();
      expect(initialStatus).toBe(
        E2E_RESERVATION_EQUIPMENT_STATUS.AVAILABLE
      );
      const reservationFormPage =
        createReservationFormPage(page);
      await reservationFormPage.goTo();
      await reservationFormPage
        .getDateInput()
        .fill(E2E_RESERVATION_FORM_COPY.REALTIME_DATE);
      await expect(
        reservationFormPage.getCategorySelect()
      ).toBeEnabled();
      await reservationFormPage.selectCategory(
        E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
      );
      await expect(
        reservationFormPage.getUnitOption(
          E2E_RESERVATION_FORM_COPY.REALTIME_UNIT_OPTION
        )
      ).toHaveCount(1);

      expect(
        await equipmentFixture.markUnitAsDamaged()
      ).toBe(E2E_RESERVATION_EQUIPMENT_STATUS.DAMAGED);
      await expect(
        reservationFormPage.getUnitOption(
          E2E_RESERVATION_FORM_COPY.REALTIME_UNIT_OPTION
        )
      ).toHaveCount(0);
    } finally {
      await equipmentFixture.restore();
    }
  });
});
