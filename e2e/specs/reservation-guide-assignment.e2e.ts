import { expect, test } from "../support/activeWorkerTest";
import {
  E2E_RESERVATION_FORM_COPY,
  E2E_RESERVATION_GUIDES,
  E2E_RESERVATION_TYPE_COPY,
} from "../constants/E2eReservationForm.constants";
import { createReservationFormPage } from "../pages/ReservationForm.page";
import { removeReservationsForWorker } from "../support/removeReservationsForWorker";
import { signInToReservationsMode } from "../support/signInToReservationsMode";

test.beforeEach(async ({ activeWorker, page }) => {
  await signInToReservationsMode(page, activeWorker);
  await createReservationFormPage(page).goTo();
  await createReservationFormPage(
    page
  ).selectReservationType(
    E2E_RESERVATION_TYPE_COPY.OPTIONS.TOUR.label
  );
});

test.afterEach(async ({ activeWorker }) => {
  await removeReservationsForWorker(activeWorker);
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

test("warns and submits a tour reservation without guides", async ({
  page,
}) => {
  const reservationFormPage =
    createReservationFormPage(page);
  const guideName = E2E_RESERVATION_GUIDES.FIRST_NAME;

  await expect(
    reservationFormPage.getGuideCheckbox(guideName)
  ).toBeVisible();
  await expect(
    reservationFormPage.getGuideNoSelectionWarning()
  ).toBeVisible();
  await expect(
    reservationFormPage.getGuideAlignmentOffset(guideName)
  ).resolves.toBeLessThanOrEqual(
    E2E_RESERVATION_GUIDES.ALIGNMENT_TOLERANCE_PX
  );

  await reservationFormPage
    .getCustomerNameInput()
    .fill(E2E_RESERVATION_FORM_COPY.CUSTOMER_NAME_VALID);
  await reservationFormPage.selectCategory(
    E2E_RESERVATION_FORM_COPY.CATEGORY_OPTION
  );
  await reservationFormPage.submit();

  await expect(
    reservationFormPage.getSuccessMessage()
  ).toBeVisible();
});
