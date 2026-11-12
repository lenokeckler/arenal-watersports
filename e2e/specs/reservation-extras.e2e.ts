import { expect, test } from "@playwright/test";
import { RESERVATION_TYPE_COPY } from "@/app/features/reservations/reservation-form/constants/ReservationTypeCopy.constants";
import {
  E2E_RESERVATION_EXTRAS,
  E2E_RESERVATION_FORM_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { createReservationCategoryConflictFixture } from "../support/createReservationCategoryConflictFixture";
import { getReservationConflictDate } from "../support/getReservationConflictDate";
import { signInAsSeededWorker } from "../support/signInAsSeededWorker";

type ReservationFormPage = ReturnType<
  typeof createReservationFormPage
>;

const configureBoatReservation = async (
  form: ReservationFormPage,
  date: string
): Promise<void> => {
  await form.goTo();
  await form.getDateInput().fill(date);
  await form.selectReservationType(
    RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
  await form.selectCategory(
    E2E_RESERVATION_FORM_COPY.CONCRETE_CATEGORY_OPTION
  );
  await form.waitForUnitOption(
    E2E_RESERVATION_FORM_COPY.UNIT_OPTION
  );
  await form.selectUnit(
    E2E_RESERVATION_FORM_COPY.UNIT_OPTION
  );
};

const selectFeeExtraAndCheckQuote = async (
  form: ReservationFormPage
): Promise<void> => {
  await expect(
    form.getExtraCheckbox(
      E2E_RESERVATION_FORM_COPY.EXTRA_PONTOON_OPTION
    )
  ).toBeVisible();
  await expect(
    form.getExtraCheckbox(
      E2E_RESERVATION_FORM_COPY.EXTRA_BENNINGTON_OPTION
    )
  ).toHaveCount(0);
  const extraCheckbox = form.getExtraCheckbox(
    E2E_RESERVATION_FORM_COPY.EXTRA_PONTOON_OPTION
  );
  const extraCard = form.getExtraOptionCard(
    E2E_RESERVATION_FORM_COPY.EXTRA_PONTOON_OPTION
  );
  await extraCard.click();
  await expect(extraCheckbox).toBeChecked();
  await extraCard.click();
  await expect(extraCheckbox).not.toBeChecked();
  await extraCard.click();
  await expect(extraCheckbox).toBeChecked();
  await expect(
    form.getQuoteTitle().locator("..")
  ).toContainText(
    E2E_RESERVATION_EXTRAS.EXPECTED_EXTRA_QUOTE_USD
  );
};

test("selects compatible extras, quotes and submits", async ({
  page,
}, testInfo) => {
  const projectName = testInfo.project.name;
  const fixture =
    createReservationCategoryConflictFixture();
  const reservationDate =
    getReservationConflictDate(projectName);
  try {
    await fixture.prepare(projectName);
    await signInAsSeededWorker(page);
    const form = createReservationFormPage(page);
    await configureBoatReservation(form, reservationDate);
    await selectFeeExtraAndCheckQuote(form);
    await form
      .getCustomerNameInput()
      .fill(fixture.getCustomerNames(projectName).first);
    await form.submit();
    await expect(form.getSuccessMessage()).toBeVisible();
  } finally {
    await fixture.cleanup(projectName);
  }
});
