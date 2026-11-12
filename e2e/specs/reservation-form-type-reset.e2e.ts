import { expect, test } from "../support/activeWorkerTest";
import { STRING } from "@/app/constants";
import { E2E_RESERVATION_TYPE_COPY } from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { selectGuideOnlyReservationUnit } from "../support/selectGuideOnlyReservationUnit";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test.describe("Reservation form type reset", () => {
  test.beforeEach(async ({ activeWorker, page }) => {
    await signInToReservationsMode(page, activeWorker);
  });

  test("clears guide-only equipment when switching to rental", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await selectGuideOnlyReservationUnit(page);
    await expect(
      reservationFormPage.getSelectedUnitOption()
    ).toHaveText(
      E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_UNIT_OPTION
    );
    await reservationFormPage.selectReservationType(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.RENTAL.label
    );

    await expect(
      reservationFormPage.getSelectedCategoryOption()
    ).toHaveCount(0);
    await reservationFormPage.selectReservationType(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_CATEGORY.BOAT
    );
    await reservationFormPage.waitForUnitOption(
      E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_UNIT_OPTION
    );
    await expect(
      reservationFormPage.getUnitSelect()
    ).toHaveValue(STRING.Empty);
  });

  test("clears guide-only equipment when switching to combo", async ({
    page,
  }) => {
    const reservationFormPage =
      createReservationFormPage(page);

    await selectGuideOnlyReservationUnit(page);
    await expect(
      reservationFormPage.getSelectedUnitOption()
    ).toHaveText(
      E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_UNIT_OPTION
    );
    await reservationFormPage.selectReservationType(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.COMBO.label
    );

    await expect(
      reservationFormPage.getSelectedCategoryOption()
    ).toHaveCount(0);
    await reservationFormPage.selectReservationType(
      E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
    );
    await reservationFormPage.selectCategory(
      E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_CATEGORY.BOAT
    );
    await reservationFormPage.waitForUnitOption(
      E2E_RESERVATION_TYPE_COPY.GUIDE_ONLY_UNIT_OPTION
    );
    await expect(
      reservationFormPage.getUnitSelect()
    ).toHaveValue(STRING.Empty);
  });
});
