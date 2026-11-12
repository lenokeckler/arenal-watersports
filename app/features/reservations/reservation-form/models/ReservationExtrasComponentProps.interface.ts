import type { ReservationExtrasViewModel } from "./ReservationExtrasViewModel.interface";
import type { ReservationFormViewModel } from "./ReservationFormViewModel.interface";

export type ReservationFormViewModelWithExtras =
  ReservationFormViewModel & {
    extras: ReservationExtrasViewModel;
  };

export interface ReservationExtrasComponentProps {
  viewModel: ReservationFormViewModelWithExtras;
}
