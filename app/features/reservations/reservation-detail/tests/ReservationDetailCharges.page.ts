import { screen } from "@testing-library/react";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DETAIL_CHARGES_COPY } from "../constants/ReservationDetailChargesCopy.constants";
import { RESERVATION_DETAIL_TEST } from "./ReservationDetailTest.constants";
import type { ReservationDetailChargesPage } from "./models/ReservationDetailChargesPage.interface";

const CHARGE_LINK_QUERY = {
  name: RESERVATION_DETAIL_CHARGES_COPY.RECORD_CHARGE_LABEL(
    RESERVATION_DETAIL_TEST.RESERVATION_CODE
  ),
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
