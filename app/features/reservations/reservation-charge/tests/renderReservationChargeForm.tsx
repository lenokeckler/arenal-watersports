import { render } from "@testing-library/react";
import ReservationChargeForm from "../components/ReservationChargeForm";
import { useReservationChargeViewModel } from "../hooks/useReservationChargeViewModel";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import { EXPECTED_SCHEDULED } from "./ReservationCharge.constants";
import { createReservationChargeViewPage } from "./ReservationChargeView.page";

const ReservationChargeFormHarness = ({
  charge,
}: {
  charge: ReservationCharge;
}): React.JSX.Element => (
  <ReservationChargeForm
    charge={charge}
    viewModel={useReservationChargeViewModel(charge)}
  />
);

export const renderReservationChargeForm = (
  charge: ReservationCharge = EXPECTED_SCHEDULED
) => {
  render(<ReservationChargeFormHarness charge={charge} />);
  return createReservationChargeViewPage();
};
