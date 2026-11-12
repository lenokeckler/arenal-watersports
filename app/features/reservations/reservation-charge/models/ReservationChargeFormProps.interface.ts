import type { ReservationCharge } from "./ReservationCharge.interface";
import type { ReservationChargeViewModel } from "./ReservationChargeViewModel.interface";

export interface ReservationChargeFormProps {
  charge: ReservationCharge;
  viewModel: ReservationChargeViewModel;
}
