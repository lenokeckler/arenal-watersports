import type {
  Locator,
  Page,
  Response,
} from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CANCELLATION_FORM_COPY as copy } from "@/app/features/reservations/reservation-cancellation/constants/ReservationCancellationFormCopy.constants";
import type { NullableRef } from "@/app/types";
import { resolveReservationCancelPath } from "@/app/utils/reservations/resolveReservationCancelPath";
import { getMainRegion } from "../support/mainRegion";

export const createReservationCancellationPage = (
  page: Page
) => {
  const main = getMainRegion(page);
  const getSubmit = (): Locator =>
    main.getByRole(ARIA_ROLE.BUTTON, { name: copy.SUBMIT });

  return {
    fillReason: (reason: string): Promise<void> =>
      main.getByLabel(copy.LABEL_REASON).fill(reason),
    getAlert: (): Locator =>
      main.getByRole(ARIA_ROLE.ALERT),
    getStatus: (): Locator =>
      main.getByRole(ARIA_ROLE.STATUS),
    getSubmit,
    getText: (text: string): Locator =>
      main.getByText(text),
    goTo: (id: string): Promise<NullableRef<Response>> =>
      page.goto(resolveReservationCancelPath(id)),
    submit: (): Promise<void> => getSubmit().click(),
  };
};
