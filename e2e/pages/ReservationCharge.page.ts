import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import {
  ARIA_ROLE,
  CURRENCY_CODE,
  CURRENCY_NAME_COPY,
} from "@/app/constants";
import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "@/app/features/reservations/reservation-charge/constants/ReservationChargePaymentChoice.constants";
import { RESERVATION_CHARGE_UI_COPY as ui } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeUiCopy.constants";
import type { NullableRef } from "@/app/types";
import { resolveReservationChargePath } from "@/app/utils/reservations/resolveReservationChargePath";
import { getMainRegion } from "../support/mainRegion";

const OTHER_LABEL =
  copy.PAYMENT_CHOICE_LABEL[
    RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
  ];

const STORED_METHOD_LABELS: readonly string[] =
  Object.values(RESERVATION_CHARGE_PAYMENT_CHOICE)
    .filter(
      (choice) =>
        choice !== RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER
    )
    .map((choice) => copy.PAYMENT_CHOICE_LABEL[choice]);

export const createReservationChargePage = (page: Page) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });

  const getCurrencyLabel = (
    currency: CurrencyCode
  ): Locator =>
    main.getByText(CURRENCY_NAME_COPY[currency], {
      exact: true,
    });

  const selectMethod = (label: string): Promise<void> =>
    main.getByText(label, { exact: true }).click();

  return {
    fillAmount: (
      amount: string,
      currency: CurrencyCode = CURRENCY_CODE.USD
    ): Promise<void> =>
      main
        .getByLabel(copy.AMOUNT_LABEL[currency])
        .fill(amount),
    fillPaymentMethod: async (
      method: string
    ): Promise<void> => {
      if (STORED_METHOD_LABELS.includes(method)) {
        await selectMethod(method);
        return;
      }
      await selectMethod(OTHER_LABEL);
      await main
        .getByRole(ARIA_ROLE.TEXTBOX, {
          name: copy.OTHER_METHOD_LABEL,
        })
        .fill(method);
    },
    fillMixedAmounts: async (
      usd: string,
      crc: string
    ): Promise<void> => {
      await main
        .getByRole(ARIA_ROLE.BUTTON, {
          name: copy.ADD_CURRENCY[CURRENCY_CODE.CRC],
        })
        .click();
      await main
        .getByLabel(copy.AMOUNT_LABEL[CURRENCY_CODE.USD])
        .fill(usd);
      await main
        .getByLabel(copy.AMOUNT_LABEL[CURRENCY_CODE.CRC])
        .fill(crc);
    },
    getAddSecondAmount: (currency: CurrencyCode): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: copy.ADD_CURRENCY[currency],
      }),
    selectMethod,
    getAlert: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getAmount: (
      currency: CurrencyCode = CURRENCY_CODE.USD
    ): Locator =>
      main.getByLabel(copy.AMOUNT_LABEL[currency]),
    getCurrencyLabel,
    getCurrencyOption: (currency: CurrencyCode): Locator =>
      main.getByRole(ARIA_ROLE.RADIO, {
        name: new RegExp(CURRENCY_NAME_COPY[currency]),
      }),
    getBackLink: (): Locator =>
      main
        .getByRole(ARIA_ROLE.LINK, {
          name: ui.BACK_TO_RESERVATION,
        })
        .last(),
    selectCurrency: (
      currency: CurrencyCode
    ): Promise<void> => getCurrencyLabel(currency).click(),
    getRemoveSecondAmount: (
      currency: CurrencyCode
    ): Locator =>
      main.getByRole(ARIA_ROLE.BUTTON, {
        name: copy.REMOVE_CURRENCY[currency],
      }),
    getStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS),
    getSubmit,
    getSummaryAmount: (
      currency: CurrencyCode = CURRENCY_CODE.USD
    ): Locator =>
      main
        .getByRole(ARIA_ROLE.REGION, {
          name: ui.SUMMARY_HEADING,
          exact: true,
        })
        .getByLabel(copy.AMOUNT_LABEL[currency]),
    getSummary: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: ui.SUMMARY_HEADING,
        exact: true,
      }),
    getText: (text: string): Locator =>
      main.getByText(text),
    goTo: (id: string): Promise<NullableRef<Response>> =>
      page.goto(resolveReservationChargePath(id)),
    submit: (): Promise<void> => getSubmit().click(),
  };
};
