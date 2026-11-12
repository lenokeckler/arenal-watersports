import type { ReservationSplit } from "./ReservationSplit.interface";
import type { ReservationSplitViewModel } from "./ReservationSplitViewModel.interface";

export interface ReservationSplitCardProps {
  split: ReservationSplit;
  viewModel: ReservationSplitViewModel;
}
