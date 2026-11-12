import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "@/app/features/reservations/reservation-detail/constants/ReservationDetailChargesCopy.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationDetailChargePage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getChargeLink: (code: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.RECORD_CHARGE_LABEL(code),
      }),
    getChargeSection: (): Locator =>
      main.getByRole(ARIA_ROLE.REGION, {
        name: copy.CHARGE_STATUS,
      }),
  };
};
