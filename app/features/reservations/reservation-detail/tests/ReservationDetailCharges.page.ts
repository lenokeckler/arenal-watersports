import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_CHARGES_COPY } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailChargesPage } from "./models/ReservationDetailChargesPage.interface";

export const createReservationDetailChargesPage =
  (): ReservationDetailChargesPage => ({
    getRegion: (): HTMLElement =>
      screen.getByRole(ARIA_ROLE.REGION, {
        name: RESERVATION_DETAIL_CHARGES_COPY.CHARGE_STATUS,
      }),
  });
