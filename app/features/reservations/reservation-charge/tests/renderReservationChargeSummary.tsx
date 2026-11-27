import { render } from "@testing-library/react";
import ReservationChargeLayout from "../components/ReservationChargeLayout";
import ReservationChargeSummary from "../components/ReservationChargeSummary";
import { useReservationChargeViewModel } from "../hooks/useReservationChargeViewModel";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { createReservationChargePage } from "./ReservationCharge.page";

const ReservationChargeSummaryHarness = ({
  charge,
}: {
  charge: ReservationCharge;
}): React.JSX.Element => (
  <ReservationChargeSummary
    charge={charge}
    viewModel={useReservationChargeViewModel(charge)}
  />
);

export const renderReservationChargeSummary = (
  charge: ReservationCharge = EXPECTED_SCHEDULED
) => {
  render(
    <ReservationChargeLayout reservationId={charge.id}>
      <ReservationChargeSummaryHarness charge={charge} />
    </ReservationChargeLayout>
  );
  return createReservationChargePage();
};
