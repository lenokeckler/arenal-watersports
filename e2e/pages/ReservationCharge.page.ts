import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CHARGE_FORM_COPY as copy } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeFormCopy.constants";
import { RESERVATION_CHARGE_UI_COPY as ui } from "@/app/features/reservations/reservation-charge/constants/ReservationChargeUiCopy.constants";
import type { NullableRef } from "@/app/types";
import { resolveReservationChargePath } from "@/app/utils/reservations/resolveReservationChargePath";
import { getMainRegion } from "../support/mainRegion";

export const createReservationChargePage = (page: Page) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });

  return {
    fillAmount: (amount: string): Promise<void> =>
      main.getByLabel(copy.LABEL_AMOUNT).fill(amount),
    fillPaymentMethod: (method: string): Promise<void> =>
      main.getByLabel(copy.LABEL_METHOD).fill(method),
    getAlert: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getAmount: (): Locator =>
      main.getByLabel(copy.LABEL_AMOUNT),
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
      page.goto(resolveReservationChargePath(id)),
    submit: (): Promise<void> => getSubmit().click(),
  };
};
