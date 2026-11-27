import type { Locator, Page } from "@playwright/test";
import {
  ARIA_ROLE,
  PAYMENT_CHOICE_COPY,
  type PaymentChoice,
} from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as form } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeFormCopy.constants";
import { RESERVATION_EXTRA_TIME_UI_COPY as ui } from "@/app/features/reservations/reservation-extra-time/constants/ReservationExtraTimeUiCopy.constants";
import type { ReservationExtraTimeOutcome } from "@/app/features/reservations/reservation-extra-time/models/ReservationExtraTimeOutcome.type";
import { resolveReservationExtraTimePath } from "@/app/utils/reservations/resolveReservationExtraTimePath";
import { getMainRegion } from "../support/mainRegion";

export const createReservationExtraTimePage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getGroups = (): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: ui.GROUPS_TITLE,
    });

  return {
    chooseOutcome: (outcome: ReservationExtraTimeOutcome) =>
      main
        .getByText(form.OUTCOME_LABEL[outcome], {
          exact: true,
        })
        .click(),
    choosePaymentMethod: (choice: PaymentChoice) =>
      main
        .getByText(PAYMENT_CHOICE_COPY[choice], {
          exact: true,
        })
        .click(),
    fillAmount: (amount: string) =>
      main
        .getByRole(ARIA_ROLE.TEXTBOX, {
          name: /^Monto acordado/,
        })
        .fill(amount),
    getGroupItems: (): Locator =>
      getGroups().getByRole(ARIA_ROLE.LISTITEM),
    getGroups,
    getStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS),
    getText: (text: string): Locator =>
      main.getByText(text, { exact: true }),
    goTo: (reservationId: string) =>
      page.goto(
        resolveReservationExtraTimePath(reservationId)
      ),
    submit: (outcome: ReservationExtraTimeOutcome) =>
      main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: form.SUBMIT[outcome],
        })
        .click(),
  };
};
