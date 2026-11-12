import { render } from "@testing-library/react";
import ReservationChargeView from "../ReservationChargeView";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { createReservationChargeViewPage } from "./ReservationChargeView.page";

export const renderReservationChargeView = (
  charge: ReservationCharge = EXPECTED_SCHEDULED
) => {
  render(<ReservationChargeView charge={charge} />);
  return createReservationChargeViewPage();
};
