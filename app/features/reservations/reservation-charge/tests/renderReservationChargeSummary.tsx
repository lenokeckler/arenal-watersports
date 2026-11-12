import { render } from "@testing-library/react";
import ReservationChargeLayout from "../components/ReservationChargeLayout";
import ReservationChargeSummary from "../components/ReservationChargeSummary";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { createReservationChargePage } from "./ReservationCharge.page";

export const renderReservationChargeSummary = (
  charge: ReservationCharge = EXPECTED_SCHEDULED
) => {
  render(
    <ReservationChargeLayout reservationId={charge.id}>
      <ReservationChargeSummary charge={charge} />
    </ReservationChargeLayout>
  );
  return createReservationChargePage();
};
