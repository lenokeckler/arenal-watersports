import type { Page } from "@playwright/test";
import { expect, test } from "../support/activeWorkerTest";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import { E2E_RESERVATION_FORM_COPY } from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

const selectConcreteComboUnit = async (
  page: Page
): Promise<
  ReturnType<typeof createReservationFormPage>
> => {
  const reservationFormPage =
    createReservationFormPage(page);
  await reservationFormPage.goTo();
  await reservationFormPage.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
  );
  await reservationFormPage
    .getDateInput()
    .fill(E2E_RESERVATION_FORM_COPY.SCREENSHOT_DATE);
  await reservationFormPage.waitForCustomComboUnitOption(
    E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION,
    E2E_RESERVATION_FORM_COPY.UNIT_OPTION
  );
  await reservationFormPage.selectCustomComboUnit(
    E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION,
    E2E_RESERVATION_FORM_COPY.UNIT_OPTION
  );
  return reservationFormPage;
};

test.describe("Custom combo unit availability", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test("selects an available concrete Lancha unit", async ({
    page,
  }) => {
    const reservationFormPage =
      await selectConcreteComboUnit(page);

    await expect(
      reservationFormPage.getSelectedCustomComboUnitOption(
        E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
      )
    ).toHaveText(E2E_RESERVATION_FORM_COPY.UNIT_OPTION);
  });

  test("clears and reloads a unit after the reservation date changes", async ({
    page,
  }) => {
    const reservationFormPage =
      await selectConcreteComboUnit(page);
    await reservationFormPage
      .getDateInput()
      .fill(E2E_RESERVATION_FORM_COPY.INTERVAL_CHANGE_DATE);

    await expect(
      reservationFormPage.getSelectedCustomComboUnitOption(
        E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
      )
    ).toHaveText(
      E2E_RESERVATION_FORM_COPY.UNIT_PLACEHOLDER
    );
    await reservationFormPage.waitForCustomComboUnitOption(
      E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION,
      E2E_RESERVATION_FORM_COPY.UNIT_OPTION
    );
    await expect(
      reservationFormPage.getSelectedCustomComboUnitOption(
        E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
      )
    ).toHaveText(
      E2E_RESERVATION_FORM_COPY.UNIT_PLACEHOLDER
    );
  });
});
