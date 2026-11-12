import type { ReservationPostponementReadingUnit } from "./ReservationPostponementReadingUnit.interface";
import type { ReservationPostponementViewModel } from "./ReservationPostponementViewModel.interface";

export interface ReservationPostponementReadingsProps {
  units: ReservationPostponementReadingUnit[];
  viewModel: ReservationPostponementViewModel;
}
