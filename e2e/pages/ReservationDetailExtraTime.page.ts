import type { Locator, Page } from "@playwright/test";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_CHARGES_COPY as copy } from "@/app/features/reservations/reservation-detail/constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailExtraTimeState } from "@/app/features/reservations/reservation-detail/constants/ReservationDetail.constants";
import { getMainRegion } from "../support/mainRegion";

export const createReservationDetailExtraTimePage = (
  page: Page
) => {
  const main = getMainRegion(page);

  return {
    getResolveLink: (code: string): Locator =>
      main.getByRole(ARIA_ROLE.LINK, {
        name: copy.RESOLVE_EXTRA_TIME_LABEL(code),
      }),
    getState: (
      state: ReservationDetailExtraTimeState,
      duration: string
    ): Locator =>
      main.getByText(
        copy.EXTRA_TIME_STATE[state](duration),
        {
          exact: true,
        }
      ),
  };
};
