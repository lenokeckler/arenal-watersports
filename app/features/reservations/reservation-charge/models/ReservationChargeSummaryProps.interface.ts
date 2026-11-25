import type { ReservationCharge } from "./ReservationCharge.interface";
import type { ReservationChargeViewModel } from "./ReservationChargeViewModel.interface";

export interface ReservationChargeSummaryProps {
  charge: ReservationCharge;
  viewModel: ReservationChargeViewModel;
}
