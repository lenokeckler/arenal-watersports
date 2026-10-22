import type { useReservationFormViewModelDependencies } from "../hooks/useReservationFormViewModelDependencies";
import type { ReservationFormComboViewModels } from "./ReservationFormComboViewModels.interface";

export interface CreateReservationFormSubmitOptionsInput extends ReservationFormComboViewModels {
  dependencies: ReturnType<
    typeof useReservationFormViewModelDependencies
  >;
}
