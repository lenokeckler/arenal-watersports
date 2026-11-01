import { PATHS } from "@/app/constants";
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

test("shows the custom duration field only when selected", async ({
  activeWorker,
  page,
}) => {
  await addReservationsArea(activeWorker.id);
  await submitActiveWorkerSignIn(page, activeWorker);
  await expect(page).toHaveURL(PATHS.MODE);
  await createWorkModePage(page)
    .getCard(E2E_RESERVATIONS_AREA_LABEL)
    .click();
  await expect(page).toHaveURL(PATHS.BOARD);
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
