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
import { RESERVATION_REFUND_FORM_COPY as copy } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON_COPY as reasons } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundReasonCopy.constants";
import { RESERVATION_REFUND_UI_COPY as ui } from "@/app/features/reservations/reservation-refund/constants/ReservationRefundUiCopy.constants";
import type { ReservationRefundReason } from "@/app/features/reservations/reservation-refund/models/ReservationRefundReason.type";
import type { NullableRef } from "@/app/types";
import { resolveReservationRefundPath } from "@/app/utils/reservations/resolveReservationRefundPath";
import { getMainRegion } from "../support/mainRegion";

export const createReservationRefundPage = (page: Page) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });
  const getAvailable = (): Locator =>
    main.getByRole(ARIA_ROLE.REGION, {
      name: ui.AVAILABLE_HEADING,
    });

  const chooseReason = (
    reason: ReservationRefundReason
  ): Promise<void> =>
    main
      .getByText(reasons[reason], { exact: true })
      .click();
  const fillAmount = (
    amount: string,
    currency: CurrencyCode = CURRENCY_CODE.USD
  ): Promise<void> =>
    main
      .getByLabel(copy.AMOUNT_LABEL[currency])
      .fill(amount);

  return {
    chooseReason,
    fillAmount,
    fillRefund: async (
      amount: string,
      reason: ReservationRefundReason
    ): Promise<void> => {
      await fillAmount(amount);
      await chooseReason(reason);
    },
    fillOtherReason: (text: string): Promise<void> =>
      main.getByLabel(copy.OTHER_LABEL).fill(text),
    getAvailable,
    getAvailableFigure: (currency: CurrencyCode): Locator =>
      getAvailable()
        .getByText(CURRENCY_NAME_COPY[currency], {
          exact: true,
        })
        .locator("xpath=following-sibling::dd"),
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
      page.goto(resolveReservationRefundPath(id)),
    submit: (): Promise<void> => getSubmit().click(),
  };
};
