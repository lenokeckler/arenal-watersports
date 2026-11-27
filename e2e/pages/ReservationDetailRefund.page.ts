import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "@/app/features/reservations/reservation-detail/constants/ReservationDetailChargesCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationDetailRefundPage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getRefundLink: (code: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.RECORD_REFUND_LABEL(code),
      }),
  };
};
