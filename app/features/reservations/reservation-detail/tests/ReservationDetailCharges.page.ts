import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_CHARGES_COPY } from "../constants/ReservationDetailChargesCopy.constants";
import type { ReservationDetailChargesPage } from "./models/ReservationDetailChargesPage.interface";

const CHARGE_LINK_QUERY = {
  name: RESERVATION_DETAIL_CHARGES_COPY.REGISTER_CHARGE,
};

export const createReservationDetailChargesPage =
  (): ReservationDetailChargesPage => ({
    getChargeLink: (): HTMLElement =>
      screen.getByRole(ARIA_ROLE.LINK, CHARGE_LINK_QUERY),
    getRegion: (): HTMLElement =>
      screen.getByRole(ARIA_ROLE.REGION, {
        name: RESERVATION_DETAIL_CHARGES_COPY.CHARGE_STATUS,
      }),
    queryChargeLink: (): HTMLElement | null =>
      screen.queryByRole(ARIA_ROLE.LINK, CHARGE_LINK_QUERY),
  });
