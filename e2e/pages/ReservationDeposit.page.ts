import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import {
  ARIA_ROLE,
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
  type CurrencyCode,
} from "@/app/constants";
import { RESERVATION_DEPOSIT_FORM_COPY as copy } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositFormCopy.constants";
import { RESERVATION_DEPOSIT_UI_COPY as ui } from "@/app/features/reservations/reservation-deposit/constants/ReservationDepositUiCopy.constants";
import type { NullableRef } from "@/app/types";
import { resolveReservationDepositPath } from "@/app/utils/reservations/resolveReservationDepositPath";
import { getMainRegion } from "../support/mainRegion";

export const createReservationDepositPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, {
      name: new RegExp(
        `^(${copy.SUBMIT}|${copy.SUBMIT_DECLINED})$`
      ),
    });

  return {
    chooseCurrency: (
      currency: CurrencyCode
    ): Promise<void> =>
      main
        .getByText(CURRENCY_NAME_COPY[currency], {
          exact: true,
        })
        .click(),
    chooseDeclined: (): Promise<void> =>
      main
        .getByText(copy.DECISION_DECLINED, { exact: true })
        .click(),
    getAmount: (
      currency: CurrencyCode = CURRENCY_CODE.USD
    ): Locator =>
      main.getByLabel(copy.AMOUNT_LABEL[currency]),
    getBackLink: (): Locator =>
      main
        .getByRole(ARIA_ROLE.LINK, {
          name: ui.BACK_TO_RESERVATION,
        })
        .last(),
    getStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS),
    getSubmit,
    getText: (text: string): Locator =>
      main.getByText(text),
    goTo: (id: string): Promise<NullableRef<Response>> =>
      page.goto(resolveReservationDepositPath(id)),
    submit: (): Promise<void> => getSubmit().click(),
  };
};
